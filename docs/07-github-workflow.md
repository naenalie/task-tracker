# GitHub Workflow Evidence Plan

Dokumen ini berisi rencana bukti workflow GitHub untuk assignment. Isi bagian URL setelah repository, issues, branch, dan pull request benar-benar dibuat di GitHub.

## Repository

- Repository name: `task-tracker`
- Repository URL: `https://github.com/naenalie/task-tracker`
- Main branch: `main`
- Tech stack: plain HTML, CSS, JavaScript
- Storage: localStorage

## Suggested Branches

```bash
git checkout -b feature/task-creation
git checkout -b feature/progress-and-priority
git checkout -b feature/calendar-view
```

## Minimum Meaningful Commits

Gunakan minimal tiga commit yang menunjukkan pekerjaan bertahap.

```bash
git add .
git commit -m "Add task creation and local storage"

git add .
git commit -m "Implement progress stats and task priority"

git add .
git commit -m "Add calendar view and project documentation"
```

## GitHub Issues to Create

Buat issue berdasarkan `docs/03-vertical-slice-issues.md`.

| Issue | Type | Suggested GitHub Title |
| --- | --- | --- |
| 1 | AFK | User can add an academic task |
| 2 | AFK | User can view and persist the task list |
| 3 | AFK | User can update task status and see progress statistics |
| 4 | AFK | User can filter tasks by course and status |
| 5 | AFK | User sees automatic priority and today's work |
| 6 | AFK | User can view tasks in a simple calendar |
| 7 | HITL | Student decides final visual polish and mobile layout |

## Pull Request Evidence

Create at least one pull request from a feature branch into `main`.

Current status:

```text
Pull request evidence exists.
```

Recommended PR for this project:

- Branch: `feature/timeline-deadline`
- Base branch: `main`
- PR title: `Implement timeline deadline and mini calendar`
- Linked issue: `Closes #6`
- Actual PR: `https://github.com/naenalie/task-tracker/pull/8`
- Actual PR status: open
- Actual PR title: `Add files via upload`
- Actual PR body: `Closes #6`

Recommended improvement before submission:

```text
Rename PR #8 from "Add files via upload" to "Implement timeline deadline and mini calendar" so the workflow evidence looks more meaningful.
```

Steps in GitHub UI:

1. Open `https://github.com/naenalie/task-tracker/pulls`.
2. Click **New pull request**.
3. Set base branch to `main`.
4. Set compare branch to `feature/timeline-deadline`.
5. Use the PR title `Implement timeline deadline and mini calendar`.
6. Include `Closes #6` in the PR description.
7. Create the pull request.

## PR Description Template

```md
# Summary

- Added timeline deadline view.
- Added mini calendar for monthly deadline distribution.
- Added automated test coverage for calendar date-grid behavior.

## Linked Issue

Closes #6

## Testing

- Ran `node tests/app.test.js`.
- Verified task creation, status update, filtering, and dashboard metrics in browser.
- Verified deadline timeline and mini calendar behavior.

## AI Usage

AI helped draft implementation and testing notes. I manually reviewed requirements, behavior, and browser output.
```

## Browser Verification Evidence

Save screenshots in:

```text
assets/screenshots/
```

Recommended screenshots:

- `dashboard-desktop.png`
- `add-task-flow.png`
- `calendar-view.png`
- `localstorage-devtools.png`

## Current Local Test Result

Latest local automated test result:

```text
Student Task Tracker tests passed
```

Command:

```bash
node tests/app.test.js
```
