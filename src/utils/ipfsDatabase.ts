// IPFS Database Integration for KisanKosh
// This module handles storing and retrieving agricultural data on IPFS
// Demo Implementation - Ready for Production IPFS Integration

// IPFS Configuration for Production
const IPFS_CONFIG = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  gateway: 'https://gateway.pinata.cloud/ipfs/',
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Demo token - Replace with actual Infura/Pinata key
  }
};

// Demo IPFS Client - Simulates real IPFS operations
class DemoIPFSClient {
  async add(data: string | File): Promise<{ path: string }> {
    // Generate realistic IPFS hash for demo
    const hash = this.generateIPFSHash();
    console.log(`[DEMO] Storing data on IPFS: ${hash}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { path: hash };
  }

  async *cat(hash: string): AsyncGenerator<Uint8Array> {
    console.log(`[DEMO] Retrieving data from IPFS: ${hash}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return demo data as Uint8Array
    const demoData = JSON.stringify(DEMO_CROP_DATA[0]);
    yield new TextEncoder().encode(demoData);
  }

  generateIPFSHash(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'Qm';
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Initialize IPFS client (demo version for presentation)
const ipfs = new DemoIPFSClient();

// Utility function to generate realistic IPFS hashes
export function generateIPFSHash(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'Qm';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Agricultural Data Types
export interface CropData {
  farmerId: string;
  farmerName: string;
  cropType: string;
  variety: string;
  quantity: number;
  qualityGrade: string;
  harvestDate: string;
  location: {
    state: string;
    district: string;
    village: string;
    coordinates: { lat: number; lng: number };
  };
  warehouseDetails: {
    name: string;
    license: string;
    storageConditions: string;
  };
  certifications: string[];
  photos: string[];
  soilTestReport: string;
  weatherData: WeatherData;
  blockchainTxHash: string;
}

export interface WeatherData {
  temperature: { min: number; max: number };
  humidity: number;
  rainfall: number;
  season: string;
}

export interface MarketData {
  cropType: string;
  currentPrice: number;
  priceHistory: PricePoint[];
  demandForecast: number;
  marketTrends: string[];
}

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

// Demo Data - Realistic Values
export const DEMO_CROP_DATA: CropData[] = [
  {
    farmerId: "FARMER001",
    farmerName: "Rajesh Kumar",
    cropType: "Rice",
    variety: "Basmati 1121",
    quantity: 2500,
    qualityGrade: "Grade A",
    harvestDate: "2025-09-15",
    location: {
      state: "Punjab",
      district: "Amritsar", 
      village: "Khalsa Nagar",
      coordinates: { lat: 31.6340, lng: 74.8723 }
    },
    warehouseDetails: {
      name: "Punjab Agro Storage Ltd",
      license: "WHL/PB/2024/001",
      storageConditions: "Temperature controlled, Humidity <14%"
    },
    certifications: ["Organic Certified", "Fair Trade", "Quality Assured"],
    photos: [
      "QmXgqKTbzdh83pQdkiUTrKk2JVBNjjc2YEmBo4fbcr93zQ", // IPFS hash for crop photo
      "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o"  // IPFS hash for storage photo
    ],
    soilTestReport: "QmZrAVgMqxCyrQc2xf9xjApctWnt7sDa7dMkCdgQri8ccD",
    weatherData: {
      temperature: { min: 18, max: 32 },
      humidity: 65,
      rainfall: 45.2,
      season: "Kharif"
    },
    blockchainTxHash: "0xb8ce168202d1378cf045073b14e49b75824fe52d53b09c1db4ce7b54a70ef111"
  },
  {
    farmerId: "FARMER002", 
    farmerName: "Priya Sharma",
    cropType: "Wheat",
    variety: "HD-3086",
    quantity: 1800,
    qualityGrade: "Grade B+",
    harvestDate: "2025-09-10",
    location: {
      state: "Haryana",
      district: "Karnal",
      village: "Green Fields",
      coordinates: { lat: 29.6857, lng: 76.9905 }
    },
    warehouseDetails: {
      name: "Haryana Food Corporation",
      license: "WHL/HR/2024/023",
      storageConditions: "Moisture content <12%, Pest free"
    },
    certifications: ["FPO Certified", "Government Approved"],
    photos: [
      "QmPZ9gcdhVUrX4wEg2E92P3TdJdVtNWuZBZXMr8KW5gDi6",
      "QmRz9AcqF8XYj2LpvM3ZhS6k4TuE8oNjGfP2mW1QvB7KzC"
    ],
    soilTestReport: "QmThGjE9mR2pLfN8qV7xYsM4nK6jP1oWzB5cA3uH9iD2eF",
    weatherData: {
      temperature: { min: 15, max: 28 },
      humidity: 58,
      rainfall: 32.8,
      season: "Rabi"
    },
    blockchainTxHash: "0xa7d149f820c2b6458f7a8b319c4d8f7e6b2a1e5c9d3f8a2b4c7e9f1a3b5c7d9e"
  },
  {
    farmerId: "FARMER003",
    farmerName: "Suresh Patel",
    cropType: "Sugarcane", 
    variety: "Co 86032",
    quantity: 4200,
    qualityGrade: "Premium",
    harvestDate: "2025-09-20",
    location: {
      state: "Maharashtra",
      district: "Pune",
      village: "Sugar Valley",
      coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    warehouseDetails: {
      name: "Maharashtra Sugar Mills",
      license: "WHL/MH/2024/078",
      storageConditions: "Open yard storage, Covered from rain"
    },
    certifications: ["Sugar Mill Approved", "Quality Tested"],
    photos: [
      "QmUjV8kL2nP5hS9wE7tY4mR6oA1bC3xD8fG2hJ5kN9qW2X",
      "QmVwX9nM4sQ8hR7kF2dG5lP6oT3bY8cZ1eH4jK7nP9sU5V"
    ],
    soilTestReport: "QmWzY2oP9tR8mN5kH4fD6lS7pX3cV1gJ2eK5nM8qT4wZ9Y",
    weatherData: {
      temperature: { min: 22, max: 35 },
      humidity: 72,
      rainfall: 68.5,
      season: "Monsoon"
    },
    blockchainTxHash: "0xc9f2a8b5e7d4f1a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5a8b"
  }
];

export const DEMO_MARKET_DATA: MarketData[] = [
  {
    cropType: "Rice",
    currentPrice: 2850,
    priceHistory: [
      { date: "2025-09-01", price: 2780, volume: 15420 },
      { date: "2025-09-05", price: 2810, volume: 18360 },
      { date: "2025-09-10", price: 2835, volume: 21240 },
      { date: "2025-09-15", price: 2850, volume: 19870 },
      { date: "2025-09-20", price: 2865, volume: 22150 },
      { date: "2025-09-25", price: 2850, volume: 17930 }
    ],
    demandForecast: 85,
    marketTrends: ["High demand due to festival season", "Export opportunities to Middle East", "Good quality fetching premium"]
  },
  {
    cropType: "Wheat", 
    currentPrice: 2150,
    priceHistory: [
      { date: "2025-09-01", price: 2100, volume: 24580 },
      { date: "2025-09-05", price: 2120, volume: 26740 },
      { date: "2025-09-10", price: 2135, volume: 29160 },
      { date: "2025-09-15", price: 2145, volume: 31250 },
      { date: "2025-09-20", price: 2160, volume: 28890 },
      { date: "2025-09-25", price: 2150, volume: 25670 }
    ],
    demandForecast: 78,
    marketTrends: ["Steady demand from flour mills", "Government procurement active", "International prices supportive"]
  },
  {
    cropType: "Sugarcane",
    currentPrice: 3200,
    priceHistory: [
      { date: "2025-09-01", price: 3150, volume: 8940 },
      { date: "2025-09-05", price: 3170, volume: 9820 },
      { date: "2025-09-10", price: 3185, volume: 10560 },
      { date: "2025-09-15", price: 3195, volume: 11200 },
      { date: "2025-09-20", price: 3210, volume: 12350 },
      { date: "2025-09-25", price: 3200, volume: 10890 }
    ],
    demandForecast: 92,
    marketTrends: ["Sugar mills increasing procurement", "Ethanol demand boosting prices", "Good sucrose content commanding premium"]
  }
];

// IPFS Storage Functions
export class IPFSStorage {
  
  // Store crop data on IPFS
  static async storeCropData(cropData: CropData): Promise<string> {
    try {
      console.log('📁 Storing crop data on IPFS...');
      const result = await ipfs.add(JSON.stringify(cropData));
      console.log(`✅ Crop data stored successfully: ${result.path}`);
      return result.path;
    } catch (error) {
      console.error('❌ Error storing crop data:', error);
      // Return realistic demo hash for presentation
      return "QmYjtig7VJQ6XsnUjqqJvj7QaMcCAwtrgNdahSiFofrE7o";
    }
  }

  // Retrieve crop data from IPFS
  static async getCropData(hash: string): Promise<CropData | null> {
    try {
      console.log(`📥 Retrieving crop data from IPFS: ${hash}`);
      const chunks = [];
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk);
      }
      
      // Handle both Node.js Buffer and browser Uint8Array
      let data: string;
      if (typeof Buffer !== 'undefined') {
        data = Buffer.concat(chunks as Buffer[]).toString();
      } else {
        // Browser environment
        const decoder = new TextDecoder();
        data = decoder.decode(chunks[0] as Uint8Array);
      }
      
      console.log('✅ Crop data retrieved successfully');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Error retrieving crop data:', error);
      // Return demo data for presentation
      return DEMO_CROP_DATA[Math.floor(Math.random() * DEMO_CROP_DATA.length)];
    }
  }

  // Store document (soil reports, certificates, etc.)
  static async storeDocument(file: File): Promise<string> {
    try {
      console.log(`📄 Storing document on IPFS: ${file.name}`);
      const result = await ipfs.add(file);
      console.log(`✅ Document stored successfully: ${result.path}`);
      return result.path;
    } catch (error) {
      console.error('❌ Error storing document:', error);
      return "QmZrAVgMqxCyrQc2xf9xjApctWnt7sDa7dMkCdgQri8ccD";
    }
  }

  // Store image/photo
  static async storeImage(imageFile: File): Promise<string> {
    try {
      console.log(`🖼️ Storing image on IPFS: ${imageFile.name}`);
      const result = await ipfs.add(imageFile);
      console.log(`✅ Image stored successfully: ${result.path}`);
      return result.path;
    } catch (error) {
      console.error('❌ Error storing image:', error);
      return "QmXgqKTbzdh83pQdkiUTrKk2JVBNjjc2YEmBo4fbcr93zQ";
    }
  }

  // Get IPFS gateway URL for display
  static getGatewayUrl(hash: string): string {
    return `${IPFS_CONFIG.gateway}${hash}`;
  }

  // Get IPFS network statistics (for demo dashboard)
  static async getNetworkStats(): Promise<{
    filesStored: number;
    totalSize: string;
    networkNodes: number;
    uploadSpeed: string;
  }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      filesStored: 1247 + Math.floor(Math.random() * 50),
      totalSize: "2.8 GB",
      networkNodes: 4567 + Math.floor(Math.random() * 100),
      uploadSpeed: `${(15.2 + Math.random() * 5).toFixed(1)} MB/s`
    };
  }

  // Simulate file upload with progress (for demo)
  static async simulateUpload(
    fileName: string, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    console.log(`🚀 Starting IPFS upload: ${fileName}`);
    
    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 150));
      onProgress?.(progress);
    }
    
    // Generate realistic hash
    const hash = generateIPFSHash();
    console.log(`✅ Upload completed: ${hash}`);
    return hash;
  }
}

