import { Receipt } from "@/components/dashboard/MyReceipts";

interface ReceiptCardProps {
  receipt: Receipt;
}

export function ReceiptCard({ receipt }: ReceiptCardProps) {
  const getCommodityIcon = (commodity: string) => {
    // Simple icon mapping - in a real app, you might use proper icons
    const icons: { [key: string]: string } = {
      'Wheat': '🌾',
      'Rice': '🍚',
      'Soybean': '🫘',
      'Corn': '🌽',
      'Cotton': '🌿',
    };
    return icons[commodity] || '🌾';
  };

  const getStatusColor = (status: Receipt['status']) => {
    return status === 'AVAILABLE' 
      ? 'bg-accent-green text-black' 
      : 'bg-red-500 text-white';
  };

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">
            {getCommodityIcon(receipt.commodity)}
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {receipt.commodity}
            </h3>
            <p className="text-sm text-gray-400">
              {receipt.quantity} quintals
            </p>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(receipt.status)}`}>
          {receipt.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Estimated Value:</span>
          <span className="text-white font-semibold">
            ₹{receipt.value.toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Loan Eligible:</span>
          <span className="text-accent-green font-semibold">
            ₹{Math.floor(receipt.value * 0.6).toLocaleString()}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Deposit Date:</span>
          <span className="text-gray-300">
            {new Date(receipt.depositDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      {receipt.status === 'LOCKED' && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-xs text-red-400">
            🔒 This receipt is currently used as collateral for an active loan
          </p>
        </div>
      )}
    </div>
  );
}