# GitHub Copilot Instruction

## Overview

This document outlines the rules and guidelines for using GitHub Copilot in this project. Please adhere to these instructions to ensure consistency and quality.

## Rules

### 1. Response Language

- Copilot's suggestions and explanations must always be in **Japanese**, regardless of the language used in the user's instructions. The only exception is when writing **commit messages**, which must be in **English**.

### 2. Code Comments

- Add comments only when the code involves **complex logic** or **challenging processing**.
- Write comments in **English**.
- Avoid adding comments to simple or self-explanatory code.

### 3. Git Commit Messages

- Commit messages must be written in **English**.
- Use the following prefixes to indicate the type of change:
  - `feat:` for new features.
  - `fix:` for bug fixes.
  - `docs:` for documentation updates.
  - `style:` for formatting changes (no code logic changes).
  - `refactor:` for code restructuring without altering functionality.
  - `test:` for adding or updating tests.
  - `chore:` for maintenance tasks.
  - `revert:` for reverting previous changes.
- Include a brief explanation of the reason for the change or what it addresses.
  - Examples:
    - `feat: Add user authentication feature to enhance security`
    - `feat: Update example.jsx to improve mobile user experience`
    - `fix: Correct typo in README for better clarity`

### 4. Coding Style

- Use **camelCase** for function and variable names.
- Use **PascalCase** for JavaScript/TypeScript classes, interfaces, types, namespaces, enums, and constants.
- Maintain consistent indentation and formatting as per the project's established style guide.

### 5. tech stacks

when suggesting code, consider the following tech stacks:

- JavaScript (ES6+)
- TypeScript
- Astro v5.x.x
- Tailwind CSS v4.x.x - **no more tailwind.config.js**
- Astro Icon (iconify) - only use mdi and devicon icons sets.

### 6. Quick Fix Mode (-qf)

When I add the -qf flag (short for quick fix) at the end of my instruction:
- Only fix exactly the issue I described.
- Do not make any other edits — no linting, formatting, or refactoring.
- Do not add comments unless the fix requires complex or non-obvious logic.
- Assume all other parts of the file are correct and complete.
- Only read and modify the specified file — ignore all others.

### 7. use context 7 and playwright mcp mode (-usemcp)

When I add the -usemcp flag (short for use context 7 and playwright mcp mode) at the end of my instruction:
- Use the context 7 mcp to get the lates documents.
- use playwright mcp to test the code.

### 8. environments
- the development server is always running on localhost:4321 so you do not need to start a new server.

### 9. Spacing & Layout Guidelines

Follow these consistent spacing patterns for comfortable, professional layouts:

#### Section Spacing
- **Section vertical padding**: Use `py-24` for all major sections (Hero, Projects, Skills/Contact)
- **Section horizontal padding**: Use `px-6` for container content (upgrade from default `px-4` for better breathing room)
- **Maximum content width**: Keep `max-w-6xl` or `max-w-2xl` centered with `mx-auto`

#### Component Spacing
- **Hero section elements**:
  - Title bottom margin: `mb-6`
  - Subtitle bottom margin: `mb-6`
  - Description bottom margin: `mb-8`
  - Button gap: `gap-4`
  
- **Section headings**:
  - Major section heading bottom margin: `mb-20` (for section titles like "Featured Projects")
  - Subsection heading bottom margin: `mb-10` (for Skills, Contact titles)
  
- **Card layouts**:
  - Grid gap between cards: `gap-10` (projects), `gap-6` (skill cards)
  - Card internal padding: `p-8` (project cards), `p-6` (skill cards), `p-5` (contact links)
  - Card element spacing: `mb-6` for major elements, `mb-3` for minor elements
  
- **Two-column sections**:
  - Column gap: `gap-20` (lg screens)
  
- **List/Stack spacing**:
  - Vertical stacks: `space-y-5` for comfortable separation between items

#### Responsive Considerations
- Add `px-4` to sections for mobile viewport edge spacing
- Use responsive text sizes: smaller on mobile (`text-6xl`), larger on desktop (`text-7xl`)
- Maintain proportional spacing across breakpoints

#### Consistency Rules
- **Small gaps**: `2-3` (tight elements like icon-to-text)
- **Medium gaps**: `4-6` (related content groups)
- **Large gaps**: `8-10` (cards, major sections)
- **Extra large gaps**: `16-24` (section padding, major separations)

These values create visual hierarchy and comfortable white space throughout the interface.
