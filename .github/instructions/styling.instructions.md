# Styling & CSS

This document defines the styling conventions, tools, and structure used across the project.

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

## Tools & Framework

The project uses **Tailwind CSS** and **PrimeNG** to streamline styling and UI component development:

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **PrimeNG**: Pre-built Angular components with built-in accessibility and responsiveness.

Use these tools as the first choice. Only add custom styles when Tailwind utilities and PrimeNG components are insufficient.

---

## Global Styles Structure

Global styles are organized in `src/app/styles/` with clear separation of concerns.

### styles.scss

Main entry point for global styles. Contains:
- Base styles applied to HTML elements (`html`, `body`, headings, paragraphs, inputs, etc.).
- General form element styling.
- Default focus and interaction states.
- Imports of all configuration files.

**Location**: `src/styles.scss`

**Rules**:
- Use this file only for element-level defaults and global resets.
- Do not add component-specific styles here.
- All element selectors must align with the design tokens defined in `tailwind-config.scss`.

### tailwind-config.scss

Tailwind configuration file. Contains:
- Design tokens (colors, spacing, typography, etc.) as CSS custom properties.
- `@theme :root` block with all customizable Tailwind values.
- Additional Tailwind-specific configurations needed by the project.

**Location**: `src/app/styles/tailwind-config.scss`

**Rules**:
- Add all design tokens and theme customizations here.
- Use CSS custom properties (e.g., `--color-primary`, `--text-size-h1`) that Tailwind utilities will reference.
- If a new token or configuration is needed project-wide, add it here.
- Never hardcode color or sizing values in components; use tokens instead.

### prime-ng-config.scss

PrimeNG component configuration file. Contains:
- Overrides and customizations for PrimeNG components.
- Global PrimeNG theming and styling adjustments.

**Location**: `src/app/styles/prime-ng-config.scss`

**Rules**:
- Use this file to customize PrimeNG components globally.
- If a PrimeNG component needs styling adjustments across the app, add them here.
- Do not add general styles or non-PrimeNG component styles here.

### Adding New Global Styles

If a new global style configuration is needed:

1. Create a new `.scss` file in `src/app/styles/`.
2. Import it in `styles.scss` (using `@use`).
3. Document its purpose in this file.
4. Name the file clearly (e.g., `animations.scss`, `accessibility.scss`).

---

## Component-Level Styling

Components must NOT have external `.scss` or `.css` files. Styles belong inside the component class.

### Using Tailwind in Templates

Prefer Tailwind utility classes in templates:

```typescript
@Component({
  selector: 'app-example',
  template: `<div class="flex gap-4 p-6 bg-gray-100 rounded-lg">
    <h1 class="text-h1 font-bold text-primary">Title</h1>
    <p class="text-body text-gray-strong">Description</p>
  </div>`,
})
export class ExampleComponent {}
```

### Using Component-Specific Styles

When Tailwind utilities are not enough, use the `styles` property in the component:

```typescript
@Component({
  selector: 'app-example',
  template: `<div class="custom-container">...</div>`,
  styles: [`
    .custom-container {
      animation: slideIn 0.3s ease-out;
    }
    @keyframes slideIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
})
export class ExampleComponent {}
```

### Using Host Bindings

Use the `host` property for component-level styles and attributes:

```typescript
@Component({
  selector: 'app-example',
  template: `...`,
  host: {
    class: 'block p-4 bg-white rounded-md',
    '[style.min-height.px]': '300',
  },
})
export class ExampleComponent {}
```

---

## Best Practices

1. **Default to Tailwind**: Use Tailwind classes first. They are concise, maintainable, and consistent with design tokens.
2. **Minimize Custom CSS**: Only add custom styles when necessary. Most needs can be met with Tailwind utilities.
3. **Use Design Tokens**: Always reference design tokens from `tailwind-config.scss` (colors, spacing, typography). Never hardcode values.
4. **PrimeNG Components**: Use PrimeNG components for complex interactions (modals, dropdowns, date pickers). Style them with Tailwind or PrimeNG props.
5. **Consistency**: Apply styles consistently across the app by reusing utility classes and adhering to the design system.
6. **Performance**: Keep component-specific styles small and focused. Avoid duplicating global styles in components.


