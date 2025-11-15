# Team Coding Standards

This document describes how we structure code in this project and the conventions we follow.
The goal is to make our codebase **predictable, readable, and easy to review**.

---

## 1. Project structure

All new code should live under `src/` (for application code) and `tests/` (for automated tests).

```text
pm-training-tasks/
├─ docs/                 # Documentation (git workflow, coding standards, etc.)
├─ src/                  # Application code
│  ├─ api/               # API clients / backend integration
│  ├─ components/        # Reusable UI components
│  ├─ pages/             # Page-level views / screens
│  └─ utils/             # Shared utilities and helpers
├─ tests/                # Unit / integration tests
└─ public/               # Static assets (images, icons, static HTML)
