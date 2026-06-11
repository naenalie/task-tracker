# Design Document Pelacak Tugas Mahasiswa

## Ringkasan desain

Pelacak Tugas Mahasiswa dirancang sebagai website/app sederhana satu halaman untuk satu mahasiswa. Fokus utama desain adalah membuat tugas kuliah mudah dipantau dari dashboard: tugas terlambat, tugas minggu ini, progres penyelesaian, prioritas, mata kuliah aktif, dan timeline deadline.

MVP dibuat sebagai aplikasi frontend tanpa backend. Data disimpan di browser menggunakan local storage agar proyek realistis diselesaikan dalam 2 hari.

## UI sketch / wireframe

### Desktop

```text
+----------------------------------------------------------------------------------+
| Sidebar | Header: Pelacak Tugas Mahasiswa                    [+ Tambah Tugas]     |
|         +--------------------------------------------------------------------------+
| Home    | Ringkasan                                                                |
| Tugas   | [Terlambat] [Minggu Ini] [Selesai] [Persentase Selesai]                 |
| Kuliah  +-----------------------------+-----------------------+--------------------+
| Timeline| Mata Kuliah Aktif           | Fokus Tugas           | Timeline Deadline  |
|         |                             |                       |                    |
|         | [Pemrograman Web   60%]     | [Tugas A]             | 09 Jun - Tugas A   |
|         | [Basis Data        40%]     | [Tugas B]             | 11 Jun - Tugas B   |
|         | [Statistika       100%]     | [Tugas C]             | 14 Jun - Tugas C   |
|         +-----------------------------+-----------------------+--------------------+
|         | Filter Tugas                                                              |
|         | [Semua] [Terlambat] [Minggu Ini] [Belum Selesai] [Selesai] [Prioritas]   |
|         +--------------------------------------------------------------------------+
|         | Daftar Tugas                                                             |
|         | [Judul | Mata Kuliah | Deadline | Prioritas | Status | Aksi]             |
|         | [Judul | Mata Kuliah | Deadline | Prioritas | Status | Aksi]             |
+----------------------------------------------------------------------------------+
```

### Mobile

```text
+----------------------------------+
| Header                           |
| Pelacak Tugas Mahasiswa          |
| [+ Tambah]                       |
+----------------------------------+
| Ringkasan                        |
| [Terlambat] [Minggu Ini]         |
| [Selesai]   [Persentase]         |
+----------------------------------+
| Fokus Tugas                      |
| [Kartu tugas]                    |
| [Kartu tugas]                    |
+----------------------------------+
| Mata Kuliah Aktif                |
| [Kartu mata kuliah]              |
| [Kartu mata kuliah]              |
+----------------------------------+
| Timeline Deadline                |
| [Item timeline]                  |
| [Item timeline]                  |
+----------------------------------+
| Filter Tugas                     |
| [chips filter horizontal scroll] |
+----------------------------------+
| Daftar Tugas                     |
| [Kartu tugas]                    |
| [Kartu tugas]                    |
+----------------------------------+
```

## User flow

### 1. Menambahkan tugas

1. Pengguna membuka dashboard.
2. Pengguna memilih tombol "Tambah Tugas".
3. Aplikasi menampilkan form tugas.
4. Pengguna mengisi judul, mata kuliah, deadline, prioritas, status, dan catatan opsional.
5. Pengguna menyimpan tugas.
6. Tugas masuk ke daftar tugas.
7. Ringkasan dashboard, mata kuliah aktif, fokus tugas, dan timeline diperbarui otomatis.

### 2. Memantau tugas minggu ini

1. Pengguna membuka dashboard.
2. Pengguna melihat kartu ringkasan "Minggu Ini".
3. Pengguna melihat daftar "Fokus Tugas".
4. Pengguna memilih tugas yang ingin dikerjakan.
5. Pengguna mengubah status menjadi "Dikerjakan" atau "Selesai".
6. Persentase selesai dan progress mata kuliah diperbarui.

### 3. Menangani tugas terlambat

1. Pengguna membuka dashboard.
2. Pengguna melihat kartu "Terlambat".
3. Pengguna memilih filter "Terlambat".
4. Aplikasi menampilkan tugas yang melewati deadline dan belum selesai.
5. Pengguna mengedit deadline, mengubah status, atau menyelesaikan tugas.

### 4. Meninjau progres mata kuliah

1. Pengguna melihat area "Mata Kuliah Aktif".
2. Pengguna membandingkan progress bar antar mata kuliah.
3. Pengguna memilih mata kuliah atau memakai filter mata kuliah jika fitur ini tersedia di daftar tugas.

## Component breakdown

### App

