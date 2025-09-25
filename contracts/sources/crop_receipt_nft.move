module KisanKosh::crop_receipt_nft {
    use std::signer;
    use std::string::{Self, String};
    use std::option::{Self, Option};
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_std::table::{Self, Table};

    // Error codes
    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EINVALID_RECEIPT: u64 = 2;
    const ELOAN_NOT_FOUND: u64 = 3;
    const ELOAN_ALREADY_EXISTS: u64 = 4;
    const ERECEIPT_LOCKED: u64 = 5;
    const ERECEIPT_NOT_OWNED: u64 = 6;
    const ELOAN_OVERDUE: u64 = 7;
    const EINSUFFICIENT_STAKING_BALANCE: u64 = 8;
    const ERECEIPT_ALREADY_STAKED: u64 = 9;
    const ERECEIPT_NOT_STAKED: u64 = 10;
    const ENOT_OWNER: u64 = 11;
    const ETOKEN_STAKED: u64 = 12;
    const ELOAN_EXISTS: u64 = 13;
    const ETOKEN_NOT_EXISTS: u64 = 14;
    const EINSUFFICIENT_COLLATERAL: u64 = 15;
    const ELOAN_REPAID: u64 = 16;
    const ETOKEN_NOT_STAKED: u64 = 17;
    const ESTAKING_LOCKED: u64 = 18;

    // Constants
    const COLLECTION_NAME: vector<u8> = b"Kisan Kosh Crop Receipts";
    const COLLECTION_DESCRIPTION: vector<u8> = b"Digital NFT certificates for stored agricultural crops";
    const COLLECTION_URI: vector<u8> = b"https://kisankosh.com/collection";
    const BASE_INTEREST_RATE: u64 = 12; // 12% annual interest rate
    const MAX_LTV_RATIO: u64 = 75; // 75% LTV ratio
    const LOAN_INTEREST_RATE: u64 = 12; // 12% annual interest rate  
    const STAKING_REWARD_RATE: u64 = 18; // 18% annual staking reward
    const LOAN_TO_VALUE_RATIO: u64 = 75; // 75% LTV ratio

    // Platform data structure
    struct PlatformData has key {
        admin: address,
        total_loans_issued: u64,
        total_amount_loaned: u64,
        total_receipts_minted: u64,
        total_staked_amount: u64,
        platform_fee_rate: u64, // Basis points (100 = 1%)
        loans: Table<u64, LoanData>,
        receipts: Table<u64, CropReceiptData>,
        staking_positions: Table<u64, StakingData>,
    }
    const SECONDS_PER_YEAR: u64 = 31536000; // 365 days in seconds

    // Structs
    struct CropReceiptData has store, copy, drop {
        farmer: address,
        crop_type: String,
        quantity: u64,
        quality_grade: String,
        location: String,
        harvest_date: u64,
        expected_value: u64,
        is_staked: bool,
        loan_id: Option<u64>,
    }

    struct LoanData has store, copy, drop {
        borrower: address,
        token_address: u64,
        principal_amount: u64,
        interest_rate: u64,
        total_repayment: u64,
        due_date: u64,
        is_repaid: bool,
    }

    struct StakingData has store, copy, drop {
        staker: address,
        token_address: u64,
        stake_amount: u64,
        reward_rate: u64,
        stake_time: u64,
        unlock_time: u64,
        is_active: bool,
    }



    // Events
    struct ReceiptMintedEvent has drop, store {
        token_address: address,
        owner: address,
        crop_type: String,
        quantity: u64,
        market_value: u64,
        timestamp: u64,
    }

    struct LoanIssuedEvent has drop, store {
        borrower: address,
        receipt_token_address: address,
        loan_amount: u64,
        interest_rate: u64,
        loan_duration: u64,
        timestamp: u64,
    }

    struct LoanRepaidEvent has drop, store {
        borrower: address,
        receipt_token_address: address,
        total_amount_repaid: u64,
        timestamp: u64,
    }

    struct StakingStartedEvent has drop, store {
        staker: address,
        receipt_token_address: address,
        staked_amount: u64,
        reward_rate: u64,
        timestamp: u64,
    }

    struct StakingEndedEvent has drop, store {
        staker: address,
        receipt_token_address: address,
        staked_amount: u64,
        rewards_earned: u64,
        timestamp: u64,
    }

    // Initialize the platform
    fun init_module(admin: &signer) {
        let admin_address = signer::address_of(admin);

        // Initialize platform data
        move_to(admin, PlatformData {
            admin: admin_address,
            total_loans_issued: 0,
            total_amount_loaned: 0,
            total_receipts_minted: 0,
            total_staked_amount: 0,
            platform_fee_rate: 100, // 1% platform fee
            loans: table::new(),
            receipts: table::new(),
            staking_positions: table::new(),
        });
    }

    // Mint a crop receipt NFT (simplified version)
    public entry fun mint_crop_receipt(
        farmer: &signer,
        crop_type: String,
        quantity: u64,
        quality_grade: String,
        location: String,
        harvest_date: u64,
        expected_value: u64,
        to: address
    ) acquires PlatformData {
        let farmer_address = signer::address_of(farmer);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        // Create receipt ID
        let receipt_id = platform_data.total_receipts_minted + 1;
        
        // Create receipt data
        let receipt_data = CropReceiptData {
            farmer: farmer_address,
            crop_type,
            quantity,
            quality_grade,
            location,
            harvest_date,
            expected_value,
            is_staked: false,
            loan_id: option::none(),
        };

        // Store receipt data
        table::add(&mut platform_data.receipts, receipt_id, receipt_data);

        // Update platform stats
        platform_data.total_receipts_minted = platform_data.total_receipts_minted + 1;
        
        // Emit event for frontend integration
        // Note: In production, you would emit a proper event here
    }        // Take a loan against a crop receipt
    public entry fun take_loan(
        borrower: &signer,
        receipt_id: u64,
        loan_amount: u64,
        duration_days: u64
    ) acquires PlatformData {
        let borrower_address = signer::address_of(borrower);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        // Verify receipt ownership
        assert!(table::contains(&platform_data.receipts, receipt_id), ETOKEN_NOT_EXISTS);
        let receipt_data = table::borrow_mut(&mut platform_data.receipts, receipt_id);
        assert!(receipt_data.farmer == borrower_address, ENOT_OWNER);
        assert!(!receipt_data.is_staked, ETOKEN_STAKED);
        assert!(option::is_none(&receipt_data.loan_id), ELOAN_EXISTS);
        
        // Calculate loan terms
        let collateral_ratio = (loan_amount * 100) / receipt_data.expected_value;
        assert!(collateral_ratio <= MAX_LTV_RATIO, EINSUFFICIENT_COLLATERAL);
        
        let interest_rate = BASE_INTEREST_RATE;
        let total_repayment = loan_amount + ((loan_amount * interest_rate * duration_days) / (100 * 365));
        let due_date = timestamp::now_seconds() + (duration_days * 24 * 60 * 60);
        
        // Create loan
        let loan_id = platform_data.total_loans_issued + 1;
        let loan_data = LoanData {
            borrower: borrower_address,
            token_address: receipt_id,
            principal_amount: loan_amount,
            interest_rate,
            total_repayment,
            due_date,
            is_repaid: false,
        };
        
        table::add(&mut platform_data.loans, loan_id, loan_data);
        receipt_data.loan_id = option::some(loan_id);
        
        // Update platform stats
        platform_data.total_loans_issued = loan_id;
        platform_data.total_amount_loaned = platform_data.total_amount_loaned + loan_amount;
        
        // In a real implementation, transfer actual tokens here
        // coin::transfer<AptosCoin>(borrower, borrower_address, loan_amount);
    }

    // Repay a loan and unlock the receipt
    public entry fun repay_loan(
        borrower: &signer,
        loan_id: u64,
    ) acquires PlatformData {
        let borrower_address = signer::address_of(borrower);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        // Check if loan exists
        assert!(table::contains(&platform_data.loans, loan_id), ELOAN_NOT_FOUND);
        
        let loan_data = table::borrow_mut(&mut platform_data.loans, loan_id);
        assert!(loan_data.borrower == borrower_address, ENOT_OWNER);
        assert!(!loan_data.is_repaid, ELOAN_REPAID);

        // Calculate current amount due (including any additional interest if overdue)
        let current_time = timestamp::now_seconds();
        let amount_to_repay = loan_data.total_repayment;

        // If loan is overdue, add penalty interest
        if (current_time > loan_data.due_date) {
            let overdue_days = (current_time - loan_data.due_date) / 86400;
            let penalty_interest = (loan_data.principal_amount * overdue_days * 2) / 365; // 2% daily penalty
            amount_to_repay = amount_to_repay + penalty_interest;
        };

        // Mark loan as repaid and unlock receipt
        loan_data.is_repaid = true;
        
        // Unlock the receipt
        let receipt_data = table::borrow_mut(&mut platform_data.receipts, loan_data.token_address);
        receipt_data.loan_id = option::none();

        // Note: In production, transfer repayment from borrower
        // coin::transfer<AptosCoin>(borrower, @KisanKosh, amount_to_repay);
    }

    // Stake a crop receipt for rewards
    public entry fun stake_receipt(
        staker: &signer,
        receipt_id: u64,
        lock_duration: u64
    ) acquires PlatformData {
        let staker_address = signer::address_of(staker);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        // Verify receipt ownership and availability
        assert!(table::contains(&platform_data.receipts, receipt_id), ETOKEN_NOT_EXISTS);
        let receipt_data = table::borrow_mut(&mut platform_data.receipts, receipt_id);
        assert!(receipt_data.farmer == staker_address, ENOT_OWNER);
        assert!(!receipt_data.is_staked, ETOKEN_STAKED);
        assert!(option::is_none(&receipt_data.loan_id), ELOAN_EXISTS);
        
        // Create staking position
        let stake_id = platform_data.total_receipts_minted + 1000; // Use unique ID for staking
        let unlock_time = timestamp::now_seconds() + lock_duration;
        let reward_rate = if (lock_duration >= 365 * 24 * 60 * 60) { 1500 } // 15% APY for 1+ year
                         else if (lock_duration >= 180 * 24 * 60 * 60) { 1000 } // 10% APY for 6+ months
                         else { 500 }; // 5% APY for shorter periods
        
        let staking_data = StakingData {
            staker: staker_address,
            token_address: receipt_id,
            stake_amount: receipt_data.expected_value,
            reward_rate,
            stake_time: timestamp::now_seconds(),
            unlock_time,
            is_active: true,
        };
        
        table::add(&mut platform_data.staking_positions, stake_id, staking_data);
        receipt_data.is_staked = true;
        
        // Update platform stats
        platform_data.total_staked_amount = platform_data.total_staked_amount + receipt_data.expected_value;
    }

    // Unstake a crop receipt and claim rewards
    public entry fun unstake_receipt(
        staker: &signer,
        stake_id: u64,
    ) acquires PlatformData {
        let staker_address = signer::address_of(staker);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        // Check if staking position exists
        assert!(table::contains(&platform_data.staking_positions, stake_id), ETOKEN_NOT_EXISTS);
        
        let staking_data = table::borrow_mut(&mut platform_data.staking_positions, stake_id);
        assert!(staking_data.staker == staker_address, ENOT_OWNER);
        assert!(staking_data.is_active, ETOKEN_NOT_STAKED);
        assert!(timestamp::now_seconds() >= staking_data.unlock_time, ESTAKING_LOCKED);

        // Calculate rewards earned
        let current_time = timestamp::now_seconds();
        let staking_duration = current_time - staking_data.stake_time;
        let annual_rewards = (staking_data.stake_amount * staking_data.reward_rate) / 10000; // Basis points
        let rewards_earned = (annual_rewards * staking_duration) / (365 * 24 * 60 * 60);

        // Update receipt to unstaked
        let receipt_data = table::borrow_mut(&mut platform_data.receipts, staking_data.token_address);
        receipt_data.is_staked = false;

        // Update platform statistics
        platform_data.total_staked_amount = platform_data.total_staked_amount - staking_data.stake_amount;

        // Mark staking as inactive
        staking_data.is_active = false;

        // Note: In production, transfer rewards here
        // coin::transfer<AptosCoin>(&resource_account_signer, staker_address, rewards_earned);
    }

    // Claim accumulated staking rewards without unstaking
    public entry fun claim_staking_rewards(
        staker: &signer,
        stake_id: u64,
    ) acquires PlatformData {
        let staker_address = signer::address_of(staker);
        let platform_data = borrow_global_mut<PlatformData>(@KisanKosh);
        
        assert!(table::contains(&platform_data.staking_positions, stake_id), ETOKEN_NOT_EXISTS);
        
        let staking_data = table::borrow(&platform_data.staking_positions, stake_id);
        assert!(staking_data.staker == staker_address, ENOT_OWNER);
        assert!(staking_data.is_active, ETOKEN_NOT_STAKED);

        // Calculate rewards earned so far
        let current_time = timestamp::now_seconds();
        let staking_duration = current_time - staking_data.stake_time;
        let annual_rewards = (staking_data.stake_amount * staking_data.reward_rate) / 10000; // Basis points
        let rewards_earned = (annual_rewards * staking_duration) / (365 * 24 * 60 * 60);

        // Note: In production, transfer rewards here
        // coin::transfer<AptosCoin>(&resource_account_signer, staker_address, rewards_earned);
    }

    // View functions
    #[view]
    public fun get_receipt_data(receipt_id: u64): CropReceiptData acquires PlatformData {
        let platform_data = borrow_global<PlatformData>(@KisanKosh);
        *table::borrow(&platform_data.receipts, receipt_id)
    }

    #[view]
    public fun get_loan_data(loan_id: u64): LoanData acquires PlatformData {
        let platform_data = borrow_global<PlatformData>(@KisanKosh);
        *table::borrow(&platform_data.loans, loan_id)
    }

    #[view]
    public fun get_staking_data(stake_id: u64): StakingData acquires PlatformData {
        let platform_data = borrow_global<PlatformData>(@KisanKosh);
        *table::borrow(&platform_data.staking_positions, stake_id)
    }

    #[view]
    public fun get_platform_stats(): (u64, u64, u64, u64) acquires PlatformData {
        let platform_data = borrow_global<PlatformData>(@KisanKosh);
        (
            platform_data.total_receipts_minted,
            platform_data.total_loans_issued,
            platform_data.total_amount_loaned,
            platform_data.total_staked_amount
        )
    }

    #[view]
    public fun calculate_loan_eligibility(market_value: u64): u64 {
        (market_value * LOAN_TO_VALUE_RATIO) / 100
    }

    #[view]
    public fun calculate_loan_interest(principal: u64, duration_days: u64): u64 {
        let annual_interest = (principal * LOAN_INTEREST_RATE) / 100;
        (annual_interest * duration_days) / 365
    }

    #[view]
    public fun calculate_staking_rewards(staked_amount: u64, staking_days: u64): u64 {
        let annual_rewards = (staked_amount * STAKING_REWARD_RATE) / 100;
        (annual_rewards * staking_days) / 365
    }
}