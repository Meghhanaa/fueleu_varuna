# Reflection (AI Agents & Implementation)

Using AI agents helped rapidly scaffold the project, generate initial implementations of the CB math, and suggest pooling strategies. Efficiency gains were largest in boilerplate code for Express controllers and initial test skeletons.

Key learnings:
- Always verify unit conversions (g → kg → tonnes).
- Keep domain logic framework-free to make agent output safe and testable.
- Agents are good at scaffolding; human review is required for correctness, naming, and edge cases.

Improvements for next time:
- Provide tests-first prompts so generated code is testable from day one.
- Use more precise prompts for DB schema to avoid naming mismatches.