Komponen root yang mengatur state global tugas, membaca/menulis local storage, dan menghubungkan seluruh bagian dashboard.

Tanggung jawab:

- Memuat data awal.
- Menyimpan perubahan tugas.
- Mengatur filter aktif.
- Menghitung derived data untuk dashboard.

### Layout

Mengatur struktur halaman utama, termasuk sidebar, header, dan area konten.

Tanggung jawab:

- Membuat layout desktop 2 sampai 3 kolom.
- Mengubah layout menjadi satu kolom pada mobile.
- Menjaga aplikasi terasa seperti dashboard, bukan landing page.

### Sidebar

Navigasi visual sederhana berisi Dashboard, Tugas, Mata Kuliah, Timeline, dan Pengaturan. Pada MVP, item sidebar dapat berfungsi sebagai anchor atau penanda area, bukan halaman terpisah.

### Header

Menampilkan nama aplikasi, ringkasan konteks singkat, dan tombol "Tambah Tugas".

### SummaryCards

Menampilkan kartu ringkasan:

- Terlambat.
- Minggu Ini.
- Selesai.
- Persentase Selesai.

### TaskForm

Form untuk tambah dan edit tugas.

Field:

- Judul tugas.
- Mata kuliah.
- Deadline.
- Prioritas.
- Status.
- Catatan opsional.

### TaskList

Menampilkan daftar tugas sesuai filter aktif.

Tanggung jawab:

- Merender kartu/baris tugas.
- Menampilkan empty state.
- Mengirim aksi edit, hapus, dan ubah status ke App.

### TaskCard

Menampilkan informasi satu tugas.

Isi kartu:

- Judul.
- Mata kuliah.
- Deadline.
- Prioritas.
- Status.
- Catatan opsional.
- Tombol edit/hapus.

### FilterChips

Kontrol filter daftar tugas.

Filter MVP:

- Semua.
- Terlambat.
- Minggu Ini.
- Belum Selesai.
- Selesai.
- Prioritas Tinggi.

### FocusTasks

Menampilkan tugas yang paling perlu diperhatikan, terutama tugas terlambat, tugas minggu ini, dan prioritas tinggi.

### CourseCards

Menampilkan mata kuliah aktif yang dihitung otomatis dari data tugas.

Isi kartu:

- Nama mata kuliah.
- Jumlah tugas.
- Jumlah selesai.
- Progress bar.

### Timeline

Menampilkan urutan deadline tugas terdekat.

Isi item:

- Tanggal deadline.
- Judul tugas.
- Mata kuliah.
- Prioritas.
- Status.

### MiniCalendar atau WeeklyDeadlines

Untuk MVP, komponen ini dapat berupa daftar deadline mingguan agar lebih cepat dibuat dibanding kalender penuh.

## Data model

### Task

```ts
type TaskPriority = "rendah" | "sedang" | "tinggi";
type TaskStatus = "belum_mulai" | "dikerjakan" | "selesai";

type Task = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
```

### Derived data

Data berikut tidak perlu disimpan permanen karena bisa dihitung dari daftar tugas:

- `overdueTasks`: tugas dengan deadline sebelum hari ini dan status bukan selesai.
- `thisWeekTasks`: tugas dengan deadline pada minggu berjalan.
- `completedTasks`: tugas dengan status selesai.
- `completionPercentage`: jumlah tugas selesai dibagi total tugas.
- `courses`: agregasi tugas berdasarkan mata kuliah.
- `focusTasks`: tugas terlambat, tugas minggu ini, dan prioritas tinggi yang diurutkan berdasarkan urgensi.
- `timelineTasks`: tugas diurutkan berdasarkan deadline terdekat.

### Local storage

Key yang disarankan:

```text
student-task-tracker.tasks
```

Format nilai:

```json
[
  {
    "id": "task-001",
    "title": "Laporan Praktikum",
    "course": "Pemrograman Web",
    "dueDate": "2026-06-14",
    "priority": "tinggi",
    "status": "dikerjakan",
    "notes": "Lengkapi bagian analisis.",
    "createdAt": "2026-06-11T00:00:00.000Z",
    "updatedAt": "2026-06-11T00:00:00.000Z"
  }
]
```

## File/module structure

Struktur yang disarankan jika memakai React + Vite:

```text
student-task-tracker/
  index.html
  package.json
  src/
    main.tsx
    App.tsx
    styles/
      global.css
    components/
      Layout.tsx
      Sidebar.tsx
      Header.tsx
      SummaryCards.tsx
      TaskForm.tsx
      TaskList.tsx
      TaskCard.tsx
      FilterChips.tsx
      FocusTasks.tsx
      CourseCards.tsx
      Timeline.tsx
      WeeklyDeadlines.tsx
    data/
      seedTasks.ts
    lib/
      storage.ts
      taskCalculations.ts
      dateUtils.ts
      formatters.ts
    types/
      task.ts
```

