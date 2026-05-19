---
name: sync-project-documentation
description: 'Synchronize and update project documentation in .github/*.md files by validating shared components, conventions, and patterns from actual codebase. Use when: documentation is outdated, new shared components added, conventions changed, or ensuring docs match actual code.'
argument-hint: 'Optional: specific file to update (e.g., "copilot-instructions.md")'
---

# Sync Project Documentation

Validates and updates all documentation files in `.github/` to reflect the current state of the codebase, ensuring documentation stays synchronized with actual code patterns, shared components, and conventions.

## When to Use

- After adding new shared components
- When component APIs change (inputs, outputs, selectors)
- After updating project conventions or patterns
- When documentation becomes outdated or inaccurate
- Before onboarding new team members
- As part of release preparation

## What Gets Validated & Updated

### 1. Shared Components (`src/app/shared/components/`)

For each component, validate and document:
- **Existence**: Component file exists and is properly exported
- **Selector**: Correct `app-*` selector
- **Type**: Template, Container, or Utility component
- **API Surface**:
  - `input()` functions with types and transform functions
  - `output()` functions with event types
  - Public methods if any
- **Usage Examples**: Real examples from the codebase
- **Composition Patterns**: Which components use other shared components

### 2. Project Conventions

Extract and validate from actual code:
- **Naming Patterns**: `.template.ts`, `.page.ts`, `.section.ts`, `.spec.ts`
- **Export Patterns**: Default vs named exports
- **Import Patterns**: Barrel files usage, path aliases
- **Component Structure**: ChangeDetection, inline templates, signals
- **Folder Organization**: Feature structure, index.ts files
- **Routing Patterns**: Lazy loading, layout-based routing

### 3. Architecture Patterns

Validate current implementation of:
- **Path Aliases**: Check `tsconfig.json` for configured aliases
- **Barrel Exports**: Verify all `index.ts` files export correctly
- **Component Types**: Confirm Areas, Pages, Templates, Sections usage
- **State Management**: Signals, computed, reactive patterns in use

## Procedure

### Step 1: Scan Shared Components

Read all components in `src/app/shared/components/`:

```bash
# Components to scan
src/app/shared/components/
├── card/card.component.ts
├── custom-button/custom-button.ts
├── custom-header/custom-header.ts
├── card-house/card-house.template.ts
├── card-service/card-service.template.ts
└── card-banner-sides/card-banner-sides.template.ts
```

For each component, extract:
1. Class name and export type
2. Component decorator metadata (selector, imports)
3. All `input()` declarations with types
4. All `output()` declarations with types
5. Template (inline or templateUrl)
6. Whether it composes other shared components

### Step 2: Validate Barrel Exports

Check `src/app/shared/components/index.ts`:
- Verify all components are exported
- Ensure export syntax is correct (named vs default)
- Identify any missing exports

### Step 3: Find Usage Examples

Search the codebase for real usage examples:
- Grep for component selectors in templates
- Find imports in other components
- Extract actual usage patterns from pages/sections

### Step 4: Extract Project Conventions

Scan the project structure to confirm:

**Naming Conventions:**
```bash
# Find all component files grouped by type
**/*.template.ts    # Templates
**/*.page.ts        # Pages
**/*.section.ts     # Sections
**/*.spec.ts        # Tests
```

**Export Patterns:**
Search for:
- `export default class` (Pages/Areas)
- `export class` (Templates/Sections)
- Barrel file patterns in `index.ts` files

**Import Patterns:**
Verify path aliases usage:
- `@shared/components`
- `@features/*`
- `@layouts/*`

### Step 5: Validate Component Composition

For template components that wrap `CardComponent`, verify:
- They import `CardComponent`
- They use it in their template
- They configure specific inputs (e.g., `isShadowXl`)
- Document the composition pattern

### Step 6: Update Documentation Files

Update the following files in `.github/`:

#### A. `copilot-instructions.md`

Update these sections:

**Shared Components Library:**
```markdown
## Shared Components Library

The project has reusable components in `@shared/components`. Always use these instead of creating new ones:

### CardComponent
[Document current API, inputs, outputs, usage]

### CustomButton
[Document current API, inputs, outputs, usage]

### Card Template Components
[List all components that compose CardComponent]
```

**Component Guidelines:**
- Verify import examples are accurate
- Update path aliases if changed
- Confirm barrel export instructions

**Architecture Patterns:**
- Validate Component Structure section
- Update Imports & Path Aliases with current tsconfig
- Verify Routing patterns match app.routes.ts

#### B. Skills documentation

Update `create-angular-component/SKILL.md`:
- Ensure shared components list is current
- Verify import examples
- Update procedure steps if conventions changed

### Step 7: Generate Validation Report

Create a summary of what was validated and updated:

```
✓ Validated 6 shared components
✓ All components properly exported in index.ts
✓ Found 12 usage examples across the codebase
✓ Naming conventions: 100% compliance
✓ Path aliases: @shared, @features, @layouts configured
✗ CardHouseTemplate missing usage example in docs
✓ Updated copilot-instructions.md
✓ Updated create-angular-component/SKILL.md
```

## Validation Checklist

### Shared Components Validation

For each component in `src/app/shared/components/`:

