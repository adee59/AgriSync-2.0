import React, { useState } from 'react';
import { 
  Store, 
  ShoppingCart, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  FileCheck, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Truck, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SupplierItem, BuyerListing, UserProfile } from '../types';
import { initialSuppliers, initialBuyers } from '../data/mockData';

interface MarketplaceViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  userProfile,
  setUserProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'suppliers' | 'buyers' | 'tiers'>('suppliers');
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(initialSuppliers);
  const [buyers, setBuyers] = useState<BuyerListing[]>(initialBuyers);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // 1-Click Automated Procurement
  const handleReorder = (item: SupplierItem) => {
    const reorderVolume = item.bulkDiscountThreshold;
    const cost = (reorderVolume * item.bulkUnitPriceUsd).toFixed(2);
    setSuppliers(prev => prev.map(s => {
      if (s.id === item.id) {
        return {
          ...s,
          currentStock: s.currentStock + reorderVolume,
        };
      }
      return s;
    }));
    setOrderNotification(`1-Click Purchase Order dispatched to ${item.supplier}: +${reorderVolume} ${item.unit} of ${item.name} ($${cost} billed via ERP ledger). Lead time: ${item.leadTimeDays} days.`);
  };

  // Lock In Forward Purchase Contract (Section 9.2)
  const handleLockForwardContract = (contractId: string) => {
    setBuyers(prev => prev.map(b => {
      if (b.id === contractId) {
        return {
          ...b,
          contractStatus: b.contractStatus === 'OPEN' ? 'LOCKED_FORWARD' : 'IN_ESCROW',
        };
      }
      return b;
    }));
    setOrderNotification(`Forward Purchase Contract locked with buyer! Guaranteed pricing locked in against Meta-Orchestrator yield forecast.`);
  };

  const handleSelectTier = (tier: 'Standard' | 'Plus' | 'Pro') => {
    setUserProfile(prev => ({ ...prev, licenseTier: tier }));
    setOrderNotification(`Enterprise license tier updated to [${tier} Plan]. Commercial features unlocked.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                SECTION 8 & 9 SPECIFICATION
              </span>
              <span className="text-xs font-mono-telemetry text-[#64748B]">
                B2B AgTech Commercial Ecosystem
              </span>
            </div>
            <h1 className="font-space text-2xl font-bold text-[#0B1C30] mt-1">
              Pro Tier B2B Supplier & Buyer Marketplace
            </h1>
            <p className="text-xs text-[#64748B] max-w-3xl mt-1">
              Transforms AgriSync from operational farm telemetry into a unified commercial trading ecosystem: 1-click automated input procurement triggered by load-cells and forward contract locking for crop off-takers.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono-telemetry text-slate-500">Active Tier:</span>
            <span className="px-2.5 py-1 rounded text-xs font-mono-telemetry font-bold bg-[#0D3B22] text-white">
              {userProfile.licenseTier.toUpperCase()} ENTERPRISE
            </span>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      {orderNotification && (
        <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-start justify-between shadow-xs">
          <div className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <span>{orderNotification}</span>
          </div>
          <button 
            onClick={() => setOrderNotification(null)}
            className="text-[10px] text-emerald-800 font-bold ml-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1 text-xs">
        <button
          onClick={() => setActiveSubTab('suppliers')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t font-semibold transition-all ${
            activeSubTab === 'suppliers'
              ? 'bg-white border-t border-x border-[#E2E8F0] text-[#0D3B22] -mb-1.5 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>9.1 B2B Input Supplier Network</span>
        </button>

        <button
          onClick={() => setActiveSubTab('buyers')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t font-semibold transition-all ${
            activeSubTab === 'buyers'
              ? 'bg-white border-t border-x border-[#E2E8F0] text-[#0D3B22] -mb-1.5 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>9.2 Off-taker & Buyer Matchmaking (Forward Contracts)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tiers')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-t font-semibold transition-all ${
            activeSubTab === 'tiers'
              ? 'bg-white border-t border-x border-[#E2E8F0] text-[#0D3B22] -mb-1.5 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Section 8: Commercial Tier Plans</span>
        </button>
      </div>

      {/* Tab 1: 9.1 B2B Input Supplier Network */}
      {activeSubTab === 'suppliers' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-space font-bold text-base text-[#0B1C30]">
                Automated Procurement & Input Supplier Directory
              </h2>
              <p className="text-xs text-[#64748B]">
                Monitored by the Inventory Agent via silo load-cells. 1-click competitive reordering when safety thresholds breach.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono-telemetry text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Compliance Certified Suppliers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((item) => {
              const isLowStock = item.currentStock <= item.minSafetyThreshold;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded border p-4 shadow-sm flex flex-col justify-between transition-all ${
                    isLowStock ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-[#E2E8F0]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-slate-100 text-slate-800 uppercase">
                        {item.category}
                      </span>
                      {isLowStock ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          LOW STOCK ALERT
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono-telemetry text-emerald-700 font-bold">
                          ★ {item.rating.toFixed(1)} / 5.0
                        </span>
                      )}
                    </div>

                    <h3 className="font-space font-bold text-sm text-[#0B1C30] leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Supplier: {item.supplier}</p>

                    {/* Stock Meter */}
                    <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-xs font-mono-telemetry space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Load-Cell Stock:</span>
                        <strong className={`font-bold ${isLowStock ? 'text-amber-600' : 'text-slate-900'}`}>
                          {item.currentStock.toLocaleString()} {item.unit}
                        </strong>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded overflow-hidden">
                        <div
                          className={`h-full ${isLowStock ? 'bg-amber-500' : 'bg-[#0D3B22]'}`}
                          style={{ width: `${Math.min(100, (item.currentStock / (item.minSafetyThreshold * 2.5)) * 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Min Safety Threshold: {item.minSafetyThreshold.toLocaleString()}</span>
                        <span>Lead: {item.leadTimeDays}d</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mt-3 flex items-baseline justify-between font-mono-telemetry text-xs">
                      <span className="text-slate-500">Bulk Rate:</span>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">${item.bulkUnitPriceUsd.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-500"> / {item.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleReorder(item)}
                      className={`w-full py-2 rounded text-xs font-mono-telemetry font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                        isLowStock
                          ? 'bg-[#0D3B22] hover:bg-[#082415] text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>
                        {isLowStock ? `1-Click Reorder (${item.bulkDiscountThreshold} ${item.unit})` : `Order Bulk (${item.bulkDiscountThreshold} ${item.unit})`}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 9.2 Off-taker & Buyer Matchmaking (Forward Contract Locking) */}
      {activeSubTab === 'buyers' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm">
            <h2 className="font-space font-bold text-base text-[#0B1C30]">
              Direct Yield-to-Market Selling & Forward Contract Locking
            </h2>
            <p className="text-xs text-[#64748B] mt-1 max-w-3xl">
              Using yield forecasts generated by the Meta-Orchestrator and Autonomous Finance Agent, farm owners lock in forward contracts months prior to harvest, guaranteeing crop sale prices and eliminating revenue volatility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buyers.map((buyer) => {
              const isLocked = buyer.contractStatus === 'LOCKED_FORWARD' || buyer.contractStatus === 'IN_ESCROW';

              return (
                <div key={buyer.id} className="bg-white rounded border border-[#E2E8F0] p-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono-telemetry font-bold text-[#0D3B22]">
                        {buyer.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold border uppercase ${
                        buyer.contractStatus === 'LOCKED_FORWARD' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        buyer.contractStatus === 'IN_ESCROW' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        'bg-slate-100 text-slate-800 border-slate-300'
                      }`}>
                        {buyer.contractStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <h3 className="font-space font-bold text-base text-[#0B1C30]">
                      {buyer.buyerName}
                    </h3>

                    <div className="mt-3 p-3 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono-telemetry">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Crop Specification:</span>
                        <span className="font-semibold text-slate-800">{buyer.cropRequired}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Grade:</span>
                        <span className="font-semibold text-slate-800">{buyer.gradeSpec}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Volume:</span>
                        <span className="font-semibold text-slate-800">{buyer.targetVolumeTons} MT</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Offered Price:</span>
                        <span className="font-bold text-[#0D3B22] text-sm">${buyer.offeredPricePerTonUsd.toFixed(2)} / MT</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200 pt-1.5">
                        <span className="text-slate-500">Guaranteed Contract Value:</span>
                        <span className="font-extrabold text-emerald-700 text-sm">${buyer.guaranteedPayoutUsd.toLocaleString()} USD</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Delivery Window: {buyer.fulfillmentWindow}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleLockForwardContract(buyer.id)}
                      className={`w-full py-2 rounded text-xs font-mono-telemetry font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                        isLocked
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : 'bg-[#0D3B22] hover:bg-[#082415] text-white'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isLocked ? 'View Escrow Audit Trail' : 'Lock Forward Purchase Contract'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Section 8 Commercial Subscription Tiers */}
      {activeSubTab === 'tiers' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm">
            <h2 className="font-space font-bold text-base text-[#0B1C30]">
              Commercial Tiered Subscription Matrix (Section 8 Blueprint)
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Select or upgrade subscription tiers to unlock advanced agent fleets, offline edge gateway resilience, and B2B marketplace trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Standard Tier */}
            <div className={`bg-white rounded border p-5 shadow-sm flex flex-col justify-between ${
              userProfile.licenseTier === 'Standard' ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/15' : 'border-[#E2E8F0]'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space font-bold text-lg text-slate-900">Standard</span>
                  <span className="text-xs font-mono-telemetry text-slate-500">Base Plan</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  For smallholder farms & entry AgTech operators.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Soil Telemetry & Weather Agents</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Wi-Fi / Cellular Cloud Connectivity</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Basic Expense Logging</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Standard Gauges & 30-Day Rolling History</span>
                  </li>
                  <li className="flex items-start space-x-2 text-slate-400">
                    <span>✕ B2B Marketplace Disabled</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleSelectTier('Standard')}
                  className={`w-full py-2 rounded text-xs font-mono-telemetry font-semibold transition-colors ${
                    userProfile.licenseTier === 'Standard'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {userProfile.licenseTier === 'Standard' ? 'Current Active Tier' : 'Select Standard'}
                </button>
              </div>
            </div>

            {/* Plus Tier */}
            <div className={`bg-white rounded border p-5 shadow-sm flex flex-col justify-between ${
              userProfile.licenseTier === 'Plus' ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/15' : 'border-[#E2E8F0]'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space font-bold text-lg text-slate-900">Plus</span>
                  <span className="text-xs font-mono-telemetry text-emerald-700 font-bold">Advanced AI</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  For mid-sized commercial growers & greenhouse operators.
                </p>

                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Standard + Vision Pest, Inventory & Energy Agents</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Store-and-Forward Edge Gateway (Offline Mode)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cost per Acre & Resource Burn-rate Tracking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>3D Topographic Maps, Notes Engine & 1-Year History</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>View-Only Supplier Catalogs</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleSelectTier('Plus')}
                  className={`w-full py-2 rounded text-xs font-mono-telemetry font-semibold transition-colors ${
                    userProfile.licenseTier === 'Plus'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {userProfile.licenseTier === 'Plus' ? 'Current Active Tier' : 'Upgrade to Plus'}
                </button>
              </div>
            </div>

            {/* Pro Tier (Flagship) */}
            <div className={`bg-gradient-to-b from-[#0D3B22]/5 to-transparent rounded border p-5 shadow-sm flex flex-col justify-between ${
              userProfile.licenseTier === 'Pro' ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/30' : 'border-[#CBD5E1]'
            }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-space font-bold text-lg text-[#0D3B22]">Pro</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                    ENTERPRISE MARKETPLACE
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  For agribusiness enterprises, cooperatives & commodity operations.
                </p>

                <ul className="space-y-2 text-xs text-slate-800">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="font-semibold">Full 7-Agent Suite + Finance & IoT Sentinel Agents</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Enterprise LoRaWAN Mesh + Satellite Failover</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Market Rate Projections & Dynamic ROI Engine</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="font-semibold">Full Supplier & Buyer Matchmaking Platform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Dedicated 24/7 On-Call Agronomist & Unlimited Cold Archive</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleSelectTier('Pro')}
                  className={`w-full py-2 rounded text-xs font-mono-telemetry font-semibold transition-colors ${
                    userProfile.licenseTier === 'Pro'
                      ? 'bg-[#0D3B22] text-white shadow-sm'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {userProfile.licenseTier === 'Pro' ? 'Current Active Tier (Pro)' : 'Upgrade to Pro'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
