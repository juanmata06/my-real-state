# My Real State — Copilot Instructions

## Project Overview

My Real State is a **SaaS platform for real estate property search and management**. It serves as a property listing aggregator where buyers and sellers can discover, compare, and manage real estate properties available for purchase or sale.

### Target Users

- **Buyers**: Search and filter properties by location, price, type, and other criteria.
- **Sellers**: List properties for sale with photos, descriptions, and pricing, being able to contact customers.
- **Real Estate Agencies**: Upload and edit property listings, manage client relationships, and handle user accounts.

### Core Features

- **Property Search**: Advanced search with filters for location, price range, property type, and more.
- **Property Listings**: Browse featured properties with photo galleries, detailed descriptions, and pricing.
- **Authentication**: User registration and login with role-based access.
- **Agent Dashboard**: Property upload and editing, user management, and client communication tools.

---

## Technology Stack

| Layer            | Technology                                                    |
| ---------------- | ------------------------------------------------------------- |
| Framework        | Angular 20 (standalone components, signals)                   |
| Language         | TypeScript 5.9 (strict mode)                                  |
| Styling          | Tailwind CSS 4+ with PostCSS, SCSS for global config          |
| UI Library       | PrimeNG 20                                                    |
| State Management | Angular Signals, NgRx Signals (Signal Stores)                 |
| Backend / BaaS   | Supabase (auth, database, storage)                            |
| Icons            | Font Awesome (via `@fortawesome/angular-fontawesome`)         |
| Routing          | Angular Router with lazy loading and layout-based routes      |
| Testing          | Karma + Jasmine                                               |
| Formatting       | Prettier (single quotes, 100 char width, Angular HTML parser) |

---

## AI Behavior

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

### Language

- All code, comments, variable names, and commit messages MUST be written in **English**.
- All responses and explanations to the user MUST be in **Spanish**.

### Communication Style

- Be direct and concise. Focus on solving the problem or fulfilling the request — no filler, no flattery, no verbose explanations.
- If the user asks for an explanation, then provide one. Otherwise, deliver the solution.
- **IMPORTANT**: If you need more context to proceed correctly, **ask the user before guessing**.

---

## MCP Servers

Before executing any user request that involves Angular CLI operations, code generation, or PrimeNG components, **always query the available MCP servers first** in `./.vscode/mcp-servers.json`:

- **`angular-cli`**: Use for Angular best practices (`get_best_practices`), listing workspace projects (`list_projects`), and searching Angular documentation (`search_documentation`). Query this before generating components, services, directives, or any Angular artifact.
- **PrimeNG docs**: When working with PrimeNG components, search the Angular CLI MCP documentation or official PrimeNG resources to ensure correct API usage and up-to-date component signatures.

---

## Skills

The following custom skills are available. Use them when the task matches their trigger conditions:

| Skill | When to Use |
| ----- | ----------- |
| **`create-angular-component`** | Any component creation task: pages, sections, templates, shared components. Triggers: "create a component", "make this a component", "add a new page", "add a section", "new template", and their Spanish equivalents. |
| **`sync-project-documentation`** | Update project documentation after code changes. Triggers: "update docs", "sync documentation", "sync docs", and their Spanish equivalents. |

---

## Instruction Files

The following instruction files contain detailed conventions for specific topics. **Read and follow the relevant instruction file before writing or modifying code that falls within its scope.**

| Instruction File | Scope |
| ---------------- | ----- |
| [architecture.instructions.md](.github/instructions/architecture.instructions.md) | Architecture patterns, folder structure, module organization |
| [component-structure.instructions.md](.github/instructions/component-structure.instructions.md) | Component types, naming conventions, file structure, decorators |
| [design-based-styling-components.instructions.md](.github/instructions/design-based-styling-components.instructions.md) | Design implementation, styling components based on design mockups and specifications |
| [imports-and-path-aliases.instructions.md](.github/instructions/imports-and-path-aliases.instructions.md) | TypeScript path aliases, barrel files, import rules |
| [routing.instructions.md](.github/instructions/routing.instructions.md) | Route definitions, lazy loading, layout-based routing, guards |
| [styling.instructions.md](.github/instructions/styling.instructions.md) | Tailwind CSS, design tokens, global styles, SCSS rules |
| [shared-components.instructions.md](.github/instructions/shared-components.instructions.md) | Shared component library, reuse rules, barrel exports |
| [state-management.instructions.md](.github/instructions/state-management.instructions.md) | Signals, NgRx Signal Stores, state conventions |

