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
