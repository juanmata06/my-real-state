---
name: sync-project-documentation
description: >
  Audits and synchronizes all `.github/` documentation (copilot-instructions.md, instruction files, skill files)
  with the current state of the project codebase.
  Triggers (EN): "sync docs", "update docs", "sync documentation", "update documentation",
  "review instructions", "audit .github", "sync .github".
  Triggers (ES): "sincroniza los docs", "actualiza la documentación", "sincroniza la documentación",
  "revisa las instructions", "audita .github", "sincroniza .github", "actualiza todo lo de .github".
  Covers: instruction file accuracy, skill descriptions and trigger words, copilot-instructions.md references,
  barrel exports, folder structure documentation, technology stack, and cross-reference consistency.
argument-hint: 'Optional scope (e.g., "only instructions", "only skills", "everything")'
---

# Sync Project Documentation

This skill audits and updates all `.github/` configuration files so they accurately reflect the current state of the project. It ensures instruction files, skill files, and `copilot-instructions.md` stay in sync with the codebase after refactors, new features, or structural changes.

**This skill runs only when the user explicitly requests it.** It is never triggered automatically.

---

## Language

- All code, comments, variable names, and commit messages MUST be written in **English**.
- All responses and explanations to the user MUST be in **Spanish**.

## Communication Style

- Be direct and concise. Focus on solving the problem or fulfilling the request — no filler, no flattery, no verbose explanations.
- If the user asks for an explanation, then provide one. Otherwise, deliver the solution.

## Context

- **IMPORTANT**: If you need more context to proceed correctly, **ask the user before guessing**.
- Especially for:
  - responsive behavior across screen sizes,
  - missing screens or hidden states,
  - spacing or sizing that cannot be inferred reliably,
  - colors or typography not visible enough in the reference,
  - interaction details that affect layout,
  - whether the result should be an exact match or a close adaptation.

---

## When to Use This Skill

- The user explicitly asks to update, sync, audit, or review the `.github/` documentation.
- After significant project changes (new features, renamed folders, new shared components, technology updates).
- When instruction files, skill files, or `copilot-instructions.md` are suspected to be outdated.

---

## Scope of Audit

This skill covers three documentation layers:

| Layer | Files | What to Validate |
| ----- | ----- | ---------------- |
| **Copilot Instructions** | `.github/copilot-instructions.md` | Project overview, tech stack, skill table, instruction file table, MCP server references. |
| **Instruction Files** | `.github/instructions/*.instructions.md` | Accuracy of rules, conventions, examples, and referenced components/services/stores against the actual codebase. |
| **Skill Files** | `.github/skills/*/SKILL.md` | Trigger words, descriptions, referenced instruction files, component catalogs, examples, and procedure steps. |

---

## Procedure

### Step 1 — Scan the Codebase

Gather the current state of the project by examining:

1. **Folder structure** — `src/app/` tree: layouts, features (with their pages, sections, components), shared (components, services, models, store, guards, interceptors, mappers, utils, constants).
2. **Shared components** — List all components in `shared/components/`, their file suffixes, selectors, inputs, and outputs.
3. **Services** — List all services in `shared/services/`.
4. **Models/Interfaces** — List all models in `shared/models/`.
5. **Stores** — List all stores in `shared/store/`.
6. **Guards and interceptors** — List all guards in `shared/guards/` and interceptors in `shared/interceptors/`.
7. **Routes** — Review `app.routes.ts` and any feature-level route files.
8. **Technology stack** — Check `package.json` for framework versions, dependencies, and dev dependencies.
9. **Path aliases** — Check `tsconfig.json` for `paths` configuration.
10. **Barrel files** — Check all `index.ts` files for completeness (every public component/service/model should be exported).

### Step 2 — Audit Instruction Files

For each file in `.github/instructions/`:

