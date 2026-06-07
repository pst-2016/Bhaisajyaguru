# Project Records

## Workflow

```
Branch → Draft PR early → Log → (ADR if needed) → Code → Merge
```

### 1. Create a Branch

- Start from the latest base branch (e.g., `main`)
- Create a feature/retrofit branch (e.g., `retrofit/atom-eco`)
- Push the branch to remote so it can be used to open a PR

### 2. Open a Draft PR Early

- **Base:** `main` (or target branch)
- **Compare/Head:** your branch
- GitHub/GitLab will assign the PR/MR number automatically (e.g., `#3`)

### 3. Create the PR-Based Log

- Create: `documents/log/pr-<PR_NUMBER>-<short-slug>.md`
- Example: `documents/log/pr-3-atom-eco.md`
- Add the PR link/number, head branch, base branch, and a short summary

### 4. Write an ADR (Only When a Meaningful Decision Is Made)

- Create: `documents/adr/<NNNN>-<slug>.md`
- Mark status: `Proposed` → `Accepted` when agreed
- Link both ways:
  - Log → ADR (under "Related ADRs")
  - ADR → PR/log (under "Implemented in PR(s)" / "Related logs")

### 5. Coding + Commits

- Implement changes on the branch
- Update the PR log as you work (notes, decisions, tests)

### 6. Finalize

- Update log with testing/validation, risks, rollback notes
- Ensure ADR has implementation links (if any)
- Mark PR "Ready for review" → review → merge

---

## ADR and Log

The `adr` and `log` folders keep engineering records for retrofit work and new features.

### ADRs (Architecture Decision Records)

An ADR captures important decisions and their trade-offs so future contributors can understand "why we did it this way".

- **Location:** `documents/adr/`
- **Naming:** `NNNN-<short-slug>.md` (e.g., `0003-auth-boundary-refactor.md`)

### Logs (Work Logs)

PR-based work logs that record what was done for a given pull request.

- **Location:** `documents/log/`
- **Cadence:** one log per PR
- **Naming:** `pr-<PR_NUMBER>-<short-slug>.md` (e.g., `pr-1234-cache-refactor.md`)

---

## How ADRs and Logs Are Linked

A **log** should link to:

- The PR
- The main commits (optional)
- Any related ADR(s) that explain major decisions

An **ADR** should link back to:

- The PR(s) that implemented the decision
- Any related log(s)

### Example Linking Pattern

In a log file (`documents/log/pr-1234-cache-refactor.md`):

```
PR: #1234
Related ADRs:
  ../adr/0002-cache-strategy.md
```

In an ADR file (`documents/adr/0002-cache-strategy.md`):

```
Implemented in:
  PR: #1234
Related logs:
  ../log/pr-1234-cache-refactor.md
```

---

## Templates (Optional but Recommended)

- `documents/log/_template.md`
- `documents/adr/_template.md`
