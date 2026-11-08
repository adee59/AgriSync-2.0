/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { XaiMatrixView } from './components/XaiMatrixView';
import { ComputerVisionView } from './components/ComputerVisionView';
import { MarketplaceView } from './components/MarketplaceView';
import { EdgeFaultView } from './components/EdgeFaultView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { ProposalViewerModal } from './components/ProposalViewerModal';
import { 
  initialUserProfile, 
  initialAgents, 
  initialFieldZones, 
  initialMqttPackets 
} from './data/mockData';
import { AutonomousAgent, FieldZone, MqttPacket, UserProfile } from './types';
import { 
  LayoutDashboard, 
  Eye, 
  Scan, 
  Store, 
  Radio, 
  User, 
  FileText,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [agents, setAgents] = useState<AutonomousAgent[]>(initialAgents);
  const [fieldZones, setFieldZones] = useState<FieldZone[]>(initialFieldZones);
  const [mqttPackets, setMqttPackets] = useState<MqttPacket[]>(initialMqttPackets);
  const [isWanOnline, setIsWanOnline] = useState<boolean>(true);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState<boolean>(false);

  // Live streaming simulation of MQTT telemetry packets
  useEffect(() => {
    const topics = [
      'agrisync/tenant-4891/zone-a1/soil/vwc',
      'agrisync/tenant-4891/weather/radar_storm',
      'agrisync/tenant-4891/orchestrator/heuristic_eval',
      'agrisync/tenant-4891/energy/solar_microgrid',
      'agrisync/tenant-4891/zone-b2/actuator/valve_flow',
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      
      let payload = '';
      if (randomTopic.includes('soil')) {
        const vwc = (28.0 + (Math.random() * 1.5 - 0.7)).toFixed(1);
        payload = `{"node_id":"SN-042","vwc_pct":${vwc},"cbar":34,"v_bat":3.64}`;
      } else if (randomTopic.includes('weather')) {
        payload = `{"radar":"CELL-STORM-09","precip_prob_4h":0.78,"wind_vector_kmh":14.1}`;
      } else if (randomTopic.includes('orchestrator')) {
        payload = `{"decision":"SC-03_DEFER_IRRIGATION","status":"ENFORCED","water_saved_l":24000}`;
      } else if (randomTopic.includes('energy')) {
        const solar = (48.0 + (Math.random() * 0.8 - 0.4)).toFixed(1);
        payload = `{"solar_kw":${solar},"battery_soc_pct":94.2,"pump_draw_kw":18.4}`;
      } else {
        payload = `{"valve_id":"SOL-B2","flow_lpm":420,"line_psi":42.5}`;
      }

      const newPkt: MqttPacket = {
        id: `PKT-${Math.floor(1000 + Math.random() * 9000)}`,
        topic: randomTopic,
        timestamp: timeStr,
        payload,
        qos: Math.random() > 0.5 ? 1 : 0,
        originNode: 'LoRaWAN Edge Mesh',
      };

      setMqttPackets(prev => [newPkt, ...prev.slice(0, 19)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1C30] flex flex-col font-sans">
      {/* Top Application Header with telemetry status and role selector */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        isWanOnline={isWanOnline}
        setIsWanOnline={setIsWanOnline}
        onOpenProposal={() => setIsProposalModalOpen(true)}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5">
        {/* Seamless Navigation Quick Switcher Banner (when on profile page) */}
        {currentTab === 'profile' && (
          <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-300 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-900">
              <User className="w-4 h-4 text-emerald-700" />
              <span>
                You are currently in <strong>Profile &amp; Enterprise Settings</strong>. Changes reflect immediately in live telemetry.
              </span>
            </div>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="text-emerald-800 font-bold hover:underline flex items-center space-x-1 font-mono-telemetry"
            >
              <span>Return to Telemetry Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* View Routing */}
        {currentTab === 'dashboard' && (
          <DashboardView
            agents={agents}
            setAgents={setAgents}
            fieldZones={fieldZones}
            setFieldZones={setFieldZones}
            mqttPackets={mqttPackets}
            isWanOnline={isWanOnline}
            userProfile={userProfile}
            onNavigateToXai={() => setCurrentTab('xai')}
            onNavigateToCv={() => setCurrentTab('cv')}
            onNavigateToMarketplace={() => setCurrentTab('marketplace')}
            onNavigateToProfile={() => setCurrentTab('profile')}
          />
        )}

        {currentTab === 'xai' && <XaiMatrixView />}

        {currentTab === 'cv' && (
          <ComputerVisionView
            userProfile={userProfile}
            onNavigateToXai={() => setCurrentTab('xai')}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplaceView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}

        {currentTab === 'edge' && (
          <EdgeFaultView
            isWanOnline={isWanOnline}
            setIsWanOnline={setIsWanOnline}
            userProfile={userProfile}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileSettingsView
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onReturnToDashboard={() => setCurrentTab('dashboard')}
            onNavigateToXai={() => setCurrentTab('xai')}
          />
        )}
      </main>

      {/* Persistent Bottom High-Availability Telemetry Status Bar */}
      <footer className="bg-[#1E293B] text-slate-400 border-t border-[#334155] py-3 text-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3 font-mono-telemetry text-[11px]">
            <span className="text-emerald-400 font-bold">AgriSync Enterprise</span>
            <span>•</span>
            <span>Ref: AG-COMM-2026-V4</span>
            <span>•</span>
            <span className="hidden md:inline">TimescaleDB Telemetry + MongoDB State</span>
            <span>•</span>
            <span className={isWanOnline ? 'text-emerald-400' : 'text-amber-400'}>
              {isWanOnline ? 'MQTT Cluster Synced' : 'Edge Store-and-Forward Active'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono-telemetry">
            <button
              onClick={() => setCurrentTab(currentTab === 'profile' ? 'dashboard' : 'profile')}
              className="text-slate-300 hover:text-white underline"
            >
              {currentTab === 'profile' ? '← Back to Dashboard' : 'Profile Settings →'}
            </button>
            <button
              onClick={() => setIsProposalModalOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              Master Blueprint PDF
            </button>
          </div>
        </div>
      </footer>

      {/* Commercial Master Proposal Document Modal */}
      <ProposalViewerModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />
    </div>
  );
}
