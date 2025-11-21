# Team Coding Standards

This document defines how we structure code in this project and the conventions we follow.
The goals are to make the codebase **predictable**, **readable**, and **easy to review**.

---

## 1. Folder structure

All application code lives under `src/`. Tests live under `src/__tests__`.  
Anything that doesn’t fit these buckets should be discussed in a PR before adding.

```text
pm-training-tasks/
├─ docs/                   # Documentation (git workflow, coding standards, etc.)
├─ src/                    # Application code
│  ├─ components/          # Re-usable presentational components
│  ├─ features/            # Feature-specific modules (logic + UI)
│  ├─ pages/               # Page-level route components
│  ├─ hooks/               # Re-usable React hooks
│  ├─ utils/               # Shared pure helper functions
│  ├─ styles/              # Global styles, tokens, design system
│  └─ types/               # Shared TypeScript types/interfaces
├─ public/                 # Static assets (images, fonts, favicon, static HTML)
└─ src/__tests__/          # Unit / integration tests

---

## 2. Linting & formatting

We use **ESLint** for JavaScript/TypeScript/React and **Prettier** for code formatting.

### 2.1 General expectations

- Code must pass `npm run lint` before merging.
- Code must be formatted with `npm run format` (or editor auto-format on save).
- No unused variables (unless intentionally prefixed with `_`).
- Always use strict equality (`===` / `!==`), not `==` / `!=`.

### 2.2 ESLint configuration (example `.eslintrc.cjs`)

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Turn off base rule and use TS-aware version
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Always use strict equality
    eqeqeq: ['error', 'always'],

    // Avoid console noise in production code
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Not needed with TypeScript
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

- Avoid `console.log` in committed code; use `console.warn` / `console.error` only if needed.
- Prefer small, focused functions and components over very large ones.

## 3. Naming & code style

### 3.1 General

- Use **clear, descriptive** names; avoid abbreviations that are not obvious.
  - ✅ `totalScore`, `userProfileForm`
  - ❌ `ts`, `upf`
- Use **English** for all identifiers and comments.
- Prefer **short functions** that do one thing well instead of long, multi-purpose functions.

### 3.2 Variables, functions, classes

- Variables and functions: `camelCase`
  - `const userName = ...`
  - `function loadUserProfile() { ... }`
- Components and classes: `PascalCase`
  - `UserProfile`, `ReviewList`
- Constants: `SCREAMING_SNAKE_CASE`
  - `const DEFAULT_PAGE_SIZE = 20;`

### 3.3 Booleans & enums

- Boolean names should read like yes/no questions:
  - `isLoading`, `hasError`, `isAdmin`.
- For multiple options, prefer enums or union types instead of magic strings:

```ts
type ContactMethod = 'email' | 'phone' | 'none';

### 4.1 Components

- Use **function components**; avoid class components.
- One main component per file. Small helper components are allowed if they are only used there.
- Keep components focused:
  - UI-only components with minimal logic in `components/`
  - Feature logic + UI in `features/`

### 4.2 Props & state

- Prefer **explicit prop types/interfaces**:

```ts
type UserProfileProps = {
  initialName?: string;
};

## 5. Error handling & API usage

- All API calls must go through a shared client module (e.g. `src/utils/apiClient.ts`).
- Handle errors close to where they occur and show a user-friendly message.
- Never swallow errors silently; at minimum, log them with context.

```ts
try {
  const data = await apiClient.getUserProfile();
} catch (error) {
  console.error('Failed to load user profile', error);
  // TODO: show error state in UI
}

## 6. Testing guidelines

- Tests live under `src/__tests__/` or next to the file under test:
  - `UserProfile.test.tsx`, `formatDate.test.ts`.
- At minimum, new features should have:
  - One happy-path test.
  - One error/edge case test.
- Prefer **behavior-focused** tests (what the user sees) over implementation details.
- Avoid relying on fragile things like exact DOM structure or internal state where possible.

## 7. Design patterns & architecture

We prefer **simple, recognizable patterns** over clever or custom ones. Patterns should
make the code easier to understand, not harder.

### 7.1 General principles

- Prefer **composition over inheritance**.
- Keep functions and components **small and focused**.
- Hide implementation details behind **clear interfaces**.
- Avoid premature abstraction: duplicate once, **extract on the third time**.

### 7.2 React/UI patterns

- **Container / Presentational pattern**
  - Container components handle data fetching, state, and side effects.
  - Presentational components receive props and focus on rendering UI.
  - Example:
    - `UserProfileContainer` (fetches data, handles loading/error).
    - `UserProfile` (displays profile, receives props from container).

- **Custom hooks for reusable logic**
  - Shared logic (API calls, timers, form state) should live in `hooks/` as `useXxx`.
  - Example: `useUserProfile`, `usePaginatedList`.
  - Hooks should hide implementation details and expose a simple API.

- **Props down, events up**
  - Data flows **down** as props.
  - Changes flow **up** via callbacks (`onSave`, `onChange`, etc.).

### 7.3 Data & domain patterns

- **Service / API client pattern**
  - All remote calls live in dedicated service modules (e.g. `userService`, `authService`).
  - Components should not know about low-level HTTP details (`fetch`, headers, etc.).

- **Repository-like separation (where useful)**
  - When data access becomes complex, introduce a repository layer that hides
    storage details (API vs. local cache) from the rest of the app.

### 7.4 When to introduce a pattern

Use a named pattern when:

- The structure will be reused in **multiple places**.
- The pattern makes it easier for a new team member to understand the intent.
- The added abstraction is clearly simpler than the duplicated code it replaces.

Avoid patterns when:

- They introduce new vocabulary without solving a real problem.
- They make debugging or tracing code flow significantly harder.
- They exist only to be “clever” or “enterprise-y”.

Document any **non-obvious pattern** briefly in the PR description and, if necessary,
add a short comment in the code pointing to this section.

