import React, { useState } from 'react';
import { 
  Printer, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Package, 
  Plus, 
  Play, 
  Pause, 
  Check, 
  ShieldCheck, 
  Wrench,
  Sparkles
} from 'lucide-react';
import { Order } from '../../types/schema';

interface PressFloorQueueProps {
  orders: Order[];
  onOpenOrder: (order: Order) => void;
  onAdvanceStatus: (orderId: string) => void;
}

interface MachineStatus {
  id: string;
  name: string;
  model: string;
  technology: string;
  currentSubstrate: string;
  status: 'printing' | 'calibrating' | 'idle' | 'maintenance';
  activeJob?: {
    orderNumber: string;
    clientName: string;
    quantity: number;
    completedUnits: number;
    substrateUsedMeters: number;
    startTime: string;
  };
  rollRemainingMeters: number;
  inkLevels: { c: number; m: number; y: number; k: number; lc?: number; lm?: number };
}

export const PressFloorQueue: React.FC<PressFloorQueueProps> = ({
  orders,
  onOpenOrder,
  onAdvanceStatus,
}) => {
  const [machines, setMachines] = useState<MachineStatus[]>([
    {
      id: 'mach-roland-01',
      name: 'Press Unit 1 (Yenagoa Main)',
      model: 'Roland TrueVIS VG3-640 (64-inch)',
      technology: 'Wide-Gamut Eco-Solvent (1440 DPI)',
      currentSubstrate: 'Solite Satin Matte (Greyback Anti-Curl)',
      status: 'printing',
      activeJob: {
        orderNumber: 'RP-NG-831904',
        clientName: 'Flutterwave Technologies Ltd',
        quantity: 8,
        completedUnits: 5,
        substrateUsedMeters: 16.4,
        startTime: '10:45 AM',
      },
      rollRemainingMeters: 33.6,
      inkLevels: { c: 78, m: 64, y: 82, k: 51, lc: 88, lm: 74 },
    },
    {
      id: 'mach-mimaki-02',
      name: 'Press Unit 2 (Wide Backdrop & Panels)',
      model: 'Mimaki JV300-160 Plus',
      technology: 'Dual-Staggered Piezo High-Speed',
      currentSubstrate: 'Rigid PVC Pop-Up Film + Magnetic Channel',
      status: 'printing',
      activeJob: {
        orderNumber: 'RP-NG-720193',
        clientName: 'Dangote Industries Ltd',
        quantity: 8,
        completedUnits: 7,
        substrateUsedMeters: 28.0,
        startTime: '09:30 AM',
      },
      rollRemainingMeters: 14.5,
      inkLevels: { c: 88, m: 91, y: 72, k: 80 },
    },
    {
      id: 'mach-hp-03',
      name: 'Press Unit 3 (Eco-Certified Suite)',
      model: 'HP Latex 365 (Odorless Water-Based)',
      technology: 'GreenGuard Gold Certified Indoor',
      currentSubstrate: '120cm Solite Satin Matte Film',
      status: 'idle',
      rollRemainingMeters: 50.0,
      inkLevels: { c: 95, m: 93, y: 96, k: 90 },
    },
  ]);

  const [hardwareStock, setHardwareStock] = useState([
    { name: 'Luxury Teardrop Silver Base (85x205cm)', inStock: 42, minThreshold: 20, unitCostNgn: 14500 },
    { name: 'Luxury Midnight Black Base (85x205cm)', inStock: 18, minThreshold: 15, unitCostNgn: 16800 },
    { name: 'Standard Lightweight Slim Base w/ Dual Feet', inStock: 84, minThreshold: 30, unitCostNgn: 9200 },
    { name: '3x3 Curved Magnetic Pop-up Lattice Frame', inStock: 6, minThreshold: 4, unitCostNgn: 75000 },
    { name: 'Padded Oxford Travel Carry Bags', inStock: 112, minThreshold: 40, unitCostNgn: 2200 },
  ]);

  const handleToggleMachineStatus = (machineId: string) => {
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id === machineId) {
          const nextStatus = m.status === 'printing' ? 'idle' : 'printing';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              Factory Floor Operations
            </span>
            <span className="text-xs text-stone-400 font-mono">Central Press: Yenagoa Industrial Works</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1.5">
            Wide-Format Print Production & Assembly Monitoring
          </h2>
          <p className="text-xs text-stone-300 max-w-2xl mt-1 leading-relaxed">
            Live telemetry for our high-precision Japanese eco-solvent presses, substrate meter consumption, and aluminum cassette hardware inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-stone-800/80 px-4 py-2.5 rounded-xl border border-stone-700 text-center">
            <span className="text-xs text-stone-400 block">Active Running Presses</span>
            <span className="text-lg font-mono font-bold text-amber-400">
              {machines.filter((m) => m.status === 'printing').length} / {machines.length} Online
            </span>
          </div>
        </div>
      </div>

      {/* Machine Status Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {machines.map((mach) => {
          const isPrinting = mach.status === 'printing';
          const progressPercent = mach.activeJob
            ? Math.round((mach.activeJob.completedUnits / mach.activeJob.quantity) * 100)
            : 0;

          return (
            <div
              key={mach.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider font-mono">
                    {mach.name}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 leading-tight mt-0.5">
                    {mach.model}
                  </h3>
                  <p className="text-xs text-stone-500">{mach.technology}</p>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    isPrinting
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      : mach.status === 'idle'
                      ? 'bg-stone-100 text-stone-600 border border-stone-200'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isPrinting ? 'bg-[#b8860b]' : 'bg-stone-400'}`} />
                  {isPrinting ? 'Printing (Active)' : 'Idle / Standby'}
                </span>
              </div>

              {/* Substrate in Chamber */}
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 text-xs">
                <div className="flex items-center justify-between text-stone-600 mb-1">
                  <span>Loaded Roll Substrate:</span>
                  <span className="font-semibold text-stone-900 truncate max-w-[170px]">
                    {mach.currentSubstrate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-600">
                  <span>Substrate Roll Remaining:</span>
                  <span className="font-mono font-bold text-amber-700">
                    {mach.rollRemainingMeters} meters
                  </span>
                </div>
              </div>

              {/* Active Job Progress */}
              {mach.activeJob ? (
                <div className="border border-blue-200 bg-blue-50/50 rounded-xl p-3.5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-900 uppercase">Currently Printing</span>
                      <p className="text-xs font-mono font-bold text-stone-900">{mach.activeJob.orderNumber}</p>
                      <p className="text-[11px] text-stone-600 truncate">{mach.activeJob.clientName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-blue-900">{progressPercent}%</span>
                      <span className="text-[10px] text-stone-500 block">
                        {mach.activeJob.completedUnits}/{mach.activeJob.quantity} units
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                    <span>Started: {mach.activeJob.startTime}</span>
                    <span>Substrate drawn: {mach.activeJob.substrateUsedMeters}m</span>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-stone-300 rounded-xl p-6 text-center text-xs text-stone-500">
                  Printer queue currently idle. Ready to load next artwork.
                </div>
              )}

              {/* Real-time Ink Level Meters */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Piezo Ink Reservoirs (CMYK)
                </span>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  <div className="bg-stone-50 p-1 rounded border border-stone-200">
                    <div className="h-12 bg-cyan-100 rounded-xs flex flex-col justify-end p-0.5">
                      <div className="bg-cyan-500 rounded-xs" style={{ height: `${mach.inkLevels.c}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-stone-700 block mt-0.5">C {mach.inkLevels.c}%</span>
                  </div>

                  <div className="bg-stone-50 p-1 rounded border border-stone-200">
                    <div className="h-12 bg-pink-100 rounded-xs flex flex-col justify-end p-0.5">
                      <div className="bg-pink-500 rounded-xs" style={{ height: `${mach.inkLevels.m}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-stone-700 block mt-0.5">M {mach.inkLevels.m}%</span>
                  </div>

                  <div className="bg-stone-50 p-1 rounded border border-stone-200">
                    <div className="h-12 bg-yellow-100 rounded-xs flex flex-col justify-end p-0.5">
                      <div className="bg-yellow-400 rounded-xs" style={{ height: `${mach.inkLevels.y}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-stone-700 block mt-0.5">Y {mach.inkLevels.y}%</span>
                  </div>

                  <div className="bg-stone-50 p-1 rounded border border-stone-200">
                    <div className="h-12 bg-stone-300 rounded-xs flex flex-col justify-end p-0.5">
                      <div className="bg-stone-900 rounded-xs" style={{ height: `${mach.inkLevels.k}%` }} />
                    </div>
                    <span className="text-[9px] font-bold text-stone-700 block mt-0.5">K {mach.inkLevels.k}%</span>
                  </div>
                </div>
              </div>

              {/* Machine Controls */}
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  onClick={() => handleToggleMachineStatus(mach.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isPrinting
                      ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                      : 'bg-[#b8860b] hover:bg-[#996515] text-white shadow-xs'
                  }`}
                >
                  {isPrinting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPrinting ? 'Pause Press' : 'Start Machine'}</span>
                </button>

                {mach.activeJob && (
                  <button
                    onClick={() => {
                      const ord = orders.find((o) => o.orderNumber === mach.activeJob?.orderNumber);
                      if (ord) onOpenOrder(ord);
                    }}
                    className="text-xs text-blue-700 hover:text-blue-800 font-semibold"
                  >
                    View Job Ticket →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cassette Hardware & Finished Stand Inventory Desk */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              Hardware Cassette & Substrate Warehouse Stock (Regional Press Depot)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Real-time counts for luxury aluminum teardrop cassettes, double-footed frames, and padded travel sleeves.
            </p>
          </div>

          <button
            onClick={() => alert('New batch of 50 Luxury Teardrop Cassettes received from Ikeja warehouse.')}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Restock Inventory</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-mono">
              <tr>
                <th className="py-2.5 px-4 font-bold">Hardware Component</th>
                <th className="py-2.5 px-4 font-bold">Units in Stock</th>
                <th className="py-2.5 px-4 font-bold">Threshold Status</th>
                <th className="py-2.5 px-4 font-bold">Unit Restock Cost</th>
                <th className="py-2.5 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {hardwareStock.map((item, idx) => {
                const isLow = item.inStock <= item.minThreshold;

                return (
                  <tr key={idx} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-900">{item.name}</td>
                    <td className="py-3 px-4 font-mono font-bold text-stone-800 text-sm">{item.inStock} units</td>
                    <td className="py-3 px-4">
                      {isLow ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-[11px] inline-flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Reorder Soon (Min: {item.minThreshold})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-50 text-[#b8860b] border border-amber-200 rounded font-semibold text-[11px] inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#b8860b]" />
                          Optimal Supply
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600">₦{item.unitCostNgn.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setHardwareStock((prev) =>
                            prev.map((s, sIdx) =>
                              sIdx === idx ? { ...s, inStock: s.inStock + 10 } : s
                            )
                          );
                        }}
                        className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded text-xs transition-colors"
                      >
                        +10 Units
                      </button>
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
