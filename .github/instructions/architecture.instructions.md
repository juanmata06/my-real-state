# Architecture Patterns

This document describes the architecture patterns used in the project.

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

## General Structure

The application follows an architecture based on **layouts**, **features**, and **shared modules**:

```
src/app/
├── layouts/           # Area containers (route wrappers)
├── features/          # Functional modules of the application
├── shared/            # Reusable code across features
└── styles/            # Global styles configuration
```

---

## Layouts

Layouts are wrapper components that define the visual structure of an application area. Each layout contains a `<router-outlet>` that renders the pages of its child features.

| Layout           | Purpose                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `auth-area`      | Authentication area (login, register). No header/footer.                |
| `public-area`    | Public navigation area for logged-in and anonymous users. With header/footer. |
| `private-area`   | Private area only for authenticated users. No header/footer.            |

### Rules

- Each layout is lazy-loaded via `loadComponent()` in routes, applying guards as needed.
- Layouts do NOT contain business logic, only visual structure.

---

## Features

Each feature represents a functional module of the application.

### Feature Structure

```
features/
└── [feature-name]/
    ├── index.ts              # Feature barrel file
    ├── pages/                # Feature pages
    │   ├── index.ts          # Pages barrel file
    │   └── [page-name]/
    │       ├── [page-name].ts
    │       └── [page-name].spec.ts
    ├── sections/             # (Optional) Visual sections of pages
    │   ├── index.ts          # Sections barrel file
    │   └── [section-name]/
    │       ├── [section-name].section.ts
    │       └── [section-name].section.spec.ts
    └── components/           # (Optional) Feature-specific components
        ├── index.ts
        └── [component-name]/
```

### Rules

- **Pages** are the entry point for each route and compose sections and components.
- **Sections** are visual blocks that make up a page (hero, cards grid, etc.).
- **Feature components** are specific to that feature and are not reused outside of it.
- If a component needs to be reused in another feature, it must be moved to `shared/components`.

---

## Shared

The `shared/` folder contains reusable code across multiple features.

### Shared Folders

| Folder         | Purpose                                                                              |
| -------------- | ------------------------------------------------------------------------------------ |
| `components`   | Reusable UI components (buttons, cards, headers, modals, forms).                     |
| `constants`    | Global application constants (localStorage keys, configurations, etc.).              |
| `demo`         | Demo data or mocks for development and testing.                                      |
| `guards`       | Route guards for route protection (authentication, permissions).                     |
| `interceptors` | HTTP interceptors for request/response handling (auth headers, errors, etc.).        |
| `mappers`      | Transformation functions between API models and domain models.                       |
| `models`       | TypeScript interfaces and types for the application domain.                          |
| `services`     | Injectable services for business logic, API calls, and cross-cutting operations.     |
| `store`        | Signal Stores (NgRx Signals) for global state management.                            |
| `utils`        | Pure utility functions and generic helpers.                                          |

### Rules

- Each `shared/` subfolder has its own `index.ts` (barrel file).
- Shared components must be generic and have no dependencies on specific features.
- Services must follow the Single Responsibility Principle (SRP).

---

## Barrel Files

`index.ts` files are used as barrel files to simplify imports.

### Structure

```typescript
// features/landing/index.ts
export * from './pages';
export * from './sections';

// features/landing/sections/index.ts
export * from './title-and-searcher/title-and-searcher.section';
export * from './houses-as-cards/houses-as-cards.section';
```

### Rules

- Every folder containing exportable modules must have an `index.ts`.
- Imports from outside the folder must use the barrel, not direct paths.
- Path aliases (`@features`, `@shared`, `@layouts`) point to barrel files.

---

## Principles and Best Practices

### SOLID

| Principle                        | Application                                                                |
| -------------------------------- | -------------------------------------------------------------------------- |
| **Single Responsibility (SRP)** | Each component, service, or function has a single responsibility.          |
| **Open/Closed (OCP)**           | Components are extensible via inputs/outputs, not by modifying code.       |
| **Liskov Substitution (LSP)**   | Interfaces and base classes are replaceable by their implementations.      |
| **Interface Segregation (ISP)** | Small, specific interfaces instead of monolithic ones.                     |
| **Dependency Inversion (DIP)**  | Dependencies injected via `inject()`, not instantiated directly.           |

### Angular Best Practices

- Use `ChangeDetectionStrategy.OnPush` in all components.
- Use Signals for local and shared reactive state.
- Use `inject()` instead of constructor injection.
- Prefer standalone components over NgModules.
- Lazy loading is mandatory for features and pages.

### Simplicity

- **KISS**: Keep the implementation as simple as possible.
- **YAGNI**: Do not add speculative functionality.
- Avoid premature abstractions or over-engineering.
- Prefer composition over inheritance.

---

## Testing

The project requires a minimum of **80% code coverage**.

### Rules

- Every component, service, guard, pipe, and directive **must** have its `.spec.ts` file.
- Tests must be located alongside the file they test.
- Use Jasmine for assertions and Karma as the test runner.

### Test Structure

```
component/
├── my-component.ts
└── my-component.spec.ts

services/
├── auth.service.ts
└── auth.service.spec.ts
```

### Conventions

- Name test files as `[file-name].spec.ts`.
- Organize tests with `describe()` by functionality and `it()` by use case.
- Use mocks and spies for external dependencies.
