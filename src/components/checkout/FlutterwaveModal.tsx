import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Building, 
  Smartphone, 
  Lock, 
  Loader2, 
  Copy, 
  Check, 
  Layers 
} from 'lucide-react';

interface FlutterwaveModalProps {
  amountNgn: number;
  email: string;
  customerName: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export const FlutterwaveModal: React.FC<FlutterwaveModalProps> = ({
  amountNgn,
  email,
  customerName,
  onSuccess,
  onClose,
}) => {
  const [method, setMethod] = useState<'card' | 'bank_transfer' | 'barter'>('card');
  const [cardNumber, setCardNumber] = useState('5399 8321 0019 7724');
  const [cardExpiry, setCardExpiry] = useState('11/27');
  const [cardCvv, setCardCvv] = useState('419');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const flwVirtualAccount = '0412893812';
  const flwVirtualBank = 'Sterling Bank / Flutterwave';

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const ref = 'FLW_MOCK_' + Math.random().toString(36).substring(2, 9).toUpperCase();
      onSuccess(ref);
    }, 1800);
  };

  const copyAccount = () => {
    navigator.clipboard.writeText(flwVirtualAccount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#121217] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 text-stone-100">
        
        {/* Header with Flutterwave identity */}
        <div className="bg-[#FB9129] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-stone-900 text-white font-black text-xs px-2 py-0.5 rounded">
              FLW
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight">Flutterwave Secured Checkout</div>
              <div className="text-[10px] text-amber-100">{customerName} ({email})</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-wider text-amber-100 block">Total Due</span>
              <span className="font-mono font-black text-sm">{formatNaira(amountNgn)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Method Picker */}
        <div className="flex border-b border-white/10 bg-[#0c0c10] text-xs">
          <button
            onClick={() => setMethod('card')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              method === 'card'
                ? 'border-[#FB9129] text-[#FB9129] bg-[#121217]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>

          <button
            onClick={() => setMethod('bank_transfer')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              method === 'bank_transfer'
                ? 'border-[#FB9129] text-[#FB9129] bg-[#121217]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Bank Transfer</span>
          </button>

          <button
            onClick={() => setMethod('barter')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
              method === 'barter'
                ? 'border-[#FB9129] text-[#FB9129] bg-[#121217]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Barter / Mobile</span>
          </button>
        </div>

        {/* Method Content */}
        <div className="p-6 space-y-4">
          {method === 'card' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-300">
                Pay using Verve, Visa, or Mastercard:
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-300 block mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#FB9129]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-white/10 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    TEST FLW
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Valid Thru
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#FB9129]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    maxLength={3}
                    className="w-full bg-[#181824] border border-white/10 rounded-xl p-2.5 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#FB9129]"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'bank_transfer' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-300">
                Send <strong className="text-[#f5be38]">{formatNaira(amountNgn)}</strong> to Flutterwave checkout account:
              </div>

              <div className="bg-[#181824] border border-[#FB9129]/30 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Bank Name:</span>
                  <strong className="text-white">{flwVirtualBank}</strong>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <strong className="font-mono text-base font-black text-[#FB9129]">
                      {flwVirtualAccount}
                    </strong>
                    <button
                      onClick={copyAccount}
                      className="p-1 rounded bg-white/10 border border-white/10 text-stone-200 hover:text-[#FB9129] cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#f5be38]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Account Name:</span>
                  <strong className="text-white">Flutterwave / SILVER &amp; GOLD INKSHINE LTD</strong>
                </div>
              </div>
            </div>
          )}

          {method === 'barter' && (
            <div className="space-y-3 text-xs text-stone-300">
              <p>Authorize payment through your Barter by Flutterwave balance or QR scanner.</p>
              <div className="p-3 bg-[#181824] rounded-xl border border-white/10 font-mono text-center text-stone-300">
                Payment Request Sent to {email}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-[#FB9129] hover:bg-[#e4801e] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-75 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Connecting to Flutterwave Switch...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {method === 'bank_transfer' ? 'I Have Completed Transfer' : `Pay ${formatNaira(amountNgn)}`}
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f5be38]" />
            <span>Regulated by Central Bank of Nigeria (CBN) • ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
};
