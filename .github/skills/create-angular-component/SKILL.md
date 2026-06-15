---
name: create-angular-component
description: >
  ALWAYS USE for any Angular component creation task in this project.
  Triggers (EN): "create a component", "convert to shared component", "make this a component",
  "add a new page", "add a section", "new template", "new component".
  Triggers (ES): "crea un componente", "conviértelo a un shared component", "crea un shared component",
  "siguiendo este diseño", "crea una sección", "crea una página", "nuevo componente", "nueva plantilla".
  Covers: templates (.template.ts), pages (.ts), sections (.section.ts), shared components (.component.ts).
  Includes file naming, barrel exports, spec file creation, composition patterns, and routing integration.
argument-hint: 'Component name and type (e.g., "search-filter template", "dashboard page", "hero-banner section")'
---

# Create Angular Component

This skill scaffolds Angular standalone components following the conventions established in this project. It covers every component type (template, page, section, shared component, feature component) and ensures the result is consistent with the codebase in naming, exports, testing, and styling.

---

## Related Instruction Files

Before generating code, **read and follow** the instruction files that apply to the task. Each file contains detailed rules the generated code must satisfy.

| Instruction File | What It Covers | When to Read |
| ---------------- | -------------- | ------------ |
| `architecture.instructions.md` | Project folder structure (`layouts/`, `features/`, `shared/`), barrel file rules, SOLID principles, lazy loading, and testing requirements (≥ 80% coverage). | Always — to place the component in the correct folder and understand the overall architecture. |
| `component-structure.instructions.md` | Component types and their file-name suffixes, export conventions (default vs named), `OnPush`, `input()`/`output()`, inline templates, no `ngClass`/`ngStyle`, reactive forms, and the component checklist. | Always — this is the primary reference for how every component must be built. |
| `imports-and-path-aliases.instructions.md` | Barrel file (`index.ts`) conventions, path aliases (`@shared`, `@features`, `@layouts`), and import rules. | Always — to write correct imports and update barrel files. |
| `shared-components.instructions.md` | Catalog of existing shared components (`CardComponent`, `CustomButton`, `CustomHeader`, card templates, forms, utility components) with their inputs/outputs. | When creating a template, or when the component might reuse an existing shared building block. |
| `styling.instructions.md` | Tailwind CSS as default, design tokens via CSS custom properties, PrimeNG styling, no external `.scss`/`.css` files for components, `host` bindings. | When writing templates — to choose the right styling approach. |
| `design-based-styling-components.instructions.md` | Rules for implementing components from a visual reference (image, Figma, screenshot). Prioritizes visual fidelity, responsive design, and defers logic. | When the user provides a design reference alongside the component request. |
| `routing.instructions.md` | Route definitions, lazy loading with `loadComponent()`, guards (`authGuard`, `noAuthGuard`), page default exports, and route titles. | When creating a page that needs a new route. |
| `state-management.instructions.md` | NgRx Signal Store conventions (`withState`, `withComputed`, `withMethods`, `withHooks`), when to create a store, and cleanup rules. | When the component needs shared or async state beyond simple local signals. |

> **Rule**: If the task touches concerns covered by an instruction file, read it first and apply its rules. Do not guess conventions — the instruction files are the source of truth.

---

## When to Use This Skill

- Creating any new component: template, page, section, shared, or feature-scoped.
- Converting an existing piece of UI into a standalone component.
- Scaffolding a component from a design reference.

---

## Component Types & Naming

The component type determines the file suffix, export style, and placement.

