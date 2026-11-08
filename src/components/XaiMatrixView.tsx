import React, { useState } from 'react';
import { 
  Eye, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Database, 
  ArrowRight, 
  RotateCcw, 
  HelpCircle,
  ShieldCheck,
  Zap,
  Droplets,
  CloudRain,
  Wind,
  Bug,
  Download
} from 'lucide-react';
import { HeuristicScenario } from '../types';
import { heuristicScenarios } from '../data/mockData';

export const XaiMatrixView: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<HeuristicScenario>(heuristicScenarios[2]); // Default SC-03
  
  // Interactive Simulator State
  const [customMoisture, setCustomMoisture] = useState<number>(22);
  const [customRainProb, setCustomRainProb] = useState<number>(85);
  const [customWindSpeed, setCustomWindSpeed] = useState<number>(14);
  const [customPestSeverity, setCustomPestSeverity] = useState<number>(12);
  const [customSolarKw, setCustomSolarKw] = useState<number>(34);

  // Asynchronous Decision Log (TimescaleDB / MongoDB Simulation)
  const [decisionLog, setDecisionLog] = useState([
    {
      id: 'DEC-88192',
      timestamp: '11:18:41.200',
      action: 'DEFER IRRIGATION',
      actionType: 'defer',
      rule: 'SC-03 Heuristic',
      soil: 22,
      rain: 85,
      wind: 14,
      pest: 12,
      saved: '24,000 L Water ($84.00)',
      justification: 'Soil moisture dry (22%), but imminent heavy rainfall (>70% at 85%) detected. Irrigation deferred to prevent nutrient leaching and energy wastage.',
    },
    {
      id: 'DEC-88184',
      timestamp: '11:15:10.050',
      action: 'ACTIVATE IRRIGATION',
      actionType: 'irrigate',
      rule: 'SC-02 Heuristic',
      soil: 18,
      rain: 20,
      wind: 10,
      pest: 8,
      saved: 'Hydraulic root stress mitigated',
      justification: 'Critical soil dryness (<30%). Low natural rain probability (20%). High-pressure valves engaged for VRA delivery.',
    },
    {
      id: 'DEC-88172',
      timestamp: '11:02:44.890',
      action: 'ABORT SPRAYING',
      actionType: 'abort',
      rule: 'SC-04 Heuristic',
      soil: 35,
      rain: 15,
      wind: 32,
      pest: 65,
      saved: 'Chemical drift regulatory fine ($5,000+)',
      justification: 'Pathology threshold exceeded (65%), but high wind speed (32 km/h > 20 km/h ceiling) creates catastrophic chemical drift risk.',
    },
  ]);

  // Load Preset
  const handleSelectPreset = (scenario: HeuristicScenario) => {
    setSelectedPreset(scenario);
    setCustomMoisture(scenario.soilMoisture);
    setCustomRainProb(scenario.rainProb);
    setCustomWindSpeed(scenario.windSpeed);
    setCustomPestSeverity(scenario.pestSeverity);
    setCustomSolarKw(scenario.solarPowerKw);
  };

  // Deterministic Conflict Evaluation Engine
  const evaluateConflict = () => {
    // Check Pest & Chemical Spraying conflicts first
    if (customPestSeverity > 20) {
      if (customWindSpeed > 20) {
        return {
          action: 'ABORT SPRAYING' as const,
          actionType: 'abort' as const,
          scenarioId: 'SC-04',
          conflictAgents: ['Phytopathology Agent (Requested Spray)', 'Meteorological Agent (High Wind Velocity)'],
          justification: `Pathology threshold exceeded (${customPestSeverity}% > 20%), but high wind velocity (${customWindSpeed} km/h > 20 km/h safe limit) creates high chemical drift risk into adjacent buffer zones. Spraying aborted.`,
          savings: 'Averted off-target chemical drift and compliance penalty',
        };
      }
      if (customRainProb > 70) {
        return {
          action: 'ABORT SPRAYING' as const,
          actionType: 'abort' as const,
          scenarioId: 'SC-05',
          conflictAgents: ['Phytopathology Agent (Requested Spray)', 'Meteorological Agent (Approaching Downpour)'],
          justification: `Pest severity confirmed (${customPestSeverity}%), but imminent torrential rain (${customRainProb}% > 70%) will wash off chemical inputs within 45 minutes. Spraying aborted to prevent input wastage and runoff.`,
          savings: 'Saved $4,200 in washed-away crop protection inputs',
        };
      }
      return {
        action: 'DISPATCH SPRAYER' as const,
        actionType: 'dispatch' as const,
        scenarioId: 'CUSTOM-VRA-SPRAY',
        conflictAgents: ['Phytopathology Agent (Confirmed Hotspot)', 'Meteorological Agent (Weather Cleared)'],
        justification: `Pest/pathogen severity is elevated at ${customPestSeverity}%. Wind speed (${customWindSpeed} km/h) and rain probability (${customRainProb}%) are both within safe operational envelope. Sprayer mission authorized.`,
        savings: 'Targeted spot treatment stops pathogen spread',
      };
    }

    // Check Soil & Irrigation conflicts
    if (customMoisture < 30) {
      if (customRainProb > 70) {
        return {
          action: 'DEFER IRRIGATION' as const,
          actionType: 'defer' as const,
          scenarioId: 'SC-03',
          conflictAgents: ['Soil Telemetry Agent (Soil Dryness Trigger)', 'Meteorological Agent (Imminent Rain >70%)'],
          justification: `Soil moisture dry (${customMoisture}% < 30%), but imminent heavy rainfall (${customRainProb}% > 70%) detected. Irrigation deferred to prevent over-saturation, water wastage, and nutrient leaching.`,
          savings: 'Conserves ~24,000L water and protects root zone',
        };
      }
      return {
        action: 'ACTIVATE IRRIGATION' as const,
        actionType: 'irrigate' as const,
        scenarioId: 'SC-02',
        conflictAgents: ['Soil Telemetry Agent (Dryness)', 'Energy Agent (Solar Power Available)'],
        justification: `Critical soil dryness (${customMoisture}% < 30%). Low natural rain probability (${customRainProb}%). High-pressure VRA solenoid valves engaged.`,
        savings: 'Mitigates drought stress; optimizes yield potential',
      };
    }

    // Default: Equilibrium
    return {
      action: 'SYSTEM IDLE' as const,
      actionType: 'idle' as const,
      scenarioId: 'SC-01',
      conflictAgents: ['Soil Telemetry Agent (Equilibrium)', 'All Agents (Quiescent)'],
      justification: `Optimal moisture levels maintained (${customMoisture}% within safe root tolerance band). Natural rain probability at ${customRainProb}%. No physical resource deployment required.`,
      savings: 'Zero unnecessary energy or water expenditure',
    };
  };

  const currentResult = evaluateConflict();

  const handleCommitDecisionToAudit = () => {
    const newEntry = {
      id: `DEC-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: new Date().toLocaleTimeString(),
      action: currentResult.action,
      actionType: currentResult.actionType,
      rule: `${currentResult.scenarioId} Deterministic Heuristic`,
      soil: customMoisture,
      rain: customRainProb,
      wind: customWindSpeed,
      pest: customPestSeverity,
      saved: currentResult.savings,
      justification: currentResult.justification,
    };
    setDecisionLog([newEntry, ...decisionLog]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* View Header */}
      <div className="bg-white p-5 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                SECTION 4 SPECIFICATION
              </span>
              <span className="text-xs font-mono-telemetry text-[#64748B]">
                Explainable AI (XAI) "Glass Box" Architecture
              </span>
            </div>
            <h1 className="font-space text-2xl font-bold text-[#0B1C30] mt-1">
              Deterministic Conflict-Resolution Logic Engine
            </h1>
            <p className="text-xs text-[#64748B] max-w-3xl mt-1">
              Eliminates legacy single-variable automation mistakes (e.g. irrigating right before torrential rainfall or spraying bio-fungicides into high crosswinds). Simultaneous multi-domain telemetry evaluation with mathematically auditable decision logs.
            </p>
          </div>
          <button
            onClick={handleCommitDecisionToAudit}
            className="px-3.5 py-2 rounded bg-[#0D3B22] hover:bg-[#082415] text-white text-xs font-medium font-mono-telemetry flex items-center space-x-1.5 transition-colors self-start shrink-0"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Log Vector to TimescaleDB</span>
          </button>
        </div>
      </div>

      {/* Preset Scenario Selector Bar (SC-01 through SC-05 from Master Proposal Table) */}
      <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-space font-bold text-sm text-[#0B1C30]">
            Commercial Proposal Heuristic Scenarios (Section 4 Reference Matrix)
          </h2>
          <span className="text-xs font-mono-telemetry text-[#64748B]">Click preset to load telemetry vectors</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {heuristicScenarios.map((sc) => {
            const isSelected = selectedPreset.id === sc.id;
            let badgeBg = 'bg-slate-100 text-slate-800 border-slate-300';
            if (sc.actionType === 'irrigate') badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            if (sc.actionType === 'defer') badgeBg = 'bg-amber-100 text-amber-800 border-amber-300';
            if (sc.actionType === 'abort') badgeBg = 'bg-red-100 text-red-800 border-red-300';

            return (
              <button
                key={sc.id}
                onClick={() => handleSelectPreset(sc)}
                className={`p-3 text-left rounded border transition-all ${
                  isSelected
                    ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/15 bg-emerald-50/25'
                    : 'border-[#E2E8F0] hover:border-slate-400 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono-telemetry font-bold text-xs text-[#0D3B22]">{sc.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono-telemetry font-bold border uppercase ${badgeBg}`}>
                    {sc.orchestratorAction}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 truncate font-space">
                  {sc.name}
                </div>
                <div className="mt-2 text-[10px] font-mono-telemetry text-slate-500 space-y-0.5 border-t border-slate-100 pt-1.5">
                  <div>Moisture: {sc.soilMoisture}% | Rain: {sc.rainProb}%</div>
                  <div>Wind: {sc.windSpeed} km/h | Pest: {sc.pestSeverity}%</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Meta-Orchestrator Sandbox & Live Heuristic Resolution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Input Telemetry Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white p-4 rounded border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                Telemetry Simulation Controls
              </h3>
              <p className="text-xs text-[#64748B]">Adjust domain variables to trigger conflict resolution</p>
            </div>
            <button
              onClick={() => handleSelectPreset(heuristicScenarios[0])}
              className="text-xs text-[#64748B] hover:text-[#0D3B22] flex items-center space-x-1"
              title="Reset to nominal equilibrium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider 1: Soil Moisture */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono-telemetry">
              <span className="flex items-center space-x-1 text-slate-700">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>Soil Moisture (VWC)</span>
              </span>
              <strong className={`font-bold ${customMoisture < 30 ? 'text-amber-600' : 'text-[#0D3B22]'}`}>
                {customMoisture}%
              </strong>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={customMoisture}
              onChange={(e) => setCustomMoisture(Number(e.target.value))}
              className="w-full accent-[#0D3B22] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry">
              <span>5% (Parched)</span>
              <span className="text-amber-600 font-semibold">&lt;30% (Dry Threshold)</span>
              <span>60% (Saturated)</span>
            </div>
          </div>

          {/* Slider 2: Rain Probability */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono-telemetry">
              <span className="flex items-center space-x-1 text-slate-700">
                <CloudRain className="w-3.5 h-3.5 text-blue-500" />
                <span>Precipitation Probability (4h Window)</span>
              </span>
              <strong className={`font-bold ${customRainProb > 70 ? 'text-blue-600 font-extrabold' : 'text-slate-800'}`}>
                {customRainProb}%
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={customRainProb}
              onChange={(e) => setCustomRainProb(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry">
              <span>0% (Dry Sky)</span>
              <span className="text-blue-600 font-semibold">&gt;70% (Imminent Storm Lock)</span>
              <span>100% (Downpour)</span>
            </div>
          </div>

          {/* Slider 3: Wind Velocity */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono-telemetry">
              <span className="flex items-center space-x-1 text-slate-700">
                <Wind className="w-3.5 h-3.5 text-teal-600" />
                <span>Wind Velocity Vector</span>
              </span>
              <strong className={`font-bold ${customWindSpeed > 20 ? 'text-red-600' : 'text-slate-800'}`}>
                {customWindSpeed} km/h
              </strong>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              value={customWindSpeed}
              onChange={(e) => setCustomWindSpeed(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry">
              <span>2 km/h (Calm)</span>
              <span className="text-red-600 font-semibold">&gt;20 km/h (Chemical Drift Lock)</span>
              <span>50 km/h (Gale)</span>
            </div>
          </div>

          {/* Slider 4: Pest / Disease Severity */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono-telemetry">
              <span className="flex items-center space-x-1 text-slate-700">
                <Bug className="w-3.5 h-3.5 text-amber-600" />
                <span>YOLOv8 Pest / Disease Severity</span>
              </span>
              <strong className={`font-bold ${customPestSeverity > 20 ? 'text-amber-600' : 'text-emerald-700'}`}>
                {customPestSeverity}%
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={customPestSeverity}
              onChange={(e) => setCustomPestSeverity(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry">
              <span>0% (Clean)</span>
              <span className="text-amber-600 font-semibold">&gt;20% (Treatment Trigger)</span>
              <span>95% (Outbreak)</span>
            </div>
          </div>

          {/* Slider 5: Solar PV Generation */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between font-mono-telemetry">
              <span className="flex items-center space-x-1 text-slate-700">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Microgrid Solar Generation</span>
              </span>
              <strong className="font-bold text-slate-800">{customSolarKw} kW</strong>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={customSolarKw}
              onChange={(e) => setCustomSolarKw(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono-telemetry">
              <span>0 kW (Night/Overcast)</span>
              <span>60 kW (Peak Irradiance)</span>
            </div>
          </div>
        </div>

        {/* Right: Real-time Orchestrator Execution & Explainable AI (XAI) Justification (7 cols) */}
        <div className="lg:col-span-7 bg-[#1E293B] text-white p-5 rounded border border-[#334155] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-space font-bold text-base text-white">
                    Meta-Orchestrator "Glass Box" Decision Engine
                  </h3>
                  <span className="text-xs text-slate-400 font-mono-telemetry">
                    Deterministic Heuristic Parser: Active
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono-telemetry font-bold bg-slate-800 border border-slate-600 text-emerald-300">
                SUB-15MS LOCAL LATENCY
              </span>
            </div>

            {/* Orchestrator Output Banner */}
            <div className="p-4 rounded bg-slate-900 border border-slate-700 mb-4">
              <div className="text-[11px] font-mono-telemetry text-slate-400 uppercase tracking-wider mb-1">
                Evaluated Orchestrator Action
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentResult.actionType === 'irrigate' && <Droplets className="w-7 h-7 text-emerald-400" />}
                  {currentResult.actionType === 'defer' && <AlertTriangle className="w-7 h-7 text-amber-400" />}
                  {currentResult.actionType === 'abort' && <XCircle className="w-7 h-7 text-red-400" />}
                  {currentResult.actionType === 'dispatch' && <Bug className="w-7 h-7 text-teal-400" />}
                  {currentResult.actionType === 'idle' && <CheckCircle2 className="w-7 h-7 text-blue-400" />}
                  <div>
                    <h2 className="font-space text-xl font-bold tracking-tight text-white">
                      {currentResult.action}
                    </h2>
                    <span className="text-xs font-mono-telemetry text-slate-300">
                      Rule Mapping: {currentResult.scenarioId}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono-telemetry">
                  <span className="text-[10px] text-slate-400 block uppercase">Operational Dividend</span>
                  <span className="text-xs font-bold text-emerald-400">
                    {currentResult.savings}
                  </span>
                </div>
              </div>
            </div>

            {/* Conflicting Agents Section */}
            <div className="mb-4">
              <span className="text-[11px] font-mono-telemetry uppercase text-slate-400 font-semibold block mb-1.5">
                Multi-Domain Telemetry Conflict Vectors
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-telemetry">
                {currentResult.conflictAgents.map((agentStr, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="truncate">{agentStr}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plain-Language Explainable AI (XAI) Justification */}
            <div className="p-3.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              <div className="flex items-center space-x-2 text-emerald-300 text-xs font-mono-telemetry font-bold uppercase mb-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Explainable AI (XAI) Plain-Language Audit Rationale</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {currentResult.justification}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-mono-telemetry">
              Audit Hash: SHA-256 / 9f3e...b10a (Persistent)
            </span>
            <button
              onClick={handleCommitDecisionToAudit}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold font-mono-telemetry text-xs transition-colors"
            >
              Commit Decision Vector
            </button>
          </div>
        </div>
      </div>

      {/* Asynchronous TimescaleDB / MongoDB Audit Trail */}
      <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-[#0D3B22]" />
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                Asynchronous Heuristic Audit Trail (Persistence Layer)
              </h3>
            </div>
            <p className="text-xs text-[#64748B]">
              Every conflict resolution vector and plain-language explanation is logged asynchronously without blocking real-time actuator relays.
            </p>
          </div>
          <span className="text-xs font-mono-telemetry text-[#64748B]">
            {decisionLog.length} Records Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[#64748B] font-mono-telemetry uppercase text-[10px]">
                <th className="py-2 px-3">Decision ID & Time</th>
                <th className="py-2 px-3">Action Enforced</th>
                <th className="py-2 px-3">Rule Reference</th>
                <th className="py-2 px-3">Telemetry Context</th>
                <th className="py-2 px-3">Plain-Language XAI Justification</th>
                <th className="py-2 px-3 text-right">Impact Dividend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-telemetry text-xs">
              {decisionLog.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">{item.id}</span>
                    <span className="block text-[10px] text-slate-500">{item.timestamp}</span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                      item.actionType === 'irrigate' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      item.actionType === 'defer' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                      item.actionType === 'abort' ? 'bg-red-100 text-red-800 border-red-300' :
                      'bg-slate-100 text-slate-800 border-slate-300'
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                    {item.rule}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-600 whitespace-nowrap">
                    VWC: {item.soil}% | Rain: {item.rain}% | Wind: {item.wind} km/h
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-700 text-xs max-w-md">
                    {item.justification}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-bold whitespace-nowrap">
                    {item.saved}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
