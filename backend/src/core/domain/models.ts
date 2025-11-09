export interface Route {
  id?: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number; // gCO2e/MJ
  fuelConsumption_t: number;
  distance_km: number;
  totalEmissions_t: number;
  isBaseline?: boolean;
}
