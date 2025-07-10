import { createContext, useContext, useState, ReactNode } from "react";
import clarity from "@microsoft/clarity";
import { BetaAccessPopup } from "@/components/BetaAccessPopup";

interface BetaAccessContextType {
  showBetaPopup: () => void;
  trackButtonClick: (buttonName: string, additionalData?: Record<string, string>) => void;
}

const BetaAccessContext = createContext<BetaAccessContextType | undefined>(undefined);

export const useBetaAccess = () => {
  const context = useContext(BetaAccessContext);
  if (!context) {
    throw new Error("useBetaAccess must be used within a BetaAccessProvider");
  }
  return context;
};

interface BetaAccessProviderProps {
  children: ReactNode;
}

export const BetaAccessProvider = ({ children }: BetaAccessProviderProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const showBetaPopup = () => {
    setShowPopup(true);
  };

  const trackButtonClick = (buttonName: string, additionalData?: Record<string, string>) => {
    // Track with Clarity
    clarity.setTag("button_click", buttonName);
    clarity.setTag("click_timestamp", new Date().toISOString());
    
    // Add any additional tracking data
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        clarity.setTag(key, value);
      });
    }

    // Show beta popup
    showBetaPopup();
  };

  return (
    <BetaAccessContext.Provider value={{ showBetaPopup, trackButtonClick }}>
      {children}
      <BetaAccessPopup 
        open={showPopup} 
        onOpenChange={setShowPopup}
      />
    </BetaAccessContext.Provider>
  );
};