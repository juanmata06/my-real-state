# Imports & Path Aliases

This document defines the import conventions and barrel file rules for this project.

---

## Language

- All code, comments, variable names, and commit messages MUST be written in **English**.
- All responses and explanations to the user MUST be in **Spanish**.

## Communication Style

- Be direct and concise. Focus on solving the problem or fulfilling the request — no filler, no flattery, no verbose explanations.
- If the user asks for an explanation, then provide one. Otherwise, deliver the solution.

## Context

- **IMPORTANT**: If you need more context to proceed correctly, **ask the user before guessing**.

---

## Core Principle

Every module (component, service, guard, etc.) must be exported from its parent folder via an `index.ts` barrel file. Folders containing multiple items must maintain an updated barrel export.

---

## Barrel Files

### When to Create a Barrel File

- Create an `index.ts` barrel file in any folder that contains multiple modules or reusable items.
- Examples: `components`, `services`, `guards`, `models`, `store`.

### Barrel File Pattern

Export all public modules from the `index.ts` file in the folder.

**Example: `shared/components/index.ts`**

```typescript
export * from './custom-header/custom-header';
export * from './custom-button/custom-button';
export * from './card/card.component';
...
```

Each new component, service, or other module added to the folder must be included in this barrel file immediately.

---

## Import Rules

- Always import from barrel files (`index.ts`) when available.
- Use configured path aliases (e.g., `@shared`, `@features`) instead of relative paths when possible.
- Do not import directly from individual files if a barrel file exists in the parent folder.

### Example Imports

**Good:**
```typescript
import { CustomButton, CardHouse } from '@shared/components';
```

**Avoid:**
```typescript
import { CustomButton } from '../../../shared/components/custom-button/custom-button';
```

---

## Maintenance

- When adding a new component, service, guard, or model, update the parent folder's `index.ts` immediately.
- Remove exports from barrel files when their corresponding module is deleted.
- Keep barrel files organized and free of circular dependencies.
