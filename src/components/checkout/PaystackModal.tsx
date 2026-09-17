import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Copy,
  Check
} from 'lucide-react';

interface PaystackModalProps {
  amountNgn: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  amountNgn,
  email,
  onSuccess,
  onClose,
}) => {
  const [tab, setTab] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('5399 4100 8823 4912');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [selectedBankUssd, setSelectedBankUssd] = useState('gtb');

  const virtualAccount = '8031234567';
  const virtualBank = 'Wema Bank / Paystack Titan';

  const formatNaira = (amount: number) => {
    return '₦' + Math.round(amount).toLocaleString('en-NG');
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const ref = 'pstk_' + Math.random().toString(36).substring(2, 10).toUpperCase() + '_' + Date.now();
      onSuccess(ref);
    }, 1800);
  };

  const copyAccount = () => {
    navigator.clipboard.writeText(virtualAccount);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header with Paystack Identity */}
        <div className="bg-[#0BA4DB] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#0BA4DB] font-black text-xs px-2 py-0.5 rounded">
              P
            </div>
            <div>
              <div className="text-xs font-bold tracking-tight">Paystack Secured Checkout</div>
              <div className="text-[10px] text-sky-100">{email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-wider text-sky-100 block">Total Due</span>
              <span className="font-mono font-black text-sm">{formatNaira(amountNgn)}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 bg-stone-50 text-xs">
          <button
            onClick={() => setTab('card')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'card'
                ? 'border-[#0BA4DB] text-[#0BA4DB] bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>

          <button
            onClick={() => setTab('transfer')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'transfer'
                ? 'border-[#0BA4DB] text-[#0BA4DB] bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Bank Transfer</span>
          </button>

          <button
            onClick={() => setTab('ussd')}
            className={`flex-1 py-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              tab === 'ussd'
                ? 'border-[#0BA4DB] text-[#0BA4DB] bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>USSD</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {tab === 'card' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-600">
                Enter your Verve, Mastercard, or Visa card details:
              </div>

              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono font-bold text-stone-900 focus:ring-2 focus:ring-[#0BA4DB]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-stone-200 px-1.5 py-0.5 rounded font-bold text-stone-700">
                    TEST
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[#0BA4DB]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    maxLength={3}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs font-mono text-stone-900 focus:ring-2 focus:ring-[#0BA4DB]"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === 'transfer' && (
            <div className="space-y-3">
              <div className="text-xs text-stone-600">
                Transfer exactly <strong className="text-stone-900">{formatNaira(amountNgn)}</strong> to this dedicated Paystack session account:
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Bank Name:</span>
                  <strong className="text-stone-900">{virtualBank}</strong>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-500">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <strong className="font-mono text-base font-black text-[#0BA4DB]">
                      {virtualAccount}
                    </strong>
                    <button
                      onClick={copyAccount}
                      className="p-1 rounded bg-white border border-sky-300 text-stone-700 hover:text-sky-700"
                    >
                      {copiedAccount ? <Check className="w-3.5 h-3.5 text-amber-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Beneficiary:</span>
                  <strong className="text-stone-900">SILVER &amp; GOLD INKSHINE LTD / Paystack</strong>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 text-center">
                Use your bank mobile app or USSD to transfer. Payment confirms automatically.
              </div>
            </div>
          )}

          {tab === 'ussd' && (
            <div className="space-y-3 text-xs">
              <div className="text-stone-600">
                Select your Nigerian bank to dial payment USSD string:
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gtb', name: 'GTBank', ussd: '*737*50*Amount*142#' },
                  { id: 'zenith', name: 'Zenith Bank', ussd: '*966*000*142#' },
                  { id: 'access', name: 'Access Bank', ussd: '*901*000*142#' },
                  { id: 'uba', name: 'UBA', ussd: '*919*00*142#' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBankUssd(b.id)}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      selectedBankUssd === b.id
                        ? 'border-[#0BA4DB] bg-sky-50 font-bold text-stone-900'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold">{b.name}</div>
                    <div className="font-mono text-[10px] text-stone-400 mt-0.5">{b.ussd}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-[#0BA4DB] hover:bg-[#0993c5] active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all disabled:opacity-75"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying with Paystack CBN Gateway...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {tab === 'transfer' ? 'I Have Sent The Transfer' : `Pay ${formatNaira(amountNgn)}`}
                </span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>PCI-DSS Certified Level 1 • 256-Bit SSL Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};
