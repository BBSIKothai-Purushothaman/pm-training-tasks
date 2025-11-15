# Git Branching Strategy & Workflow

We use a **feature / develop / main** branching model.

## Branches

### main
- Always stable and ready for production deployment.
- Only tested and approved code is merged here.
- Protected: no direct pushes, only Pull Requests (PRs).

### develop
- Integration branch for ongoing development.
- All feature branches are merged into `develop`.
- When `develop` is stable, it is merged into `main` for a release.
- Protected: no direct pushes, only PRs.

### feature/* branches
- Short-lived branches for individual features, tasks, or bug fixes.
- Created from `develop`.
- Merged back into `develop` through a PR and then deleted.

**Naming convention**
- `feature/<ticket-id>-<short-description>`
- Example: `feature/123-add-login-api`

---

## Standard Workflow

### 1. Starting a new feature

1. Update your local `develop` branch:

   ```bash
   git checkout develop
   git pull origin develop
