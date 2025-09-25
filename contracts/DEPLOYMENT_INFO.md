# KisanKosh Smart Contracts - Deployment Information

## Successfully Deployed to Aptos Devnet! 🎉

### Contract Address
```
0x47e217b930dc33de69987ac3e780fbf90f5059dbd098136300c40382376e295b
```

### Transaction Details
- **Transaction Hash**: `0xb8ce168202d1378cf045073b14e49b75824fe52d53b09c1db4ce7b54a70ef111`
- **Network**: Aptos Devnet
- **Gas Used**: 9,646 Octas
- **Status**: Successfully Executed ✅
- **Explorer Link**: https://explorer.aptoslabs.com/txn/0xb8ce168202d1378cf045073b14e49b75824fe52d53b09c1db4ce7b54a70ef111?network=devnet

### Deployed Modules

#### 1. Crop Receipt NFT Contract (`crop_receipt_nft`)
**Purpose**: Main DeFi contract for agricultural finance
- **Functions**:
  - `mint_crop_receipt` - Create NFT receipts for crop deposits
  - `take_loan` - Borrow against crop receipts as collateral
  - `repay_loan` - Repay loans and unlock receipts
  - `stake_receipt` - Stake receipts to earn rewards
  - `unstake_receipt` - Unstake and claim rewards
  - `claim_staking_rewards` - Claim rewards without unstaking

**Key Features**:
- ✅ NFT Receipt System - Digital crop storage certificates
- ✅ Collateralized Lending - Take loans up to 75% LTV
- ✅ Yield Farming - Stake receipts for up to 15% APY
- ✅ Risk Management - Interest rates and penalties
- ✅ Platform Statistics - Track total volume and usage

#### 2. Price Oracle Contract (`price_oracle`)
**Purpose**: Decentralized price feeds for crop valuation
- **Functions**:
  - `add_authorized_updater` - Add price feed providers
  - `update_crop_price` - Update market prices
  - `get_crop_price` - Retrieve current market prices
  - `get_price_history` - View historical price data

**Key Features**:
- ✅ Multi-source Price Feeds - Authorized updaters system
- ✅ Price Validation - Freshness and authenticity checks
- ✅ Historical Data - Track price movements over time
- ✅ Decentralized Oracle - Community-driven price discovery

#### 3. Governance Contract (`governance`)
**Purpose**: DAO governance for platform parameters
- **Functions**:
  - `create_proposal` - Submit governance proposals
  - `vote_on_proposal` - Vote on active proposals
  - `execute_proposal` - Execute approved proposals
  - `delegate_voting_power` - Delegate governance tokens

**Key Features**:
- ✅ Proposal System - Community-driven decision making
- ✅ Token-based Voting - Weighted by governance token holdings
- ✅ Time-locked Execution - Security through delays
- ✅ Delegation Support - Liquid democracy features

### Integration with Frontend

The deployed contracts are ready for frontend integration. Key integration points:

1. **Contract Address**: `0x47e217b930dc33de69987ac3e780fbf90f5059dbd098136300c40382376e295b`
2. **Network**: Aptos Devnet
3. **Module Names**: 
   - `KisanKosh::crop_receipt_nft`
   - `KisanKosh::price_oracle` 
   - `KisanKosh::governance`

### Next Steps for Integration

1. **Connect Wallet**: Integrate Aptos wallet (Petra, Martian, etc.)
2. **Contract Interaction**: Use `@aptos-labs/ts-sdk` for transactions
3. **View Functions**: Call read-only functions for data display
4. **Transaction Functions**: Execute mint, loan, stake operations
5. **Event Listening**: Monitor blockchain events for real-time updates

### Development Environment

- **Aptos CLI**: v7.8.1
- **Framework**: AptosFramework (latest)
- **Language**: Move
- **Network**: Devnet (for testing)

Ready for production deployment on Aptos Mainnet when testing is complete! 🚀