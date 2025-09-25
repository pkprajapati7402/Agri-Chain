#!/bin/bash
# KisanKosh Smart Contract Deployment Script
# This script compiles and deploys the Move contracts to Aptos

set -e

echo "🚀 KisanKosh Smart Contract Deployment Script"
echo "=============================================="

# Configuration
CONTRACT_ADDRESS="0x47e217b930dc33de69987ac3e780fbf90f5059dbd098136300c40382376e295b"
NETWORK="devnet"

echo "📍 Contract Address: $CONTRACT_ADDRESS"
echo "🌐 Network: $NETWORK"
echo ""

# Check if Aptos CLI is installed
if ! command -v aptos &> /dev/null; then
    echo "❌ Aptos CLI is not installed. Please install it first."
    echo "   Visit: https://aptos.dev/tools/aptos-cli/"
    exit 1
fi

echo "✅ Aptos CLI found: $(aptos --version)"

# Check if we're in the contracts directory
if [ ! -f "Move.toml" ]; then
    echo "❌ Move.toml not found. Please run this script from the contracts directory."
    exit 1
fi

echo "✅ Move.toml found"

# Compile the contracts
echo ""
echo "🔨 Compiling Move contracts..."
if aptos move compile --named-addresses KisanKosh=$CONTRACT_ADDRESS; then
    echo "✅ Compilation successful"
else
    echo "❌ Compilation failed"
    exit 1
fi

# Deploy the contracts (optional - only if user confirms)
echo ""
read -p "🚀 Deploy to $NETWORK? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying to Aptos $NETWORK..."
    
    if aptos move publish --named-addresses KisanKosh=$CONTRACT_ADDRESS --profile default; then
        echo ""
        echo "🎉 Deployment successful!"
        echo "📱 View on Explorer: https://explorer.aptoslabs.com/account/$CONTRACT_ADDRESS?network=$NETWORK"
        echo ""
        echo "📋 Integration Information:"
        echo "   Contract Address: $CONTRACT_ADDRESS"
        echo "   Network: $NETWORK"
        echo "   Modules:"
        echo "     - KisanKosh::crop_receipt_nft"
        echo "     - KisanKosh::price_oracle" 
        echo "     - KisanKosh::governance"
    else
        echo "❌ Deployment failed"
        exit 1
    fi
else
    echo "⏹️  Deployment skipped"
    echo "   Run with 'aptos move publish --named-addresses KisanKosh=$CONTRACT_ADDRESS' to deploy manually"
fi

echo ""
echo "🏁 Script completed successfully!"
