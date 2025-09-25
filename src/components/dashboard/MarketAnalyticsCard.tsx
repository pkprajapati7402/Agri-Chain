"use client";

import { useState, useEffect } from "react";
import { DEMO_MARKET_DATA, DEMO_ANALYTICS } from "@/utils/ipfsDatabase";

export function MarketAnalyticsCard() {
  const [selectedCrop, setSelectedCrop] = useState(0);
  const [liveDataUpdate, setLiveDataUpdate] = useState(false);
  const [showBlockchainStatus, setShowBlockchainStatus] = useState(false);

  // Simulate live data updates for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveDataUpdate(true);
      setTimeout(() => setLiveDataUpdate(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentCropData = DEMO_MARKET_DATA[selectedCrop];
  const latestPrice = currentCropData.priceHistory[currentCropData.priceHistory.length - 1];

  const blockchainStats = {
    networkStatus: "ONLINE",
    lastBlockTime: "12 seconds ago",
    gasPrice: "0.000125 APT",
    activeNodes: 847,
    totalTransactions: "2,456,789"
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-400/15 rounded-full blur-xl animate-pulse animation-delay-300"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Live Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/20 rounded-full p-3">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Market Analytics</h3>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${liveDataUpdate ? 'bg-green-400' : 'bg-green-500'} animate-pulse`}></div>
                <p className="text-blue-300 text-sm">Live Data</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowBlockchainStatus(!showBlockchainStatus)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span className="text-xl">⛓️</span>
          </button>
        </div>

        {/* Crop Selector */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {DEMO_MARKET_DATA.map((crop, index) => (
            <button
              key={index}
              onClick={() => setSelectedCrop(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                selectedCrop === index 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              }`}
            >
              {crop.cropType}
            </button>
          ))}
        </div>

        {/* Current Price Display */}
        <div className="text-center mb-6 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <div className="text-3xl font-bold text-white mb-2">
            ₹{currentCropData.currentPrice.toLocaleString()}
          </div>
          <div className="text-blue-300 text-sm mb-2">{currentCropData.cropType} per quintal</div>
          <div className="text-green-400 text-sm">
            +₹{(currentCropData.currentPrice - currentCropData.priceHistory[0].price).toFixed(0)} 
            ({(((currentCropData.currentPrice - currentCropData.priceHistory[0].price) / currentCropData.priceHistory[0].price) * 100).toFixed(1)}%)
          </div>
        </div>

        {/* Mini Price Chart */}
        <div className="mb-6">
          <div className="flex items-end space-x-1 h-20">
            {currentCropData.priceHistory.map((point, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t flex-1 opacity-70 hover:opacity-100 transition-opacity"
                style={{
                  height: `${((point.price - Math.min(...currentCropData.priceHistory.map(p => p.price))) / 
                    (Math.max(...currentCropData.priceHistory.map(p => p.price)) - Math.min(...currentCropData.priceHistory.map(p => p.price)))) * 80}px`
                }}
                title={`₹${point.price} on ${point.date}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-blue-400 mt-2">
            <span>6 days ago</span>
            <span>Today</span>
          </div>
        </div>

        {/* Market Insights */}
        <div className="flex-1">
          <h4 className="text-white font-medium mb-3">Market Insights</h4>
          <div className="space-y-2 text-sm">
            {currentCropData.marketTrends.slice(0, 2).map((trend, index) => (
              <div key={index} className="flex items-start space-x-2 text-blue-300">
                <span className="text-green-400 mt-0.5">•</span>
                <span>{trend}</span>
              </div>
            ))}
          </div>

          {/* Demand Forecast */}
          <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white text-sm font-medium">Demand Forecast</span>
              <span className="text-cyan-400 text-sm">{currentCropData.demandForecast}%</span>
            </div>
            <div className="w-full bg-cyan-900/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${currentCropData.demandForecast}%` }}
              />
            </div>
          </div>
        </div>

        {/* Blockchain Status Modal */}
        {showBlockchainStatus && (
          <div className="absolute inset-0 bg-blue-900/90 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4">
            <div className="bg-white/10 rounded-xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <h4 className="text-white text-lg font-bold flex items-center justify-center space-x-2">
                  <span>⛓️</span>
                  <span>Blockchain Status</span>
                </h4>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Network:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400">{blockchainStats.networkStatus}</span>
                  </div>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Last Block:</span>
                  <span className="text-white">{blockchainStats.lastBlockTime}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Gas Price:</span>
                  <span className="text-white">{blockchainStats.gasPrice}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Active Nodes:</span>
                  <span className="text-white">{blockchainStats.activeNodes}</span>
                </div>
                <div className="flex justify-between text-blue-200">
                  <span>Total TXNs:</span>
                  <span className="text-white">{blockchainStats.totalTransactions}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="text-center text-green-400 text-sm">
                  ✅ All systems operational
                </div>
              </div>
              
              <button 
                onClick={() => setShowBlockchainStatus(false)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}