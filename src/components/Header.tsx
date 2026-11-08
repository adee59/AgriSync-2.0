import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  FileText, 
  SlidersHorizontal, 
  User, 
  ChevronDown, 
  Cpu, 
  Activity, 
  AlertTriangle,
  LayoutDashboard,
  Eye,
  Scan,
  Store,
  Radio
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { rolePermissionsMap } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isWanOnline: boolean;
  setIsWanOnline: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenProposal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  userProfile,
  setUserProfile,
  isWanOnline,
  setIsWanOnline,
  onOpenProposal,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [emergencyOverrideActive, setEmergencyOverrideActive] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setUserProfile(prev => ({ ...prev, role }));
    setShowRoleMenu(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Telemetry Cockpit', icon: LayoutDashboard },
    { id: 'xai', label: 'XAI Heuristic Matrix', icon: Eye },
    { id: 'cv', label: 'Vision Pathology (YOLOv8)', icon: Scan },
    { id: 'marketplace', label: 'B2B Marketplace (Pro)', icon: Store },
    { id: 'edge', label: 'Edge & Fault Protocols', icon: Radio },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1E293B] text-white border-b border-[#334155] shadow-md">
      {/* Top Utility & Operational Status Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-mono-telemetry text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold tracking-wide">SYSTEM OPTIMAL</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="font-mono-telemetry text-slate-300 hidden md:inline">
            SLA: <strong className="text-white">99.99%</strong>
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="font-mono-telemetry text-slate-300 hidden sm:inline">
            FLEET: <strong className="text-emerald-400">7 AGENTS ACTIVE</strong>
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="font-mono-telemetry text-slate-300">
            TENANT: <span className="text-slate-100 font-semibold">{userProfile.tenantId}</span>
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Edge / WAN Network Resilience Toggle */}
          <button
            onClick={() => setIsWanOnline(prev => !prev)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono-telemetry border transition-colors ${
              isWanOnline 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60' 
                : 'bg-amber-950/80 border-amber-500 text-amber-300 hover:bg-amber-900 animate-pulse'
            }`}
            title="Click to simulate WAN Network Outage and verify Edge Gateway Store-and-Forward offline protocol"
          >
            {isWanOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>WAN ONLINE (MQTT CLUSTER)</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>EDGE STORE-AND-FORWARD (OFFLINE)</span>
              </>
            )}
          </button>

          {/* Master Proposal Blueprint Button */}
          <button
            onClick={onOpenProposal}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#0D3B22] hover:bg-[#082415] border border-emerald-600/40 text-emerald-200 text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Master Proposal</span>
            <span className="sm:hidden">Proposal</span>
          </button>
        </div>
      </div>

      {/* Main Brand & Navigation Rail */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div 
          onClick={() => setCurrentTab('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded bg-[#0D3B22] border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-inner group-hover:border-emerald-400 transition-colors">
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-space text-lg font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                AgriSync<span className="text-emerald-400 font-light ml-0.5">Enterprise</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono-telemetry font-bold tracking-wider rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                v4.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
              Autonomous Multi-Agent AgTech & Telemetry Orchestration
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#0D3B22] text-white border border-emerald-500/50 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Role Switcher & Profile Navigation Button */}
        <div className="flex items-center space-x-2.5">
          {/* Quick RBAC Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-2 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-700 text-xs hover:border-slate-500 text-left transition-colors"
            >
              <div className="hidden sm:block">
                <span className="text-[10px] text-slate-400 block uppercase font-mono-telemetry leading-none">Role</span>
                <span className="font-semibold text-slate-200">
                  {rolePermissionsMap[userProfile.role].title}
                </span>
              </div>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 sm:hidden" />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-64 rounded bg-[#1E293B] border border-slate-700 shadow-xl py-1 z-50">
                <div className="px-3 py-1.5 border-b border-slate-700/80 text-[11px] font-mono-telemetry text-slate-400 uppercase">
                  Switch Active RBAC Persona
                </div>
                {(Object.keys(rolePermissionsMap) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleChange(r)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-start space-x-2 hover:bg-slate-800 transition-colors ${
                      userProfile.role === r ? 'bg-emerald-950/60 text-emerald-300 border-l-2 border-emerald-400' : 'text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{rolePermissionsMap[r].title}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{rolePermissionsMap[r].desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seamless Navigation: Quick Profile Switcher / Settings Button */}
          <button
            onClick={() => setCurrentTab(currentTab === 'profile' ? 'dashboard' : 'profile')}
            className={`flex items-center space-x-2 pl-2 pr-3 py-1 rounded border transition-all ${
              currentTab === 'profile'
                ? 'bg-[#0D3B22] border-emerald-400 text-white'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 text-slate-200'
            }`}
            title="Seamlessly toggle between operational cockpit and Profile / Organization Settings"
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-6 h-6 rounded-full object-cover border border-emerald-400/50"
            />
            <span className="text-xs font-medium hidden sm:inline">
              {currentTab === 'profile' ? 'Dashboard' : 'Profile'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-slate-800 px-2 py-1.5 flex items-center justify-between overflow-x-auto space-x-1 no-scrollbar text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded whitespace-nowrap transition-colors ${
                isActive ? 'bg-[#0D3B22] text-white border border-emerald-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
