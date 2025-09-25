module KisanKosh::governance {
    use std::signer;
    use std::string::String;
    use std::vector;
    use aptos_framework::timestamp;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::account;
    use aptos_std::table::{Self, Table};

    // Error codes
    const EPROPOSAL_NOT_FOUND: u64 = 1;
    const EPROPOSAL_EXPIRED: u64 = 2;
    const EALREADY_VOTED: u64 = 3;
    const EINSUFFICIENT_VOTING_POWER: u64 = 4;
    const EPROPOSAL_NOT_EXECUTABLE: u64 = 5;
    const EUNAUTHORIZED: u64 = 6;

    // Constants
    const PROPOSAL_DURATION: u64 = 604800; // 7 days in seconds
    const MIN_VOTING_POWER: u64 = 1000; // Minimum tokens to create proposal
    const EXECUTION_DELAY: u64 = 172800; // 2 days delay after voting ends

    struct Proposal has store, copy, drop {
        id: u64,
        title: String,
        description: String,
        proposer: address,
        created_at: u64,
        voting_ends_at: u64,
        execution_eta: u64,
        yes_votes: u64,
        no_votes: u64,
        executed: bool,
        proposal_type: u8, // 1: Parameter change, 2: Emergency action, 3: Upgrade
    }

    struct Vote has store, copy, drop {
        voter: address,
        proposal_id: u64,
        support: bool, // true for yes, false for no
        voting_power: u64,
        timestamp: u64,
    }

    struct GovernanceData has key {
        admin: address,
        proposal_count: u64,
        proposals: Table<u64, Proposal>,
        votes: Table<u64, vector<Vote>>, // proposal_id -> votes
        voting_token_balance: Table<address, u64>, // User staking balances for voting
    }

    // Initialize governance
    fun init_module(admin: &signer) {
        let admin_address = signer::address_of(admin);
        
        move_to(admin, GovernanceData {
            admin: admin_address,
            proposal_count: 0,
            proposals: table::new(),
            votes: table::new(),
            voting_token_balance: table::new(),
        });
    }

    // Create a new governance proposal
    public entry fun create_proposal(
        proposer: &signer,
        title: String,
        description: String,
        proposal_type: u8,
    ) acquires GovernanceData {
        let proposer_address = signer::address_of(proposer);
        let governance = borrow_global_mut<GovernanceData>(@KisanKosh);
        
        // Check voting power requirement
        let voting_power = 1000; // Simplified: assume minimum voting power for now
        assert!(voting_power >= MIN_VOTING_POWER, EINSUFFICIENT_VOTING_POWER);

        let current_time = timestamp::now_seconds();
        let voting_ends_at = current_time + PROPOSAL_DURATION;
        let execution_eta = voting_ends_at + EXECUTION_DELAY;

        governance.proposal_count = governance.proposal_count + 1;
        let proposal_id = governance.proposal_count;

        let proposal = Proposal {
            id: proposal_id,
            title,
            description,
            proposer: proposer_address,
            created_at: current_time,
            voting_ends_at,
            execution_eta,
            yes_votes: 0,
            no_votes: 0,
            executed: false,
            proposal_type,
        };

        table::add(&mut governance.proposals, proposal_id, proposal);
        table::add(&mut governance.votes, proposal_id, vector::empty<Vote>());
    }

    // Vote on a proposal
    public entry fun vote_on_proposal(
        voter: &signer,
        proposal_id: u64,
        support: bool, // true for yes, false for no
    ) acquires GovernanceData {
        let voter_address = signer::address_of(voter);
        let governance = borrow_global_mut<GovernanceData>(@KisanKosh);
        
        assert!(table::contains(&governance.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        
        let proposal = table::borrow_mut(&mut governance.proposals, proposal_id);
        assert!(timestamp::now_seconds() <= proposal.voting_ends_at, EPROPOSAL_EXPIRED);

        // Check if user already voted
        let votes = table::borrow(&governance.votes, proposal_id);
        let i = 0;
        let len = vector::length(votes);
        while (i < len) {
            let vote = vector::borrow(votes, i);
            assert!(vote.voter != voter_address, EALREADY_VOTED);
            i = i + 1;
        };

        let voting_power = 1000; // Simplified: assume voting power for now
        assert!(voting_power > 0, EINSUFFICIENT_VOTING_POWER);

        // Create and store vote
        let vote = Vote {
            voter: voter_address,
            proposal_id,
            support,
            voting_power,
            timestamp: timestamp::now_seconds(),
        };

        let votes_mut = table::borrow_mut(&mut governance.votes, proposal_id);
        vector::push_back(votes_mut, vote);

        // Update proposal vote counts
        if (support) {
            proposal.yes_votes = proposal.yes_votes + voting_power;
        } else {
            proposal.no_votes = proposal.no_votes + voting_power;
        };
    }

    // Execute a passed proposal
    public entry fun execute_proposal(
        executor: &signer,
        proposal_id: u64,
    ) acquires GovernanceData {
        let governance = borrow_global_mut<GovernanceData>(@KisanKosh);
        
        assert!(table::contains(&governance.proposals, proposal_id), EPROPOSAL_NOT_FOUND);
        
        let proposal = table::borrow_mut(&mut governance.proposals, proposal_id);
        let current_time = timestamp::now_seconds();
        
        // Check if proposal can be executed
        assert!(current_time >= proposal.execution_eta, EPROPOSAL_NOT_EXECUTABLE);
        assert!(!proposal.executed, EPROPOSAL_NOT_EXECUTABLE);
        assert!(proposal.yes_votes > proposal.no_votes, EPROPOSAL_NOT_EXECUTABLE);

        // Mark as executed
        proposal.executed = true;

        // Note: Actual execution logic would be implemented based on proposal type
        // This is a placeholder for the execution framework
    }

    // Delegate voting power (staking mechanism)
    public entry fun delegate_voting_power(
        user: &signer,
        amount: u64,
    ) acquires GovernanceData {
        let user_address = signer::address_of(user);
        let governance = borrow_global_mut<GovernanceData>(@KisanKosh);

        // Transfer tokens to governance contract (staking)
        coin::transfer<AptosCoin>(user, @KisanKosh, amount);

        // Update voting balance
        if (table::contains(&governance.voting_token_balance, user_address)) {
            let current_balance = table::borrow_mut(&mut governance.voting_token_balance, user_address);
            *current_balance = *current_balance + amount;
        } else {
            table::add(&mut governance.voting_token_balance, user_address, amount);
        };
    }

    // Withdraw delegated tokens
    public entry fun withdraw_voting_power(
        user: &signer,
        amount: u64,
    ) acquires GovernanceData {
        let user_address = signer::address_of(user);
        let governance = borrow_global_mut<GovernanceData>(@KisanKosh);

        assert!(table::contains(&governance.voting_token_balance, user_address), EINSUFFICIENT_VOTING_POWER);
        
        let current_balance = table::borrow_mut(&mut governance.voting_token_balance, user_address);
        assert!(*current_balance >= amount, EINSUFFICIENT_VOTING_POWER);

        // Update balance
        *current_balance = *current_balance - amount;

        // Transfer tokens back to user
        // Note: In production, this would use proper resource account signers
        // coin::transfer<AptosCoin>(&resource_account_signer, user_address, amount);
    }

    // View functions
    #[view]
    public fun get_proposal(proposal_id: u64): Proposal acquires GovernanceData {
        let governance = borrow_global<GovernanceData>(@KisanKosh);
        *table::borrow(&governance.proposals, proposal_id)
    }

    #[view]
    public fun get_voting_power(user: address): u64 acquires GovernanceData {
        let governance = borrow_global<GovernanceData>(@KisanKosh);
        if (table::contains(&governance.voting_token_balance, user)) {
            *table::borrow(&governance.voting_token_balance, user)
        } else {
            0
        }
    }

    #[view]
    public fun get_proposal_votes(proposal_id: u64): vector<Vote> acquires GovernanceData {
        let governance = borrow_global<GovernanceData>(@KisanKosh);
        *table::borrow(&governance.votes, proposal_id)
    }

    #[view]
    public fun get_proposal_result(proposal_id: u64): (bool, u64, u64) acquires GovernanceData {
        let governance = borrow_global<GovernanceData>(@KisanKosh);
        let proposal = table::borrow(&governance.proposals, proposal_id);
        (proposal.yes_votes > proposal.no_votes, proposal.yes_votes, proposal.no_votes)
    }
}