import React, { useState } from 'react';
import { 
  Scan, 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Camera, 
  Upload, 
  RotateCw, 
  Sparkles, 
  Sliders, 
  ChevronRight,
  Wind,
  Layers,
  Info
} from 'lucide-react';
import { PlantSample, UserProfile } from '../types';
import { samplePlants } from '../data/mockData';

interface ComputerVisionViewProps {
  userProfile: UserProfile;
  onNavigateToXai: () => void;
}

export const ComputerVisionView: React.FC<ComputerVisionViewProps> = ({
  userProfile,
  onNavigateToXai,
}) => {
  const [selectedPlant, setSelectedPlant] = useState<PlantSample>(samplePlants[0]);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isInferenceRunning, setIsInferenceRunning] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState<boolean>(selectedPlant.chemicalApproved);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Environmental context for chemical safety checks (SC-04 and SC-05 link)
  const currentWindSpeed = 14; // km/h
  const currentRainProb = 78; // %

  const handleSelectSample = (sample: PlantSample) => {
    setSelectedPlant(sample);
    setApprovedStatus(sample.chemicalApproved);
  };

  const handleRunInference = () => {
    setIsInferenceRunning(true);
    setTimeout(() => {
      setIsInferenceRunning(false);
    }, 600);
  };

  const handleApproveChemical = () => {
    setApprovedStatus(!approvedStatus);
  };

  const handleCustomUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customImageUrl.trim()) return;
    const newSample: PlantSample = {
      id: `PLANT-${Date.now()}`,
      name: 'Custom Field Scan Specimen',
      crop: 'Field Foliage Scan',
      imageUrl: customImageUrl,
      diseaseName: 'Suspected Late Blight / Phytophthora infestans',
      pathogenType: 'Fungal',
      severityPct: 38.6,
      confidence: 0.92,
      affectedAreaCm2: 11.2,
      recommendation: 'Targeted bio-fungicide spray at 1.8 L/ha during favorable weather windows.',
      chemicalApproved: false,
      boxCoords: [
        { top: 25, left: 30, width: 35, height: 35 },
      ],
    };
    setSelectedPlant(newSample);
    setApprovedStatus(false);
    setCustomImageUrl('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold bg-[#0D3B22] text-white">
                SECTION 3.3 AGENT SPECIFICATION
              </span>
              <span className="text-xs font-mono-telemetry text-[#64748B]">
                YOLOv8 & MobileNet Plant Pathology Classifier
              </span>
            </div>
            <h1 className="font-space text-2xl font-bold text-[#0B1C30] mt-1">
              Phytopathology & Pest Computer Vision Studio
            </h1>
            <p className="text-xs text-[#64748B] max-w-3xl mt-1">
              Ingests 4K RTSP video feeds from solar edge cameras, autonomous drones, and field scout mobile uploads. Trained on PlantVillage to generate deterministic leaf disease severity indices and isolate pest outbreaks.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 rounded text-xs font-mono-telemetry font-bold bg-slate-100 text-slate-800 border border-slate-300">
              INFERENCE LATENCY: 32ms (Edge NPU)
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Interactive Plant Scanner & Vision Bounding Boxes (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded border border-[#E2E8F0] shadow-sm p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div>
              <h2 className="font-space font-bold text-sm text-[#0B1C30]">
                {selectedPlant.name}
              </h2>
              <span className="text-xs text-[#64748B] italic">{selectedPlant.crop}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                className={`px-2.5 py-1 rounded text-xs font-mono-telemetry font-semibold border transition-colors ${
                  showBoundingBoxes ? 'bg-[#0D3B22] text-white border-transparent' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                YOLO Bounding Boxes
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                className={`px-2.5 py-1 rounded text-xs font-mono-telemetry font-semibold border transition-colors ${
                  showHeatmap ? 'bg-amber-600 text-white border-transparent' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Grad-CAM Heatmap
              </button>
            </div>
          </div>

          {/* Visual Display with Overlay */}
          <div className="relative rounded overflow-hidden bg-slate-900 border border-slate-300 aspect-[4/3] flex items-center justify-center">
            <img
              src={selectedPlant.imageUrl}
              alt={selectedPlant.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isInferenceRunning ? 'opacity-40 blur-xs' : 'opacity-100'
              }`}
            />

            {/* Grad-CAM Heatmap Simulation Overlay */}
            {showHeatmap && !isInferenceRunning && (
              <div className="absolute inset-0 bg-gradient-radial from-red-500/40 via-amber-500/20 to-transparent pointer-events-none mix-blend-color-burn" />
            )}

            {/* YOLOv8 Detection Bounding Boxes */}
            {showBoundingBoxes && !isInferenceRunning && selectedPlant.boxCoords.map((box, idx) => (
              <div
                key={idx}
                className="absolute border-2 border-red-500 bg-red-500/20 rounded pointer-events-none transition-all"
                style={{
                  top: `${box.top}%`,
                  left: `${box.left}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                }}
              >
                <div className="absolute -top-6 left-0 bg-red-600 text-white font-mono-telemetry text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap shadow-sm font-bold">
                  {selectedPlant.diseaseName.split(' ')[0]} {(selectedPlant.confidence * 100).toFixed(0)}%
                </div>
              </div>
            ))}

            {/* Processing Spinner */}
            {isInferenceRunning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-slate-900/60 font-mono-telemetry text-xs">
                <RotateCw className="w-8 h-8 animate-spin text-emerald-400 mb-2" />
                <span>Running YOLOv8 Pathology Inference...</span>
              </div>
            )}

            {/* Camera Tag Overlay */}
            <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-1 rounded text-[10px] font-mono-telemetry flex items-center space-x-1.5 border border-white/20">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Solar-Cam 4K RTSP // FPS: 24 // Model: YOLOv8-PlantVillage</span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleRunInference}
              disabled={isInferenceRunning}
              className="px-3 py-1.5 rounded bg-[#0D3B22] hover:bg-[#082415] text-white font-mono-telemetry text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Re-Run Inference on Frame</span>
            </button>
            <span className="text-xs font-mono-telemetry text-slate-500">
              Weights: PlantVillage-v2.9.pt
            </span>
          </div>
        </div>

        {/* Right: Pathogen Diagnostics & VRA Chemical Prescription (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded border border-[#E2E8F0] shadow-sm p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-2 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-telemetry uppercase text-[#64748B] font-bold">
                  Computer Vision Diagnostic
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold border uppercase ${
                  selectedPlant.pathogenType === 'Healthy' 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {selectedPlant.pathogenType}
                </span>
              </div>
              <h3 className="font-space text-lg font-bold text-[#0B1C30] mt-0.5">
                {selectedPlant.diseaseName}
              </h3>
            </div>

            {/* Diagnostic Metrics Cards */}
            <div className="grid grid-cols-2 gap-2 font-mono-telemetry text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Affected Leaf Area</span>
                <div className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedPlant.severityPct}%
                </div>
                <span className="text-[10px] text-slate-500">
                  {selectedPlant.affectedAreaCm2} cm² symptomatic
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase">Classification Confidence</span>
                <div className="text-lg font-bold text-emerald-700 mt-0.5">
                  {(selectedPlant.confidence * 100).toFixed(1)}%
                </div>
                <span className="text-[10px] text-slate-500">Softmax probability</span>
              </div>
            </div>

            {/* Prescribed Agronomic Intervention */}
            <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center space-x-1.5 font-semibold text-slate-900">
                <Info className="w-3.5 h-3.5 text-[#0D3B22]" />
                <span>Variable Rate Application (VRA) Prescription</span>
              </div>
              <p className="text-slate-700 leading-relaxed font-sans">
                {selectedPlant.recommendation}
              </p>
            </div>

            {/* Heuristic Safety Conflict Check (SC-04 / SC-05 Warning Banner) */}
            <div className="p-3 rounded bg-amber-50 border border-amber-300 text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 font-semibold text-amber-900 font-mono-telemetry">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                <span>Meta-Orchestrator Drift / Rain Lock</span>
              </div>
              <p className="text-amber-800 text-[11px]">
                Precipitation probability is currently <strong>{currentRainProb}%</strong> and wind speed is <strong>{currentWindSpeed} km/h</strong>. Under SC-05 rules, any chemical spray will be <strong>ABORTED</strong> by the Meta-Orchestrator if heavy rain commences within 45 minutes.
              </p>
              <button
                onClick={onNavigateToXai}
                className="text-[11px] font-mono-telemetry font-bold text-amber-900 underline hover:text-amber-950 flex items-center space-x-1"
              >
                <span>View SC-04 & SC-05 Heuristic Conflict Rules →</span>
              </button>
            </div>

            {/* Agronomist Approval Workflow */}
            <div className="p-3 rounded border border-slate-200 bg-white">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold text-xs text-slate-900 block">
                    Chief Agronomist Chemical Sign-off
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Required for autonomous drone chemical dispersion
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono-telemetry font-bold ${
                  approvedStatus ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {approvedStatus ? 'APPROVED' : 'AWAITING APPROVAL'}
                </span>
              </div>

              <button
                onClick={handleApproveChemical}
                className={`w-full py-2 rounded text-xs font-semibold font-mono-telemetry transition-colors ${
                  approvedStatus
                    ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    : 'bg-[#0D3B22] text-white hover:bg-[#082415]'
                }`}
              >
                {approvedStatus ? 'Revoke Chemical Authorization' : 'Authorize VRA Chemical Dispersion'}
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono-telemetry text-slate-500 flex items-center justify-between">
            <span>Operator: {userProfile.name}</span>
            <span>Role: {userProfile.role.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Preset Library & Custom Leaf Scan Upload */}
      <div className="bg-white p-4 rounded border border-[#E2E8F0] shadow-sm">
        <h3 className="font-space font-bold text-sm text-[#0B1C30] mb-3">
          PlantVillage Dataset Benchmark Library
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {samplePlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => handleSelectSample(plant)}
              className={`p-2.5 rounded border transition-all cursor-pointer ${
                selectedPlant.id === plant.id
                  ? 'border-[#0D3B22] ring-2 ring-[#0D3B22]/15 bg-emerald-50/30'
                  : 'border-[#E2E8F0] hover:border-slate-400 bg-white'
              }`}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-24 object-cover rounded mb-2 border border-slate-200"
              />
              <div className="font-semibold text-xs text-slate-900 truncate">
                {plant.diseaseName}
              </div>
              <div className="text-[10px] text-slate-500 font-mono-telemetry">
                Severity: {plant.severityPct}% | Conf: {(plant.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>

        {/* Custom Scan URL Input */}
        <form onSubmit={handleCustomUpload} className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            placeholder="Or enter public image URL to simulate new drone photogrammetry frame..."
            value={customImageUrl}
            onChange={(e) => setCustomImageUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-hidden focus:border-[#0D3B22] font-mono-telemetry"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white text-xs font-mono-telemetry font-semibold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Load Drone Frame</span>
          </button>
        </form>
      </div>
    </div>
  );
};
