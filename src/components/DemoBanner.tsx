"use client";

import { useState, useEffect } from "react";
import { DemoSetup } from "@/utils/demoSetup";

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [liveActivity, setLiveActivity] = useState<any>(null);
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    // Generate live activity every 10 seconds for demo effect
    const interval = setInterval(() => {
      const activity = DemoSetup.generateLiveActivity();
      setLiveActivity(activity);
      setActivityCount(prev => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent-green via-green-400 to-accent-green text-primary-dark">
      <div className="max-w-8xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Live Demo Indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">🔴 LIVE DEMONSTRATION</span>
            </div>
            <div className="hidden md:block text-sm opacity-80">
              KisanKosh Agricultural DeFi Platform - Blockchain + IPFS Integration
            </div>
          </div>

          {/* Live Activity */}
          <div className="flex items-center space-x-4">
            {liveActivity && (
              <div className="flex items-center space-x-2 bg-primary-dark/20 rounded-full px-3 py-1">
                <span>{liveActivity.icon}</span>
                <span className="text-xs font-medium">{liveActivity.title}</span>
                <span className="text-xs opacity-75">({activityCount} activities)</span>
              </div>
            )}
            
            {/* Technology Stack */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="bg-primary-dark/20 px-2 py-1 rounded">Aptos Blockchain</span>
              <span className="bg-primary-dark/20 px-2 py-1 rounded">IPFS Storage</span>
              <span className="bg-primary-dark/20 px-2 py-1 rounded">Next.js</span>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="bg-primary-dark/20 hover:bg-primary-dark/30 rounded-full p-1 transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}