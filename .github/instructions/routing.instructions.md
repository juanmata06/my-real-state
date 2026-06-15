# Routing

This document defines the routing conventions and patterns used in this project.

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

## Route Modules

The application routes are organized into logical modules, each handling a specific area of functionality. All modules are lazy-loaded and use route guards for access control.

| Module | Path | Purpose | Access Control |
| ------ | ---- | ------- | --------------- |
| Auth | `/auth` | Authentication pages (login, register). No header/footer. | `noAuthGuard` – Only accessible to unauthenticated users |
| Public | `/` | Public application area for all users (logged in or anonymous). Includes header/footer. | None – Open to all |
| Private | `/private-area` | Private agent/manager dashboard. Not yet implemented. | `authGuard` – Only accessible to authenticated users |

### Rules

- Each module is lazy-loaded via `loadComponent()` in the root routes.
- Each module uses its layout wrapper component (auth-area, public-area, private-area).
- Child routes within a module should use the `canActivateChild` guard on the parent route to protect all descendants.

---

## Route Guards

The application uses two route guards to control access:

| Guard | Location | Purpose |
| ----- | -------- | ------- |
| `authGuard` | `shared/guards/auth-guard.ts` | Allows access only to authenticated users. Redirects to `/auth/login` if not logged in. |
| `noAuthGuard` | `shared/guards/no-auth-guard.ts` | Allows access only to unauthenticated users. Redirects to `/` if already logged in. |

### Usage

- Use `canActivateChild: [authGuard]` on parent routes to protect authenticated areas.
- Use `canActivateChild: [noAuthGuard]` on parent routes to protect public-only areas.
- Guards inject `AuthStore` to check login status and redirect accordingly.

---

## Page Components

All page components must export themselves as **default export** to simplify dynamic imports in route definitions.

### Example

```typescript
// search-page.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-page',
  template: `<div>Search Page</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export default class SearchPageComponent {}
```

### Usage in Routes

```typescript
{
  path: 'search',
  loadComponent: () => import('@features/searcher/pages/search-page/search-page'),
}
```

---

## Best Practices

- Keep route definitions clean and simple; move complex logic to page components or services.
- Always set a page title using the `title` property in route definitions.
- Use relative paths and named routes when possible to reduce hardcoded strings.
- Lazy load all feature modules and pages to optimize initial bundle size.
- Redirect wildcard routes (`**`) to meaningful pages (e.g., login, home) instead of leaving them unhandled.
