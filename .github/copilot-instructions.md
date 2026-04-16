You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Architecture Patterns

### Component Structure

- Use **standalone components only**. Do not use `NgModule` anywhere.
- Use three component types:
  - **Areas**: Use default exports for reusable components, for example: `export default class PrivateArea`.
  - **Pages**: Use default exports for lazy-loaded routes, for example: `export default class DashboardPage`.
  - **Templates**: Use named exports for reusable components, for example: `export class ButtonTemplate`.
- Follow the `name.ts` naming convention, do not use `.components.ts`, for example: `dashboard-page.ts`.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every component.

### Imports & Path Aliases

TypeScript path aliases are defined in [tsconfig.json](tsconfig.json).

**CRITICAL**: Every feature/component folder MUST include an `index.ts` file for public exports.

- [src/app/shared/index.ts](src/app/shared/index.ts) must re-export `components/index` and `interfaces/index`.
- [src/app/shared/components/index.ts](src/app/shared/components/index.ts) must export all shared components.
- Always import from barrel files, never from individual files:
  - Use `from '@shared/components'`
  - Do not use `from '@shared/components/card/card.component'`
- When creating new components or features, always update the corresponding `index.ts` export file.

**Always use these aliases. Do not use relative paths.** Example:

```typescript
import { Task } from '@shared/index';
import { DraggableTable } from '@shared/components';
import DashboardPage from '@features/dashboard/dashboard-page/dashboard-page';
```

### Routing

- Use dynamic imports with default exports for lazy-loaded routes, for example: `loadComponent: () => import('@features/dashboard/dashboard-page/dashboard-page')`.
- Use layout-based routing: `PrivateArea` wraps authenticated routes and shared header content.
- Define routes in [app.routes.ts](src/app/app.routes.ts).
- Keep the auth guard in [app.routes.ts](src/app/app.routes.ts).

### Template Patterns

- Prefer inline templates for simple components.
- Use native control flow syntax (`@for`, `@if`) instead of structural directives (`*ngFor`, `*ngIf`).
- Example: `@for (item of todo; let i = $index; track item)`.

### Styling & CSS

- Keep global styles in [src/styles.scss](src/styles.scss).
- Feature styles in [src/app/styles/](src/app/styles/):
  - `tailwind-config.scss`: Tailwind CSS 4+ configuration and custom utilities.
- Use Tailwind CSS 4+ with PostCSS for styling (no traditional Tailwind config file is needed).
- Use only Tailwind utility classes in templates for responsive and maintainable styling.
- Do not create component-level `.css` or `.scss` files. The only allowed style files are [src/styles.scss](src/styles.scss) and [src/app/styles/](src/app/styles/).

### TODO: agregar demas temas como auth, state, http requests a medida que se vayan haciendo
