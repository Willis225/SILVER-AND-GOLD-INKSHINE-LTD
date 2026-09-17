import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  Calculator, 
  Truck, 
  FolderTree, 
  CheckCircle2, 
  FileText, 
  UploadCloud, 
  CreditCard, 
  Server, 
  ArrowRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Percent, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { SAMPLE_PRODUCTS, NIGERIAN_SHIPPING_ZONES, POSTGRESQL_DDL_SCHEMA } from '../../data/seedData';
import { calculateDynamicPrice, PrintOption, Product } from '../../types/schema';

interface StageOneSandboxProps {
  onReturnToStorefront: () => void;
}

export const StageOneArchitectureSandbox: React.FC<StageOneSandboxProps> = ({ onReturnToStorefront }) => {
  const [activeTab, setActiveTab] = useState<'stack' | 'schema' | 'pricing' | 'shipping' | 'structure'>('pricing');
  const [copiedSql, setCopiedSql] = useState(false);

  // Dynamic Pricing Sandbox State
  const [selectedProduct, setSelectedProduct] = useState<Product>(SAMPLE_PRODUCTS[0]);
  const [quantity, setQuantity] = useState<number>(3);
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    SAMPLE_PRODUCTS[0].optionGroups.forEach(group => {
      const defaultOpt = group.options.find(o => o.isDefault) || group.options[0];
      if (defaultOpt) initial[group.id] = defaultOpt.id;
    });
    return initial;
  });

  const handleProductChange = (prod: Product) => {
    setSelectedProduct(prod);
    const newOptions: Record<string, string> = {};
    prod.optionGroups.forEach(group => {
      const def = group.options.find(o => o.isDefault) || group.options[0];
      if (def) newOptions[group.id] = def.id;
    });
    setSelectedOptionIds(newOptions);
    setQuantity(Math.max(prod.minQuantity, 1));
  };

  const handleOptionChange = (groupId: string, optionId: string) => {
    setSelectedOptionIds(prev => ({ ...prev, [groupId]: optionId }));
  };

  // Resolve selected print options
  const activeSelectedOptions: PrintOption[] = [];
  selectedProduct.optionGroups.forEach(group => {
    const optId = selectedOptionIds[group.id];
    const opt = group.options.find(o => o.id === optId);
    if (opt) activeSelectedOptions.push(opt);
  });

  const pricingResult = calculateDynamicPrice(
    selectedProduct.basePriceNgn,
    activeSelectedOptions,
    quantity,
    selectedProduct.bulkPricingTiers
  );

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(POSTGRESQL_DDL_SCHEMA.trim());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const formatNaira = (amount: number) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Sandbox Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>Architecture & Backend Engineering Sandbox</span>
          </div>
          <h2 className="text-2xl font-black mt-1">Stage 1 Foundation & Dynamic Pricing Engine</h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            Inspect the production PostgreSQL relational schema, DDL migrations, dynamic bulk pricing engine, and logistics matrix.
          </p>
        </div>

        <button
          onClick={onReturnToStorefront}
          className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs self-start md:self-auto flex items-center gap-1.5 transition-colors"
        >
          <span>Back to Live Storefront</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'pricing' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Dynamic Pricing Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'schema' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>PostgreSQL DDL Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('shipping')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'shipping' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Nigerian Logistics Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('stack')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'stack' ? 'bg-amber-600 text-white' : 'bg-white text-stone-600 border border-stone-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tech Stack Architecture</span>
        </button>
      </div>

      {/* Tab: Dynamic Pricing Sandbox */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 space-y-6">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                1. Select Print Specimen
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_PRODUCTS.slice(0, 3).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleProductChange(prod)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      selectedProduct.id === prod.id
                        ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600 font-bold'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-[10px] text-amber-700 uppercase font-mono">{prod.sku}</div>
                    <div className="font-bold text-stone-900 mt-1 line-clamp-1">{prod.name}</div>
                    <div className="text-stone-500 mt-0.5">{formatNaira(prod.basePriceNgn)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Customizer Option Groups */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                2. Real-Time Specification Modifiers
              </label>
              {selectedProduct.optionGroups.map((group) => (
                <div key={group.id} className="space-y-1.5">
                  <div className="text-xs font-semibold text-stone-700">{group.name}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {group.options.map((opt) => {
                      const isSelected = selectedOptionIds[group.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleOptionChange(group.id, opt.id)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-amber-600 bg-amber-50 text-stone-900 font-bold'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <span>{opt.name}</span>
                          {opt.priceModifierValue !== 0 && (
                            <span className="text-[10px] text-amber-800 font-mono">
                              +{formatNaira(opt.priceModifierValue)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-stone-700">3. Print Quantity</span>
                <span className="font-mono font-bold text-amber-700">{quantity} units</span>
              </div>
              <input
                type="range"
                min={selectedProduct.minQuantity}
                max={50}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>

          {/* Pricing Calculation Display */}
          <div className="lg:col-span-5 bg-stone-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Live Dynamic Output
                </span>
                <span className="text-xs font-mono text-stone-400">calculateDynamicPrice()</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Unit Base + Options:</span>
                  <span className="font-mono">{formatNaira(pricingResult.unitPriceBeforeDiscount)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Bulk Discount Tier:</span>
                  <span className="font-mono text-amber-400">
                    {pricingResult.discountPercentage}% Off
                  </span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Effective Unit Price:</span>
                  <span className="font-mono font-bold text-white">
                    {formatNaira(pricingResult.unitPriceAfterDiscount)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Total Savings:</span>
                  <span className="font-mono text-amber-400">
                    -{formatNaira(pricingResult.savingsNgn)}
                  </span>
                </div>

                <div className="pt-4 border-t border-stone-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Grand Subtotal:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {formatNaira(pricingResult.subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-stone-800/80 rounded-xl p-3 text-[11px] text-stone-400 space-y-1">
              <div className="font-semibold text-stone-200">Algorithmic Behavior:</div>
              <p>Modifiers accumulate additively or by multiplier before bulk matrix tiers evaluate bounds.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PostgreSQL DDL Schema */}
      {activeTab === 'schema' && (
        <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-amber-400 font-mono">
              schema.sql (11 Relational Tables + JSONB Artwork Specs)
            </span>
            <button
              onClick={copySqlToClipboard}
              className="px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 flex items-center gap-1"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied' : 'Copy DDL SQL'}</span>
            </button>
          </div>
          <pre className="text-xs font-mono bg-stone-950 p-4 rounded-xl overflow-x-auto max-h-[500px] text-stone-300 leading-relaxed scrollbar-thin">
            {POSTGRESQL_DDL_SCHEMA}
          </pre>
        </div>
      )}

      {/* Tab: Nigerian Shipping Zones */}
      {activeTab === 'shipping' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NIGERIAN_SHIPPING_ZONES.map((zone) => (
            <div key={zone.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 uppercase">{zone.region}</span>
                <span className="font-mono font-bold text-stone-900">{formatNaira(zone.baseFeeNgn)}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{zone.name}</h4>
              <p className="text-xs text-stone-500">{zone.estimatedDays}</p>
              <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg">
                <strong>Coverage:</strong> {zone.states.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Tech Stack Summary */}
      {activeTab === 'stack' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 text-xs text-stone-700 leading-relaxed">
          <h3 className="text-base font-bold text-stone-900">Recommended Enterprise Tech Stack</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Frontend:</strong> React 19, Vite, Tailwind CSS, Lucide Icons, Headless UI.</li>
            <li><strong>Backend API:</strong> Node.js / TypeScript (Express or Fastify) with Zod validation.</li>
            <li><strong>Database:</strong> PostgreSQL with JSONB columns for flexible print option snapshots.</li>
            <li><strong>Payments:</strong> Paystack and Flutterwave webhooks with HMAC signature validation.</li>
            <li><strong>Storage:</strong> Cloudflare R2 / AWS S3 with Pre-Signed URLs for high-resolution 100MB+ PDF/CDR artwork uploads.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
