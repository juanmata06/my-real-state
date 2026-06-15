# Component Structure

This document defines the component structure conventions for this project.

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

## Core Principles

- Keep every component small, cohesive, and focused on a single responsibility.
- Prefer composition over large multipurpose components.
- Reuse existing shared components before creating feature-specific ones.
- Follow Angular standalone component patterns across the entire app.
- New code must follow these rules even if some legacy files still use older patterns.

---

## Component Types and File Names

Use the component suffix that matches the role of the file.

| Type | Location | File Name Convention | Purpose |
| ---- | -------- | -------------------- | ------- |
| Area | `layouts/[area-name]/` | `[area-name].area.ts` | Route wrapper for an application area |
| Page | `features/[feature-name]/pages/[page-name]/` | `[page-name].page.ts` | Route entry component |
| Section | `features/[feature-name]/sections/[section-name]/` | `[section-name].section.ts` | A visual block used inside a page |
| Feature Component | `features/[feature-name]/components/[component-name]/` | `[component-name].component.ts` | Feature-scoped reusable component |
| Shared Component | `shared/components/[component-name]/` | `[component-name].component.ts` | Reusable component shared across features |
| Shared Template | `shared/components/[component-name]/` | `[component-name].template.ts` | Purely presentational shared building block |

### Rules

- Areas belong only in `layouts/`.
- Features act as functional modules and may contain `pages`, `sections`, and feature-specific `components`.
- If a component is reused or expected to be reused across features, place it in `shared/components`.
- Do not introduce new suffixes unless there is an approved project-wide reason.

---

## Export Conventions

- Add every new component to the `index.ts` barrel file of its folder.
- Keep folder-level barrels updated when adding new pages, sections, or shared components.
- Prefer imports through barrels and configured path aliases.
- Pages and areas should default export the component class when they are loaded directly with `loadComponent()`.
- Sections, shared components, and feature components should use named exports unless there is a strong routing reason not to.

---

## Component Implementation Rules

### Required Defaults

- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every `@Component`.
- Use `input()` and `output()` instead of `@Input()` and `@Output()` decorators.
- Use `computed()` for derived state.
- Prefer `inject()` instead of constructor injection.
- Prefer Angular control flow (`@if`, `@for`, `@switch`) over structural directives when possible.

### Template and Style Placement

- Write the full component in the `.ts` file.
- Do not create external `.html`, `.scss`, or `.css` files for components.
- Prefer inline templates for small components.
- In this project, new components should use inline templates even when they are larger; if markup grows, split the component into smaller components instead of moving markup to an external file.
- Prefer Tailwind utility classes, PrimeNG APIs, and global styles/tokens before adding component-specific styles.
- If component-specific styling is necessary, keep it inside the component `styles` property.

### Bindings and View Logic

- Do NOT use `ngClass`; use `class` bindings such as `[class.foo]`, `[class]`, or computed class strings instead.
- Do NOT use `ngStyle`; use `style` bindings such as `[style.width.px]`, `[style]`, or computed style strings instead.
- Keep view logic simple. If the template becomes hard to read, move derived values into `computed()` or small private helper methods.
- Avoid templates with excessive branching, nested conditions, or repeated markup; extract sections or child components.

### Forms

- Prefer Reactive Forms over template-driven forms.
- Keep form creation and validation logic in the component class.
- Use strongly typed form models whenever practical.

---

## Size and Responsibility Guidelines

- Pages compose sections and coordinate page-level concerns.
- Sections organize a meaningful visual block within a page.
- Shared components should be generic and reusable.
- Feature components should stay local to one feature.
- Do not let pages accumulate presentation details that belong in sections or reusable components.
- If a component starts handling unrelated UI concerns, split it.

---

## Styling Guidance

- Use Tailwind as the default styling approach.
- Use PrimeNG components when they provide the needed interaction or accessibility behavior.
- Reuse project global styles and design tokens before adding local styles.
- Only add component-local styles when Tailwind, PrimeNG, or global styles are not enough.
- Keep local styles minimal and colocated in the `styles` field of the component.

---

## Testing Requirements

- Every component must have a colocated `.spec.ts` file.
- The spec file must be created at the same time as the component.
- Use the matching file name convention:

| Component File | Required Test File |
| -------------- | ------------------ |
| `[area-name].area.ts` | `[area-name].area.spec.ts` |
| `[page-name].page.ts` | `[page-name].page.spec.ts` |
| `[section-name].section.ts` | `[section-name].section.spec.ts` |
| `[component-name].component.ts` | `[component-name].component.spec.ts` |
| `[component-name].template.ts` | `[component-name].template.spec.ts` |

---

## Shared-First Decision Rule

Before creating a new feature component, check whether one of these is more appropriate:

- reuse an existing shared component as-is,
- extend composition by wrapping shared components,
- move an overly specific shared pattern into a more generic shared component,
- keep the implementation feature-local only when the component is truly feature-specific.

Do not duplicate UI patterns across features when a shared component can represent them.

---

## Checklist for New Components

Before finishing a new component, confirm all of the following:

- The file is in the correct folder for its role.
- The file name uses the correct suffix.
- The component is standalone.
- The component uses `ChangeDetectionStrategy.OnPush`.
- Inputs use `input()`.
- Outputs use `output()`.
- Derived state uses `computed()` when needed.
- Template and styles are inline in the `.ts` file.
- The component avoids `ngClass` and `ngStyle`.
- Forms are reactive when a form is needed.
- The component was added to the nearest `index.ts` barrel.
- A matching `.spec.ts` file exists.
