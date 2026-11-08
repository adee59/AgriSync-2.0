import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Building, 
  Key, 
  Bell, 
  Save, 
  CheckCircle2, 
  Layers, 
  Radio, 
  HardDrive, 
  Cpu, 
  Lock, 
  Smartphone,
  Mail,
  Phone,
  LayoutDashboard,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { rolePermissionsMap } from '../data/mockData';

interface ProfileSettingsViewProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  onReturnToDashboard: () => void;
  onNavigateToXai: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  userProfile,
  setUserProfile,
  onReturnToDashboard,
  onNavigateToXai,
}) => {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    farmName: userProfile.farmName,
    tenantId: userProfile.tenantId,
    loraFrequency: 'US915 (902-928 MHz)',
    deadbandThreshold: 2.0,
    smsAlerts: true,
    satellitePush: true,
    mqttEndpoint: 'mqtts://cluster-emqx.agrisync.io:8883',
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const farmsList = [
    { id: 'TENANT-AGRI-4891', name: 'Valle Verde Commercial Agro-Plex (240 ac)', role: 'Primary Enterprise' },
    { id: 'TENANT-CASC-1092', name: 'Cascade Grain Basin — Pivot Sector (650 ac)', role: 'Subsidiary Farm' },
    { id: 'TENANT-SUNB-3341', name: 'Sunburst High-Tunnel Organics (32 ac)', role: 'Controlled Environment' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setUserProfile(prev => ({ ...prev, role }));
  };

  const handleFarmSelect = (tenantId: string, farmName: string) => {
    setFormData(prev => ({ ...prev, tenantId, farmName }));
    setUserProfile(prev => ({ ...prev, tenantId, farmName }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      farmName: formData.farmName,
      tenantId: formData.tenantId,
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const currentRoleConfig = rolePermissionsMap[userProfile.role];

  return (
    <div className="space-y-6 pb-16">
      {/* Seamless Navigation Top Bar */}
      <div className="bg-[#1E293B] text-white p-4 rounded border border-[#334155] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onReturnToDashboard}
            className="p-2 rounded bg-[#0D3B22] hover:bg-[#082415] text-white border border-emerald-500/40 transition-colors flex items-center space-x-1.5 text-xs font-mono-telemetry font-bold shadow-xs"
            title="Return seamlessly to the live operational cockpit"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>← RETURN TO DASHBOARD</span>
          </button>
          <div className="text-xs text-slate-300 hidden md:block">
            <span className="text-slate-500">AgriSync Enterprise /</span> Account &amp; System Configuration
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono-telemetry">
          <span className="text-slate-400">Current Persona:</span>
          <span className="px-2.5 py-1 rounded bg-[#0D3B22] text-emerald-300 border border-emerald-500/30 font-bold">
            {currentRoleConfig.title.toUpperCase()}
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center space-x-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-mono-telemetry font-semibold">
            Profile credentials, RBAC permissions, and hardware parameters synchronized across multi-tenant cluster.
          </span>
        </div>
      )}

      {/* Main Grid: User Identity & Multi-Tenant Partitioning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Identity & Contact (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded border border-[#E2E8F0] shadow-sm p-5 space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-200">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#0D3B22] shadow-sm"
            />
            <div>
              <h2 className="font-space font-bold text-base text-[#0B1C30]">
                {userProfile.name}
              </h2>
              <span className="text-xs font-mono-telemetry text-emerald-700 font-bold block">
                {currentRoleConfig.title}
              </span>
              <span className="text-[11px] text-slate-500">{userProfile.email}</span>
            </div>
          </div>

          {/* Identity Form */}
          <form onSubmit={handleSave} className="space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-mono-telemetry uppercase text-slate-500 mb-1 font-semibold">
                Operator Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-[#0D3B22] text-xs font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-telemetry uppercase text-slate-500 mb-1 font-semibold">
                Authenticated Email (SSO / OIDC)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-[#0D3B22] text-xs font-mono-telemetry"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono-telemetry uppercase text-slate-500 mb-1 font-semibold">
                Emergency Alert Mobile
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-hidden focus:border-[#0D3B22] text-xs font-mono-telemetry"
              />
            </div>

            {/* MFA & Security Status */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-xs">FIDO2 Multi-Factor Authentication</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-emerald-100 text-emerald-800">
                  ENFORCED (HARDWARE KEY)
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Mandatory tenant security layer compliant with commercial AgTech OAuth2 / OpenID Connect policies.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#0D3B22] hover:bg-[#082415] text-white font-mono-telemetry font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Changes</span>
            </button>
          </form>

          {/* Quick Return Link */}
          <div className="pt-2 text-center">
            <button
              onClick={onReturnToDashboard}
              className="text-xs font-semibold text-[#0D3B22] hover:underline"
            >
              ← Back to Mission Control Dashboard
            </button>
          </div>
        </div>

        {/* Right Column: Section 7 Granular RBAC & Multi-Tenant Partitioning (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section 7: Granular Role-Based Access Control (RBAC) Switcher */}
          <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-mono-telemetry font-bold uppercase text-[#0D3B22]">
                  SECTION 7 SPECIFICATION
                </span>
                <h3 className="font-space font-bold text-base text-[#0B1C30]">
                  Granular Role-Based Access Control (RBAC) Persona Matrix
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-mono-telemetry bg-slate-100 text-slate-800 border border-slate-300">
                4 Defined System Roles
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-3">
              Click any role to test system authorization boundaries in real time:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(rolePermissionsMap) as UserRole[]).map((roleKey) => {
                const config = rolePermissionsMap[roleKey];
                const isSelected = userProfile.role === roleKey;

                return (
                  <div
                    key={roleKey}
                    onClick={() => handleRoleSelect(roleKey)}
                    className={`p-3 rounded border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/15 bg-emerald-50/20'
                        : 'border-[#E2E8F0] hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-space font-bold text-xs text-slate-900">{config.title}</span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                      {config.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Permissions for Selected Role */}
            <div className="mt-4 p-3.5 rounded bg-slate-50 border border-slate-200 text-xs">
              <span className="font-mono-telemetry font-bold text-[#0B1C30] text-xs block mb-2">
                Operational Permissions Granted to [{currentRoleConfig.title}]:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono-telemetry text-[11px]">
                {currentRoleConfig.allowedActions.map((action, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Multi-Tenant Organization & Farm Partitioning (Section 7 Isolation) */}
          <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <div>
                <h3 className="font-space font-bold text-base text-[#0B1C30]">
                  Multi-Tenant Farm Partitioning
                </h3>
                <p className="text-xs text-[#64748B]">
                  Database collections enforce mandatory tenant_id isolation between agribusiness properties
                </p>
              </div>
              <span className="text-xs font-mono-telemetry font-bold text-[#0D3B22]">
                Active: {userProfile.tenantId}
              </span>
            </div>

            <div className="space-y-2">
              {farmsList.map((farm) => {
                const isActive = userProfile.tenantId === farm.id;
                return (
                  <div
                    key={farm.id}
                    onClick={() => handleFarmSelect(farm.id, farm.name)}
                    className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-[#0D3B22] bg-emerald-50/20 ring-1 ring-[#0D3B22]/15'
                        : 'border-[#E2E8F0] hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building className="w-3.5 h-3.5 text-[#0D3B22]" />
                        <span className="font-space font-bold text-xs text-slate-900">{farm.name}</span>
                      </div>
                      <span className="text-[10px] font-mono-telemetry text-slate-500">
                        Partition Key: {farm.id} • {farm.role}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold ${
                      isActive ? 'bg-[#0D3B22] text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isActive ? 'CURRENT TENANT' : 'SWITCH'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Parameters & LoRaWAN Radio Mesh Config (Section 6) */}
      <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-5">
        <h3 className="font-space font-bold text-base text-[#0B1C30] mb-2">
          Section 6: On-Farm Edge Gateway & LoRaWAN Mesh Parameters
        </h3>
        <p className="text-xs text-[#64748B] mb-4">
          Hardware configurations executed locally by the solar-powered Raspberry Pi 5 gateway:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-telemetry">
          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Sub-GHz Radio Band</span>
            <select
              value={formData.loraFrequency}
              onChange={(e) => setFormData({ ...formData, loraFrequency: e.target.value })}
              className="w-full p-1.5 rounded border border-slate-300 bg-white font-mono-telemetry text-xs"
            >
              <option>US915 (902-928 MHz)</option>
              <option>EU868 (863-870 MHz)</option>
              <option>AS923 (915-928 MHz)</option>
              <option>AU915 (915-928 MHz)</option>
            </select>
            <span className="text-[10px] text-slate-400 block">5-10 year battery field coverage</span>
          </div>

          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Deadband Filter Delta Threshold</span>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                step="0.1"
                min="0.5"
                max="5.0"
                value={formData.deadbandThreshold}
                onChange={(e) => setFormData({ ...formData, deadbandThreshold: parseFloat(e.target.value) })}
                className="w-20 p-1.5 rounded border border-slate-300 bg-white font-mono-telemetry text-xs font-bold"
              />
              <span className="text-xs text-slate-700">% shift</span>
            </div>
            <span className="text-[10px] text-slate-400 block">Reduces cellular bandwidth by 76%</span>
          </div>

          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">Clustered MQTT Broker Endpoint</span>
            <input
              type="text"
              value={formData.mqttEndpoint}
              onChange={(e) => setFormData({ ...formData, mqttEndpoint: e.target.value })}
              className="w-full p-1.5 rounded border border-slate-300 bg-white font-mono-telemetry text-xs"
            />
            <span className="text-[10px] text-emerald-700 block">TLS 1.3 Clustered EMQX</span>
          </div>
        </div>
      </div>
    </div>
  );
};
