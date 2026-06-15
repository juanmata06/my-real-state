# Design-Based Styling Components

This document defines how to implement UI when the user provides a visual reference such as an image, video, Figma file, screenshot, or written design specification.

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

## Core Rule

When a visual reference is provided, the implementation must match it as closely as possible.

- Treat the reference as the source of truth for layout, spacing, hierarchy, proportions, typography, colors, borders, radius, shadows, and visual tone.
- Prioritize visual fidelity over logic, abstractions, and technical enhancements.
- Reproduce the intended look and feel before implementing non-essential behavior.

---

## Design First

When the task is design-driven:

- Focus first on the visual result.
- Do not implement business logic, data integration, state flows, API calls, or complex interactions unless the user explicitly asks for them.
- Use the lightest possible structure and mock data when needed to support the UI.
- Do not over-engineer the component during the design phase.

Default assumption: the UI must look correct first, and functional logic will be added later.

---

## Responsive Requirement

- Any UI built from a design reference is expected to be responsive.
- Preserve layout, hierarchy, spacing, and readability across the breakpoints implied by the task.
- Do not treat responsiveness as optional, even if the reference only shows one screen size.

---

## Working With References

- Study the reference carefully before writing code.
- Extract the main visual structure first: sections, alignment, content blocks, and responsive behavior.
- Match the most visible design decisions before polishing minor details.
- Do not replace a specific design with a generic default layout.
- Do not invent major UI patterns when the reference already suggests a clear solution.

---

## Practical Guidance

- Start from the visual skeleton of the component or page.
- Build the layout and styling first, then refine details.
- Keep code simple and readable while preserving fidelity.
- Respect the project's Angular and styling conventions, but do not let generic defaults override the provided design.
- Use Tailwind, PrimeNG, and project tokens pragmatically to recreate the design.
- Preserve semantic HTML and accessibility basics.

---

## Working Rule

When the user shows a design reference, follow this order:

1. understand the reference,
2. reproduce it as accurately as possible,
3. make it responsive,
4. ask for missing context if accuracy is blocked,
5. leave non-essential logic for later unless the user explicitly asks for it.
