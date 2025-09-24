"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface DepositReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositReceiptModal({ isOpen, onClose }: DepositReceiptModalProps) {
  const [formData, setFormData] = useState({
    commodity: "",
    quantity: "",
    value: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commodities = [
    "Wheat", "Rice", "Soybean", "Corn", "Cotton", "Sugarcane", "Barley", "Oats"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - in a real app, this would mint NFT on Aptos
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert("Receipt successfully deposited and tokenized as NFT!");
      
      // Reset form
      setFormData({ commodity: "", quantity: "", value: "" });
      onClose();
    } catch (error) {
      console.error("Error depositing receipt:", error);
      alert("Failed to deposit receipt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deposit New Receipt">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Commodity Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Commodity
          </label>
          <select
            name="commodity"
            value={formData.commodity}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
          >
            <option value="" className="bg-primary-dark">Select commodity</option>
            {commodities.map((commodity) => (
              <option key={commodity} value={commodity} className="bg-primary-dark">
                {commodity}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Quantity (Quintals)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            min="1"
            step="0.1"
            placeholder="Enter quantity in quintals"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
          />
        </div>

        {/* Value */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Estimated Value (₹)
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            required
            min="1"
            step="100"
            placeholder="Enter estimated value in rupees"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-green focus:border-transparent"
          />
        </div>

        {/* Info Box */}
        <div className="bg-accent-green/10 border border-accent-green/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-accent-green">
              <p className="font-medium mb-1">What happens next:</p>
              <ul className="text-xs space-y-1 text-accent-green/80">
                <li>• Your receipt will be tokenized as an NFT on Aptos</li>
                <li>• You can borrow up to 60% of the receipt value</li>
                <li>• Your crops remain safe in the warehouse</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-accent-green text-black font-semibold rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Deposit Receipt"}
          </button>
        </div>
      </form>
    </Modal>
  );
}