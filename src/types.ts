export type UserRole = 'super_admin' | 'owner' | 'agronomist' | 'field_tech';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string;
  farmName: string;
  mfaEnabled: boolean;
  avatarUrl: string;
  phone: string;
  licenseTier: 'Standard' | 'Plus' | 'Pro';
  assignedZones: string[];
  lastLogin: string;
}

export type AgentId = 
  | 'soil_opt'
  | 'met_weather'
  | 'phyto_cv'
  | 'inv_supply'
  | 'energy_pwr'
  | 'iot_sentinel'
  | 'finance_proj';

export type AgentStatus = 'optimal' | 'warning' | 'active' | 'deferred' | 'aborted' | 'circuit_isolated';

export interface AutonomousAgent {
  id: AgentId;
  name: string;
  section: string;
  status: AgentStatus;
  statusText: string;
  computeLoad: number; // percentage
  frequencyHz: number;
  lastHeartbeat: string;
  currentTask: string;
  telemetrySummary: string;
  metrics: { [key: string]: string | number };
  circuitBreakerTripped?: boolean;
}

export interface HeuristicScenario {
  id: string;
  name: string;
  soilMoisture: number; // %
  rainProb: number; // %
  windSpeed: number; // km/h
  pestSeverity: number; // %
  solarPowerKw: number;
  orchestratorAction: 'SYSTEM IDLE' | 'ACTIVATE IRRIGATION' | 'DEFER IRRIGATION' | 'ABORT SPRAYING' | 'DISPATCH SPRAYER';
  actionType: 'idle' | 'irrigate' | 'defer' | 'abort' | 'dispatch';
  justification: string;
  conflictResolved: string;
}

export interface FieldZone {
  id: string;
  name: string;
  crop: string;
  acreage: number;
  soilMoisture: number; // %
  soilTensionCbar: number;
  npk: { n: number; p: number; k: number }; // ppm
  temperatureC: number;
  humidityPct: number;
  pestRiskPct: number;
  irrigationStatus: 'ACTIVE' | 'IDLE' | 'QUEUED' | 'DEFERRED';
  sprayerStatus: 'DOCKED' | 'MISSION_READY' | 'EN_ROUTE' | 'ABORTED';
  valveOpenPct: number;
  flowRateLpm: number;
}

export interface PlantSample {
  id: string;
  name: string;
  crop: string;
  imageUrl: string;
  diseaseName: string;
  pathogenType: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Healthy';
  severityPct: number;
  confidence: number;
  affectedAreaCm2: number;
  recommendation: string;
  chemicalApproved: boolean;
  boxCoords: { top: number; left: number; width: number; height: number }[];
}

export interface SupplierItem {
  id: string;
  category: 'Fertilizer' | 'Pesticide' | 'Seed' | 'Energy/Fuel' | 'Hardware';
  name: string;
  supplier: string;
  rating: number;
  currentStock: number;
  minSafetyThreshold: number;
  unit: string;
  unitPriceUsd: number;
  bulkDiscountThreshold: number;
  bulkUnitPriceUsd: number;
  leadTimeDays: number;
  complianceCertified: boolean;
}

export interface BuyerListing {
  id: string;
  buyerName: string;
  cropRequired: string;
  gradeSpec: 'Grade A (Export)' | 'Industrial Process' | 'Certified Organic';
  targetVolumeTons: number;
  offeredPricePerTonUsd: number;
  fulfillmentWindow: string;
  contractStatus: 'OPEN' | 'LOCKED_FORWARD' | 'IN_ESCROW' | 'FULFILLED';
  guaranteedPayoutUsd: number;
}

export interface MqttPacket {
  id: string;
  topic: string;
  timestamp: string;
  payload: string;
  qos: 0 | 1 | 2;
  originNode: string;
}

export interface TechTicket {
  id: string;
  sensorId: string;
  zoneId: string;
  issue: string;
  severity: 'CRITICAL' | 'WARNING' | 'MAINTENANCE';
  detectedAt: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  assignedTechnician: string;
}