| Type | Suffix | Export | Placement | Purpose |
| ---- | ------ | ------ | --------- | ------- |
| **Template** | `.template.ts` | `export class` (named) | `shared/components/` or `features/[feat]/components/` | Presentational component that wraps a base shared component with domain-specific styling and structure. |
| **Page** | `.ts` | `export default class` | `features/[feat]/pages/[page-name]/` | Route entry point. Composes sections and components. Lazy-loaded via `loadComponent()`. |
| **Section** | `.section.ts` | `export class` (named) | `features/[feat]/sections/[section-name]/` | A visual block within a page (hero, card grid, CTA, etc.). |
| **Shared Component** | `.component.ts` | `export class` (named) | `shared/components/[component-name]/` | Generic, reusable component used across multiple features. |
| **Feature Component** | `.component.ts` | `export class` (named) | `features/[feat]/components/[component-name]/` | Component scoped to a single feature. Move to `shared/` if reuse is needed. |

### Naming Examples

| Type | File Name | Class Name |
| ---- | --------- | ---------- |
| Template | `card-house.template.ts` | `CardHouseTemplate` |
| Page | `search-page.ts` | `SearchPage` |
| Section | `houses-as-cards.section.ts` | `HousesAsCardsSection` |
| Shared Component | `card.component.ts` | `CardComponent` |
| Feature Component | `property-filter.component.ts` | `PropertyFilterComponent` |

---

## Procedure

### Step 1 — Gather Requirements

Determine (ask the user if unclear):

1. **Name** — kebab-case identifier (e.g., `property-filter`, `hero-banner`).
2. **Type** — template, page, section, shared component, or feature component.
3. **Location** — target feature or `shared/components/`.
4. **Design reference** — if provided, read `design-based-styling-components.instructions.md`.

### Step 2 — Check for Reusable Components

Before creating anything, verify whether an existing shared component can be reused or wrapped:

- Review `shared-components.instructions.md` for the component catalog.
- **Base components** available for composition: `CardComponent`, `CustomButton`, `CustomHeader`.
- **Existing templates**: `CardHouseTemplate`, `CardServiceTemplate`, `CardBannerSidesTemplate`, `CardAgentTemplate`.

If a shared component can solve the need, use it. If a template can be created by wrapping a base component, prefer that over a new standalone component.

### Step 3 — Create the Component File

Create a single `.ts` file inside the correct folder. All components must follow this base structure:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  imports: [],
  template: `
    <div>
      <!-- Content -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentName {}
```

**Mandatory rules:**
- `ChangeDetectionStrategy.OnPush` — always.
- `input()` / `output()` functions — never `@Input()` / `@Output()` decorators.
- `computed()` for derived state.
- `inject()` instead of constructor injection.
- Inline template — no external `.html` files.
- No external `.scss` / `.css` files — use Tailwind classes or inline `styles` if needed.
- No `ngClass` / `ngStyle` — use `[class.foo]`, `[class]`, or computed class strings.
- `export default class` for pages and areas; `export class` for everything else.

### Step 4 — Compose Base Components (Templates Only)

Templates must wrap a base shared component. Example pattern:

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CardComponent } from '@shared/components';

