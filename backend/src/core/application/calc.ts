import { Route } from '../domain/models';

export const TARGET = 89.3368; // gCO2e/MJ
export const MJ_PER_TONNE = 41000;

export function computeCBForRoute(route: Route) {
  const energyMJ = route.fuelConsumption_t * MJ_PER_TONNE;
  const cb_g = (TARGET - route.ghgIntensity) * energyMJ; // grams CO2e
  const cb_kg = cb_g / 1000;
  const cb_tonnes = cb_g / 1e6;
  return { cb_g, cb_kg, cb_tonnes };
}

export function percentDiff(baseline: number, comparison: number) {
  if (baseline === 0) return null;
  return ((comparison / baseline) - 1) * 100;
}

export function isCompliant(value: number, target = TARGET) {
  return value <= target;
}
