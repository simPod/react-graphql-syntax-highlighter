# Use Vite for library builds

## Status

Accepted

## Context

The package publishes an ES module, TypeScript declarations, and an opt-in stylesheet. The tsup build copies the stylesheet separately, and Vitest uses a separate config.

## Decision

Use Vite library mode to build the ES module and extract the stylesheet. Keep React and the GraphQL dependencies external, and use TypeScript to emit declarations. Share the Vite config with Vitest. Use pnpm for reproducible installs and oxfmt for source formatting.

## Consequences

The public imports do not change. The stylesheet needs a side-effects entry so bundlers keep explicit CSS imports. Development uses the pnpm version pinned in `package.json` on Node 20.19+, 22.13+, or 24.
