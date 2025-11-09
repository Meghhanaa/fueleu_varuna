# AI Agent Workflow Log

## Agents Used
- GitHub Copilot (idea and boilerplate)
- ChatGPT (design review & explanations)
- Local iterative prompts to refine pooling and CB math

## Prompts & Outputs (examples)
- Prompt: "Write a TypeScript function that computes compliance balance given ghgIntensity (gCO2e/MJ) and fuelConsumption in tonnes. Use TARGET=89.3368 and 41000 MJ/t."
  - Generated: computeCBForRoute function (kept and adapted in backend/src/core/application/calc.ts)

- Prompt: "Design a greedy pooling algorithm that allocates surplus to deficits and enforces that deficit ships cannot exit worse and surplus ships cannot become negative."
  - Generated: initial algorithm. It was refined to include pre-validation that sum(cb_before) >= 0 and post-validation checks.

## Validation / Corrections
- Verified numbers manually (example R001) and adjusted units (grams → tonnes).
- Ensured all core logic lives in `core/` so agent outputs don't introduce framework coupling.

## Observations
- Agents accelerated boilerplate and iterative algorithm ideas.
- Hallucinations: occasionally suggested DB column names inconsistent with schema; corrected manually.
- Best used for first-draft generation plus human review and unit tests.

## Best Practices Followed
- Small, focused prompts.
- Keep pure domain logic in framework-free modules for easy testing.
- Add concise unit tests after generating logic.
