# Shared Components

This document defines the shared components available in the project and how to use them. Shared components are reusable building blocks that can be imported and used across multiple features.

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

## Shared Components Location

All shared components are located in `src/app/shared/components/`. Every new reusable component should be exported via the `index.ts` barrel file in that folder.

---

## Component Categories

### Base Components

Base components provide foundational styling and behavior. They are often extended or wrapped by more specific components.

#### `CardComponent`

A styled container built on PrimeNG's `p-card` with support for color and shadow variants.

**Inputs:**
- `isPrimary`: boolean — Apply primary background color.
- `isSecondary`: boolean — Apply secondary background color.
- `isTransparent`: boolean — Apply transparent background.
- `isNotBordered`: boolean — Remove border styling.
- `isShadowXl`: boolean — Apply extra-large shadow effect.

**Usage:** Wrap content that needs card styling:
```typescript
<app-card [isPrimary]="true">
  <p>Your content here</p>
</app-card>
```

#### `CustomButton`

A styled button component with multiple visual variants for different contexts.

**Inputs:**
- `isPrimary`: boolean — Apply primary button styling.
- `isSecondary`: boolean — Apply secondary button styling.
- `isTransparent`: boolean — Apply transparent button styling.
- `isDisabled`: boolean — Disable the button.
- `type`: string — HTML button type (e.g., 'submit', 'button', 'reset').

**Usage:**
```typescript
<app-custom-button isPrimary type="submit">Click Me</app-custom-button>
```

#### `CustomHeader`

A reusable header component for page or section titles and metadata.

### Card Templates (Specialized Cards)

Card templates are composable presentation components that extend `CardComponent` with specific layouts and data bindings.

#### `CardHouseTemplate`

Displays a real estate property listing with image gallery, price, description, and action buttons.

**Inputs:**
- `houseImages`: Array of `GalleryImage` — Images for the property.
- Additional property details bound in the template.

#### `CardServiceTemplate`

Displays a service offering card used in landing page service sections.

**Inputs:**
- Service title, description, and icon/image.

#### `CardBannerSidesTemplate`

Displays a banner card with content on both sides for promotional layouts.

#### `CardAgentTemplate`

Displays a real estate agent card with profile information, photo, title, and contact options.

**Inputs:**
- `agentInfo`: `AgentInfo` object containing name, title, photo, and contact details.

### Forms

Form components handle user input with validation and submission logic.

#### `LoginForm`

Login form with email and password fields.

**Outputs:**
- `submitForm()` — Emitted when form is submitted with valid data.

**Form Fields:**
- `email` — Email input with email validation.
- `password` — Password input (masked).

#### `RegisterForm`

Registration form for new user signup.

**Outputs:**
- `submitForm()` — Emitted when form is submitted with valid data.

### Sections

Reusable HTML sections that provide specific functionality within features.

#### `AskSection`

A section that displays an agent's information and a form for asking questions about a property.

**Inputs:**
- `agentInfo`: Optional `AgentInfo` — When provided, displays agent details; when not provided, shows additional fields for first name, last name, and phone.

**Features:**
- Dynamic form fields based on whether agent info is available.
- Textarea for message input.

### Utility Components

Utility components provide specific UI functionality.

#### `SearchInput`

A specialized input component for property search with filtering and suggestions.

#### `CustomImagesGallery`

An image gallery component for displaying multiple property photos with navigation.

**Inputs:**
- `value`: Array of `GalleryImage` — Images to display in the gallery.

---

## Best Practices

1. **Always check shared components first.** Before creating a new component, verify if a shared component already exists that meets your needs.
2. **Reuse and extend.** If a shared component is close to what you need, extend or wrap it rather than creating a duplicate.
3. **Keep components generic.** Shared components should not contain feature-specific logic; they should be generic enough for reuse.
4. **Export via barrel.** Every shared component must be exported through the `shared/components/index.ts` file for convenient imports.
5. **Follow input/output conventions.** Use `input()` and `output()` signals for component communication.

---

## Importing Shared Components

Import shared components using the barrel export path:

```typescript
import { CardComponent, CustomButton, CardHouseTemplate } from '@shared/components';
```

Alternatively, import directly:

```typescript
import { CardComponent } from '@shared/components/card/card.component';
```

---

## Component Testing

When creating spec files for shared components, test:
- Component initialization.
- Input binding and transformation.
- Output emission.
- Template rendering with various input states.
- Accessibility attributes and semantics.
