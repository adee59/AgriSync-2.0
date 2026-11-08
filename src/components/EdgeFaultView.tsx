import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle2, 
  Server, 
  Database, 
  Cpu, 
  Activity, 
  Wrench, 
  RefreshCw, 
  Layers, 
  HardDrive,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { TechTicket, UserProfile } from '../types';
import { initialTechTickets } from '../data/mockData';

interface EdgeFaultViewProps {
  isWanOnline: boolean;
  setIsWanOnline: React.Dispatch<React.SetStateAction<boolean>>;
  userProfile: UserProfile;
}

export const EdgeFaultView: React.FC<EdgeFaultViewProps> = ({
  isWanOnline,
  setIsWanOnline,
  userProfile,
}) => {
  const [bufferedPackets, setBufferedPackets] = useState<number>(isWanOnline ? 0 : 184);
  const [techTickets, setTechTickets] = useState<TechTicket[]>(initialTechTickets);
  const [dlqNodes, setDlqNodes] = useState([
    {
      id: 'PROBE-SN-094',
      zone: 'Zone A1 (Orchard North)',
      metric: 'Soil Moisture VWC (Flatline @ 24.2%)',
      variance24h: '0.002% (Below 0.05% threshold)',
      status: 'ROUTED_TO_DLQ',
      fallback: 'Spatial 4-Neighbor Kriging Average Active (Est: 23.8%)',
    },
  ]);
  const [flushMessage, setFlushMessage] = useState<string | null>(null);

  // Buffer increment when offline
  useEffect(() => {
    let interval: any;
    if (!isWanOnline) {
      interval = setInterval(() => {
        setBufferedPackets(prev => prev + 3);
      }, 1500);
    } else if (bufferedPackets > 0) {
      // Simulate fast flush
      setFlushMessage(`WAN Re-established! Flushed ${bufferedPackets} buffered SQLite telemetry records to Cloud TimescaleDB via TLS socket.`);
      setBufferedPackets(0);
      const timer = setTimeout(() => setFlushMessage(null), 5000);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [isWanOnline]);

  const handleResolveTicket = (ticketId: string) => {
    setTechTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: t.status === 'RESOLVED' ? 'IN_PROGRESS' : 'RESOLVED',
        };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                SECTION 5 & 6 SPECIFICATION
              </span>
              <span className="text-xs font-mono-telemetry text-[#64748B]">
                Zero-Crash High-Availability & Store-and-Forward Edge
              </span>
            </div>
            <h1 className="font-space text-2xl font-bold text-[#0B1C30] mt-1">
              Rural Network Resilience & Edge Fault Isolation
            </h1>
            <p className="text-xs text-[#64748B] max-w-3xl mt-1">
              Guarantees 99.99% operational uptime under rural cellular blackouts. On-farm Raspberry Pi 5 solar gateways execute local deterministic relays with sub-15ms latency, buffering telemetry in local SQLite time-series storage.
            </p>
          </div>

          {/* Interactive WAN Blackout Simulator Toggle */}
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-mono-telemetry text-slate-500 mb-1">
              Simulate Rural Connectivity State:
            </span>
            <button
              onClick={() => setIsWanOnline(!isWanOnline)}
              className={`px-4 py-2 rounded text-xs font-mono-telemetry font-bold border flex items-center space-x-2 transition-all shadow-sm ${
                isWanOnline
                  ? 'bg-emerald-900 text-emerald-200 border-emerald-600 hover:bg-emerald-800'
                  : 'bg-amber-600 text-white border-amber-500 hover:bg-amber-700 animate-pulse'
              }`}
            >
              {isWanOnline ? (
                <>
                  <Wifi className="w-4 h-4 text-emerald-400" />
                  <span>SIMULATE WAN CELLULAR BLACKOUT</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-4 h-4 text-amber-200" />
                  <span>RESTORE WAN CLOUD UPLINK</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Flush Alert Banner */}
      {flushMessage && (
        <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center space-x-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-mono-telemetry">{flushMessage}</span>
        </div>
      )}

      {/* Section 6 Architecture Dashboard: Edge Gateway Live Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Edge Node Status */}
        <div className="bg-white rounded border border-[#E2E8F0] p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-mono-telemetry">
            <span>ON-FARM GATEWAY HARDWARE</span>
            <Server className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <h3 className="font-space font-bold text-base text-[#0B1C30]">
            RPI-5 Solar Gateway #GW-01
          </h3>
          <div className="mt-2 space-y-1 text-xs font-mono-telemetry text-slate-600 border-t border-slate-100 pt-2">
            <div className="flex justify-between">
              <span>Host CPU:</span>
              <span className="font-bold text-slate-900">Quad ARM Cortex-A76 @ 14%</span>
            </div>
            <div className="flex justify-between">
              <span>Local Decision Latency:</span>
              <span className="font-bold text-emerald-700">11.4 ms (Sub-15ms Relay)</span>
            </div>
            <div className="flex justify-between">
              <span>Physical Relay State:</span>
              <span className="font-bold text-[#0D3B22]">Armed & Autonomous</span>
            </div>
          </div>
        </div>

        {/* Card 2: Store-and-Forward Pipeline */}
        <div className="bg-white rounded border border-[#E2E8F0] p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-mono-telemetry">
            <span>STORE-AND-FORWARD BUFFER</span>
            <Database className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-space font-bold text-2xl text-[#0B1C30]">
              {bufferedPackets}
            </span>
            <span className="text-xs font-mono-telemetry text-slate-500">
              Buffered Packets (SQLite)
            </span>
          </div>
          <div className="mt-2 space-y-1 text-xs font-mono-telemetry text-slate-600 border-t border-slate-100 pt-2">
            <div className="flex justify-between">
              <span>Pipeline Status:</span>
              <span className={`font-bold ${isWanOnline ? 'text-emerald-700' : 'text-amber-600'}`}>
                {isWanOnline ? 'STREAMING REAL-TIME' : 'LOCAL BUFFER ACCUMULATING'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Deadband Delta Filter:</span>
              <span className="font-bold text-slate-900">&gt;2.0% Deviation Trigger</span>
            </div>
          </div>
        </div>

        {/* Card 3: LoRaWAN Radio Mesh */}
        <div className="bg-white rounded border border-[#E2E8F0] p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-2 font-mono-telemetry">
            <span>SUB-GHZ LORAWAN MESH</span>
            <Radio className="w-4 h-4 text-[#0D3B22]" />
          </div>
          <h3 className="font-space font-bold text-base text-[#0B1C30]">
            US915 / 8-Channel Concentrator
          </h3>
          <div className="mt-2 space-y-1 text-xs font-mono-telemetry text-slate-600 border-t border-slate-100 pt-2">
            <div className="flex justify-between">
              <span>Active Field Probes:</span>
              <span className="font-bold text-emerald-700">127 Connected (5-10 yr bat)</span>
            </div>
            <div className="flex justify-between">
              <span>Coverage Radius:</span>
              <span className="font-bold text-slate-900">4.8 km Multi-Quadrant</span>
            </div>
            <div className="flex justify-between">
              <span>Mean Signal RSSI:</span>
              <span className="font-bold text-slate-900">-74 dBm (Excellent)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Zero-Crash Fault Protocols & Circuit Breakers */}
      <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-4">
        <h2 className="font-space font-bold text-base text-[#0B1C30] mb-2">
          Section 5: Asynchronous Fault-Isolation Protocols
        </h2>
        <p className="text-xs text-[#64748B] mb-4">
          Strict process isolation prevents any single faulty sensor or software agent from halting critical irrigation or chemical controls:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Protocol 1: Agent Exception */}
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-mono-telemetry font-bold text-slate-900 mb-1">
              <Cpu className="w-4 h-4 text-[#0D3B22]" />
              <span>Agent Exception Protocol</span>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Isolated supervisor loops (Celery / systemd). If an agent crashes, it is rebooted in &lt;500ms without crashing the Meta-Orchestrator.
            </p>
            <div className="text-[11px] font-mono-telemetry text-emerald-700 font-semibold">
              ✓ Status: 7/7 Supervisors Active
            </div>
          </div>

          {/* Protocol 2: Sensor Drift / Flatline & DLQ */}
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-mono-telemetry font-bold text-slate-900 mb-1">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>Dead-Letter Queue (DLQ)</span>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Sensors with variance &lt;0.01% over 24h are quarantined to DLQ. System falls back to spatial neighbor averaging.
            </p>
            <div className="text-[11px] font-mono-telemetry text-amber-700 font-semibold">
              ⚠ Status: 1 Probe in DLQ Quarantine
            </div>
          </div>

          {/* Protocol 3: WAN Network Outage */}
          <div className="p-3.5 rounded bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-mono-telemetry font-bold text-slate-900 mb-1">
              <Zap className="w-4 h-4 text-[#0D3B22]" />
              <span>WAN Network Outage Protocol</span>
            </div>
            <p className="text-xs text-slate-600 mb-2">
              Edge Gateway activates local Redis buffer & on-premise SQLite. Core farm actuators continue running locally with zero downtime.
            </p>
            <div className={`text-[11px] font-mono-telemetry font-semibold ${isWanOnline ? 'text-emerald-700' : 'text-amber-600'}`}>
              {isWanOnline ? '✓ Status: Connected to Cloud' : '⚡ Status: Active Local Fallback Mode'}
            </div>
          </div>
        </div>
      </div>

      {/* Dead-Letter Queue (DLQ) Quarantined Sensor Feeds */}
      <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
          <div>
            <h3 className="font-space font-bold text-sm text-[#0B1C30]">
              Dead-Letter Queue (DLQ) — Quarantined Sensor Flatlines
            </h3>
            <p className="text-xs text-[#64748B]">
              Automated circuit breaker redirects frozen or drifting feeds away from the heuristic matrix
            </p>
          </div>
          <span className="px-2 py-0.5 rounded text-xs font-mono-telemetry bg-amber-100 text-amber-800 border border-amber-300 font-bold">
            1 NODE QUARANTINED
          </span>
        </div>

        <div className="space-y-3">
          {dlqNodes.map((node) => (
            <div key={node.id} className="p-3 rounded bg-amber-50/50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono-telemetry font-bold text-slate-900">{node.id}</span>
                  <span className="text-slate-500">in {node.zone}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-amber-200 text-amber-900">
                    {node.status}
                  </span>
                </div>
                <div className="text-slate-700 font-mono-telemetry mt-1">
                  Metric: {node.metric} | 24h Variance: {node.variance24h}
                </div>
                <div className="text-emerald-800 font-semibold font-mono-telemetry mt-0.5">
                  Fallback: {node.fallback}
                </div>
              </div>

              <div className="shrink-0 font-mono-telemetry">
                <span className="text-slate-500 text-[11px] block">Auto-Generated Ticket:</span>
                <span className="font-bold text-slate-900">#TICK-4091 (Assigned: Carlos Ramos)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automated Field Technician Repair Tickets (Section 3.6 & 7) */}
      <div className="bg-white rounded border border-[#E2E8F0] shadow-sm p-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
          <div>
            <h3 className="font-space font-bold text-sm text-[#0B1C30]">
              Automated Field Technician Maintenance Dispatch Tickets
            </h3>
            <p className="text-xs text-[#64748B]">
              Generated automatically by IoT Sentinel Agent upon battery drops, calibration drift, or actuator timeouts
            </p>
          </div>
          <span className="text-xs font-mono-telemetry text-slate-500">
            RBAC: Field Worker / Tech Role
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[#64748B] font-mono-telemetry uppercase text-[10px]">
                <th className="py-2 px-3">Ticket ID</th>
                <th className="py-2 px-3">Device & Zone</th>
                <th className="py-2 px-3">Issue Diagnostic</th>
                <th className="py-2 px-3">Severity</th>
                <th className="py-2 px-3">Technician</th>
                <th className="py-2 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-telemetry text-xs">
              {techTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {ticket.id}
                    <span className="block text-[10px] text-slate-500 font-normal">{ticket.detectedAt}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#0D3B22]">{ticket.sensorId}</span>
                    <span className="block text-[11px] text-slate-600">{ticket.zoneId}</span>
                  </td>
                  <td className="py-3 px-3 max-w-sm font-sans text-slate-700 text-xs">
                    {ticket.issue}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      ticket.severity === 'CRITICAL' ? 'bg-red-100 text-red-800 border-red-300' :
                      ticket.severity === 'WARNING' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                      'bg-slate-100 text-slate-700 border-slate-300'
                    }`}>
                      {ticket.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-800">
                    {ticket.assignedTechnician}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleResolveTicket(ticket.id)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border transition-colors ${
                        ticket.status === 'RESOLVED'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-[#0D3B22] text-white hover:bg-[#082415] border-transparent'
                      }`}
                    >
                      {ticket.status === 'RESOLVED' ? '✓ RESOLVED' : 'VERIFY & CLOSE'}
                    </button>
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
