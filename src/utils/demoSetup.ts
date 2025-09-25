// Demo Setup Script for KisanKosh Presentation
// This script initializes realistic demonstration data for the judges

import { DEMO_CROP_DATA, DEMO_MARKET_DATA, DEMO_ANALYTICS, IPFSStorage } from './ipfsDatabase';

export class DemoSetup {
  
  // Initialize all demo data for presentation
  static async initializeDemoEnvironment(): Promise<DemoState> {
    console.log("🚀 Initializing KisanKosh Demo Environment...");
    
    const demoState: DemoState = {
      farmers: [],
      crops: [],
      transactions: [],
      marketData: DEMO_MARKET_DATA,
      platformStats: DEMO_ANALYTICS.platformStats,
      isLiveDemo: true,
      demoStartTime: new Date().toISOString()
    };

    // Setup farmer profiles
    demoState.farmers = [
      {
        id: "FARMER001",
        name: "Rajesh Kumar",
        walletAddress: "0x47e217b930dc33de69987ac3e780fbf90f5059dbd098136300c40382376e295b",
        location: "Punjab, India",
        totalAssetValue: 425000,
        activeCrops: 3,
        totalLoans: 2,
        stakingRewards: 12450,
        joinDate: "2024-03-15",
        verificationLevel: "KYC Verified",
        creditScore: 785
      },
      {
        id: "FARMER002", 
        name: "Priya Sharma",
        walletAddress: "0xa7d149f820c2b6458f7a8b319c4d8f7e6b2a1e5c9d3f8a2b4c7e9f1a3b5c7d9e",
        location: "Haryana, India",
        totalAssetValue: 312000,
        activeCrops: 2,
        totalLoans: 1,
        stakingRewards: 8750,
        joinDate: "2024-05-20",
        verificationLevel: "KYC Verified",
        creditScore: 742
      },
      {
        id: "FARMER003",
        name: "Suresh Patel", 
        walletAddress: "0xc9f2a8b5e7d4f1a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5",
        location: "Maharashtra, India",
        totalAssetValue: 578000,
        activeCrops: 4,
        totalLoans: 3,
        stakingRewards: 15200,
        joinDate: "2024-01-10",
        verificationLevel: "Premium Verified",
        creditScore: 821
      }
    ];

    // Setup realistic crop data with IPFS integration
    for (let i = 0; i < DEMO_CROP_DATA.length; i++) {
      const cropData = DEMO_CROP_DATA[i];
      
      demoState.crops.push({
        ...cropData,
        nftId: `KK-NFT-${String(i + 1).padStart(4, '0')}`,
        currentStatus: i === 0 ? 'STAKED' : i === 1 ? 'LOAN_ACTIVE' : 'AVAILABLE',
        marketPrice: this.getCurrentMarketPrice(cropData.cropType),
        loanEligibleAmount: Math.floor(cropData.quantity * this.getCurrentMarketPrice(cropData.cropType) * 0.75),
        stakingRewards: i === 0 ? 2340 : 0,
        lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    console.log("✅ Demo environment initialized successfully");
    return demoState;
  }

  // Get current market price for crop type
  static getCurrentMarketPrice(cropType: string): number {
    const marketData = DEMO_MARKET_DATA.find(data => data.cropType === cropType);
    return marketData?.currentPrice || 2500;
  }

  // Simulate live transaction for demo
  static async simulateTransaction(type: TransactionType, cropId?: string): Promise<Transaction> {
    console.log(`🔄 Simulating ${type} transaction...`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    const transaction: Transaction = {
      id: `TXN-${Date.now()}`,
      type,
      timestamp: new Date().toISOString(),
      status: 'CONFIRMED',
      gasUsed: Math.floor(5000 + Math.random() * 10000),
      blockNumber: Math.floor(430000000 + Math.random() * 100000),
      hash: this.generateMockTxHash(),
      details: this.getTransactionDetails(type, cropId)
    };

    console.log(`✅ Transaction ${transaction.id} completed`);
    return transaction;
  }

  // Generate mock transaction hash
  static generateMockTxHash(): string {
    return '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  }

  // Get transaction details based on type
  static getTransactionDetails(type: TransactionType, cropId?: string): any {
    switch(type) {
      case 'MINT_NFT':
        return {
          cropType: 'Rice - Basmati 1121',
          quantity: 2500,
          farmer: 'Rajesh Kumar',
          warehouse: 'Punjab Agro Storage Ltd',
          ipfsHash: DEMO_CROP_DATA[0].photos[0]
        };
      
      case 'TAKE_LOAN':
        return {
          loanAmount: 150000,
          interestRate: 12,
          duration: 180,
          collateralValue: 200000,
          ltv: 75
        };
      
      case 'STAKE':
        return {
          stakingAmount: 200000,
          duration: 365,
          expectedRewards: 30000,
          apy: 15.2
        };
      
      case 'REPAY_LOAN':
        return {
          principalAmount: 150000,
          interestPaid: 9000,
          totalRepaid: 159000,
          earlyRepayment: true
        };
      
      default:
        return {};
    }
  }

  // Update market prices for live demo effect
  static updateMarketPrices(): void {
    DEMO_MARKET_DATA.forEach(market => {
      const volatility = 0.02; // 2% price volatility
      const change = (Math.random() - 0.5) * 2 * volatility;
      const newPrice = Math.floor(market.currentPrice * (1 + change));
      
      // Update price history
      market.priceHistory.push({
        date: new Date().toISOString().split('T')[0],
        price: newPrice,
        volume: Math.floor(10000 + Math.random() * 20000)
      });
      
      // Keep only last 10 price points
      if (market.priceHistory.length > 10) {
        market.priceHistory = market.priceHistory.slice(-10);
      }
      
      market.currentPrice = newPrice;
    });
  }

  // Generate live activity feed
  static generateLiveActivity(): ActivityItem {
    const activities = [
      {
        type: 'NFT_MINT',
        icon: '📄',
        title: 'New Crop Receipt',
        description: 'Wheat - 1800kg deposited by Priya Sharma',
        color: 'text-blue-400'
      },
      {
        type: 'LOAN_APPROVED',
        icon: '💰', 
        title: 'Loan Approved',
        description: '₹1.35L disbursed against Rice collateral',
        color: 'text-green-400'
      },
      {
        type: 'STAKING_REWARD',
        icon: '🌱',
        title: 'Staking Rewards',
        description: '₹234 earned from Sugarcane staking',
        color: 'text-purple-400'
      },
      {
        type: 'PRICE_UPDATE',
        icon: '📊',
        title: 'Price Update', 
        description: 'Rice price updated: ₹2,865/quintal (+0.5%)',
        color: 'text-cyan-400'
      }
    ];

    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    return {
      ...randomActivity,
      timestamp: new Date().toISOString(),
      id: `ACT-${Date.now()}`
    };
  }
}

// TypeScript interfaces for demo data
export interface DemoState {
  farmers: FarmerProfile[];
  crops: CropRecord[];
  transactions: Transaction[];
  marketData: typeof DEMO_MARKET_DATA;
  platformStats: typeof DEMO_ANALYTICS.platformStats;
  isLiveDemo: boolean;
  demoStartTime: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  walletAddress: string;
  location: string;
  totalAssetValue: number;
  activeCrops: number;
  totalLoans: number;
  stakingRewards: number;
  joinDate: string;
  verificationLevel: string;
  creditScore: number;
}

export interface CropRecord {
  farmerId: string;
  farmerName: string;
  cropType: string;
  variety: string;
  quantity: number;
  nftId: string;
  currentStatus: 'AVAILABLE' | 'STAKED' | 'LOAN_ACTIVE';
  marketPrice: number;
  loanEligibleAmount: number;
  stakingRewards: number;
  lastActivity: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  gasUsed: number;
  blockNumber: number;
  hash: string;
  details: any;
}

export interface ActivityItem {
  id: string;
  type: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  timestamp: string;
}

export type TransactionType = 'MINT_NFT' | 'TAKE_LOAN' | 'REPAY_LOAN' | 'STAKE' | 'UNSTAKE' | 'CLAIM_REWARDS';

// Export demo controller for easy access
export default DemoSetup;