@Component({
  selector: 'app-property-card',
  imports: [CardComponent],
  template: `
    <app-card isShadowXl>
      <h3 class="text-lg font-semibold">{{ title() }}</h3>
      <p class="text-sm text-gray-500">{{ description() }}</p>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyCardTemplate {
  title = input.required<string>();
  description = input<string>('');
}
```

### Step 5 — Create the Spec File

Every component requires a colocated `.spec.ts` file with at least the `should create` test:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentName } from './component-name.template';

describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

For **pages** (default exports), adjust the import:

```typescript
import ComponentName from './component-name';
```

### Step 6 — Update Barrel Exports

Add the component to the nearest `index.ts`:

```typescript
// Named exports (templates, sections, shared/feature components)
export * from './component-name/component-name.template';
export * from './section-name/section-name.section';

// Default exports (pages)
export { default as PageName } from './page-name/page-name';
```

### Step 7 — Add Route (Pages Only)

If the new component is a page, add a route in the corresponding route file using lazy loading:

```typescript
{
  path: 'page-path',
  title: 'Page Title',
  loadComponent: () => import('@features/feature-name/pages/page-name/page-name'),
}
```

Refer to `routing.instructions.md` for guard configuration and layout integration.

### Step 8 — Verify Final Structure

Confirm the generated files match the expected folder layout:

```
feature-name/
├── index.ts                            # Updated barrel
├── components/
│   ├── index.ts
│   └── component-name/
│       ├── component-name.template.ts
│       └── component-name.spec.ts
├── pages/
│   ├── index.ts
│   └── page-name/
│       ├── page-name.ts                # Default export
│       └── page-name.spec.ts
└── sections/
    ├── index.ts
    └── section-name/
        ├── section-name.section.ts
        └── section-name.spec.ts
```

---

## Examples

### Template — Wrapping `CustomButton`

```typescript
// shared/components/filter-button/filter-button.template.ts
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CustomButton } from '@shared/components';

@Component({
  selector: 'app-filter-button',
  imports: [CustomButton],
  template: `
    <div class="relative">
      <app-custom-button
        isSecondary
        (isButtonClicked)="onFilterClicked()">
        {{ label() }}
        @if (count() > 0) {
          <span class="ml-2 bg-primary text-white rounded-full px-2 py-1 text-xs">
            {{ count() }}
          </span>
        }
      </app-custom-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterButtonTemplate {
  label = input.required<string>();
  count = input<number>(0);
  filterClicked = output<void>();

  onFilterClicked(): void {
    this.filterClicked.emit();
  }
}
```

Barrel update (`shared/components/index.ts`):
```typescript
export * from './filter-button/filter-button.template';
```

### Page — Property Listings

```typescript
// features/properties/pages/listings-page/listings-page.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardHouseTemplate } from '@shared/components';

@Component({
  selector: 'app-listings-page',
  imports: [CardHouseTemplate],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-h1 font-bold mb-6">Property Listings</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        @for (house of houses; track house.id) {
          <app-card-house-template />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListingsPage {
  houses: { id: number }[] = [];
}
```

Barrel update (`features/properties/pages/index.ts`):
```typescript
export { default as ListingsPage } from './listings-page/listings-page';
```

### Section — Featured Properties

```typescript
// features/landing/sections/featured-properties/featured-properties.section.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardHouseTemplate } from '@shared/components';

@Component({
  selector: 'app-featured-properties',
  imports: [CardHouseTemplate],
  template: `
    <section class="py-16 px-4">
      <h2 class="text-3xl font-bold mb-8">Featured Properties</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <app-card-house-template />
        <app-card-house-template />
        <app-card-house-template />
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedPropertiesSection {}
```

Barrel update (`features/landing/sections/index.ts`):
```typescript
export * from './featured-properties/featured-properties.section';
```

---

## Final Checklist

Before marking the component as done, verify:

- [ ] File is in the correct folder for its type.
- [ ] File uses the correct suffix (`.template.ts`, `.ts`, `.section.ts`, `.component.ts`).
- [ ] `ChangeDetectionStrategy.OnPush` is set.
- [ ] Correct export type (`export default class` for pages/areas, `export class` for everything else).
- [ ] Uses `input()` / `output()` — not decorators.
- [ ] Uses `computed()` for derived state when applicable.
- [ ] Template and styles are inline (no external `.html` / `.scss` files).
- [ ] No `ngClass` or `ngStyle` used.
- [ ] **Templates**: compose a base shared component (`CardComponent`, `CustomButton`, etc.).
- [ ] Imports use path aliases (`@shared/components`, `@features/...`) and barrel files.
- [ ] Spec file created with `should create` test.
- [ ] Barrel export (`index.ts`) updated.
- [ ] Selector follows `app-` prefix convention.
- [ ] Styling uses Tailwind classes and design tokens — no hardcoded values.
- [ ] Route added (pages only) with lazy loading and title.
- [ ] Relevant instruction files were read and their rules applied.
