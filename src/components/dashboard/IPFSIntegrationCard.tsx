"use client";

import { useState, useEffect } from "react";
import { DEMO_CROP_DATA, IPFSStorage, DEMO_ANALYTICS } from "@/utils/ipfsDatabase";

export function IPFSIntegrationCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showIPFSDetails, setShowIPFSDetails] = useState(false);

  // Simulate IPFS upload for demo
  const simulateIPFSUpload = () => {
    setIsLoading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const ipfsData = {
    totalRecords: DEMO_CROP_DATA.length,
    totalStorage: "2.4 MB",
    recentUploads: [
      { 
        file: "crop_receipt_001.json", 
        hash: DEMO_CROP_DATA[0].photos[0],
        size: "845 KB",
        timestamp: "2 mins ago"
      },
      { 
        file: "soil_report_rajesh.pdf", 
        hash: DEMO_CROP_DATA[0].soilTestReport,
        size: "1.2 MB", 
        timestamp: "5 mins ago"
      },
      { 
        file: "crop_photo_basmati.jpg", 
        hash: DEMO_CROP_DATA[0].photos[1],
        size: "387 KB",
        timestamp: "8 mins ago"
      }
    ]
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/15 to-purple-400/15 rounded-full blur-xl animate-pulse animation-delay-300"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/20 rounded-full p-3">
              <span className="text-2xl">🗄️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">IPFS Storage</h3>
              <p className="text-purple-300 text-sm">Decentralized Database</p>
            </div>
          </div>
          <button 
            onClick={() => setShowIPFSDetails(!showIPFSDetails)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <span className="text-xl">ℹ️</span>
          </button>
        </div>

        {/* IPFS Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <div className="text-2xl font-bold text-white">{ipfsData.totalRecords}</div>
            <div className="text-purple-300 text-sm">Records Stored</div>
          </div>
          <div className="text-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <div className="text-2xl font-bold text-white">{ipfsData.totalStorage}</div>
            <div className="text-indigo-300 text-sm">Total Storage</div>
          </div>
        </div>

        {/* Upload Simulation */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Upload to IPFS</span>
            <button 
              onClick={simulateIPFSUpload}
              disabled={isLoading}
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          
          {isLoading && (
            <div className="space-y-2">
              <div className="w-full bg-purple-900/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-purple-300 text-xs">{uploadProgress}% uploaded to IPFS...</div>
            </div>
          )}
        </div>

        {/* Recent IPFS Activity */}
        <div className="flex-1">
          <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
            <span>📁</span>
            <span>Recent IPFS Files</span>
          </h4>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {ipfsData.recentUploads.map((file, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3 border border-purple-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium truncate">{file.file}</div>
                    <div className="text-purple-300 text-xs">
                      Hash: {file.hash.substring(0, 20)}...
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-xs">{file.size}</div>
                    <div className="text-purple-400 text-xs">{file.timestamp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IPFS Details Modal */}
        {showIPFSDetails && (
          <div className="absolute inset-0 bg-purple-900/90 backdrop-blur-sm rounded-3xl flex items-center justify-center p-4">
            <div className="bg-white/10 rounded-xl p-6 max-w-sm">
              <div className="text-center mb-4">
                <h4 className="text-white text-lg font-bold">IPFS Integration</h4>
                <p className="text-purple-300 text-sm mt-2">
                  All crop data, documents, and photos are stored on the InterPlanetary File System (IPFS) for permanent, decentralized storage.
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-purple-200">
                  <span>Network:</span>
                  <span>IPFS MainNet</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span>Gateway:</span>
                  <span>Pinata Cloud</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span>Redundancy:</span>
                  <span>3+ Nodes</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowIPFSDetails(false)}
                className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition-colors"
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