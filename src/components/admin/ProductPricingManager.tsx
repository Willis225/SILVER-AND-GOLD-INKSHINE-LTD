import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Edit3, 
  Check, 
  Clock, 
  DollarSign, 
  Layers, 
  ToggleLeft, 
  ToggleRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Product } from '../../types/schema';

interface ProductPricingManagerProps {
  products: Product[];
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
}

export const ProductPricingManager: React.FC<ProductPricingManagerProps> = ({
  products,
  onUpdateProduct,
}) => {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [turnaroundInput, setTurnaroundInput] = useState<number>(1);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setPriceInput(product.basePriceNgn);
    setTurnaroundInput(product.turnaroundDays);
  };

  const handleSaveEdit = (productId: string) => {
    onUpdateProduct(productId, {
      basePriceNgn: Number(priceInput),
      turnaroundDays: Number(turnaroundInput),
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
              Catalog & Margin Control
            </span>
            <span className="text-xs text-stone-400 font-mono">Real-time Nigerian Naira (₦) Pricing Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Commercial Product Catalog & Turnaround Manager
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Update base prices, minimum order quantities, and factory press turnarounds. All changes immediately propagate to the live customer storefront.
          </p>
        </div>

        <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
          <span className="text-xs text-stone-400 block">Active Print SKUs</span>
          <span className="text-lg font-mono font-bold text-amber-400">
            {products.length} Commercial Lines
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, SKU, or category..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-800 focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono">
              <tr>
                <th className="py-3 px-4 font-bold">Product / SKU</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Base Price (₦ NGN)</th>
                <th className="py-3 px-4 font-bold">Turnaround</th>
                <th className="py-3 px-4 font-bold">Option Groups</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                const isEditing = editingId === product.id;

                return (
                  <tr key={product.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-100 border border-stone-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-stone-900 text-xs">{product.name}</p>
                          <span className="font-mono text-[10px] text-stone-400 block">{product.sku}</span>
                          {product.badge && (
                            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                              {product.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[11px] font-semibold">
                        {product.categoryLabel}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <span className="text-stone-500 font-bold">₦</span>
                          <input
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(Number(e.target.value))}
                            className="w-24 p-1 bg-amber-50 border border-amber-300 rounded text-xs font-bold text-stone-900"
                          />
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-stone-900">
                          ₦{product.basePriceNgn.toLocaleString()}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={turnaroundInput}
                            onChange={(e) => setTurnaroundInput(Number(e.target.value))}
                            className="w-16 p-1 bg-amber-50 border border-amber-300 rounded text-xs font-bold text-stone-900"
                          />
                          <span className="text-stone-500 text-[11px]">days</span>
                        </div>
                      ) : (
                        <span className="text-stone-700 font-medium">
                          {product.turnaroundDays} {product.turnaroundDays === 1 ? 'business day' : 'business days'}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-stone-600 text-xs font-mono">
                        {product.optionGroups?.length || 0} groups (size, substrate, hardware)
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <button
                          onClick={() => handleSaveEdit(product.id)}
                          className="px-3 py-1 bg-[#b8860b] hover:bg-[#996515] text-white rounded font-semibold text-xs inline-flex items-center gap-1 shadow-xs transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(product)}
                          className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edit Pricing
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