// Blockchain Integration
export class BlockchainIntegration {
  
  static async mintNFTReceipt(cropData: CropData): Promise<string> {
    // Store metadata on IPFS first
    const ipfsHash = await IPFSStorage.storeCropData(cropData);
    
    // Simulate blockchain transaction (in real implementation, call smart contract)
    console.log("Minting NFT Receipt with IPFS metadata:", ipfsHash);
    
    // Return demo transaction hash
    return "0xb8ce168202d1378cf045073b14e49b75824fe52d53b09c1db4ce7b54a70ef111";
  }

  static async takeLoan(receiptId: string, loanAmount: number): Promise<string> {
    console.log(`Taking loan of ₹${loanAmount} against receipt ${receiptId}`);
    return "0xa7d149f820c2b6458f7a8b319c4d8f7e6b2a1e5c9d3f8a2b4c7e9f1a3b5c7d9e";
  }

  static async stakeReceipt(receiptId: string, stakeDuration: number): Promise<string> {
    console.log(`Staking receipt ${receiptId} for ${stakeDuration} days`);
    return "0xc9f2a8b5e7d4f1a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5";
  }

  static async repayLoan(loanId: string, repaymentAmount: number): Promise<string> {
    console.log(`Repaying loan ${loanId} with amount ₹${repaymentAmount}`);
    // Simulate blockchain transaction for loan repayment
    const txHash = "0xd8f3c7b2a9e6f1d4c7b0a3f6e9c2f5a8b1d4e7f0a3b6c9e2f5a8b1d4e7f0a3b6";
    
    // Simulate updating loan status on blockchain
    console.log(`✅ Loan repaid successfully. Transaction: ${txHash}`);
    console.log(`📋 Loan status updated to 'REPAID' on blockchain`);
    console.log(`🔓 Receipt NFT unlocked and returned to farmer`);
    
    return txHash;
  }
}

// Demo Analytics Data
export const DEMO_ANALYTICS = {
  platformStats: {
    totalFarmers: 12567,
    totalCrops: 45890,
    totalValueLocked: "₹48.7 Cr",
    totalLoansIssued: 3456,
    averageLoanAmount: "₹2.3L",
    stakingAPY: "15.2%"
  },
  recentTransactions: [
    {
      id: "TXN001",
      type: "NFT Mint",
      farmer: "Rajesh Kumar", 
      crop: "Rice - 2500kg",
      timestamp: "2025-09-25T10:30:00Z",
      status: "Confirmed"
    },
    {
      id: "TXN002", 
      type: "Loan Taken",
      farmer: "Priya Sharma",
      amount: "₹1.35L",
      timestamp: "2025-09-25T09:15:00Z",
      status: "Confirmed"
    },
    {
      id: "TXN003",
      type: "Staking",
      farmer: "Suresh Patel",
      crop: "Sugarcane - 4200kg", 
      timestamp: "2025-09-25T08:45:00Z",
      status: "Confirmed"
    }
  ]
};

export default {
  IPFSStorage,
  BlockchainIntegration,
  DEMO_CROP_DATA,
  DEMO_MARKET_DATA,
  DEMO_ANALYTICS
};