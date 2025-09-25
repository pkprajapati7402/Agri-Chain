module KisanKosh::price_oracle {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};

    // Error codes
    const EUNAUTHORIZED: u64 = 1;
    const EPRICE_TOO_OLD: u64 = 2;
    const EPRICE_NOT_FOUND: u64 = 3;

    // Constants
    const MAX_PRICE_AGE: u64 = 86400; // 24 hours in seconds
    const PRICE_DECIMALS: u64 = 8; // 8 decimal places for price precision

    struct PriceData has store, copy, drop {
        price: u64,
        last_updated: u64,
        confidence: u64, // Confidence score 0-100
    }

    struct PriceOracle has key {
        admin: address,
        authorized_updaters: vector<address>,
        crop_prices: Table<String, PriceData>,
    }

    // Initialize the price oracle
    fun init_module(admin: &signer) {
        let admin_address = signer::address_of(admin);
        
        move_to(admin, PriceOracle {
            admin: admin_address,
            authorized_updaters: vector::empty(),
            crop_prices: table::new(),
        });
    }

    // Add authorized price updater
    public entry fun add_price_updater(
        admin: &signer,
        updater_address: address,
    ) acquires PriceOracle {
        let admin_address = signer::address_of(admin);
        let oracle = borrow_global_mut<PriceOracle>(@KisanKosh);
        assert!(oracle.admin == admin_address, EUNAUTHORIZED);
        
        if (!vector::contains(&oracle.authorized_updaters, &updater_address)) {
            vector::push_back(&mut oracle.authorized_updaters, updater_address);
        };
    }

    // Update crop price
    public entry fun update_crop_price(
        updater: &signer,
        crop_type: String,
        price: u64,
        confidence: u64,
    ) acquires PriceOracle {
        let updater_address = signer::address_of(updater);
        let oracle = borrow_global_mut<PriceOracle>(@KisanKosh);
        
        assert!(
            oracle.admin == updater_address || 
            vector::contains(&oracle.authorized_updaters, &updater_address),
            EUNAUTHORIZED
        );

        let price_data = PriceData {
            price,
            last_updated: timestamp::now_seconds(),
            confidence,
        };

        if (table::contains(&oracle.crop_prices, crop_type)) {
            *table::borrow_mut(&mut oracle.crop_prices, crop_type) = price_data;
        } else {
            table::add(&mut oracle.crop_prices, crop_type, price_data);
        };
    }

    // Get current crop price
    #[view]
    public fun get_crop_price(crop_type: String): (u64, u64, u64) acquires PriceOracle {
        let oracle = borrow_global<PriceOracle>(@KisanKosh);
        assert!(table::contains(&oracle.crop_prices, crop_type), EPRICE_NOT_FOUND);
        
        let price_data = table::borrow(&oracle.crop_prices, crop_type);
        let current_time = timestamp::now_seconds();
        
        assert!(current_time - price_data.last_updated <= MAX_PRICE_AGE, EPRICE_TOO_OLD);
        
        (price_data.price, price_data.last_updated, price_data.confidence)
    }

    // Calculate market value based on quantity and current price
    #[view]
    public fun calculate_market_value(crop_type: String, quantity: u64): u64 acquires PriceOracle {
        let (price, _, _) = get_crop_price(crop_type);
        (price * quantity) / (10 * PRICE_DECIMALS) // Adjust for decimals
    }

    // Check if price is fresh
    #[view]
    public fun is_price_fresh(crop_type: String): bool acquires PriceOracle {
        let oracle = borrow_global<PriceOracle>(@KisanKosh);
        if (!table::contains(&oracle.crop_prices, crop_type)) {
            return false
        };
        
        let price_data = table::borrow(&oracle.crop_prices, crop_type);
        let current_time = timestamp::now_seconds();
        
        current_time - price_data.last_updated <= MAX_PRICE_AGE
    }
}