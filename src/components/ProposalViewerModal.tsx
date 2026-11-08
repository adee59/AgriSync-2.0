import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Radio, 
  ShieldCheck, 
  Store, 
  TrendingUp, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface ProposalViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProposalViewerModal: React.FC<ProposalViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activePage, setActivePage] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded border border-[#E2E8F0] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#1E293B] text-white p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded bg-[#0D3B22] border border-emerald-500/40 text-emerald-300">
              <FileText className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-space font-bold text-base text-white">
                AgriSync Enterprise: Commercial Master Proposal &amp; Technical Blueprint
              </h2>
              <span className="text-[11px] font-mono-telemetry text-slate-400">
                Document Ref: AG-COMM-2026-V4 // 5-Page Enterprise Master
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Page Selector Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center space-x-1.5 text-xs font-mono-telemetry overflow-x-auto">
          {[
            { num: 1, label: 'Page 1: Architecture & Executive Summary' },
            { num: 2, label: 'Page 2: 7 Domain Agents & Conflict Matrix' },
            { num: 3, label: 'Page 3: Fault Protocols & Edge Resilience' },
            { num: 4, label: 'Page 4: Tiers & B2B AgTech Marketplace' },
            { num: 5, label: 'Page 5: Tech Stack Evolution & Roadmap' },
          ].map((p) => (
            <button
              key={p.num}
              onClick={() => setActivePage(p.num)}
              className={`px-3 py-1.5 rounded whitespace-nowrap font-medium transition-all ${
                activePage === p.num
                  ? 'bg-[#0D3B22] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Modal Body / Page Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs font-sans leading-relaxed">
          {activePage === 1 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200">
                <span className="font-mono-telemetry text-[11px] font-bold text-emerald-900 uppercase block mb-1">
                  Executive Summary
                </span>
                <p className="text-emerald-950 text-xs">
                  Modern precision agriculture suffers from an "implementation gap" between static AI predictions and stochastic, unpredictable outdoor farming environments. Legacy farm automation relies on single-variable timers or centralized cloud controllers that fail during network drops or when sensor feeds conflict. AgriSync Enterprise bridges this gap by unifying an autonomous, decentralized Multi-Agent System (MAS), edge-computing resilience, computer vision pathology, and an integrated B2B agricultural marketplace into a market-ready commercial SaaS solution.
                </p>
              </div>

              <div>
                <h3 className="font-space font-bold text-sm text-[#0B1C30] mb-2">
                  1. Market Problem &amp; Core Innovation
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li><strong>Rigid Rule Engines &amp; Unresolved Telemetry Conflicts:</strong> Simple threshold controllers execute isolated commands. Irrigating immediately before unexpected heavy rainfall causes water wastage, nutrient leaching, root rot, and power loss.</li>
                  <li><strong>Centralized Cloud Vulnerability &amp; Rural Bandwidth Gaps:</strong> Cloud-bound IoT systems freeze when cellular links drop, risking crops when automated valves stall open.</li>
                  <li><strong>The "Trust Gap" (Black-Box AI):</strong> Farm operators override automation because legacy systems do not provide explainable audit trails detailing why an automated action was executed or deferred.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-space font-bold text-sm text-[#0B1C30] mb-2">
                  2. Integrated AgriSync System Architecture
                </h3>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 font-mono-telemetry text-[10px] text-slate-500 uppercase">
                      <tr>
                        <th className="p-2">System Layer</th>
                        <th className="p-2">Technical Component</th>
                        <th className="p-2">Operational Function</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2 font-semibold">Perception Layer</td>
                        <td className="p-2 font-mono-telemetry">LoRaWAN Probes, Solar Cameras, Weather APIs</td>
                        <td className="p-2">Ingests high-frequency soil volumetric moisture, micro-climate feeds, and leaf pathology images.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Messaging Backbone</td>
                        <td className="p-2 font-mono-telemetry">Clustered MQTT Broker (EMQX / Mosquitto)</td>
                        <td className="p-2">Lightweight, asynchronous pub/sub routing over dedicated topic trees (agrisync/#).</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Coordination Layer</td>
                        <td className="p-2 font-mono-telemetry">Meta-Orchestrator &amp; Heuristic Matrix</td>
                        <td className="p-2">Evaluates multi-domain agent telemetry simultaneously to resolve resource conflicts before trigger.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Persistence &amp; Audit</td>
                        <td className="p-2 font-mono-telemetry">MongoDB &amp; TimescaleDB Store</td>
                        <td className="p-2">Logs every decision vector, environmental context, and plain-language explanation asynchronously.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold">Interface Layer</td>
                        <td className="p-2 font-mono-telemetry">Streamlit Console / React Enterprise Dashboard</td>
                        <td className="p-2">Renders real-time XAI decision justifications, 3D maps, heatmaps, and administrative manual overrides.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activePage === 2 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                3. Autonomous Domain Agent Fleet (7 Independent Agents)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.1 Soil Telemetry &amp; Resource Optimization Agent</strong>
                  <p className="text-slate-600 mt-1">Parses VWC, tension, ambient temp, and NPK levels. Calculates water &amp; fertilizer volumes using Variable Rate Application (VRA) for &gt;20% input savings.</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.2 Meteorological &amp; Weather Forecasting Agent</strong>
                  <p className="text-slate-600 mt-1">Calculates precipitation probabilities, wind velocity vectors, atmospheric humidity, and frost risk profiles over rolling 24-to-72h windows.</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.3 Phytopathology &amp; Pest Computer Vision Agent</strong>
                  <p className="text-slate-600 mt-1">Lightweight deep learning (YOLOv8/v9 &amp; MobileNet) trained on PlantVillage. Ingests RTSP feeds from solar cameras and drones to score disease severity (% leaf area).</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.4 Inventory &amp; Supply Chain Agent</strong>
                  <p className="text-slate-600 mt-1">Monitors physical stock levels of liquid fertilizers, chemical pesticides, seed stock, and backup fuel via load-cells. Triggers 1-click reorder alerts.</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.5 Energy &amp; Power Management Agent</strong>
                  <p className="text-slate-600 mt-1">Tracks solar panel generation, battery SoC %, and utility tariff schedules. Coordinates heavy pumps during peak solar production or off-peak hours.</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">3.6 IoT Sentinel &amp; Hardware Maintenance Agent</strong>
                  <p className="text-slate-600 mt-1">Monitors device heartbeats, battery voltage drop rates, and signal RSSI. Detects flatlines or calibration drift and generates technician tickets.</p>
                </div>
                <div className="p-2.5 rounded bg-slate-50 border border-slate-200 md:col-span-2">
                  <strong className="text-slate-900 block font-space">3.7 Autonomous Finance &amp; Market Rate Projection Agent</strong>
                  <p className="text-slate-600 mt-1">Links real-time resource utilization (water volume, kWh energy, liters of fertilizer) with financial ledgers to compute operational cost per acre. Tracks commodity pricing to recommend harvest windows.</p>
                </div>
              </div>

              <div>
                <h3 className="font-space font-bold text-sm text-[#0B1C30] mb-2 mt-4">
                  4. Deterministic Conflict-Resolution Logic Engine Matrix
                </h3>
                <div className="border border-slate-200 rounded overflow-hidden font-mono-telemetry text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                      <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Agent Telemetry Context</th>
                        <th className="p-2">Orchestrator Action</th>
                        <th className="p-2">Explainable AI (XAI) Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-2 font-bold text-[#0D3B22]">SC-01</td>
                        <td className="p-2">Soil Moisture: 38% | Rain Prob: 40%</td>
                        <td className="p-2 font-bold text-slate-700">SYSTEM IDLE</td>
                        <td className="p-2 font-sans">Optimal moisture levels maintained; no resource deployment required.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#0D3B22]">SC-02</td>
                        <td className="p-2">Soil Moisture: 18% | Rain Prob: 20%</td>
                        <td className="p-2 font-bold text-emerald-700">ACTIVATE IRRIGATION</td>
                        <td className="p-2 font-sans">Critical soil dryness (&lt;30%). Low natural rain probability. Valves engaged.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#0D3B22]">SC-03</td>
                        <td className="p-2">Soil Moisture: 22% | Rain Prob: 85%</td>
                        <td className="p-2 font-bold text-amber-600">DEFER IRRIGATION</td>
                        <td className="p-2 font-sans">Soil moisture dry, but imminent heavy rainfall (&gt;70%) detected. Irrigation deferred.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#0D3B22]">SC-04</td>
                        <td className="p-2">Pest Severity: 65% | Wind: 32 km/h</td>
                        <td className="p-2 font-bold text-red-600">ABORT SPRAYING</td>
                        <td className="p-2 font-sans">Pathology threshold exceeded, but high wind speed creates high chemical drift risk.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold text-[#0D3B22]">SC-05</td>
                        <td className="p-2">Pest Severity: 70% | Rain Prob: 90%</td>
                        <td className="p-2 font-bold text-red-600">ABORT SPRAYING</td>
                        <td className="p-2 font-sans">Pest outbreak confirmed, but imminent heavy rain will wash off chemical inputs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activePage === 3 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                5. Zero-Crash High-Availability &amp; Fault Protocols
              </h3>
              <p className="text-slate-600 text-xs">
                To guarantee 99.99% system uptime across remote commercial operations, AgriSync Enterprise enforces asynchronous fault-isolation boundaries:
              </p>

              <div className="space-y-2 border border-slate-200 rounded p-3 bg-slate-50 text-xs">
                <div><strong>Agent Exception:</strong> Process isolation via Celery / asyncio supervisor loops + systemd auto-restart triggers. Faulty agent isolated; Meta-Orchestrator and main system remain operational.</div>
                <div><strong>Sensor Drift / Flatline:</strong> Data variance checked over 24h window. Circuit breaker redirects frozen feed to Dead-Letter Queue (DLQ). Node flagged 'UNRELIABLE', falls back to spatial neighbor averaging, issues tech ticket.</div>
                <div><strong>WAN Network Outage:</strong> Edge Gateway activates local Redis buffer &amp; executes local relay rules. Zero operational downtime; core farm actuators continue running locally.</div>
              </div>

              <h3 className="font-space font-bold text-sm text-[#0B1C30] mt-4">
                6. Rural Network Resilience &amp; Offline-First Edge Architecture
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs">
                <li><strong>On-Farm Edge Gateways:</strong> Ruggedized, solar-powered gateways (Raspberry Pi 4/5 or industrial mini-PCs) execute the Meta-Orchestrator, MQTT broker, and local rule matrices on-site with sub-15ms latency.</li>
                <li><strong>LoRaWAN Long-Range Sensor Mesh:</strong> Sub-GHz LoRaWAN radio protocols replace Wi-Fi across fields, providing multi-kilometer coverage with 5–10 year sensor battery life.</li>
                <li><strong>Store-and-Forward Data Pipelines:</strong> During WAN outages, local gateways buffer sensor readings and decision logs into an on-premise SQLite time-series database. Once WAN recovers, the gateway flushes buffered queues back to cloud servers.</li>
                <li><strong>Deadband &amp; Report-by-Exception:</strong> Nodes stream data only when parameters breach defined deviation thresholds (e.g. moisture shift &gt; 2%), drastically reducing bandwidth costs.</li>
              </ul>
            </div>
          )}

          {activePage === 4 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                8. Commercial Tiered Subscription Proposal
              </h3>
              <div className="border border-slate-200 rounded overflow-hidden font-mono-telemetry text-[11px]">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                    <tr>
                      <th className="p-2">Feature Domain</th>
                      <th className="p-2">Standard (Base Plan)</th>
                      <th className="p-2">Plus (Advanced AI)</th>
                      <th className="p-2">Pro (Enterprise Marketplace)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans text-xs">
                    <tr>
                      <td className="p-2 font-semibold">Agent Fleet</td>
                      <td className="p-2">Soil &amp; Weather Agents</td>
                      <td className="p-2">Standard + Vision Pest, Inventory &amp; Energy</td>
                      <td className="p-2 font-bold text-emerald-800">Full Suite + Finance &amp; IoT Sentinel</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Edge Resilience</td>
                      <td className="p-2">Wi-Fi / Cellular Cloud</td>
                      <td className="p-2">Store-and-Forward Gateway</td>
                      <td className="p-2 font-bold text-emerald-800">Enterprise LoRaWAN Mesh + Satellite Failover</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">B2B Marketplace</td>
                      <td className="p-2 text-slate-400">Disabled</td>
                      <td className="p-2">View-Only Supplier Catalogs</td>
                      <td className="p-2 font-bold text-emerald-800">Full Supplier &amp; Buyer Matchmaking</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold">Support</td>
                      <td className="p-2">Self-Service Base</td>
                      <td className="p-2">Monthly Consultation</td>
                      <td className="p-2 font-bold text-emerald-800">Dedicated 24/7 On-Call Agronomist</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-space font-bold text-sm text-[#0B1C30] mt-4">
                9. Pro Tier B2B Supplier &amp; Buyer Marketplace Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">9.1 B2B Input Supplier Network</strong>
                  <p className="text-slate-600 mt-1">Automated Procurement: When Inventory Agent flags low stock, AgriSync pulls competitive quotes and facilitates 1-click reordering from quality-rated, compliance-certified suppliers.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block font-space">9.2 Off-taker &amp; Buyer Matchmaking</strong>
                  <p className="text-slate-600 mt-1">Direct Yield-to-Market Selling: Buyers publish purchase demands. Using yield forecasts generated by Meta-Orchestrator, farm owners lock in forward purchase contracts months prior to harvest, eliminating price volatility.</p>
                </div>
              </div>
            </div>
          )}

          {activePage === 5 && (
            <div className="space-y-4">
              <h3 className="font-space font-bold text-sm text-[#0B1C30]">
                10. Tech Stack Evolution &amp; Production Roadmap
              </h3>
              <div className="border border-slate-200 rounded overflow-hidden font-mono-telemetry text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                    <tr>
                      <th className="p-2">Layer</th>
                      <th className="p-2">Target Enterprise Stack</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-semibold font-sans">Frontend Console</td>
                      <td className="p-2 text-emerald-800 font-bold">React.js + Tailwind CSS + WebSockets</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold font-sans">MQTT Message Bus</td>
                      <td className="p-2">EMQX Cluster / HiveMQ Enterprise (TLS encryption)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold font-sans">Data Storage Layer</td>
                      <td className="p-2">TimescaleDB (Telemetry) + MongoDB Atlas (State)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold font-sans">Deployment Host</td>
                      <td className="p-2">Kubernetes (GKE/EKS) + AWS Greengrass Edge</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-space font-bold text-sm text-[#0B1C30] mt-4">
                11. Competitive Market Positioning
              </h3>
              <p className="text-slate-600 text-xs">
                Unlike legacy equipment-locked monoliths (John Deere) or manual cloud record-keeping software (xFarm), AgriSync Enterprise provides a decentralized multi-agent cognitive mesh, deterministic conflict-resolution engine, and full ecosystem integration (IoT + AI + Marketplace).
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono-telemetry text-slate-500">
          <span>Target Market: Commercial Agribusinesses &amp; Cooperatives</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#0D3B22] text-white font-semibold hover:bg-[#082415] transition-colors"
          >
            Close Blueprint Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
