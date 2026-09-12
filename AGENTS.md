# AGENTS.md

This repository follows Feature-Sliced Design (FSD). Keep the layer boundaries explicit and preserve the existing slice structure when adding code.

## Project Architecture

- `src/app`: application bootstrap, global providers, routing, and root styles.
- `src/pages`: route-level pages. Each feature page should keep page composition, loaders, and page-specific UI together under its own folder.
- `src/features`: user-facing business features. A feature owns its UI, logic, and API layer when it is isolated from the rest of the app.
- `src/entities`: domain models and shared data-layer contracts. Keep entity data logic independent from page or feature UI.
- `src/shared`: reusable UI primitives and generic helpers. Shared code must not depend on page or feature domain rules.

## FSD Rules

- Follow the dependency direction: `app` -> `pages` -> `features` -> `entities` -> `shared`.
- Do not let pages import from other pages. Use features or shared modules instead.
- Keep feature logic inside its own slice instead of spreading it across the app.
- Prefer barrel exports from each slice via `index.ts` for clean imports.
- Put API requests in the nearest `api` directory; keep types in `model` and UI in `ui`.
- Use CSS Modules for component/page styling when the existing project pattern already does so.
- Keep data contracts and domain types in `entities` or a feature-local `model` folder instead of duplicating inline types.

## Import and Usage Conventions

- Use the `@/` alias from Vite for application imports.
- Preserve the existing routing structure in `src/app/routes.tsx` when adding or changing pages.
- Prefer named exports for modules and keep default exports only for single-component files when consistent with the codebase.
- Reuse existing `shared` primitives before creating a new component.

## Workflow for Changes

1. Inspect the closest existing slice before adding new code.
2. Match the surrounding file structure (`api`, `model`, `ui`, `index.ts`) when creating a new feature or page.
3. Keep the change local to the relevant layer and avoid cross-layer shortcuts.
4. Preserve the established naming and export patterns used by the current folders.

## Validation

Run the relevant checks after code changes:

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm lint`

## Testing

- Run the full test suite with `pnpm test`.
- Use `pnpm test:watch` while developing interactively.
- Place tests next to the code they cover using the `.test.ts` or `.test.tsx` suffix.
- Use the existing Vitest and Testing Library setup for unit and component tests.
- Run focused tests for the changed slice first, then run the full suite before contributing.

When contributing, favor small, layer-correct changes over broad refactors. The project is intentionally structured around slices, and code should remain easy to locate within that pattern.
