const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createLocalStorageMock() {
  const store = new Map();
  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

function loadPublicApi() {
  const localStorage = createLocalStorageMock();
  const sandbox = {
    console,
    localStorage,
    window: {
      crypto: {
        randomUUID: () => "test-id",
      },
      localStorage,
    },
  };

  vm.createContext(sandbox);
  const appPath = path.join(__dirname, "..", "src", "app.js");
  vm.runInContext(fs.readFileSync(appPath, "utf8"), sandbox, { filename: appPath });
  return sandbox.window.StudentTaskTracker;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

const tracker = loadPublicApi();
const today = new Date("2026-06-10T10:00:00");
const tasks = [
  { id: "a", title: "Hari ini", dueDate: "2026-06-10", priority: "Sedang", status: "Belum mulai", createdAt: "2026-06-01T00:00:00" },
  { id: "b", title: "Terlambat", dueDate: "2026-06-08", priority: "Tinggi", status: "Dikerjakan", createdAt: "2026-06-01T00:00:00" },
  { id: "c", title: "Selesai minggu ini", dueDate: "2026-06-12", priority: "Rendah", status: "Selesai", createdAt: "2026-06-01T00:00:00" },
  { id: "d", title: "Terlambat selesai", dueDate: "2026-06-07", priority: "Tinggi", status: "Selesai", createdAt: "2026-06-01T00:00:00" },
  { id: "e", title: "Minggu depan", dueDate: "2026-06-15", priority: "Tinggi", status: "Belum mulai", createdAt: "2026-06-01T00:00:00" },
];

assert.equal(tracker.daysUntil("2026-06-11", today), 1);
assert.equal(tracker.getEffectiveStatus(tasks[1], today), "Terlambat");
assert.equal(tracker.getEffectiveStatus(tasks[3], today), "Selesai");
assert.equal(tracker.isThisWeek("2026-06-07", today), true);
assert.equal(tracker.isThisWeek("2026-06-15", today), false);
assert.deepEqual(plain(tracker.getStats(tasks, today)), {
  total: 5,
  done: 2,
  late: 1,
  thisWeek: 4,
  progress: 40,
});
assert.deepEqual(plain(tracker.sortTasks(tasks, today).map((task) => task.id)), ["b", "a", "e", "d", "c"]);
assert.deepEqual(plain(tracker.sortDeadlineTasks(tasks, today).map((task) => task.id)), ["b", "a", "e", "d", "c"]);

const calendarDays = tracker.getMonthCalendarDays(new Date("2026-06-10T10:00:00"), today);
assert.equal(calendarDays.length, 42);
assert.equal(calendarDays[0].dateKey, "2026-05-31");
assert.equal(calendarDays[10].dateKey, "2026-06-10");
assert.equal(calendarDays[10].isToday, true);
assert.equal(calendarDays[10].isCurrentMonth, true);

console.log("Student Task Tracker tests passed");
