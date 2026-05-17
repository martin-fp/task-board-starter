# Team Task Board

A small Next.js + TypeScript app for tracking a team's tasks. Each task has a title, status (`todo` / `in-progress` / `done`), priority, and assignee. The UI offers:

- A summary header with per-status counts
- A create-task form
- A status filter
- A list view with inline status changes

The data layer is in-memory (no backend, no env vars). Initial tasks live in `lib/seed.ts`.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- Vitest + React Testing Library

## Project layout

```
app/
  layout.tsx, page.tsx, globals.css
components/
  ui/             shadcn primitives (Button, Input, Select, Card, Badge, Label)
  TaskBoard.tsx   top-level container — owns task + filter state
  SummaryHeader.tsx
  CreateTaskForm.tsx
  StatusFilter.tsx
  TaskList.tsx
  TaskItem.tsx
lib/
  types.ts        Task / Status / Priority types
  seed.ts         initial tasks
  utils.ts        cn() + small task helpers
__tests__/
  TaskBoard.test.tsx
```

## Setup

```bash
npm install
```

## Run

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve built app
```

## Test

```bash
npm test           # run once
npm run test:watch # watch mode
```

---

## Assessment Task

This is a small Team Task Board app. You have approximately 2 hours. Work as you normally would, including using AI tooling. Talk through your thinking out loud as you go — we care as much about how you reason as about the final result.

Please complete all of the following and open a single pull request against `main`:

1. **Understand the codebase first.** Before changing anything, give a short verbal walkthrough of how the app is structured and where the main logic lives.
2. **Fix the bugs.** There are at least two known defects in the current behavior. Find them, explain what's wrong and why, fix them, and prove the fixes with tests.
3. **Ship an enhancement:** add the ability to edit an existing task (title, priority, assignee, status) through the existing UI patterns and design library already in the repo. Match the existing component and styling conventions rather than introducing new ones.
4. **Tests and success criteria.** Before or while implementing, state explicit success criteria for your work, then extend the automated test suite so those criteria are verified. The suite must be green.
5. **Open a PR** with a clear description: what you changed, how you verified it, and any tradeoffs or things you'd do with more time.
6. **Deploy** the final state to Vercel and share the live URL.

You will not be penalized for asking clarifying questions. A smaller, correct, well-tested result beats a larger, shaky one.
