# Vertical Slice Issues Pelacak Tugas Mahasiswa

Dokumen ini mengubah PRD menjadi issue implementasi vertical slice untuk proyek 2 hari. Setiap issue dirancang agar menghasilkan bagian produk yang bisa diuji dari sisi pengguna, bukan hanya lapisan teknis terpisah.

## Issue 1: Siapkan Fondasi Aplikasi dan Data Tugas

**Type:** AFK

### What to build

Bangun fondasi aplikasi satu halaman untuk Pelacak Tugas Mahasiswa, termasuk struktur UI awal, data model tugas, state aplikasi, local storage, dan data contoh awal. Fondasi ini menjadi dasar untuk semua slice berikutnya.

### User stories

- Sebagai mahasiswa, saya ingin membuka aplikasi dan langsung melihat dashboard pelacak tugas.
- Sebagai mahasiswa, saya ingin data tugas tetap tersedia setelah halaman ditutup dan dibuka kembali.

### Acceptance criteria

- Aplikasi dapat dijalankan sebagai website/app sederhana.
- Tersedia struktur halaman utama dengan area dashboard, daftar tugas, mata kuliah, dan timeline.
- Data model tugas minimal memuat `id`, `title`, `course`, `dueDate`, `priority`, `status`, `notes`, `createdAt`, dan `updatedAt`.
- Data tugas disimpan dan dibaca dari local storage.
- Jika belum ada data, aplikasi menampilkan beberapa data contoh yang relevan untuk mahasiswa.
- Seluruh label utama menggunakan Bahasa Indonesia.

### Blocked by

- Tidak ada.

### Testing notes

- Buka aplikasi dan pastikan halaman utama muncul tanpa error.
- Refresh halaman dan pastikan data tugas tetap muncul.
- Hapus local storage secara manual dan pastikan data contoh bisa muncul kembali atau empty state tampil dengan rapi.

### AI usage notes

- AI dapat membantu membuat struktur awal komponen, data model, helper local storage, dan contoh data.
- AI perlu menjaga scope tetap sederhana agar fondasi selesai cepat untuk proyek 2 hari.

## Issue 2: CRUD Tugas dengan Prioritas dan Status

**Type:** AFK

### What to build

Buat fitur tambah, edit, hapus, dan ubah status tugas. Form tugas harus mendukung judul, mata kuliah, deadline, prioritas, status, dan catatan opsional.

### User stories

- Sebagai mahasiswa, saya ingin menambahkan tugas baru agar semua tugas kuliah tercatat.
- Sebagai mahasiswa, saya ingin mengubah detail tugas jika ada perubahan deadline atau prioritas.
- Sebagai mahasiswa, saya ingin menghapus tugas yang tidak lagi relevan.
- Sebagai mahasiswa, saya ingin menandai tugas sebagai belum mulai, dikerjakan, atau selesai.

### Acceptance criteria

- Pengguna dapat menambahkan tugas baru dari UI.
- Pengguna dapat mengedit tugas yang sudah ada.
- Pengguna dapat menghapus tugas.
- Pengguna dapat mengubah status tugas.
- Prioritas tersedia dalam pilihan rendah, sedang, dan tinggi.
- Status tersedia dalam pilihan belum mulai, dikerjakan, dan selesai.
- Perubahan tugas langsung tersimpan ke local storage.
- Form memiliki validasi minimal untuk judul, mata kuliah, deadline, prioritas, dan status.

### Blocked by

- Issue 1: Siapkan Fondasi Aplikasi dan Data Tugas.

### Testing notes

- Tambahkan tugas baru dan pastikan muncul di daftar.
- Edit deadline dan prioritas, lalu refresh halaman untuk memastikan perubahan tersimpan.
- Ubah status menjadi selesai dan pastikan status tampil benar.
- Hapus tugas dan pastikan tugas tidak muncul kembali setelah refresh.
- Coba simpan form kosong dan pastikan validasi berjalan.

### AI usage notes

- AI dapat membantu membuat form, handler state, validasi ringan, dan fungsi CRUD.
- AI harus menghindari fitur tambahan seperti lampiran, login, atau sinkronisasi cloud.

## Issue 3: Dashboard Ringkasan Progres dan Urgensi

**Type:** AFK

### What to build

Buat kartu ringkasan dashboard yang menampilkan jumlah tugas terlambat, tugas minggu ini, tugas selesai, dan persentase penyelesaian.

### User stories

- Sebagai mahasiswa, saya ingin melihat berapa tugas yang terlambat agar bisa segera menanganinya.
- Sebagai mahasiswa, saya ingin melihat tugas minggu ini agar tahu fokus terdekat.
- Sebagai mahasiswa, saya ingin melihat persentase selesai agar memahami progres keseluruhan.

### Acceptance criteria

