# Submission Checklist

Gunakan checklist ini sebelum mengumpulkan project.

## Current Status Notes

- GitHub repository: `https://github.com/naenalie/task-tracker`
- Pull request evidence: `https://github.com/naenalie/task-tracker/pull/8`
- PR #8 links to Issue #6 through `Closes #6`.
- Automated test command passes: `node tests/app.test.js`.
- Remaining unchecked items need browser screenshots/manual evidence, not new product features.

## Required Files

- [x] `README.md`
- [x] `docs/01-requirements.md`
- [x] `docs/02-prd.md`
- [x] `docs/03-vertical-slice-issues.md`
- [x] `docs/04-design.md`
- [x] `docs/05-tdd-and-testing.md`
- [x] `docs/06-reflection.md`
- [x] `src` or app source files
- [x] `tests/app.test.js`
- [x] `assets/screenshots/`
- [x] `.github/ISSUE_TEMPLATE/vertical-slice.md`
- [x] `.github/pull_request_template.md`

## Product Scope Check

- [x] Target user is mahasiswa S1.
- [x] Main problem is forgetting deadlines and difficulty prioritizing.
- [x] App is simpler than general tools and focused on academic tasks.
- [x] Core task fields are name, course, deadline, priority, and status.
- [x] Status values are Belum mulai, Dikerjakan, Selesai, and Terlambat.
- [x] There is no login.
- [x] Data uses localStorage.
- [x] There is no reminder feature.
- [x] There are no subtasks.
- [x] There is no export feature.
- [x] App has list view and simple calendar view.
- [x] First screen is dashboard tugas.
- [x] App is mobile-friendly.

## Engineering Process Check

- [x] Requirements are clarified.
- [x] PRD is written.
- [x] 5-8 vertical-slice issues are documented.
- [x] At least 4 issues are AFK.
- [x] At least 1 issue is HITL.
- [x] Each issue has acceptance criteria.
- [x] Dependency order is clear.
- [x] Design document exists before final implementation notes.
- [x] TDD report covers at least 2 issues.
- [x] Browser verification notes are included.
- [x] Reflection explains AI usage and manual review.

## GitHub Evidence Check

- [x] GitHub repository exists.
- [x] GitHub Issues are created from `docs/03-vertical-slice-issues.md`.
- [x] At least one feature branch exists.
- [x] At least three meaningful commits exist.
- [x] At least one pull request exists.
- [x] Pull request links to at least one issue.
- [x] README includes setup and usage instructions.

## Browser Testing Check

- [x] Main flow works: create task, view task, update status, delete task.
- [x] Invalid required fields are blocked.
- [x] Dashboard metrics update correctly.
- [x] Calendar view shows task deadlines.
- [x] localStorage contains saved tasks.
- [x] Console has no unexpected errors.
- [x] Layout works on at least one mobile viewport.
