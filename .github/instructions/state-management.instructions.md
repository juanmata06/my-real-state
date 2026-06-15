# State Management

This document describes the state management conventions using **NgRx Signal Store** in this project.

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

## Overview

State management is handled using [`signalStore`](https://ngrx.io/guide/signals) from `@ngrx/signals`. This provides a lightweight, type-safe, and reactive state management solution leveraging Angular Signals.

---

## Signal Store Basics

A Signal Store combines multiple features to manage state:

- **`withState()`**: Defines initial state as a TypeScript object.
- **`withComputed()`**: Creates computed signals derived from state.
- **`withMethods()`**: Defines actions or methods that mutate state via `patchState()`.
- **`withHooks()`**: Lifecycle hooks like `onInit` and `onDestroy`.

---

## Feature-Scoped Stores

Each feature or module that needs state management must create its own store. Stores should be placed in the feature's `store/` folder or the `shared/store/` folder if used across the application.

### File Structure

```
features/[feature-name]/
├── store/
│   ├── [feature-name].store.ts
│   └── index.ts

shared/
├── store/
│   ├── auth.store.ts
│   ├── token.store.ts
│   └── index.ts
```

---

## Store Architecture

### State Definition

Define the state as a TypeScript type at the top of the store file:

```typescript
type FeatureState = {
  data: SomeType | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: FeatureState = {
  data: null,
  isLoading: false,
  error: null,
};
```

### Store Structure Guidelines

Follow this order when building a store:

1. **State type definition** — Clear interface of all state properties.
2. **Initial state** — Default values matching the state shape.
3. **`withState()`** — Register the initial state.
4. **`withComputed()`** — Derived values and flags (e.g., `isLoaded`, `isLoggedIn`).
5. **`withMethods()`** — Methods for mutations, side effects, and RxJS subscriptions.
6. **`withHooks()`** — Lifecycle management (cleanup on destroy).

### Complete Example

See [auth.store.ts](../../src/app/shared/store/auth.store.ts) for a reference implementation. It demonstrates:

- State initialization and type safety.
- Computed signals for derived state.
- Async methods handling login/register workflows.
- Proper cleanup using `takeUntil()` with a destroy subject.
- Use of `patchState()` to update state immutably.

---

## Key Rules

| Rule | Description |
| ---- | ----------- |
| **Immutability** | Always use `patchState()` to update state; never mutate directly. |
| **Type Safety** | Define state as a TypeScript type, not as `any`. |
| **Providability** | Add `{ providedIn: 'root' }` config to make stores injectable at the root level or scoped appropriately. |
| **Cleanup** | Use `takeUntil()` and a destroy subject in `withHooks().onDestroy()` to prevent memory leaks. |
| **Barrel Exports** | Add new stores to the `index.ts` barrel file of their folder. |
| **Naming** | Suffix store files with `.store.ts` and export the store as `[FeatureName]Store`. |

---

## When to Create a Store

Create a store when:

- A feature needs to share state across multiple components.
- You need async operations (API calls, subscriptions).
- State must persist across navigation or component lifecycle.

Do NOT create a store for:

- Simple component-local state (use `@Component state` or `computed signals`).
- Single-use data (pass via `@Input()` or services instead).

---

## Request for Context

If you need guidance on state shape, async handling, or store integration for a specific feature, ask for more context. Provide:

- The feature name or module.
- What state needs to be managed (e.g., list of properties, API responses).
- Any async workflows (login, fetch, filter).
- How many components will consume this state.