- Dashboard menampilkan kartu "Terlambat".
- Dashboard menampilkan kartu "Minggu Ini".
- Dashboard menampilkan kartu "Selesai".
- Dashboard menampilkan kartu "Persentase Selesai".
- Tugas terlambat dihitung dari tugas yang deadline-nya sudah lewat dan belum selesai.
- Tugas minggu ini dihitung dari tugas dengan deadline pada minggu berjalan.
- Persentase selesai dihitung dari jumlah tugas selesai dibanding total tugas.
- Ringkasan berubah otomatis saat tugas ditambah, diedit, dihapus, atau status diubah.

### Blocked by

- Issue 1: Siapkan Fondasi Aplikasi dan Data Tugas.
- Issue 2: CRUD Tugas dengan Prioritas dan Status.

### Testing notes

- Buat tugas dengan deadline kemarin dan status belum selesai, lalu pastikan masuk "Terlambat".
- Buat tugas dengan deadline minggu ini, lalu pastikan masuk "Minggu Ini".
- Ubah beberapa tugas menjadi selesai dan pastikan angka serta persentase berubah.
- Pastikan tugas selesai tidak dihitung sebagai terlambat walaupun deadline sudah lewat.

### AI usage notes

- AI dapat membantu membuat helper perhitungan tanggal lokal, statistik, dan format angka.
- AI perlu berhati-hati pada batas minggu berjalan dan perbandingan tanggal agar hasil konsisten.

## Issue 4: Daftar Fokus, Filter Tugas, dan Pengurutan Deadline

**Type:** AFK

### What to build

Buat daftar tugas fokus yang memprioritaskan tugas minggu ini, tugas terlambat, dan tugas prioritas tinggi. Tambahkan filter untuk semua tugas, terlambat, minggu ini, belum selesai, selesai, dan prioritas tinggi.

### User stories

- Sebagai mahasiswa, saya ingin melihat tugas paling penting lebih dulu agar tidak bingung memilih pekerjaan berikutnya.
- Sebagai mahasiswa, saya ingin memfilter tugas terlambat agar bisa menanganinya lebih cepat.
- Sebagai mahasiswa, saya ingin memfilter tugas selesai dan belum selesai agar daftar tugas lebih mudah dibaca.

### Acceptance criteria

- Tersedia daftar tugas fokus di dashboard.
- Tugas fokus diurutkan berdasarkan urgensi dan deadline terdekat.
- Tersedia filter: semua, terlambat, minggu ini, belum selesai, selesai, dan prioritas tinggi.
- Filter bekerja tanpa reload halaman.
- Hasil filter sesuai dengan status, deadline, dan prioritas tugas.
- Pengguna dapat kembali ke tampilan semua tugas.
- Kartu tugas menampilkan judul, mata kuliah, deadline, prioritas, status, dan catatan jika ada.

### Blocked by

- Issue 2: CRUD Tugas dengan Prioritas dan Status.
- Issue 3: Dashboard Ringkasan Progres dan Urgensi.

### Testing notes

- Buat kombinasi tugas terlambat, minggu ini, selesai, belum selesai, dan prioritas tinggi.
- Coba setiap filter dan pastikan hanya tugas yang sesuai muncul.
- Pastikan daftar fokus menempatkan tugas urgent di posisi atas.
- Pastikan perubahan status langsung memengaruhi hasil filter.

### AI usage notes

- AI dapat membantu membuat fungsi filter, sorting, dan rendering kartu tugas.
- AI harus menjaga interaksi tetap sederhana dan tidak menambahkan navigasi kompleks di luar MVP.

## Issue 5: Kartu Mata Kuliah Aktif dan Progres per Mata Kuliah

**Type:** AFK

### What to build

Buat area mata kuliah aktif yang muncul otomatis dari data tugas. Setiap mata kuliah menampilkan jumlah tugas, jumlah selesai, dan progress bar sederhana.

### User stories

- Sebagai mahasiswa, saya ingin melihat mata kuliah aktif agar tugas lebih terorganisir.
- Sebagai mahasiswa, saya ingin mengetahui progres per mata kuliah agar tahu mata kuliah mana yang masih banyak tugas.

### Acceptance criteria

- Mata kuliah aktif dibuat otomatis dari field mata kuliah pada tugas.
- Setiap kartu mata kuliah menampilkan nama mata kuliah.
- Setiap kartu menampilkan jumlah tugas dan jumlah tugas selesai.
- Setiap kartu menampilkan progress bar berdasarkan tugas selesai dibanding total tugas pada mata kuliah tersebut.
- Warna kartu mata kuliah dapat dibedakan secara visual.
- Jika belum ada tugas, area mata kuliah menampilkan empty state yang rapi.

### Blocked by

- Issue 1: Siapkan Fondasi Aplikasi dan Data Tugas.
- Issue 2: CRUD Tugas dengan Prioritas dan Status.

