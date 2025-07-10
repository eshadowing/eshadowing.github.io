import * as React from "react"
import { Button as BaseButton, ButtonProps } from "@/components/ui/button"
import { useBetaAccess } from "@/hooks/useBetaAccess"

interface TrackedButtonProps extends ButtonProps {
  trackingName?: string;
  trackingData?: Record<string, string>;
}

const TrackedButton = React.forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingName, trackingData, onClick, children, ...props }, ref) => {
    const { trackButtonClick } = useBetaAccess();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Extract button name from trackingName prop or children content
      const buttonName = trackingName || 
        (typeof children === 'string' ? children : 'unknown_button');
      
      // Track the button click
      trackButtonClick(buttonName, trackingData);
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <BaseButton
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </BaseButton>
    );
  }
);

TrackedButton.displayName = "TrackedButton";

export { TrackedButton as Button };