Jika ingin lebih sederhana tanpa build tool, struktur alternatif:

```text
student-task-tracker/
  index.html
  styles.css
  app.js
```

Untuk proyek 2 hari, struktur React + Vite lebih rapi bila environment siap. Struktur HTML/CSS/JS biasa lebih cepat bila ingin menghindari instalasi dependency.

## Technology stack decision

### Pilihan utama: React + Vite + TypeScript

Alasan:

- Cocok untuk dashboard interaktif dengan banyak state turunan.
- Komponen UI lebih mudah dipisah sesuai vertical slice.
- TypeScript membantu menjaga data model tugas tetap konsisten.
- Vite cepat untuk development lokal.
- Mudah dikembangkan lagi jika nanti fitur bertambah.

### Styling

Gunakan CSS biasa atau CSS Modules.

Alasan:

- Scope desain masih kecil.
- Tidak perlu menambah kompleksitas framework styling.
- Lebih mudah mengontrol layout dashboard, warna pastel, dan responsif.

### Penyimpanan

Gunakan browser local storage.

Alasan:

- Tidak membutuhkan backend.
- Sesuai scope MVP 2 hari.
- Cukup untuk satu pengguna pada satu perangkat.

### Library tanggal

Untuk MVP, gunakan helper tanggal buatan sendiri dengan JavaScript `Date`.

Alasan:

- Perhitungan yang dibutuhkan masih sederhana.
- Menghindari dependency tambahan.
- Scope hanya overdue, minggu berjalan, dan urutan deadline.

## Important trade-offs

### 1. Satu halaman dibanding multi-page

Keputusan: gunakan satu halaman dashboard untuk MVP.

Alasan:

- Lebih cepat dibangun dalam 2 hari.
- Semua informasi penting terlihat tanpa navigasi kompleks.
- Cocok untuk penggunaan pribadi satu mahasiswa.

Trade-off:

- Jika fitur bertambah, satu halaman bisa terasa padat.
- Navigasi sidebar pada MVP lebih bersifat visual/anchor daripada halaman penuh.

### 2. Status sederhana dibanding persentase manual

Keputusan: gunakan status "Belum mulai", "Dikerjakan", dan "Selesai".

Alasan:

- Lebih cepat dipakai pengguna.
- Lebih mudah dihitung untuk persentase selesai.
- Mengurangi input manual yang bisa membingungkan.

Trade-off:

- Tidak menunjukkan progres detail seperti 25%, 50%, atau 75%.
- Bisa ditambahkan nanti jika pengguna membutuhkan kontrol lebih presisi.

### 3. Local storage dibanding backend

Keputusan: gunakan local storage untuk MVP.

Alasan:

- Tidak perlu login, server, atau database.
- Implementasi cepat.
- Sesuai kebutuhan satu pengguna.

Trade-off:

- Data hanya tersimpan di perangkat/browser tersebut.
- Data bisa hilang jika storage browser dibersihkan.
- Belum mendukung sinkronisasi antar perangkat.

### 4. Kalender mini sederhana dibanding kalender penuh

Keputusan: gunakan daftar deadline mingguan atau kalender mini sederhana.

Alasan:

- Kalender penuh memakan waktu implementasi lebih besar.
- Tujuan utama adalah melihat deadline, bukan mengelola event kompleks.

Trade-off:

- Tampilan tidak sekuat kalender interaktif penuh.
- Navigasi bulan atau drag-and-drop event tidak tersedia pada MVP.

### 5. Warna pastel sebagai aksen dibanding tema sangat playful

Keputusan: gunakan warna pastel untuk kartu dan status, tetapi tetap menjaga layout rapi dan produktif.

Alasan:

- Sesuai referensi visual pengguna.
- Tetap nyaman untuk konteks mahasiswa.
- Menghindari kesan terlalu kekanak-kanakan.

Trade-off:

- Perlu review manusia untuk memastikan nuansa visual sudah tepat.
- Selera visual bisa berubah setelah pengguna melihat prototype.

## Catatan implementasi

- Prioritaskan issue AFK 1 sampai 6 sebelum polish visual.
- Issue HITL dilakukan setelah fitur utama berjalan.
- Jangan menambahkan fitur di luar MVP sebelum CRUD, ringkasan, filter, mata kuliah, dan timeline stabil.
- Pastikan semua teks UI memakai Bahasa Indonesia.
- Pastikan data contoh memiliki variasi: tugas terlambat, tugas minggu ini, tugas selesai, dan prioritas tinggi.