### Testing notes

- Tambahkan beberapa tugas dengan mata kuliah berbeda.
- Pastikan setiap mata kuliah muncul satu kali.
- Ubah status tugas menjadi selesai dan pastikan progres mata kuliah berubah.
- Hapus semua tugas pada satu mata kuliah dan pastikan kartu mata kuliah ikut hilang.

### AI usage notes

- AI dapat membantu membuat agregasi data per mata kuliah dan mapping warna.
- AI perlu memastikan warna tidak terlalu ramai dan tetap konsisten dengan gaya dashboard mahasiswa.

## Issue 6: Timeline Deadline dan Kalender Mini

**Type:** AFK

### What to build

Buat timeline sederhana untuk tugas terdekat dan kalender mini atau daftar deadline mingguan. Fitur ini membantu pengguna melihat urutan tugas berdasarkan waktu.

### User stories

- Sebagai mahasiswa, saya ingin melihat urutan deadline terdekat agar bisa merencanakan pengerjaan tugas.
- Sebagai mahasiswa, saya ingin melihat tugas minggu ini dalam bentuk visual yang mudah dipahami.

### Acceptance criteria

- Dashboard menampilkan timeline tugas terdekat.
- Timeline menampilkan minimal judul tugas, mata kuliah, deadline, prioritas, dan status.
- Timeline diurutkan berdasarkan deadline terdekat.
- Tugas selesai boleh tetap terlihat dengan gaya visual yang lebih tenang atau dipindahkan ke bawah.
- Kalender mini atau daftar deadline mingguan menampilkan tugas yang jatuh tempo minggu berjalan.
- Tampilan tetap rapi pada desktop dan mobile.

### Blocked by

- Issue 2: CRUD Tugas dengan Prioritas dan Status.
- Issue 3: Dashboard Ringkasan Progres dan Urgensi.

### Testing notes

- Buat beberapa tugas dengan deadline berbeda dan pastikan urutannya benar.
- Buat tugas minggu ini dan pastikan muncul pada kalender mini atau daftar deadline mingguan.
- Ubah deadline tugas dan pastikan posisi timeline berubah.
- Uji tampilan mobile untuk memastikan timeline tidak berantakan.

### AI usage notes

- AI dapat membantu menyusun komponen timeline dan helper format tanggal.
- AI sebaiknya memilih kalender mini sederhana jika kalender penuh terlalu memakan waktu.

## Issue 7: Review Desain, Responsif, dan Validasi Produk

**Type:** HITL

### What to build

Lakukan polish desain akhir, responsif, copy Bahasa Indonesia, dan validasi dengan pengguna terhadap arah visual dashboard. Issue ini membutuhkan keputusan manusia untuk memastikan tampilan sudah sesuai dengan referensi dan kebutuhan mahasiswa.

### User stories

- Sebagai mahasiswa, saya ingin tampilan aplikasi terasa ramah dan modern agar nyaman dipakai setiap hari.
- Sebagai mahasiswa, saya ingin aplikasi tetap mudah digunakan di laptop dan mobile.
- Sebagai pemilik produk, saya ingin memastikan MVP sesuai dengan arah desain yang disepakati sebelum dianggap selesai.

### Acceptance criteria

- Layout desktop terlihat seperti dashboard aplikasi, bukan landing page.
- Layout mobile berubah menjadi satu kolom yang mudah digulir.
- Warna pastel digunakan sebagai aksen, tetapi tampilan tetap cukup matang untuk mahasiswa.
- Semua teks utama menggunakan Bahasa Indonesia yang natural.
- Tidak ada teks yang bertumpuk, terpotong, atau sulit dibaca.
- Prioritas, status, dan deadline memiliki penanda visual yang jelas.
- Pemilik produk melakukan review visual dan menyetujui arah akhir atau memberi revisi spesifik.

### Blocked by

- Issue 3: Dashboard Ringkasan Progres dan Urgensi.
- Issue 4: Daftar Fokus, Filter Tugas, dan Pengurutan Deadline.
- Issue 5: Kartu Mata Kuliah Aktif dan Progres per Mata Kuliah.
- Issue 6: Timeline Deadline dan Kalender Mini.

### Testing notes

- Uji tampilan desktop sekitar 1440px.
- Uji tampilan tablet sekitar 768px.
- Uji tampilan mobile sekitar 390px.
- Cek alur tambah tugas, edit tugas, filter tugas, dan ubah status setelah polish.
- Minta pengguna melihat hasil akhir dan memberi keputusan apakah visual sudah sesuai.

### AI usage notes

- AI dapat membantu memperbaiki spacing, warna, responsif, microcopy, dan bug visual.
- HITL diperlukan untuk menilai rasa visual karena desain mengacu pada preferensi pengguna dan gambar referensi.
