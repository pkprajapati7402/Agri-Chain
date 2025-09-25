"use client";
import { useState } from "react";

interface UploadReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadReceiptModal({ isOpen, onClose }: UploadReceiptModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock extracted data from uploaded e-NWR
  const [extractedData, setExtractedData] = useState({
    commodity: "Wheat",
    quantity: 100,
    quality: "A Grade",
    warehouse: "Central Warehouse, Delhi",
    warehouseLocation: "Delhi, India",
    depositorName: "Rajesh Kumar",
    depositDate: "2025-09-20",
    expiryDate: "2026-03-20",
    receiptNumber: "NWR-2025-WH-001234",
    estimatedValue: 180000,
    loanEligible: 150000
  });

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Mock processing delay
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleMintNFT = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(3);
    }, 3000);
  };

  const resetModal = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark border border-accent-green/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button 
          onClick={resetModal}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-300 text-2xl z-10"
          suppressHydrationWarning={true}
        >
          ✕
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-accent-green/10 rounded-full mb-4">
              <span className="text-4xl">📄</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Upload e-NWR & Mint NFT</h2>
            <p className="text-gray-400">Transform your warehouse receipt into a secure digital asset</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[
                { step: 1, title: "Upload Document", icon: "📤" },
                { step: 2, title: "Verify Details", icon: "🔍" },
                { step: 3, title: "Mint NFT", icon: "🎨" }
              ].map((stepInfo, index) => (
                <div key={stepInfo.step} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300
                    ${currentStep >= stepInfo.step 
                      ? 'bg-accent-green border-accent-green text-primary-dark' 
                      : 'border-gray-600 text-gray-400'
                    }
                  `}>
                    {currentStep > stepInfo.step ? "✓" : stepInfo.icon}
                  </div>
                  <div className="ml-3 mr-6">
                    <div className={`text-sm font-medium ${currentStep >= stepInfo.step ? 'text-accent-green' : 'text-gray-400'}`}>
                      Step {stepInfo.step}
                    </div>
                    <div className={`text-xs ${currentStep >= stepInfo.step ? 'text-white' : 'text-gray-500'}`}>
                      {stepInfo.title}
                    </div>
                  </div>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 ${currentStep > stepInfo.step ? 'bg-accent-green' : 'bg-gray-600'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            
            {/* Step 1: Upload Document */}
            {currentStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Upload Your e-NWR Document</h3>
                
                {!isProcessing ? (
                  <div 
                    className={`
                      border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
                      ${isDragging 
                        ? 'border-accent-green bg-accent-green/10' 
                        : 'border-gray-600 hover:border-accent-green/50 hover:bg-accent-green/5'
                      }
                    `}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                  >
                    <div className="text-6xl mb-4">📄</div>
                    <h4 className="text-xl font-semibold text-white mb-4">
                      Drop your e-NWR PDF here
                    </h4>
                    <p className="text-gray-400 mb-6">
                      or click to browse and upload your official warehouse receipt
                    </p>
                    
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileInput}
                      className="hidden" 
                      id="file-upload"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                    
                    <div className="mt-6 text-sm text-gray-500">
                      <div>✓ PDF format only</div>
                      <div>✓ Maximum file size: 10MB</div>
                      <div>✓ Official e-NWR documents accepted</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-green mx-auto mb-6"></div>
                    <h4 className="text-xl font-semibold text-white mb-2">Processing Document...</h4>
                    <p className="text-gray-400">Extracting information from your e-NWR</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Verify Details */}
            {currentStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Verify Extracted Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Commodity Type</label>
                      <input 
                        type="text" 
                        value={extractedData.commodity}
                        onChange={(e) => setExtractedData({...extractedData, commodity: e.target.value})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Quantity (Quintals)</label>
                      <input 
                        type="number" 
                        value={extractedData.quantity}
                        onChange={(e) => setExtractedData({...extractedData, quantity: parseInt(e.target.value)})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Quality Grade</label>
                      <input 
                        type="text" 
                        value={extractedData.quality}
                        onChange={(e) => setExtractedData({...extractedData, quality: e.target.value})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Warehouse Name</label>
                      <input 
                        type="text" 
                        value={extractedData.warehouse}
                        onChange={(e) => setExtractedData({...extractedData, warehouse: e.target.value})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Deposit Date</label>
                      <input 
                        type="date" 
                        value={extractedData.depositDate}
                        onChange={(e) => setExtractedData({...extractedData, depositDate: e.target.value})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
                      <label className="text-sm text-gray-400 block mb-2">Receipt Number</label>
                      <input 
                        type="text" 
                        value={extractedData.receiptNumber}
                        onChange={(e) => setExtractedData({...extractedData, receiptNumber: e.target.value})}
                        className="w-full bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white focus:border-accent-green focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Valuation Summary */}
                <div className="backdrop-blur-sm bg-gradient-to-r from-accent-green/10 to-blue-500/10 border border-accent-green/20 rounded-xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Estimated Valuation</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-400">Market Value</div>
                      <div className="text-2xl font-bold text-white">₹{extractedData.estimatedValue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Loan Eligible Amount</div>
                      <div className="text-2xl font-bold text-accent-green">₹{extractedData.loanEligible.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleMintNFT}
                  className="w-full bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-4 rounded-full font-bold text-lg hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  suppressHydrationWarning={true}
                >
                  <span className="mr-2">🎨</span>
                  Confirm & Mint NFT Receipt
                </button>
              </div>
            )}

            {/* Step 3: Minting Success */}
            {currentStep === 3 && (
              <div className="text-center">
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-accent-green mx-auto mb-8"></div>
                    <h3 className="text-2xl font-bold text-white mb-4">Minting Your NFT...</h3>
                    <p className="text-gray-400 mb-4">Creating secure digital receipt on Aptos blockchain</p>
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 max-w-md mx-auto">
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>✓ Validating receipt data</div>
                        <div>✓ Creating NFT metadata</div>
                        <div className="text-accent-green">⏳ Minting on blockchain...</div>
                        <div className="text-gray-500">⏳ Updating your portfolio</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-8xl mb-6">🎉</div>
                    <h3 className="text-3xl font-bold text-white mb-4">NFT Receipt Successfully Minted!</h3>
                    <p className="text-gray-400 mb-8">Your crop receipt is now a secure digital asset on the blockchain</p>
                    
                    <div className="backdrop-blur-sm bg-gradient-to-r from-accent-green/10 to-blue-500/10 border border-accent-green/20 rounded-xl p-6 mb-8 max-w-md mx-auto">
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-400">NFT ID:</span>
                          <span className="text-accent-green font-mono">NFT#KK00{Date.now().toString().slice(-3)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Commodity:</span>
                          <span className="text-white">{extractedData.commodity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Quantity:</span>
                          <span className="text-white">{extractedData.quantity} quintals</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Loan Power:</span>
                          <span className="text-accent-green font-bold">₹{extractedData.loanEligible.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 justify-center">
                      <button 
                        onClick={resetModal}
                        className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105"
                        suppressHydrationWarning={true}
                      >
                        <span className="mr-2">📋</span>
                        View in Dashboard
                      </button>
                      
                      <button 
                        className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                        suppressHydrationWarning={true}
                      >
                        <span className="mr-2">🔗</span>
                        View on Explorer
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}