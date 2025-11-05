"use client"

import LayoutWrapper from "@/utils/LayoutWrapper";
import { Poppins } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import NetworkConfig from "@/components/NetworkConfig";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={poppins.className}>
        <LayoutWrapper>
          {children}
          {process.env.NODE_ENV !== "exe" && <NetworkConfig /> }

          {/* Install Prompt Banner */}
          {showInstallPrompt && (
            <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold">Install App</h3>
                    <p className="text-sm text-blue-100">Install this app on your device for better experience</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Install
                  </button>
                  <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          )}
        </LayoutWrapper>
      </body>
    </html>
  );
}