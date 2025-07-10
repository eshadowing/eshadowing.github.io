import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail, Gift } from "lucide-react";

interface BetaAccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BetaAccessPopup = ({ open, onOpenChange }: BetaAccessPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Close popup after 2 seconds
    setTimeout(() => {
      onOpenChange(false);
      setIsSubmitted(false);
      setEmail("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-orange-500" />
            Early Beta Access
          </DialogTitle>
        </DialogHeader>
        
        {!isSubmitted ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This is an early beta access. Leave your email here to get 100% discount on premium plan for first 1000 early access people!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Get Early Access"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Gift className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Thank you!</h3>
              <p className="text-sm text-muted-foreground">
                You've been added to our early access list. We'll notify you when the premium plan is available!
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};