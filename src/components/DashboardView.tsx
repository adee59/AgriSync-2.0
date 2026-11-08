import React, { useState } from 'react';
import { 
  Droplets, 
  CloudRain, 
  Bug, 
  Zap, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Sliders, 
  Radio, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  Terminal, 
  Pause, 
  Play, 
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { AutonomousAgent, FieldZone, MqttPacket, UserProfile } from '../types';

interface DashboardViewProps {
  agents: AutonomousAgent[];
  setAgents: React.Dispatch<React.SetStateAction<AutonomousAgent[]>>;
  fieldZones: FieldZone[];
  setFieldZones: React.Dispatch<React.SetStateAction<FieldZone[]>>;
  mqttPackets: MqttPacket[];
  isWanOnline: boolean;
  userProfile: UserProfile;
  onNavigateToXai: () => void;
  onNavigateToCv: () => void;
  onNavigateToMarketplace: () => void;
  onNavigateToProfile: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  agents,
  setAgents,
  fieldZones,
  setFieldZones,
  mqttPackets,
  isWanOnline,
  userProfile,
  onNavigateToXai,
  onNavigateToCv,
  onNavigateToMarketplace,
  onNavigateToProfile,
}) => {
  const [selectedZone, setSelectedZone] = useState<FieldZone>(fieldZones[0]);
  const [isMqttPaused, setIsMqttPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'warning'>('all');
  const [actionNotice, setActionNotice] = useState<string | null>(
    'Deterministic Meta-Orchestrator active: SC-03 heuristic enforced (Dry soil detected but 78% rainfall imminent — irrigation deferred to conserve 24,000L water).'
  );

  const handleAgentOverride = (agentId: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const isTripped = !a.circuitBreakerTripped;
        return {
          ...a,
          circuitBreakerTripped: isTripped,
          status: isTripped ? 'circuit_isolated' : 'optimal',
          statusText: isTripped ? 'MANUAL_OVERRIDE_HELD' : 'OPTIMIZING_VRA',
        };
      }
      return a;
    }));
    setActionNotice(`Operator Override toggled for agent [${agentId.toUpperCase()}]. Circuit breaker status updated.`);
  };

  const handleToggleValve = (zoneId: string) => {
    setFieldZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        const nextStatus = z.irrigationStatus === 'ACTIVE' ? 'IDLE' : 'ACTIVE';
        return {
          ...z,
          irrigationStatus: nextStatus,
          valveOpenPct: nextStatus === 'ACTIVE' ? 80 : 0,
          flowRateLpm: nextStatus === 'ACTIVE' ? 380 : 0,
        };
      }
      return z;
    }));
  };

  const filteredAgents = agents.filter(a => {
    if (activeFilter === 'warning') return a.status === 'warning' || a.status === 'circuit_isolated';
    if (activeFilter === 'active') return a.status === 'optimal' || a.status === 'active';
    return true;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Top Banner: Active Deterministic Heuristic Resolution */}
      {actionNotice && (
        <div className="bg-[#0D3B22] text-white p-3 rounded border border-emerald-500/40 flex items-start justify-between gap-3 shadow-sm">
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div className="text-xs">
              <span className="font-mono-telemetry font-bold text-emerald-300 mr-2 uppercase tracking-wider">
                [XAI HEURISTIC RESOLUTION ACTIVE]
              </span>
              <span className="text-slate-100">{actionNotice}</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigateToXai()}
            className="text-[11px] font-mono-telemetry underline text-emerald-300 hover:text-white shrink-0 flex items-center space-x-1"
          >
            <span>Inspect Glass Box</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* KPI High-Density Telemetry Strip (4 Metrics aligned with design system) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Metric 1: Soil Moisture & VRA */}
        <div className="bg-white p-3.5 rounded border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-space font-semibold uppercase tracking-wider">Soil Telemetry (VWC)</span>
            <Droplets className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono-telemetry text-2xl font-bold text-[#0B1C30]">28.4%</span>
            <span className="text-xs font-mono-telemetry text-emerald-600 font-semibold">+23.8% VRA Sav.</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex justify-between font-mono-telemetry border-t border-slate-100 pt-1.5">
            <span>Tension: 34 cbar</span>
            <span className="text-emerald-700 font-medium">4/16 Valves Open</span>
          </div>
        </div>

        {/* Metric 2: Weather & Precipitation Window */}
        <div className="bg-white p-3.5 rounded border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-space font-semibold uppercase tracking-wider">Radar Weather</span>
            <CloudRain className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono-telemetry text-2xl font-bold text-amber-600">78%</span>
            <span className="text-xs font-mono-telemetry text-[#64748B]">Precip (4h window)</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex justify-between font-mono-telemetry border-t border-slate-100 pt-1.5">
            <span>Wind: 14 km/h SW</span>
            <span className="text-emerald-600 font-medium">Frost: 0.0%</span>
          </div>
        </div>

        {/* Metric 3: Phytopathology Severity */}
        <div className="bg-white p-3.5 rounded border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-space font-semibold uppercase tracking-wider">Vision Pathology</span>
            <Bug className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono-telemetry text-2xl font-bold text-[#0B1C30]">4.2%</span>
            <span className="text-xs font-mono-telemetry text-emerald-600">Below Action Limit</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex justify-between font-mono-telemetry border-t border-slate-100 pt-1.5">
            <span>YOLOv8: 32ms</span>
            <span className="text-slate-700 font-medium">Drone: DOCKED</span>
          </div>
        </div>

        {/* Metric 4: Micro-Grid Energy */}
        <div className="bg-white p-3.5 rounded border border-[#E2E8F0] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-space font-semibold uppercase tracking-wider">Microgrid Solar</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono-telemetry text-2xl font-bold text-[#0B1C30]">48.2 kW</span>
            <span className="text-xs font-mono-telemetry text-emerald-700 font-medium">94% SoC</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex justify-between font-mono-telemetry border-t border-slate-100 pt-1.5">
            <span>Draw: 18.4 kW</span>
            <span className="text-emerald-600 font-medium">+29.8 kW Export</span>
          </div>
        </div>

        {/* Metric 5: Autonomous Finance */}
        <div className="bg-white p-3.5 rounded border border-[#E2E8F0] shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1">
            <span className="font-space font-semibold uppercase tracking-wider">Dynamic ROI</span>
            <TrendingUp className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-mono-telemetry text-2xl font-bold text-[#0B1C30]">$118.40</span>
            <span className="text-xs text-[#64748B]">/ acre op cost</span>
          </div>
          <div className="mt-2 text-[11px] text-[#64748B] flex justify-between font-mono-telemetry border-t border-slate-100 pt-1.5">
            <span>Yield Est: 480 MT</span>
            <span className="text-emerald-700 font-bold">+46.8% Margin</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Field Zones Map (Digital Twin) & Zone Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Field Zones Map: 7 Columns */}
        <div className="lg:col-span-7 bg-white rounded border border-[#E2E8F0] shadow-sm p-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
            <div>
              <h2 className="font-space text-base font-bold text-[#0B1C30]">
                Digital Twin — Quad Farm Field Matrix
              </h2>
              <p className="text-xs text-[#64748B]">
                Interactive high-density telemetry from 128 LoRaWAN sub-GHz soil nodes
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono-telemetry text-[#64748B]">Mesh Status:</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                127/128 SYNCED
              </span>
            </div>
          </div>

          {/* Interactive Zone Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fieldZones.map((zone) => {
              const isSelected = selectedZone.id === zone.id;
              let statusBadgeBg = 'bg-slate-100 text-slate-700 border-slate-300';
              if (zone.irrigationStatus === 'ACTIVE') statusBadgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
              if (zone.irrigationStatus === 'DEFERRED') statusBadgeBg = 'bg-amber-100 text-amber-800 border-amber-300';

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`p-3.5 rounded border transition-all cursor-pointer relative ${
                    isSelected 
                      ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/10 bg-emerald-50/20' 
                      : 'border-[#E2E8F0] hover:border-slate-400 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono-telemetry text-[11px] text-[#64748B] block font-semibold">
                        {zone.id}
                      </span>
                      <h3 className="font-space font-bold text-sm text-[#0B1C30] leading-tight">
                        {zone.name}
                      </h3>
                      <span className="text-xs text-[#64748B] italic">{zone.crop} ({zone.acreage} ac)</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold border uppercase ${statusBadgeBg}`}>
                      {zone.irrigationStatus}
                    </span>
                  </div>

                  {/* Zone Mini Telemetry Gauges */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-center font-mono-telemetry text-xs">
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[10px] text-[#64748B] block">VWC Moisture</span>
                      <strong className={`text-xs ${zone.soilMoisture < 20 ? 'text-amber-600' : 'text-[#0B1C30]'}`}>
                        {zone.soilMoisture}%
                      </strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[10px] text-[#64748B] block">Tension</span>
                      <strong className="text-xs text-[#0B1C30]">{zone.soilTensionCbar} cbar</strong>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-[10px] text-[#64748B] block">Pest Risk</span>
                      <strong className={`text-xs ${zone.pestRiskPct > 50 ? 'text-red-600' : 'text-emerald-700'}`}>
                        {zone.pestRiskPct}%
                      </strong>
                    </div>
                  </div>

                  {/* Flow Rate / Valve Indicator */}
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono-telemetry">
                    <span className="text-[#64748B]">Actuator Valve: {zone.valveOpenPct}%</span>
                    <span className="text-slate-700 font-semibold">{zone.flowRateLpm} LPM</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-[#64748B]">
            <span>Click any quadrant to inspect real-time Variable Rate Application (VRA) telemetry.</span>
            <button 
              onClick={onNavigateToCv}
              className="text-[#0D3B22] font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Scan leaf pathology in Vision Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Zone Deep Dive / Tactical Control Drawer: 5 Columns */}
        <div className="lg:col-span-5 bg-white rounded border border-[#E2E8F0] shadow-sm p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] mb-3">
              <div>
                <span className="text-[10px] font-mono-telemetry uppercase text-[#64748B] font-bold">
                  Active Focus Zone
                </span>
                <h3 className="font-space text-base font-bold text-[#0B1C30]">
                  {selectedZone.name}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-mono-telemetry bg-slate-100 text-slate-800 border border-slate-300">
                {selectedZone.id}
              </span>
            </div>

            {/* Agronomic Sensor Details */}
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-mono-telemetry uppercase text-[#64748B] mb-1 font-semibold">
                  NPK Macronutrient Balance (Variable Rate Application)
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono-telemetry text-center">
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Nitrogen (N)</span>
                    <span className="font-bold text-[#0D3B22]">{selectedZone.npk.n} ppm</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Phosphorus (P)</span>
                    <span className="font-bold text-[#0D3B22]">{selectedZone.npk.p} ppm</span>
                  </div>
                  <div className="bg-white p-1 rounded border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">Potassium (K)</span>
                    <span className="font-bold text-[#0D3B22]">{selectedZone.npk.k} ppm</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono-telemetry text-xs">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Canopy Temperature</span>
                  <span className="font-bold text-slate-900">{selectedZone.temperatureC} °C</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 block">Relative Humidity</span>
                  <span className="font-bold text-slate-900">{selectedZone.humidityPct} %</span>
                </div>
              </div>

              {/* Actuator Status & Manual Testing */}
              <div className="p-3 rounded border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 text-xs">Hydraulic Solenoid Valve</span>
                  <span className={`text-[11px] font-mono-telemetry font-bold ${
                    selectedZone.irrigationStatus === 'ACTIVE' ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {selectedZone.irrigationStatus === 'ACTIVE' ? 'VALVE ENGAGED (80%)' : 'VALVE SHUT (0%)'}
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Controlled automatically via Meta-Orchestrator heuristic. Operators can run on-demand stroke tests.
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleValve(selectedZone.id)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold font-mono-telemetry transition-colors ${
                      selectedZone.irrigationStatus === 'ACTIVE'
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-[#0D3B22] hover:bg-[#082415] text-white'
                    }`}
                  >
                    {selectedZone.irrigationStatus === 'ACTIVE' ? 'DISENGAGE VALVE' : 'MANUAL STROKE TEST'}
                  </button>
                  <span className="font-mono-telemetry text-xs text-slate-700">
                    Flow: <strong>{selectedZone.flowRateLpm} LPM</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">LoRa Probe: #SN-042 (RSSI: -72 dBm)</span>
            <button
              onClick={onNavigateToProfile}
              className="text-[#0D3B22] font-semibold hover:underline"
            >
              Zone Permissions →
            </button>
          </div>
        </div>
      </div>

      {/* Autonomous Domain Agent Fleet Table (Section 3 of Proposal) */}
      <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E2E8F0] gap-2 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-space text-base font-bold text-[#0B1C30]">
                Autonomous Domain Agent Fleet
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                MAS v4
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Collaborative cognitive network operating over asynchronous MQTT bus with Celery process isolation
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 text-xs bg-slate-100 p-1 rounded">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Agents (7)
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter('warning')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeFilter === 'warning' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Needs Attention
            </button>
          </div>
        </div>

        {/* Dense Tabular Agent List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[#64748B] font-mono-telemetry uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Agent & Architectural Section</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Task Vector</th>
                <th className="py-2.5 px-3">Telemetry Digest</th>
                <th className="py-2.5 px-3">Load / Rate</th>
                <th className="py-2.5 px-3 text-right">Circuit Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAgents.map((agent) => {
                let statusBadge = (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>{agent.statusText}</span>
                  </span>
                );
                if (agent.status === 'warning') {
                  statusBadge = (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
                      <span>{agent.statusText}</span>
                    </span>
                  );
                }
                if (agent.status === 'circuit_isolated') {
                  statusBadge = (
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-mono-telemetry font-bold bg-red-100 text-red-800 border border-red-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      <span>ISOLATED_OVERRIDE</span>
                    </span>
                  );
                }

                return (
                  <tr key={agent.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 font-space text-[13px]">
                        {agent.name}
                      </div>
                      <span className="text-[10px] font-mono-telemetry text-slate-500">
                        {agent.section}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {statusBadge}
                    </td>
                    <td className="py-3 px-3 text-slate-700 max-w-xs truncate">
                      {agent.currentTask}
                    </td>
                    <td className="py-3 px-3 font-mono-telemetry text-[11px] text-slate-800">
                      {agent.telemetrySummary}
                    </td>
                    <td className="py-3 px-3 font-mono-telemetry text-[11px] text-slate-600 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-slate-200 h-1.5 rounded overflow-hidden">
                          <div 
                            className={`h-full ${agent.computeLoad > 50 ? 'bg-amber-500' : 'bg-emerald-600'}`} 
                            style={{ width: `${agent.computeLoad}%` }}
                          />
                        </div>
                        <span>{agent.computeLoad}%</span>
                        <span className="text-[10px] text-slate-400">({agent.frequencyHz}Hz)</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleAgentOverride(agent.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono-telemetry font-semibold border transition-colors ${
                          agent.circuitBreakerTripped
                            ? 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                        title="Toggle Celery supervisor process isolation or manual override"
                      >
                        {agent.circuitBreakerTripped ? 'CLEAR ISOLATION' : 'OVERRIDE'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clustered MQTT Message Bus (`agrisync/#`) Stream & Quick Jump Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* MQTT Terminal Feed: 8 cols */}
        <div className="lg:col-span-8 bg-[#1E293B] text-slate-200 rounded border border-[#334155] shadow-sm p-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="font-mono-telemetry text-xs font-bold text-white uppercase tracking-wider">
                Clustered MQTT Broker Feed (Topic Tree: agrisync/#)
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono-telemetry text-slate-400">
                Broker: EMQX Clustered (TLS 8883)
              </span>
              <button
                onClick={() => setIsMqttPaused(!isMqttPaused)}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title={isMqttPaused ? 'Resume live packet stream' : 'Pause stream'}
              >
                {isMqttPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="font-mono-telemetry text-[11px] space-y-1.5 max-h-52 overflow-y-auto pr-1">
            {mqttPackets.map((pkt) => (
              <div key={pkt.id} className="p-1.5 rounded bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-2">
                <div className="truncate">
                  <span className="text-emerald-400 mr-2">[{pkt.timestamp}]</span>
                  <span className="text-amber-400 mr-2">{pkt.topic}</span>
                  <span className="text-slate-300 font-mono text-[10px]">{pkt.payload}</span>
                </div>
                <div className="shrink-0 text-slate-400 text-[10px]">
                  <span>QoS {pkt.qos}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[10px] font-mono-telemetry text-slate-400 flex items-center justify-between">
            <span>Deadband filter: report-by-exception threshold active (&gt;2% delta)</span>
            <span className="text-emerald-400">Average Message Latency: 12ms</span>
          </div>
        </div>

        {/* Tactical Cross-Navigation Panel: 4 cols */}
        <div className="lg:col-span-4 bg-white rounded border border-[#E2E8F0] shadow-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-space font-bold text-sm text-[#0B1C30] mb-1">
              Integrated Modules & Subsystems
            </h3>
            <p className="text-xs text-[#64748B] mb-3">
              Direct access to multi-agent capabilities specified in commercial proposal:
            </p>

            <div className="space-y-2">
              <button
                onClick={onNavigateToXai}
                className="w-full text-left p-2.5 rounded border border-[#E2E8F0] hover:border-[#0D3B22] hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900 font-space">
                    Explainable AI (XAI) Matrix
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Test scenarios SC-01 through SC-05 & conflict resolution
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0D3B22]" />
              </button>

              <button
                onClick={onNavigateToCv}
                className="w-full text-left p-2.5 rounded border border-[#E2E8F0] hover:border-[#0D3B22] hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900 font-space">
                    YOLOv8 Computer Vision Pathology
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Real-time leaf scanner & plant disease detection
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0D3B22]" />
              </button>

              <button
                onClick={onNavigateToMarketplace}
                className="w-full text-left p-2.5 rounded border border-[#E2E8F0] hover:border-[#0D3B22] hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900 font-space">
                    B2B Marketplace & Forward Contracts
                  </div>
                  <div className="text-[11px] text-slate-500">
                    1-click automated procurement & yield off-take locks
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0D3B22]" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Farm: Valle Verde Agro-Plex</span>
            <button
              onClick={onNavigateToProfile}
              className="text-[#0D3B22] font-semibold hover:underline"
            >
              Account Settings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
