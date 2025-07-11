import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Mail, Gift, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface BetaAccessPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChangeCallback?: (open: boolean) => void;
}

export const BetaAccessPopup = ({ open, onOpenChange, onOpenChangeCallback }: BetaAccessPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  // Notify parent when popup state changes
  useEffect(() => {
    if (onOpenChangeCallback) {
      onOpenChangeCallback(open);
    }
  }, [open, onOpenChangeCallback]);

  // Check if user is already registered when popup opens
  useEffect(() => {
    if (open) {
      const registeredEmail = localStorage.getItem('betaAccessEmail');
      if (registeredEmail) {
        setIsAlreadyRegistered(true);
        setEmail(registeredEmail);
      }
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('https://shadowing-tracking-production.up.railway.app/user-contact/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register for beta access');
      }

      // Save to localStorage on successful registration
      localStorage.setItem('betaAccessEmail', email);
      localStorage.setItem('betaAccessRegistered', 'true');
      
      setIsSubmitted(true);
      setIsSubmitting(false);
      
      // Close popup after 3 seconds
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('betaAccess.errorMessage'));
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="flex items-center justify-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Gift className="h-4 w-4 text-white" />
            </div>
            {t('betaAccess.title')}
          </DialogTitle>
        </DialogHeader>
        
        {isAlreadyRegistered ? (
          <div className="text-center space-y-6 py-4">
            <div className="relative">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {t('betaAccess.alreadyRegistered')}
              </h3>
              <p className="text-slate-600">
                {t('betaAccess.alreadyRegisteredDesc')}
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                <p className="text-amber-800 font-medium text-sm">
                  {t('betaAccess.registeredEmail')} <span className="font-semibold">{email}</span>
                </p>
                <p className="text-amber-700 text-sm">
                  {t('betaAccess.notifyLaunch')}
                </p>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                {t('betaAccess.discountSecured')}
              </div>
            </div>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold"
            >
              {t('betaAccess.gotIt')}
            </Button>
          </div>
        ) : !isSubmitted ? (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {t('betaAccess.demoNotice')}
              </div>
              <p className="text-slate-700 font-medium">
                {t('betaAccess.tryBuilding')}
              </p>
              <p className="text-slate-600">
                {t('betaAccess.earlyAccessInterest')}
              </p>
              <p className="text-blue-600 font-semibold">
                {t('betaAccess.joinWaitlist')}
              </p>
            </div>
            
            {/* Stunning 100% Discount Banner */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-gradient-to-r from-amber-300 to-orange-300 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Gift className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {t('betaAccess.exclusiveOffer')}
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Gift className="h-3 w-3 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-black text-gradient bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-1">
                  {t('betaAccess.discount100')}
                </div>
                <p className="text-sm text-amber-800 font-semibold">
                  {t('betaAccess.first100People')}
                </p>
                <div className="absolute top-1 right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-75"></div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">❌ {error}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">{t('betaAccess.emailAddress')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('betaAccess.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  {isSubmitting ? t('betaAccess.joining') : t('betaAccess.joinBetaWaitlist')}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  className="px-3 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-6 py-4">
            <div className="relative">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Gift className="h-8 w-8 text-white animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {t('betaAccess.welcomeWaitlist')}
              </h3>
              <p className="text-slate-600">
                {t('betaAccess.welcomeWaitlistDesc')}
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mt-2">
                {t('betaAccess.earlyAccessSecured')}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};