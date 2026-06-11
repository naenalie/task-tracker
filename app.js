(function () {
  const STORAGE_KEY = "student-task-tracker.tasks.v2";
  const LEGACY_STORAGE_KEY = "student-task-tracker.tasks";
  const THEME_KEY = "student-task-tracker.theme";
  const priorityRank = { Tinggi: 0, Sedang: 1, Rendah: 2 };
  const statusRank = { "Belum mulai": 0, Dikerjakan: 1, Selesai: 2 };
  const courseColors = ["mint", "blue", "peach", "lavender", "rose", "lime"];

  const $ = (selector) => document.querySelector(selector);

  const state = {
    tasks: loadTasks(),
    filter: "semua",
    search: "",
    course: "semua",
    calendarDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  };

  function parseLocalDate(date) {
    if (typeof date === "string") {
      const parts = date.split("-").map(Number);
      if (parts.length === 3 && parts.every(Number.isInteger)) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
    }
    return new Date(date);
  }

  function normalizeDate(date) {
    const value = parseLocalDate(date);
    value.setHours(0, 0, 0, 0);
    return value;
  }

  function toDateInputValue(date) {
    const value = normalizeDate(date);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(date, count) {
    const value = normalizeDate(date);
    value.setDate(value.getDate() + count);
    return toDateInputValue(value);
  }

  function getWeekRange(today = new Date()) {
    const start = normalizeDate(today);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }

  function isThisWeek(dueDate, today = new Date()) {
    const date = normalizeDate(dueDate);
    const week = getWeekRange(today);
    return date >= week.start && date < week.end;
  }

  function daysUntil(dueDate, today = new Date()) {
    const diff = normalizeDate(dueDate) - normalizeDate(today);
    return Math.round(diff / 86400000);
  }

  function isOverdue(task, today = new Date()) {
    return task.status !== "Selesai" && daysUntil(task.dueDate, today) < 0;
  }

  function getEffectiveStatus(task, today = new Date()) {
    if (task.status === "Selesai") return "Selesai";
    if (isOverdue(task, today)) return "Terlambat";
    return task.status;
  }

  function getUrgencyScore(task, today = new Date()) {
    let score = 0;
    if (isOverdue(task, today)) score -= 80;
    if (isThisWeek(task.dueDate, today) && task.status !== "Selesai") score -= 45;
    if (task.priority === "Tinggi" && task.status !== "Selesai") score -= 25;
    if (task.status === "Selesai") score += 120;
    return score;
  }

  function sortTasks(tasks, today = new Date()) {
    return [...tasks].sort((a, b) => {
      const urgencyDiff = getUrgencyScore(a, today) - getUrgencyScore(b, today);
      if (urgencyDiff !== 0) return urgencyDiff;

      const dayDiff = daysUntil(a.dueDate, today) - daysUntil(b.dueDate, today);
      if (dayDiff !== 0) return dayDiff;

      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      const statusDiff = statusRank[a.status] - statusRank[b.status];
      if (statusDiff !== 0) return statusDiff;

      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  function sortDeadlineTasks(tasks, today = new Date()) {
    return [...tasks].sort((a, b) => {
      const statusDiff = (a.status === "Selesai") - (b.status === "Selesai");
      if (statusDiff !== 0) return statusDiff;

      const dayDiff = daysUntil(a.dueDate, today) - daysUntil(b.dueDate, today);
      if (dayDiff !== 0) return dayDiff;

      const priorityDiff = priorityRank[a.priority] - priorityRank[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  function getMonthCalendarDays(monthDate = new Date(), today = new Date()) {
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const start = new Date(firstDay);
    start.setDate(firstDay.getDate() - firstDay.getDay());

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return {
        date,
        dateKey: toDateInputValue(date),
        isCurrentMonth: date.getMonth() === firstDay.getMonth(),
        isToday: toDateInputValue(date) === toDateInputValue(today),
      };
    });
  }

  function getStats(tasks, today = new Date()) {
    const total = tasks.length;
    const done = tasks.filter((task) => task.status === "Selesai").length;
    const late = tasks.filter((task) => isOverdue(task, today)).length;
    const thisWeek = tasks.filter((task) => isThisWeek(task.dueDate, today)).length;

    return {
      total,
      done,
      late,
      thisWeek,
      progress: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  }

  function createSampleTasks(today = new Date()) {
    const now = new Date().toISOString();
    return [
      {
        id: "sample-1",
        title: "Laporan praktikum basis data",
        course: "Basis Data",
        dueDate: addDays(today, 1),
        priority: "Tinggi",
        status: "Dikerjakan",
        notes: "Rapikan ERD dan lampirkan hasil query utama.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "sample-2",
        title: "Rangkuman teori komunikasi",
        course: "Komunikasi Akademik",
        dueDate: addDays(today, 4),
        priority: "Sedang",
        status: "Belum mulai",
        notes: "Fokus pada bab presentasi ilmiah.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "sample-3",
        title: "Kuis algoritma greedy",
        course: "Algoritma",
        dueDate: addDays(today, -2),
        priority: "Tinggi",
        status: "Belum mulai",
        notes: "Latihan ulang contoh interval scheduling.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: "sample-4",
        title: "Proposal mini project UI",
        course: "Interaksi Manusia dan Komputer",
        dueDate: addDays(today, 8),
        priority: "Rendah",
        status: "Selesai",
        notes: "",
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  function migrateTask(task) {
    const now = new Date().toISOString();
    const status = task.status === "Sedang dikerjakan" ? "Dikerjakan" : task.status;
    return {
      id: task.id || createId(),
      title: (task.title || task.name || "").trim(),
      course: (task.course || "").trim(),
      dueDate: task.dueDate || task.deadline || toDateInputValue(new Date()),
      priority: ["Rendah", "Sedang", "Tinggi"].includes(task.priority) ? task.priority : "Sedang",
      status: ["Belum mulai", "Dikerjakan", "Selesai"].includes(status) ? status : "Belum mulai",
      notes: task.notes || "",
      createdAt: task.createdAt || now,
      updatedAt: task.updatedAt || task.createdAt || now,
    };
  }

  function readStoredTasks(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return Array.isArray(value) ? value : null;
    } catch {
      return null;
    }
  }

  function loadTasks() {
    const current = readStoredTasks(STORAGE_KEY);
    if (current) return current.map(migrateTask).filter((task) => task.title && task.course);

    const legacy = readStoredTasks(LEGACY_STORAGE_KEY);
    if (legacy && legacy.length > 0) {
      const migrated = legacy.map(migrateTask).filter((task) => task.title && task.course);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      } catch {
        // App remains usable even when storage is unavailable.
      }
      return migrated;
    }

    const samples = createSampleTasks();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    } catch {
      // Samples still render for this session if storage is blocked.
    }
    return samples;
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    } catch {
      // App remains usable even when localStorage is unavailable.
    }
  }

  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function validateTaskForm(data) {
    if (!data.title) return "Judul tugas wajib diisi.";
    if (!data.course) return "Mata kuliah wajib diisi.";
    if (!data.dueDate) return "Deadline wajib dipilih.";
    if (!["Rendah", "Sedang", "Tinggi"].includes(data.priority)) return "Prioritas tidak valid.";
    if (!["Belum mulai", "Dikerjakan", "Selesai"].includes(data.status)) return "Status tidak valid.";
    return "";
  }

  function readFormData() {
    return {
      id: $("#taskId").value,
      title: $("#taskTitle").value.trim(),
      course: $("#courseName").value.trim(),
      dueDate: $("#dueDate").value,
      priority: $("#priority").value,
      status: $("#status").value,
      notes: $("#notes").value.trim(),
    };
  }

  function createTask(data) {
    const now = new Date().toISOString();
    return {
      id: createId(),
      title: data.title,
      course: data.course,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };
  }

  function upsertTask(data) {
    const error = validateTaskForm(data);
    $("#formError").textContent = error;
    if (error) return;

    if (data.id) {
      state.tasks = state.tasks.map((task) => (
        task.id === data.id
          ? { ...task, ...data, updatedAt: new Date().toISOString() }
          : task
      ));
    } else {
      state.tasks.push(createTask(data));
    }

    saveTasks();
    resetForm();
    render();
  }

  function updateTask(id, patch) {
    state.tasks = state.tasks.map((task) => (
      task.id === id ? { ...task, ...patch, updatedAt: new Date().toISOString() } : task
    ));
    saveTasks();
    render();
  }

  function deleteTask(id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;
    const confirmed = window.confirm(`Hapus tugas "${task.title}"?`);
    if (!confirmed) return;

    state.tasks = state.tasks.filter((item) => item.id !== id);
    saveTasks();
    render();
  }

  function editTask(id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;

    $("#taskId").value = task.id;
    $("#taskTitle").value = task.title;
    $("#courseName").value = task.course;
    $("#dueDate").value = task.dueDate;
    $("#priority").value = task.priority;
    $("#status").value = task.status;
    $("#notes").value = task.notes;
    $("#formTitle").textContent = "Edit Tugas";
    $("#formSubtitle").textContent = "Perbarui detail tugas yang sudah tercatat.";
    $("#submitButton").textContent = "Simpan Perubahan";
    $("#cancelEditButton").classList.remove("hidden");
    $("#formError").textContent = "";
    $("#taskTitle").focus();
  }

  function resetForm() {
    $("#taskForm").reset();
    $("#taskId").value = "";
    $("#dueDate").value = toDateInputValue(new Date());
    $("#priority").value = "Sedang";
    $("#status").value = "Belum mulai";
    $("#formTitle").textContent = "Tambah Tugas";
    $("#formSubtitle").textContent = "Catat tugas baru beserta deadline dan prioritasnya.";
    $("#submitButton").textContent = "Tambah Tugas";
    $("#cancelEditButton").classList.add("hidden");
    $("#formError").textContent = "";
  }

  function formatDate(dueDate) {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parseLocalDate(dueDate));
  }

  function formatDeadline(task, today = new Date()) {
    const diff = daysUntil(task.dueDate, today);
    const date = formatDate(task.dueDate);

    if (task.status === "Selesai") return `Selesai - ${date}`;
    if (diff < 0) return `Terlambat ${Math.abs(diff)} hari - ${date}`;
    if (diff === 0) return `Deadline hari ini - ${date}`;
    if (diff === 1) return `Besok - ${date}`;
    return `${diff} hari lagi - ${date}`;
  }

  function passesFilter(task) {
    const search = state.search;
    const matchesSearch = [task.title, task.course, task.notes]
      .some((value) => value.toLowerCase().includes(search));
    const matchesCourse = state.course === "semua" || task.course === state.course;

    if (!matchesSearch || !matchesCourse) return false;

    if (state.filter === "terlambat") return isOverdue(task);
    if (state.filter === "minggu-ini") return isThisWeek(task.dueDate);
    if (state.filter === "belum-selesai") return task.status !== "Selesai";
    if (state.filter === "selesai") return task.status === "Selesai";
    if (state.filter === "prioritas-tinggi") return task.priority === "Tinggi";
    return true;
  }

  function getFilteredTasks() {
    return sortTasks(state.tasks).filter(passesFilter);
  }

  function getCourseStats() {
    const map = new Map();
    state.tasks.forEach((task) => {
      if (!map.has(task.course)) {
        map.set(task.course, { course: task.course, total: 0, done: 0 });
      }
      const item = map.get(task.course);
      item.total += 1;
      if (task.status === "Selesai") item.done += 1;
    });

    return [...map.values()].sort((a, b) => a.course.localeCompare(b.course, "id-ID"));
  }

  function renderStats() {
    const stats = getStats(state.tasks);
    $("#lateCount").textContent = stats.late;
    $("#weekCount").textContent = stats.thisWeek;
    $("#doneCount").textContent = stats.done;
    $("#progressValue").textContent = `${stats.progress}%`;
  }

  function renderCourseFilter() {
    const selected = state.course;
    const filter = $("#courseFilter");
    const courses = [...new Set(state.tasks.map((task) => task.course))]
      .sort((a, b) => a.localeCompare(b, "id-ID"));

    filter.innerHTML = '<option value="semua">Semua mata kuliah</option>';
    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course;
      option.textContent = course;
      filter.appendChild(option);
    });
    state.course = selected === "semua" || courses.includes(selected) ? selected : "semua";
    filter.value = state.course;
  }

  function renderFocusList() {
    const list = $("#focusList");
    const tasks = sortTasks(state.tasks)
      .filter((task) => task.status !== "Selesai")
      .filter((task) => isOverdue(task) || isThisWeek(task.dueDate) || task.priority === "Tinggi")
      .slice(0, 5);

    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = '<p class="empty-inline">Tidak ada tugas mendesak. Kamu bisa mencicil tugas berikutnya.</p>';
      $("#focusHint").textContent = "Semua tugas urgent sedang aman.";
      return;
    }

    $("#focusHint").textContent = "Urutan dibuat dari keterlambatan, deadline minggu ini, prioritas, lalu tanggal.";
    tasks.forEach((task) => {
      const item = document.createElement("article");
      item.className = "focus-item";
      item.innerHTML = `
        <span class="mini-priority ${getPriorityClass(task.priority)}">${task.priority}</span>
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <span>${escapeHtml(task.course)} - ${escapeHtml(formatDeadline(task))}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }

  function renderTaskList() {
    const tasks = getFilteredTasks();
    const list = $("#taskList");
    const template = $("#taskTemplate");

    list.innerHTML = "";
    $("#emptyState").classList.toggle("hidden", tasks.length > 0);
    $("#listSummary").textContent = `${tasks.length} dari ${state.tasks.length} tugas ditampilkan.`;

    tasks.forEach((task) => {
      const effectiveStatus = getEffectiveStatus(task);
      const card = template.content.firstElementChild.cloneNode(true);
      card.classList.toggle("is-late", effectiveStatus === "Terlambat");
      card.classList.toggle("is-today", daysUntil(task.dueDate) === 0 && task.status !== "Selesai");
      card.classList.toggle("is-done", task.status === "Selesai");

      card.querySelector(".course").textContent = task.course;
      card.querySelector("h3").textContent = task.title;
      card.querySelector(".deadline-text").textContent = formatDeadline(task);

      const notes = card.querySelector(".task-notes");
      notes.textContent = task.notes;
      notes.classList.toggle("hidden", !task.notes);

      const priority = card.querySelector(".priority-badge");
      priority.textContent = task.priority;
      priority.classList.add(getPriorityClass(task.priority));

      const status = card.querySelector(".status-badge");
      status.textContent = effectiveStatus;
      status.classList.add(getStatusClass(effectiveStatus));

      const statusSelect = card.querySelector(".status-select");
      statusSelect.value = task.status;
      statusSelect.addEventListener("change", () => updateTask(task.id, { status: statusSelect.value }));

      card.querySelector(".edit-button").addEventListener("click", () => editTask(task.id));
      card.querySelector(".delete-button").addEventListener("click", () => deleteTask(task.id));
      list.appendChild(card);
    });
  }

  function renderCourses() {
    const grid = $("#courseGrid");
    const courses = getCourseStats();
    grid.innerHTML = "";

    if (courses.length === 0) {
      grid.innerHTML = '<p class="empty-inline">Belum ada mata kuliah aktif.</p>';
      return;
    }

    courses.forEach((item, index) => {
      const percent = item.total === 0 ? 0 : Math.round((item.done / item.total) * 100);
      const card = document.createElement("article");
      card.className = `course-card course-${courseColors[index % courseColors.length]}`;
      card.innerHTML = `
        <h3>${escapeHtml(item.course)}</h3>
        <p>${item.done} dari ${item.total} tugas selesai</p>
        <div class="progress-track" aria-label="Progres ${escapeHtml(item.course)}">
          <span style="width: ${percent}%"></span>
        </div>
        <strong>${percent}%</strong>
      `;
      grid.appendChild(card);
    });
  }

  function renderTimeline() {
    const list = $("#timelineList");
    const tasks = sortDeadlineTasks(state.tasks).slice(0, 8);
    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = '<p class="empty-inline">Belum ada deadline untuk ditampilkan.</p>';
      return;
    }

    tasks.forEach((task) => {
      const item = document.createElement("article");
      const effectiveStatus = getEffectiveStatus(task);
      item.className = `timeline-item ${task.status === "Selesai" ? "is-done" : ""}`;
      item.innerHTML = `
        <span class="timeline-dot ${getPriorityClass(task.priority)}"></span>
        <div>
          <strong>${escapeHtml(task.title)}</strong>
          <p>${escapeHtml(task.course)} - ${escapeHtml(formatDeadline(task))}</p>
          <span class="status-badge ${getStatusClass(effectiveStatus)}">${effectiveStatus}</span>
          <span class="mini-priority ${getPriorityClass(task.priority)}">${task.priority}</span>
        </div>
      `;
      list.appendChild(item);
    });
  }

  function renderMiniCalendar() {
    const calendar = $("#miniCalendar");
    const title = $("#calendarTitle");
    const summary = $("#calendarSummary");
    const monthDate = state.calendarDate;
    const monthName = new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(monthDate);
    const days = getMonthCalendarDays(monthDate);
    const monthTasks = state.tasks.filter((task) => {
      const date = parseLocalDate(task.dueDate);
      return date.getFullYear() === monthDate.getFullYear() && date.getMonth() === monthDate.getMonth();
    });
    const tasksByDate = new Map();

    state.tasks.forEach((task) => {
      if (!tasksByDate.has(task.dueDate)) tasksByDate.set(task.dueDate, []);
      tasksByDate.get(task.dueDate).push(task);
    });

    calendar.innerHTML = "";
    title.textContent = monthName;
    summary.textContent = `${monthTasks.length} deadline tercatat pada ${monthName}.`;

    ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].forEach((dayName) => {
      const weekday = document.createElement("span");
      weekday.className = "calendar-weekday";
      weekday.textContent = dayName;
      calendar.appendChild(weekday);
    });

    days.forEach((day) => {
      const item = document.createElement("article");
      const tasks = sortDeadlineTasks(tasksByDate.get(day.dateKey) || []);
      item.className = "calendar-day";
      item.classList.toggle("is-muted", !day.isCurrentMonth);
      item.classList.toggle("is-today", day.isToday);
      item.innerHTML = `<strong>${day.date.getDate()}</strong>`;

      tasks.slice(0, 2).forEach((task) => {
        const label = document.createElement("span");
        label.className = `calendar-task ${getPriorityClass(task.priority)}`;
        label.textContent = task.title;
        item.appendChild(label);
      });

      if (tasks.length > 2) {
        const more = document.createElement("p");
        more.className = "calendar-more";
        more.textContent = `+${tasks.length - 2} lagi`;
        item.appendChild(more);
      }

      calendar.appendChild(item);
    });
  }

  function renderWeekStrip() {
    const strip = $("#weekStrip");
    const week = getWeekRange();
    const todayKey = toDateInputValue(new Date());
    strip.innerHTML = "";

    for (let index = 0; index < 7; index += 1) {
      const date = new Date(week.start);
      date.setDate(week.start.getDate() + index);
      const dateKey = toDateInputValue(date);
      const tasks = sortTasks(state.tasks.filter((task) => task.dueDate === dateKey));
      const day = document.createElement("article");
      day.className = "week-day";
      day.classList.toggle("is-today", dateKey === todayKey);
      day.innerHTML = `
        <span>${new Intl.DateTimeFormat("id-ID", { weekday: "short" }).format(date)}</span>
        <strong>${date.getDate()}</strong>
      `;

      if (tasks.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "Kosong";
        day.appendChild(empty);
      } else {
        tasks.slice(0, 3).forEach((task) => {
          const pill = document.createElement("small");
          pill.textContent = task.title;
          pill.className = getPriorityClass(task.priority);
          day.appendChild(pill);
        });
      }

      strip.appendChild(day);
    }
  }

  function render() {
    renderStats();
    renderCourseFilter();
    renderFocusList();
    renderTaskList();
    renderCourses();
    renderTimeline();
    renderMiniCalendar();
    renderWeekStrip();
  }

  function getPriorityClass(priority) {
    if (priority === "Tinggi") return "priority-high";
    if (priority === "Sedang") return "priority-medium";
    return "priority-low";
  }

  function getStatusClass(status) {
    if (status === "Selesai") return "status-done";
    if (status === "Terlambat") return "status-late";
    if (status === "Dikerjakan") return "status-progress";
    return "status-idle";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char]));
  }

  function bindEvents() {
    resetForm();

    $("#taskForm").addEventListener("submit", (event) => {
      event.preventDefault();
      upsertTask(readFormData());
    });

    $("#cancelEditButton").addEventListener("click", resetForm);

    $("#searchInput").addEventListener("input", (event) => {
      state.search = event.target.value.trim().toLowerCase();
      renderTaskList();
    });

    $("#filterSelect").addEventListener("change", (event) => {
      state.filter = event.target.value;
      renderTaskList();
    });

    $("#courseFilter").addEventListener("change", (event) => {
      state.course = event.target.value;
      renderTaskList();
    });

    $("#prevMonthButton").addEventListener("click", () => {
      state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() - 1, 1);
      renderMiniCalendar();
    });

    $("#nextMonthButton").addEventListener("click", () => {
      state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + 1, 1);
      renderMiniCalendar();
    });

    $("#themeToggle").addEventListener("click", () => {
      document.body.classList.toggle("dark");
      try {
        localStorage.setItem(THEME_KEY, document.body.classList.contains("dark") ? "dark" : "light");
      } catch {
        // Theme preference is optional.
      }
    });
  }

  function applyTheme() {
    try {
      if (localStorage.getItem(THEME_KEY) === "dark") {
        document.body.classList.add("dark");
      }
    } catch {
      // Keep default theme when storage is unavailable.
    }
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
      applyTheme();
      bindEvents();
      render();
    });
  }

  window.StudentTaskTracker = {
    daysUntil,
    getEffectiveStatus,
    getStats,
    getMonthCalendarDays,
    isOverdue,
    isThisWeek,
    sortDeadlineTasks,
    sortTasks,
  };
}());