| Check | Description |
| ----- | ----------- |
| **Accuracy** | Do the rules and conventions described still match the codebase? (e.g., if an instruction says "use `@Input()` decorators" but the project uses `input()` functions, it's outdated.) |
| **Completeness** | Are there new patterns, components, services, or conventions in the codebase that should be documented but aren't? |
| **Examples** | Do code examples use real component names, correct imports, and valid path aliases? |
| **Cross-references** | Do references to other instruction files use the correct file names? |
| **Shared component catalog** | (For `shared-components.instructions.md`) Does the catalog list all current shared components with their correct inputs/outputs? |
| **Store conventions** | (For `state-management.instructions.md`) Does it reflect the actual stores and their patterns? |
| **Routing** | (For `routing.instructions.md`) Does it match the actual route structure, guards, and lazy loading patterns? |
| **Standard header** | Every instruction file must include the Language, Communication Style, and Context sections (see template below). |

#### Standard Header Template for Instruction Files

Every instruction file MUST start with its title followed by these sections:

```markdown
# [Instruction Title]

This document describes [topic].

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
```

### Step 3 — Audit Skill Files

For each file in `.github/skills/*/SKILL.md`:

| Check | Description |
| ----- | ----------- |
| **YAML frontmatter** | Is the `name` correct? Does the `description` accurately describe the skill's purpose? Are trigger words comprehensive (both EN and ES)? |
| **Instruction file references** | Does the skill's "Related Instruction Files" table list all relevant instruction files with correct file names? |
| **Component/service catalogs** | Do lists of available components, services, or stores match the current codebase? |
| **Procedure steps** | Are the steps still valid? Do they reference correct folder paths and file patterns? |
| **Examples** | Do code examples compile and follow current project conventions? |
| **Checklist** | Does the final checklist cover all current project rules? |
| **Standard header** | Every skill file must include the Language, Communication Style, and Context sections after the YAML frontmatter. |

### Step 4 — Audit `copilot-instructions.md`

| Check | Description |
| ----- | ----------- |
| **Project overview** | Does it accurately describe the application's purpose and target users? |
| **Technology stack table** | Do framework names and version numbers match `package.json`? |
| **Skills table** | Does it list all skills in `.github/skills/` with correct names, descriptions, and trigger words? |
| **Instruction files table** | Does it list all instruction files in `.github/instructions/` with correct names and scope descriptions? |
| **MCP servers** | Are the MCP server references accurate and up to date? |
| **AI Behavior section** | Does it include the Language, Communication Style, and Context rules? |

### Step 5 — Report Findings

Present a summary to the user organized by file, using this format:

```
## Resultado de la Auditoría

### ✅ Archivos sin cambios necesarios
- `architecture.instructions.md`
- `styling.instructions.md`

### ⚠️ Archivos que requieren actualización
| Archivo | Problema | Acción sugerida |
| ------- | -------- | --------------- |
| `shared-components.instructions.md` | Falta `DialogHostComponent` en el catálogo | Agregar componente con sus inputs/outputs |
| `copilot-instructions.md` | Versión de Angular desactualizada (dice 19, es 20) | Actualizar tabla de tecnologías |
| `create-angular-component/SKILL.md` | Ejemplo usa `@Input()` en vez de `input()` | Actualizar ejemplo |

### 🆕 Documentación faltante
- No existe instrucción para [tema detectado]
```

### Step 6 — Apply Changes

After presenting the report, **ask the user for confirmation** before applying changes. Then:

1. Update each outdated file with the correct information.
2. Add missing documentation entries.
3. Ensure all cross-references between files are consistent.
4. Verify barrel exports match the documented components.

---

## Cross-Reference Validation Rules

These rules ensure all `.github/` files reference each other correctly:

1. **Every instruction file** listed in `copilot-instructions.md` must exist in `.github/instructions/`.
2. **Every skill** listed in `copilot-instructions.md` must have a corresponding folder in `.github/skills/` with a `SKILL.md`.
3. **Every instruction file** referenced in a skill's "Related Instruction Files" table must exist.
4. **Every shared component** mentioned in any instruction or skill file must exist in `shared/components/`.
5. **Every service, store, or guard** mentioned in documentation must exist in the codebase.
6. **File names** in documentation must match the actual file names exactly (including suffixes like `.template.ts`, `.section.ts`, `.component.ts`).

---

## Barrel Export Validation

During the audit, verify that every `index.ts` barrel file is complete:

- Every public component in `shared/components/` is exported from `shared/components/index.ts`.
- Every public service in `shared/services/` is exported from `shared/services/index.ts`.
- Every public model in `shared/models/` is exported from `shared/models/index.ts`.
- Every public store in `shared/store/` is exported from `shared/store/index.ts`.
- Every public guard in `shared/guards/` is exported from `shared/guards/index.ts`.
- Feature-level `index.ts` files export all public members of their subfolders.

If a barrel file is missing an export, include it in the audit report.

---

## Final Checklist

Before marking the sync as complete, verify:

- [ ] All instruction files reflect the current codebase conventions and patterns.
- [ ] All instruction files include the standard Language, Communication Style, and Context header.
- [ ] All skill files have accurate YAML frontmatter (name, description, triggers).
- [ ] All skill files reference the correct instruction files.
- [ ] All skill files include the standard Language, Communication Style, and Context header.
- [ ] `copilot-instructions.md` lists all current skills with correct trigger words.
- [ ] `copilot-instructions.md` lists all current instruction files with correct scopes.
- [ ] Technology stack versions match `package.json`.
- [ ] All cross-references between files are valid (no broken links or outdated names).
- [ ] Barrel exports are complete and match documented components.
- [ ] No phantom references (documentation mentions components, services, or stores that don't exist).
- [ ] User confirmed changes before they were applied.