- [ ] Component file exists at documented path
- [ ] Component is exported in `index.ts`
- [ ] Selector matches documentation (starts with `app-`)
- [ ] All `input()` functions documented with types
- [ ] All `output()` functions documented with types
- [ ] Usage example is accurate and from actual codebase
- [ ] If it composes other components, composition is documented
- [ ] ChangeDetection strategy is OnPush
- [ ] Has corresponding spec file

### Conventions Validation

- [ ] All `.template.ts` files use named exports
- [ ] All `.page.ts` files use default exports
- [ ] All `.section.ts` files use named exports
- [ ] All folders have `index.ts` barrel exports
- [ ] Path aliases in `tsconfig.json` match documentation
- [ ] Import examples use barrel files, not direct paths
- [ ] Component examples follow inline template pattern for simple cases
- [ ] All components use `input()` and `output()` (not decorators)

### Documentation Files Validation

- [ ] `copilot-instructions.md` has all shared components listed
- [ ] Component APIs in docs match actual implementation
- [ ] Usage examples compile and are tested
- [ ] Naming conventions section reflects actual patterns
- [ ] Architecture patterns match project structure
- [ ] Path aliases documentation matches `tsconfig.json`
- [ ] Business domain information is current

## Example Execution

### Scanning CardServiceTemplate

```typescript
// Found in: src/app/shared/components/card-service/card-service.template.ts
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CustomButton } from '../custom-button/custom-button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-service-template',
  imports: [CardComponent, CustomButton],
  template: `
    <app-card isShadowXl>
      <!-- content -->
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardServiceTemplate {
  private _router = inject(Router);
  
  onButtonClicked(): void {
    this._router.navigate(['/search']);
  }
}
```

**Extracted information:**
- ✓ Selector: `app-card-service-template`
- ✓ Export type: Named export (correct for template)
- ✓ Composes: `CardComponent` (with `isShadowXl`), `CustomButton`
- ✓ Inputs: None
- ✓ Outputs: None (internal navigation)
- ✓ Pattern: Template component wrapping CardComponent

**Documentation update:**
```markdown
- **CardServiceTemplate**: Wraps `CardComponent` for real estate service displays (buy, sell, rent)
  - Uses `CardComponent` with `isShadowXl` enabled
  - Includes structured layout for service icon, title, and CTA button
  - Selector: `app-card-service-template`
  - Usage: `<app-card-service-template />`
```

### Finding Usage Examples

```bash
# Search for component usage
grep -r "app-card-service-template" src/app/features/

# Found in: src/app/features/landing/sections/services-as-cards/services-as-cards.section.ts
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <app-card-service-template />
  <app-card-service-template />
  <app-card-service-template />
</div>
```

Add this as the usage example in documentation.

### Validating Project Conventions

```bash
# Check naming patterns
find src/app -name "*.template.ts" | wc -l  # 3 templates
find src/app -name "*.page.ts" | wc -l      # 2 pages
find src/app -name "*.section.ts" | wc -l   # 5 sections

# Verify all have specs
find src/app -name "*.template.ts" -exec sh -c 'test -f "${1%.template.ts}.spec.ts"' _ {} \; -print
```

### Checking Path Aliases

```javascript
// Read tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"],
      "@layouts/*": ["src/app/layouts/*"]
    }
  }
}
```

Verify documentation reflects these exact aliases.

## Post-Validation Actions

After running this skill:

1. **Review Changes**: Check all updated documentation files
2. **Test Examples**: Verify all code examples compile
3. **Update Dependencies**: If new patterns emerged, update related skills
4. **Communicate**: Share updated docs with team
5. **Commit**: Commit documentation updates with descriptive message

## Output Format

The skill should provide a structured report:

```markdown
# Documentation Sync Report

## Summary
- ✓ 6/6 shared components validated
- ✓ All barrel exports verified
- ! 1 component missing documentation
- ✓ All conventions validated

## Shared Components Status

### CardComponent
✓ Exists at src/app/shared/components/card/card.component.ts
✓ Exported in index.ts
✓ 5 inputs documented: isPrimary, isSecondary, isTransparent, isNotBordered, isShadowXl
✓ Usage examples: 3 found

### CustomButton
✓ Exists at src/app/shared/components/custom-button/custom-button.ts
✓ Exported in index.ts
✓ 3 inputs, 1 output documented
✓ Usage examples: 8 found

[... more components ...]

## Convention Compliance

✓ Naming: 100% compliance (.template.ts, .page.ts, .section.ts)
✓ Exports: 100% compliance (default for pages, named for templates)
✓ Path Aliases: All imports use barrel files
✓ Tests: 95% coverage (1 component missing spec)

## Files Updated

- [x] .github/copilot-instructions.md
  - Updated Shared Components Library section
  - Added CardHouseTemplate documentation
  - Verified all usage examples

- [x] .github/skills/create-angular-component/SKILL.md
  - Updated shared components list
  - Added new naming convention example

## Recommendations

1. Add spec file for CardHouseTemplate
2. Consider documenting internal navigation pattern in CardServiceTemplate
3. Update README.md with component library reference
```

## Notes

- This skill is read-heavy and should validate before making changes
- Always preserve user customizations in documentation
- If conflicts arise, ask for clarification rather than overwriting
- Keep track of components that aren't documented but exist (may be intentional)
- Document deprecated components separately
