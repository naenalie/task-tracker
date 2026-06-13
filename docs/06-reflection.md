# Reflection on AI-Assisted Development

## What I Built

I built a Student Task Tracker web application for university students. The app helps students record academic tasks, organize them by course, set deadlines, choose priorities, update task status, and track progress from one dashboard.

The application includes a task form, task list, search and filters, deadline-focused sorting, progress statistics, a mini calendar, a timeline, and local data persistence using `localStorage`. The MVP runs directly in the browser with plain HTML, CSS, and JavaScript, so it does not require login, a backend server, or a build process.

## AI Tools I Used at Each Stage

### 1. Idea Clarification

I used AI to help clarify the original product idea. AI asked questions about the target user, task fields, status options, reminders, login, dashboard layout, and MVP scope. This helped turn a broad idea into a more specific app for university students.

### 2. Requirements and PRD

I used AI to help write the requirements and product requirement document. AI helped organize the problem statement, target users, user goals, functional requirements, non-functional requirements, assumptions, constraints, and open questions.

### 3. Design Planning

I used AI to suggest the app structure, user flow, component breakdown, data model, status rules, sorting rules, and trade-offs. This gave me a clearer plan before implementation.

### 4. Implementation Support

I used AI to help plan and improve the HTML, CSS, and JavaScript structure. AI suggested using a simple state object, rendering functions, `localStorage`, sorting helpers, and statistics helpers so the app stayed manageable without a framework.

### 5. Testing and Documentation

I used AI to help identify logic that should be tested, especially date handling, overdue status, sorting, and progress statistics. I also used AI to help write documentation files such as the README and reflection.

## What I Decided Myself vs What AI Suggested

### Decisions I Made Myself

- The app should target university students.
- The app should focus on academic tasks and assignments.
- Each task should include title, course, deadline, priority, status, notes, attachment or reference information, and estimated time as part of the ideal product scope.
- The MVP should stay simple and run in the browser.
- The project should avoid login, collaboration, lecturer features, and backend complexity.
- The app should be easy to use for students who only need a quick task tracker.

### Suggestions From AI

- Use status options such as `Belum mulai`, `Dikerjakan`, `Selesai`, and automatic `Terlambat`.
- Use priority levels such as `Rendah`, `Sedang`, and `Tinggi`.
- Build the first version as an MVP with task creation, editing, deletion, filters, dashboard summary, and deadline tracking.
- Use `localStorage` for simple persistence.
- Add dashboard metrics, a focus list, a mini calendar, and a timeline to make the app more useful.
- Keep reminders, login, export, and collaboration as possible future improvements instead of including them in the first version.

## What I Learned

I learned that defining scope is one of the most important parts of building a small web app. A task tracker can quickly become too large if features like reminders, file upload, account login, collaboration, and cloud sync are added too early.

I also learned that date logic needs careful handling. Features like overdue status, this-week filtering, and deadline sorting can create bugs if dates are not normalized consistently.

Another important lesson was that documentation helps guide implementation. Writing requirements, design notes, testing notes, and reflection made the project easier to understand and easier to improve.

I also learned how useful small helper functions are in plain JavaScript. Functions for sorting, date formatting, statistics, rendering, and storage make the code easier to maintain even without using a framework.

## What I Would Do Differently

If I worked on this project again, I would define the file naming earlier. We originally had the main HTML file named `index6.html` but we successfully refactored the project structure to rename it to `index.html` inside the `src/` directory to match standard naming conventions.

I would also separate the JavaScript into smaller modules if the project became larger. For example, storage logic, date helpers, rendering functions, and task logic could each have their own file.

I would add attachment and estimated time fields earlier if they were required for the final product, because those fields affect the data model, form layout, and task card design.

I would also plan mobile testing earlier. Since students may use the app on laptops and phones, responsive layout should be checked throughout development instead of only near the end.

## Challenges Faced

- Keeping the MVP small while still making the app useful.
- Designing status rules so overdue tasks are shown correctly without overwriting completed tasks.
- Handling date comparisons consistently in JavaScript.
- Making the dashboard show useful information without becoming too crowded.
- Keeping the UI readable and responsive.
- Using `localStorage` while understanding that the data only exists in one browser.
- Balancing AI suggestions with my own project goals and assignment constraints.

## Final Reflection

Overall, AI was most helpful as a planning, organization, and review partner. It helped me break the project into smaller pieces, think through edge cases, and document the work clearly. However, I still had to decide the actual scope, choose which features mattered most, and make sure the final app matched the needs of university students.
