# Boris Cherny's Claude Code Workflow: Complete Implementation Guide

Boris Cherny is the creator of Claude Code at Anthropic. In January 2026, he shared his workflow publicly, revealing a "surprisingly vanilla" setup that allows him to ship 259 PRs in 30 days (497 commits, 40k lines added, 38k removed).

This guide distills his practices into actionable steps you can implement in your own projects.

---

## Table of Contents

1. [CLAUDE.md — Shared Team Memory](#1-claudemd--shared-team-memory)
2. [Plan Mode Workflow](#2-plan-mode-workflow)
3. [Slash Commands](#3-slash-commands-for-repetitive-workflows)
4. [Subagents](#4-subagents-for-specialized-tasks)
5. [Verification Loops](#5-verification-loops--the-most-important-practice)
6. [Hooks for Automation](#6-hooks-for-automation)
7. [Permissions Management](#7-permissions-management)
8. [Parallel Sessions](#8-parallel-sessions)
9. [Model Selection](#9-model-selection)
10. [Quick-Start Checklist](#quick-start-checklist)

---

## 1. CLAUDE.md — Shared Team Memory

### What it is

A single markdown file in your git repo that documents mistakes Claude has made and best practices for your project.

### Why it matters

Standard large language models do not "remember" your coding style or architectural decisions between sessions. CLAUDE.md solves AI amnesia by providing persistent context. Every correction becomes permanent — the cost of a mistake pays dividends forever.

### Boris's approach

- Their CLAUDE.md is ~2.5k tokens
- The whole team contributes multiple times a week
- Includes: style conventions, design guidelines, PR templates
- During code review, they tag `@.claude` on PRs to add learnings

### Example CLAUDE.md

```markdown
# Project Guidelines for Claude

## Development Workflow
**Always use `bun`, not `npm`.**

## Commands
1. Make changes
2. Typecheck (fast): `bun run typecheck`
3. Run tests: `bun run test -- -t "test name"`
4. Single suite: `bun run test:file -- "glob"`

## Style Guidelines
- Prefer `type` over `interface`
- **Never use `enum`** — use string literal unions instead
- Use async/await over .then() chains
- Destructure props in function signatures

## Architecture Decisions
- All API calls go through `/lib/api/`
- State management uses Zustand, not Redux
- Components follow atomic design pattern

## Common Mistakes to Avoid
- Don't import from `@internal/*` in public modules
- Don't use `any` type — use `unknown` if type is uncertain
- Don't modify state directly — always use immutable patterns

## PR Guidelines
- Include ticket number in PR title
- Add screenshots for UI changes
- Run `bun run lint` before committing
```

### To-Do List

- [x] Create `CLAUDE.md` in your project root
- [x] Add your tech stack and preferred tools
- [x] Document style conventions (naming, patterns, etc.)
- [x] Every time Claude makes a mistake, add a note
- [x] Commit to git so your team shares context
- [x] Update multiple times per week

---

## 2. Plan Mode Workflow

### What it is

Starting every non-trivial task in Plan mode, iterating until the plan is solid, then switching to auto-accept mode for execution.

### Why it matters

This prevents the classic failure: Claude making 40 changes you didn't want. A good plan avoids issues down the line and often results in one-shot execution.

### Boris's workflow

1. Press `Shift+Tab` twice to enter Plan mode
2. Describe the goal (e.g., "I want to write a Pull Request for X")
3. Go back and forth with Claude until the plan is solid
4. Switch to auto-accept edits mode
5. Claude executes the entire implementation in one shot

### Thinking triggers

Use these phrases to activate extended thinking (increasing levels of computation):

| Phrase | Thinking Level |
|--------|---------------|
| "think" | Basic |
| "think hard" | Medium |
| "think harder" | High |
| "ultrathink" | Maximum |

### Example prompt

```
I want to refactor the authentication module to use JWT instead of sessions.

Before writing any code, let's plan this out:
1. What files need to change?
2. What's the migration strategy for existing sessions?
3. What tests need to be updated?

Think hard about edge cases.
```

### To-Do List

- [x] Always start complex tasks with planning
- [x] Use `Shift+Tab` twice to toggle Plan mode
- [x] Don't accept the first plan — iterate 2-3 times
- [x] Only switch to auto-accept when you fully agree
- [x] Use "think" keywords for deeper analysis

---

## 3. Slash Commands for Repetitive Workflows

### What it is

Custom shortcuts stored in `.claude/commands/` that automate multi-step workflows you do many times per day.
To invoke it:               
  Simply type in Claude Code:                                                                                         
  /commit-push-pr 

### Why it matters

- Saves repeated prompting
- Claude can use them too (not just you)
- Commands are checked into git and shared with team
- Inline bash pre-computes context to avoid back-and-forth

### Directory structure

```
your-project/
├── .claude/
│   └── commands/
│       ├── commit-push-pr.md
│       ├── fix-issue.md
│       ├── code-review.md
│       └── test-coverage.md
├── CLAUDE.md
└── ...
```

### Example: /commit-push-pr

**File:** `.claude/commands/commit-push-pr.md`

```markdown
---
description: Commit changes and open a pull request
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git commit:*), Bash(git push:*), Bash(gh pr create:*)
claude will run commnad after `!` to pre-compute and review results, then it will run the tasks.
---

# Context
- Current branch: !`git branch --show-current`
- Status: !`git status -sb`
- Diff summary: !`git diff --stat`

# Task
1. Review the changes above
2. Write a clear, conventional commit message
3. Commit all changes
4. Push to origin
5. Create a pull request with a descriptive title and body
```

### Example: /fix-issue

**File:** `.claude/commands/fix-issue.md`

```markdown
---
description: Analyze and fix a GitHub issue
allowed-tools: Bash(gh issue view:*), Bash(git:*), Read, Write
---

# Task
Please analyze and fix the GitHub issue: $ARGUMENTS

Follow these steps:
1. Use `gh issue view $ARGUMENTS` to get issue details
2. Understand the problem described
3. Search the codebase for relevant files
4. Implement the necessary changes
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Prepare a commit with a message referencing the issue
```

### Example: /code-review

**File:** `.claude/commands/code-review.md`

```markdown
---
description: Review current changes for issues
allowed-tools: Bash(git diff:*), Read
---

# Context
- Changes: !`git diff --name-only`
- Diff: !`git diff`

# Task
Review the changes above for:
1. Logic errors or bugs
2. Security vulnerabilities
3. Performance issues
4. Code style violations (check CLAUDE.md)
5. Missing error handling
6. Test coverage gaps

Provide specific, actionable feedback.
```

### To-Do List

- [x] Create `.claude/commands/` directory
- [x] Identify workflows you do 3+ times per day
- [x] Create `/commit-push-pr` command
- [x] Add inline bash with `!` to pre-compute context
- [ ] Check commands into git
- [ ] Create commands for: review, testing, deployment, issue fixing

---

## 4. Subagents for Specialized Tasks

### What it is

Separate AI personas for different phases of development. Each subagent has a specific job and clear mandate.
Example prompt to trigger the agent: Please use the code-simplifier agent to clean up docs/index.html

### Why it matters

Agents are not "one big agent." They're modular roles. Reliability comes from specialization plus constraint. Coding becomes a pipeline of phases: **spec → draft → simplify → verify**. Each phase benefits from a different "mind."

### Directory structure

```
your-project/
├── .claude/
│   ├── commands/
│   │   └── ...
│   └── agents/
│       ├── code-simplifier.md
│       ├── verify-app.md
│       ├── code-architect.md
│       ├── security-reviewer.md
│       └── build-validator.md
└── ...
```

### Boris's subagents

| Subagent | Purpose |
|----------|---------|
| `code-simplifier` | Cleans up code after Claude finishes |
| `verify-app` | Detailed instructions for E2E testing |
| `code-architect` | Designs architecture, reviews structure |
| `build-validator` | Validates builds before merge |

### Example: code-simplifier.md

```markdown
---
name: code-simplifier
description: Simplifies and cleans up code after implementation
tools: Read, Write, Bash
model: inherit
---

# Role
You are a code simplification specialist. Your job is to make code cleaner, more readable, and more maintainable WITHOUT changing functionality.

# Instructions
1. Read through the recently modified files
2. Look for opportunities to:
   - Remove redundant code
   - Simplify complex logic
   - Improve naming
   - Extract repeated patterns
   - Reduce nesting depth
3. Make changes incrementally
4. Run tests after each change to ensure nothing breaks
5. Do NOT add new features or change behavior
```

### Example: verify-app.md

```markdown
---
name: verify-app
description: End-to-end verification of application changes
tools: Bash, Read, Browser
model: inherit
---

# Role
You are a QA verification specialist. Your job is to thoroughly test changes before they ship.

# Instructions
1. Identify what changed (check git diff)
2. Determine which features could be affected
3. Run the relevant test suites
4. For UI changes:
   - Open the app in a browser
   - Test the affected flows manually
   - Check responsive behavior
   - Verify accessibility
5. For API changes:
   - Test endpoints with curl or similar
   - Verify error handling
   - Check edge cases
6. Report any issues found with specific reproduction steps
```

### Example: security-reviewer.md

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Bash
model: inherit
---

# Role
You are a security specialist. Review code for vulnerabilities.

# Check for:
- SQL injection
- XSS vulnerabilities
- Authentication/authorization issues
- Sensitive data exposure
- Insecure dependencies
- Hardcoded secrets
- CSRF vulnerabilities
- Input validation issues

# Output
Provide a security report with:
- Severity (Critical/High/Medium/Low)
- Location (file and line)
- Description of vulnerability
- Recommended fix
```

### Advanced: Adversarial subagents

Boris uses multiple subagents that challenge each other:
- First pass: Several agents review (style, bugs, history)
- Second pass: 5 more agents poke holes in the original findings
- Result: Finds real issues without false positives

### To-Do List

- [x] Create `.claude/agents/` directory
- [x] Build a `code-simplifier` agent
- [x] Build a `verify-app` agent with your testing instructions
- [x] Consider agents for: architecture, security, documentation
- [x] Have subagents challenge each other's findings

---

## 5. Verification Loops — The Most Important Practice

### What it is

Giving Claude a way to verify its own work through tests, browser automation, or CLI feedback.

### Why it matters

> "Probably the most important thing to get great results out of Claude Code — give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."
> — Boris Cherny

### How Boris does it

- Claude tests every UI change using the Chrome extension
- Opens a browser, tests the UI, iterates until it works
- Uses test suites, simulators, and bash commands
- The investment in verification infrastructure pays off across every task

### Verification methods by domain

| Domain | Verification Method |
|--------|-------------------|
| Backend | Unit tests, integration tests, API calls |
| Frontend | Browser testing, screenshots, Puppeteer |
| Mobile | iOS/Android simulators |
| CLI tools | Bash commands, output validation |
| Data | Query results, data validation scripts |

### Example prompts for verification

**Test-driven development:**
```
Write tests first for the new user registration feature.
Then implement code that passes the tests.
Keep going until all tests pass.
Do not modify the tests.
```

**Visual verification:**
```
After making the CSS changes:
1. Take a screenshot of the component
2. Compare it to the design mock in /designs/
3. Iterate until it matches
```

**API verification:**
```
After implementing the endpoint:
1. Test with curl: curl -X POST localhost:3000/api/users
2. Verify response matches expected schema
3. Test error cases (invalid input, auth failures)
4. Keep iterating until all cases pass
```

### To-Do List

- [ ] Always provide a way for Claude to test changes
- [ ] Set up automated tests Claude can run
- [ ] For UI: give Claude screenshot capability
- [ ] Tell Claude: "Keep going until all tests pass"
- [ ] Add Stop hooks that verify when Claude finishes
- [ ] For long tasks: use background agents for verification

---

## 6. Hooks for Automation

### What it is

Event-driven automations that run at specific points in Claude's workflow.

### Hook types

| Hook | When it runs |
|------|-------------|
| `PreToolUse` | Before Claude uses a tool |
| `PostToolUse` | After Claude uses a tool |
| `Stop` | When Claude finishes a task |

### Boris's key hook

PostToolUse hook that auto-formats code after every write/edit.

### Configuration

**File:** `.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bun run format || true"
          }
        ]
      }
    ],
    "Stop": [
      {
        "type": "command",
        "command": "bun run lint && bun run typecheck"
      }
    ]
  }
}
```

### Example hooks

**Auto-format on save:**
```json
{
  "matcher": "Write|Edit",
  "hooks": [{
    "type": "command",
    "command": "prettier --write . || true"
  }]
}
```

**Run tests on stop:**
```json
{
  "matcher": "Stop",
  "hooks": [{
    "type": "command",
    "command": "npm test"
  }]
}
```

**Slack notification on completion:**
```json
{
  "matcher": "Stop",
  "hooks": [{
    "type": "command",
    "command": "curl -X POST -H 'Content-type: application/json' --data '{\"text\":\"Claude finished task\"}' $SLACK_WEBHOOK"
  }]
}
```

### To-Do List

- [ ] Set up PostToolUse hook for auto-formatting
- [ ] Add hooks that run your linter after edits
- [ ] Create Stop hooks for verification
- [ ] Consider hooks for: notifications, tests, type checking

---

## 7. Permissions Management

### What it is

Pre-allowing safe bash commands instead of using `--dangerously-skip-permissions`.

### Why it matters

- Treats permissions as a team asset
- Shared, reviewable, and versioned
- Pre-allowing safe actions makes the right thing the default
- Your system remembers boundaries when you're tired or rushing

### Configuration

**File:** `.claude/settings.json`

```json
{
  "permissions": {
    "allow": [
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git push:*)",
      "Bash(git branch:*)",
      "Bash(git checkout:*)",
      "Bash(bun run:*)",
      "Bash(npm run:*)",
      "Bash(npx prettier:*)",
      "Bash(npx eslint:*)",
      "Bash(gh issue:*)",
      "Bash(gh pr:*)",
      "Bash(curl:*)",
      "Read",
      "Write"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(sudo:*)"
    ]
  }
}
```

### Commands to pre-allow (safe defaults)

**Version control:**
- `git status`, `git diff`, `git add`, `git commit`, `git push`
- `git branch`, `git checkout`, `git log`

**Development:**
- `npm run`, `bun run`, `yarn`
- `npx prettier`, `npx eslint`
- `npm test`, `bun test`

**GitHub CLI:**
- `gh issue view/list/create`
- `gh pr view/list/create`

### To-Do List

- [ ] Use `/permissions` to pre-allow safe commands
- [ ] Never use `--dangerously-skip-permissions` in production
- [ ] Store in `.claude/settings.json`
- [ ] Share with team via git
- [ ] Review and audit periodically

---

## 8. Parallel Sessions

### What it is

Running multiple Claude instances simultaneously to multiply throughput.

### Boris's setup

| Location | Count | Purpose |
|----------|-------|---------|
| Terminal | 5 | Numbered tabs 1-5, separate git checkouts |
| Browser | 5-10 | claude.ai/code sessions |
| Mobile | Variable | Started in morning, checked throughout day |

**Total:** 10-15 concurrent sessions

### Key details

- Each terminal session uses its **own git checkout** (not branches/worktrees)
- System notifications alert when Claude needs input
- 10-20% of sessions are abandoned (this is normal)
- Sessions can be transferred between environments

### Terminal setup (iTerm2)

1. Create 5 separate clones of your repo:
   ```bash
   git clone your-repo repo-1
   git clone your-repo repo-2
   git clone your-repo repo-3
   git clone your-repo repo-4
   git clone your-repo repo-5
   ```

2. Enable notifications in iTerm2:
   - Preferences → Profiles → Terminal
   - Enable "Send notification when idle"

3. Number your tabs for easy reference

### Session management commands

| Command | Purpose |
|---------|---------|
| `&` | Hand off session to web |
| `--teleport` | Move session between environments |
| `--permission-mode=dontAsk` | For sandboxed long-running tasks |

### Mental model

> "Boris doesn't see AI as a tool you use, but as a capacity you schedule. He's distributing cognition like compute: allocate it, queue it, keep it hot, switch contexts only when value is ready."

### To-Do List

- [ ] Set up iTerm2 system notifications
- [ ] Number terminal tabs for reference
- [ ] Create separate git checkouts for parallel work
- [ ] Use `&` to hand off sessions
- [ ] Use `--teleport` between environments
- [ ] Accept ~15% abandoned sessions as normal

---

## 9. Model Selection

### Boris's choice

**Opus 4.5 with thinking mode** for everything.

### Why

> "It's the best coding model I've ever used, and even though it's bigger & slower than Sonnet, since you have to steer it less and it's better at tool use, it is almost always faster than using a smaller model in the end."

### The insight

The bottleneck in AI development isn't token generation speed — it's human time spent correcting mistakes.

| Tax Type | Description |
|----------|-------------|
| Compute Tax | Time waiting for larger model |
| Correction Tax | Time fixing smaller model's mistakes |

**Paying the compute tax upfront eliminates the correction tax later.**

### To-Do List

- [ ] Use the best model for complex tasks
- [ ] Enable thinking mode for planning
- [ ] Track correction time vs. wait time
- [ ] Optimize for total time, not token speed

---

## Quick-Start Checklist

### Week 1: Foundation

- [ ] Create `CLAUDE.md` with basic project info
- [ ] Start using Plan mode for all non-trivial tasks
- [ ] Create `.claude/commands/` directory
- [ ] Build `/commit-push-pr` slash command

### Week 2: Automation

- [ ] Set up PostToolUse formatting hook
- [ ] Create `.claude/agents/` directory
- [ ] Build `code-simplifier` subagent
- [ ] Configure `/permissions` for safe commands

### Week 3: Verification

- [ ] Build `verify-app` subagent
- [ ] Add Stop hooks for verification
- [ ] Set up parallel terminal sessions
- [ ] Configure iTerm2 notifications

### Ongoing Practices

- [ ] Update `CLAUDE.md` every time Claude makes a mistake
- [ ] Create new slash commands for repeated workflows
- [ ] Review and refine subagents based on results
- [ ] Share learnings with team via PR reviews

---

## Directory Structure Template

```
your-project/
├── .claude/
│   ├── commands/
│   │   ├── commit-push-pr.md
│   │   ├── fix-issue.md
│   │   ├── code-review.md
│   │   └── test-coverage.md
│   ├── agents/
│   │   ├── code-simplifier.md
│   │   ├── verify-app.md
│   │   ├── code-architect.md
│   │   └── security-reviewer.md
│   └── settings.json
├── CLAUDE.md
├── src/
└── ...
```

---

## Resources

- [Claude Code Documentation](https://code.claude.com/docs)
- [Terminal Notifications](https://code.claude.com/docs/en/terminal-config#iterm-2-system-notifications)
- [Slash Commands](https://code.claude.com/docs/en/slash-commands)
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Anthropic Best Practices](https://www.anthropic.com/engineering/claude-code-best-practices)

---

*Based on Boris Cherny's public workflow shared in January 2026.*