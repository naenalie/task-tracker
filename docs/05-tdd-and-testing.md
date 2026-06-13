# TDD and Testing Report

## Issue tested
Issue 6: User can view tasks in a simple calendar.

## Behavior under test
The calendar helper creates a stable month grid for the selected month so tasks can be rendered on the correct deadline date. The test checks that June 2026 renders as a 42-cell calendar grid, starts on Sunday, May 31, 2026, and marks June 10, 2026 as today.

## Public interface
The test uses the app's public JavaScript interface exposed from `app.js`:

```js
window.StudentTaskTracker.getMonthCalendarDays(monthDate, today)
window.StudentTaskTracker.sortDeadlineTasks(tasks, today)
```

The Node test loads the real `app.js` file in a small VM sandbox, then reads `window.StudentTaskTracker`. This avoids copying production functions into the test.

## RED (test + failing result)
Test command:

```bash
node tests/app.test.js
```

Test added:

```js
const calendarDays = tracker.getMonthCalendarDays(new Date("2026-06-10T10:00:00"), today);
assert.equal(calendarDays.length, 42);
assert.equal(calendarDays[0].dateKey, "2026-05-31");
assert.equal(calendarDays[10].dateKey, "2026-06-10");
assert.equal(calendarDays[10].isToday, true);
assert.equal(calendarDays[10].isCurrentMonth, true);
```

Initial failing result after switching the test to the public interface:

```text
AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal
```

The failure happened because values returned from the VM context had a different prototype from plain Node objects and arrays.

## GREEN (minimal implementation)
Added a tiny `plain()` helper in `tests/app.test.js`:

```js
function plain(value) {
  return JSON.parse(JSON.stringify(value));
}
```

Then object and array comparisons from the public API were normalized before `assert.deepEqual`.

## REFACTOR (what was improved)
The test file was refactored to load and test the real public interface from `app.js` instead of duplicating helper functions inside the test. This makes the test closer to how the app is used and reduces the chance that tests pass while production code is broken.

The production code also keeps Issue 6 logic separated into focused helpers:

```js
sortDeadlineTasks(tasks, today)
getMonthCalendarDays(monthDate, today)
renderMiniCalendar()
```

## Final result
Pass.

```bash
node tests/app.test.js
```

Result:

```text
Student Task Tracker tests passed
```

## Browser Testing Checklist

Use this checklist after opening `src/index.html` in the browser.

Evidence screenshot:

```text
assets/screenshots/browser-testing-evidence.png
```

### Main user flow works
- [x] Open the app and confirm the dashboard is visible.
- [x] Add a new task with title, course, deadline, priority, status, and optional notes.
- [x] Confirm the new task appears in the task list.
- [x] Edit the task deadline or priority and confirm the displayed task updates.
- [x] Change the task status to `Selesai` and confirm the status badge updates.
- [x] Delete the task and confirm it disappears from the list.

Result:

```text
Pass. Screenshot evidence includes add task, task added, edit, status change, delete confirmation, and deleted state.
```

### Acceptance criteria satisfied
- [x] Dashboard summary cards are visible.
- [x] Task list renders saved tasks.
- [x] Course area shows active courses from task data.
- [x] Timeline shows upcoming deadlines in deadline order.
- [x] Calendar mini shows the selected month.
- [x] Previous and next month buttons update the calendar.
- [x] Tasks appear on the matching calendar deadline date.
- [x] Filters for all, late, this week, incomplete, completed, and high priority work without reload.

Result:

```text
Pass. Calendar month navigation and per-date task placement have been manually verified. The month navigation buttons update the state.calendarDate correctly and re-render the monthly calendar view, and tasks display correctly in the correct date cells corresponding to their deadlines.
```

### Invalid input handled
- [x] Try submitting the task form with an empty title.
- [x] Try submitting the task form with an empty course.
- [x] Try submitting the task form without a deadline.
- [x] Confirm the app blocks invalid submission and shows a clear validation message or browser required-field prompt.
- [x] Confirm no empty task is added to the list.

Result:

```text
Pass. Screenshot evidence includes validation-check.
```

### Console has no errors
- [x] Open DevTools.
- [x] Clear the Console tab.
- [x] Reload the app.
- [x] Add, edit, update status, filter, navigate calendar months, and delete a task.
- [x] Confirm there are no unexpected red console errors.

Result:

```text
Pass. Screenshot evidence includes console-check.
```

### localStorage saves and loads correctly
- [x] Open DevTools Application tab.
- [x] Clear localStorage for the app.
- [x] Reload and confirm sample tasks appear.
- [x] Add a new task.
- [x] Confirm localStorage contains the task under `student-task-tracker.tasks.v2`.
- [x] Reload the page.
- [x] Confirm the added task still appears.
- [x] Edit or delete the task, reload again, and confirm the saved state stays correct.

Result:

```text
Pass. Checked localStorage behavior directly. Clearing storage and reloading successfully generates the 4 default sample tasks under the key `student-task-tracker.tasks.v2`. Task mutations (creates, edits, status updates, deletions) immediately update this storage, preserving all state correctly across page refreshes.
```

### Responsive browser viewport check
- [x] Open DevTools responsive mode.
- [x] Set a mobile-sized browser viewport, for example `375px`.
- [x] Confirm dashboard cards, form controls, filters, task cards, timeline, and calendar remain readable.
- [x] Confirm no text overlaps or breaks the main user flow.

Result:

```text
Pass. The responsive layout has been verified using viewport emulation. Under 700px width (e.g. 375px), grid layouts for dashboard cards, filters, task board columns, and mini-calendar scale down to 1-column layouts, and form inputs wrap cleanly. Text sizes remain highly readable and touch-friendly.
```
