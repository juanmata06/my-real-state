---
name: create-angular-component
description: 'Create new Angular standalone components following project patterns. Use when: creating new components, pages, sections, or templates in the Angular real estate app.'
argument-hint: 'Component name and type (e.g., "search-filter template" or "dashboard page")'
---

# Create Angular Component

Creates a new Angular standalone component following project conventions and patterns.

## When to Use

- Creating new reusable components (templates)
- Adding new pages to features
- Creating section components for pages
- Scaffolding components with proper naming and structure

## Component Types & Naming

The component type determines the file naming convention:

- **Template** (`.template.ts`): Specialized components that compose or extend base shared components
  - Example: `card-house.template.ts` → `export class CardHouseTemplate`
  - **Purpose**: Create domain-specific variations of base components like `CardComponent` or `CustomButton`
  - **Pattern**: Templates wrap base components with pre-configured styling and structure
  - **Examples from codebase**:
    - `CardHouseTemplate` - Wraps `CardComponent` for property displays
    - `CardServiceTemplate` - Wraps `CardComponent` with `isShadowXl` for services
    - `CardBannerSidesTemplate` - Wraps `CardComponent` for promotional banners
  - **When to create**: When you need a reusable variant of an existing shared component (e.g., a specialized button based on `CustomButton`, or a new card layout using `CardComponent`)
  - **Export**: Use named export (`export class`)
  
- **Page** (`.page.ts`): Page-level components for routes
  - Example: `dashboard.page.ts` → `export default class DashboardPage`
  - Use when: Creating routable page components
  - Export: Use default export (`export default class`)
  
- **Section** (`.section.ts`): Section components within pages
  - Example: `services-as-cards.section.ts` → `export class ServicesAsCardsSection`
  - Use when: Breaking down page into logical sections
  - Export: Use named export (`export class`)

## Procedure

### 1. Determine Component Details

Ask the user or infer from context:
- Component name (e.g., "property-filter", "listing", "hero-banner")
- Component type (template, page, or section)
- Target location (feature path, e.g., `features/searcher/components/`)

### 2. Create Component File

Create a single `.ts` file with proper naming:

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-component-name',
  imports: [],
  template: `
    <div>
      <!-- Component content -->
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentName {} // or: export default class ComponentName
```

**Critical patterns:**
- Use `ChangeDetectionStrategy.OnPush` always
- Prefer inline templates for simple components
- Use `input()` and `output()` functions (not decorators)
- Import from barrel files using path aliases (`@shared/components`, `@features/...`)
- For Pages and Areas: use `export default class`
- For Templates and Sections: use `export class`

### 3. Identify Base Components for Composition

**For Templates**: Always compose existing base components from `@shared/components`:

**Base Components (compose these):**
- `CardComponent` - Base card container with variants
- `CustomButton` - Base button with style variants
- `CustomHeader` - Navigation header

**Existing Templates (examples of composition):**
- `CardHouseTemplate` - Wraps `CardComponent` for property display
- `CardServiceTemplate` - Wraps `CardComponent` for service display
- `CardBannerSidesTemplate` - Wraps `CardComponent` for banners

**Pattern for new templates:**
```typescript
// Template wraps a base component
import { CardComponent } from '@shared/components';

@Component({
  selector: 'app-property-card',
  imports: [CardComponent],
  template: `
    <app-card isShadowXl>
      <!-- Domain-specific content -->
    </app-card>
  `,
})
export class PropertyCardTemplate {}
```

**For Pages/Sections**: Use templates and base components as needed:

```typescript
import { CardHouseTemplate, CustomButton } from '@shared/components';
```

Import from barrel: `import { CardComponent, CustomButton } from '@shared/components'`

### 4. Create Spec File

Create a basic spec file `component-name.spec.ts` with only the `should create` test:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentName } from './component-name';

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

**For default exports (Pages):**
```typescript
import ComponentName from './component-name.page';
```

### 5. Update Barrel Export

Add export to the corresponding `index.ts` file:

**For Templates (named exports):**
```typescript
export * from './component-name/component-name.template';
```

**For Pages (default exports):**
```typescript
export { default as ComponentName } from './component-name/component-name.page';
```

**For Sections (named exports):**
```typescript
export * from './component-name/component-name.section';
```

### 6. Verify Structure

Ensure the final structure follows conventions:

```
feature-name/
├── index.ts                          # Updated with new export
├── components/
│   ├── index.ts                      # Updated if component goes here
│   └── component-name/
│       ├── component-name.template.ts
│       └── component-name.spec.ts
├── pages/
│   ├── index.ts
│   └── page-name/
│       ├── page-name.page.ts         # Default export
│       └── page-name.spec.ts
└── sections/
    ├── index.ts
    └── section-name/
        ├── section-name.section.ts
        └── section-name.spec.ts
```

## Examples

### Creating a Template Component

Template components compose base shared components. Here's an example of a template that specializes `CustomButton`:

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

This template **wraps** `CustomButton` with a pre-configured style (`isSecondary`) and adds domain-specific features (filter count badge).

Update `shared/components/index.ts`:
```typescript
export * from './filter-button/filter-button.template';
```

### Creating a Page Component

```typescript
// features/properties/pages/listings/listings.page.ts
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardHouseTemplate } from '@shared/components';

@Component({
  selector: 'app-listings',
  imports: [CardHouseTemplate],
  template: `
    <div class="container mx-auto p-4">
      <h1>Property Listings</h1>
      <div class="grid grid-cols-3 gap-4">
        @for (house of houses; track house.id) {
          <app-card-house-template />
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ListingsPage {
  houses = [];
}
```

Update `features/properties/pages/index.ts`:
```typescript
export { default as ListingsPage } from './listings/listings.page';
```

### Creating a Section Component

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

Update `features/landing/sections/index.ts`:
```typescript
export * from './featured-properties/featured-properties.section';
```

## Checklist

- [ ] Component file created with correct naming (`.template.ts`, `.page.ts`, or `.section.ts`)
- [ ] `ChangeDetectionStrategy.OnPush` set
- [ ] Correct export type (default for Pages/Areas, named for Templates/Sections)
- [ ] **For Templates**: Composes a base component (CardComponent, CustomButton, etc.)
- [ ] Reused shared components where applicable
- [ ] Imports use path aliases and barrel files
- [ ] Spec file created with basic `should create` test
- [ ] Barrel export (`index.ts`) updated
- [ ] Selector follows `app-` prefix convention
- [ ] Template uses Tailwind utility classes (no component styles)
