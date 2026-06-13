# PRD Pelacak Tugas Mahasiswa

## Ringkasan produk

Pelacak Tugas Mahasiswa adalah website/app sederhana untuk satu mahasiswa yang ingin mengatur tugas kuliah pribadi. Aplikasi ini membantu mahasiswa melihat tugas berdasarkan prioritas, progres, deadline, tugas terlambat, tugas minggu ini, dan persentase penyelesaian secara cepat melalui dashboard visual.

Produk ini dirancang sebagai proyek software engineering 2 hari dengan fokus pada MVP yang berguna, ringan, dan dapat langsung dipakai tanpa akun atau backend.

## Tujuan proyek

- Membuat aplikasi pelacak tugas pribadi untuk mahasiswa.
- Menyediakan dashboard yang mudah dipindai untuk melihat kondisi tugas.
- Membantu pengguna memprioritaskan tugas berdasarkan deadline, status, dan prioritas.
- Menyimpan data tugas secara lokal di browser.
- Menghadirkan tampilan yang modern, ramah, dan terinspirasi dari dashboard pastel pada referensi desain.

## Target pengguna

Target utama adalah satu mahasiswa yang memiliki beberapa mata kuliah aktif dan ingin mengatur tugas kuliah secara mandiri.

Karakteristik pengguna:

- Mengelola beberapa tugas dari berbagai mata kuliah.
- Membutuhkan tampilan yang cepat dipahami.
- Ingin melihat tugas yang terlambat dan jatuh tempo minggu ini.
- Tidak membutuhkan fitur kolaborasi, akun, atau integrasi kampus pada versi awal.

## Masalah yang diselesaikan

Mahasiswa sering kesulitan memantau banyak tugas kuliah sekaligus. Deadline tersebar, prioritas tidak selalu jelas, dan progres pengerjaan sering tidak tercatat. Akibatnya, tugas penting bisa terlambat atau mahasiswa tidak punya gambaran utuh tentang beban tugas minggu berjalan.

Aplikasi ini menyelesaikan masalah tersebut dengan menyediakan satu dashboard pribadi yang menampilkan daftar tugas, status, prioritas, deadline, dan ringkasan progres.

## Scope MVP 2 hari

### Masuk scope

- Dashboard utama satu halaman.
- Tambah, edit, hapus, dan tandai progres tugas.
- Data tugas disimpan di browser menggunakan local storage.
- Ringkasan statistik:
  - jumlah tugas terlambat
  - jumlah tugas minggu ini
  - jumlah tugas selesai
  - persentase tugas selesai
- Daftar tugas fokus berdasarkan deadline dan prioritas.
- Filter tugas berdasarkan status, prioritas, dan mata kuliah.
- Kartu mata kuliah aktif dengan progres sederhana.
- Kalender mini atau daftar deadline mingguan.
- Timeline sederhana untuk tugas terdekat.
- Desain responsif untuk desktop dan mobile.
- Bahasa antarmuka menggunakan Bahasa Indonesia.

### Tidak masuk scope

- Login dan akun pengguna.
- Sinkronisasi cloud.
- Multi-pengguna.
- Peran dosen, admin, atau orang tua.
- Integrasi dengan sistem kampus atau kalender eksternal.
- Notifikasi sistem.
- Lampiran file.
- Fitur kolaborasi.
- Analitik lanjutan.

## Fitur utama

### 1. Dashboard ringkasan

Dashboard menampilkan kondisi tugas secara ringkas agar pengguna bisa langsung memahami prioritas hari ini atau minggu ini.

Komponen dashboard:

- Kartu jumlah tugas terlambat.
- Kartu jumlah tugas minggu ini.
- Kartu jumlah tugas selesai.
- Kartu persentase penyelesaian.
- Daftar tugas fokus.
- Daftar mata kuliah aktif.
- Timeline tugas terdekat.

Kriteria penerimaan:

- Pengguna dapat melihat ringkasan tanpa membuka halaman lain.
- Persentase selesai dihitung dari jumlah tugas dengan status selesai dibanding total tugas.
- Tugas terlambat dihitung dari tugas yang deadline-nya sudah lewat dan belum selesai.
- Tugas minggu ini dihitung dari tugas yang deadline-nya berada dalam minggu berjalan.

### 2. Manajemen tugas

Pengguna dapat membuat dan mengelola tugas kuliah.

Kolom tugas:

- Judul tugas.
- Mata kuliah.
- Deadline.
- Prioritas: rendah, sedang, tinggi.
- Status: belum mulai, dikerjakan, selesai.
- Catatan opsional.

Kriteria penerimaan:

- Pengguna dapat menambahkan tugas baru.
- Pengguna dapat mengedit data tugas.
- Pengguna dapat menghapus tugas.
- Pengguna dapat mengubah status tugas.
- Tugas baru langsung muncul di dashboard dan daftar tugas.

### 3. Prioritas tugas

Setiap tugas memiliki prioritas agar pengguna bisa membedakan tugas yang paling penting.

Kriteria penerimaan:

- Prioritas tersedia dalam tiga pilihan: rendah, sedang, tinggi.
- Prioritas ditampilkan jelas pada kartu tugas.
- Tugas prioritas tinggi mendapat penanda visual yang lebih kuat.

### 4. Progres tugas

Progres tugas pada MVP menggunakan status sederhana agar cepat dipakai dan mudah dihitung.

Status:

- Belum mulai.
- Dikerjakan.
- Selesai.

Kriteria penerimaan:

- Pengguna dapat mengubah status tugas.
- Tugas dengan status selesai dihitung sebagai tugas selesai.
- Progress mata kuliah dihitung dari jumlah tugas selesai pada mata kuliah tersebut.

### 5. Tugas terlambat

Aplikasi menampilkan tugas yang melewati deadline dan belum selesai.

Kriteria penerimaan:

- Tugas terlambat muncul dalam ringkasan dashboard.
- Tugas terlambat diberi penanda visual yang jelas.
- Tugas selesai tidak dianggap terlambat walaupun deadline sudah lewat.

### 6. Tugas minggu ini

Aplikasi menampilkan tugas yang jatuh tempo pada minggu berjalan.

Kriteria penerimaan:

- Tugas minggu ini muncul dalam ringkasan dashboard.
- Daftar tugas fokus memprioritaskan tugas minggu ini.
- Tugas diurutkan berdasarkan deadline terdekat.

### 7. Mata kuliah aktif

Aplikasi menampilkan mata kuliah berdasarkan tugas yang dibuat pengguna.

Kriteria penerimaan:

- Mata kuliah muncul otomatis dari data tugas.
- Setiap mata kuliah menampilkan jumlah tugas dan progres selesai.
- Warna kartu dapat dibedakan antar mata kuliah.

### 8. Filter dan pengurutan

Pengguna dapat memfilter daftar tugas untuk menemukan tugas tertentu.

Filter minimum:

- Semua tugas.
- Terlambat.
- Minggu ini.
- Belum selesai.
- Selesai.
- Prioritas tinggi.

Kriteria penerimaan:

- Filter dapat digunakan tanpa memuat ulang halaman.
- Hasil filter sesuai dengan kondisi tugas.
- Pengguna dapat kembali ke tampilan semua tugas.

## Alur pengguna utama

### Alur menambahkan tugas

1. Pengguna membuka dashboard.
2. Pengguna memilih tombol tambah tugas.
3. Pengguna mengisi judul, mata kuliah, deadline, prioritas, status, dan catatan opsional.
4. Pengguna menyimpan tugas.
5. Tugas muncul di daftar tugas dan memengaruhi ringkasan dashboard.

### Alur memantau tugas minggu ini

1. Pengguna membuka dashboard.
2. Pengguna melihat kartu ringkasan "Minggu Ini".
3. Pengguna melihat daftar tugas fokus.
4. Pengguna memilih tugas yang ingin dikerjakan.
5. Pengguna memperbarui status tugas menjadi dikerjakan atau selesai.

### Alur melihat tugas terlambat

1. Pengguna membuka dashboard.
2. Pengguna melihat jumlah tugas terlambat.
3. Pengguna memilih filter terlambat.
4. Pengguna melihat daftar tugas yang perlu segera ditangani.

## Kebutuhan desain

- Tampilan menggunakan gaya dashboard modern dengan kartu-kartu visual.
- Nuansa warna ramah dan pastel, tetapi tetap matang untuk mahasiswa.
- Sidebar atau navigasi sederhana berisi area seperti Dashboard, Tugas, Kalender, Mata Kuliah, dan Progress, walaupun MVP boleh tetap satu halaman.
- Layout desktop dapat menggunakan 2 sampai 3 kolom.
- Layout mobile harus berubah menjadi satu kolom yang mudah digulir.
- Status, prioritas, dan deadline harus mudah dikenali secara visual.
- Desain tidak boleh terasa seperti landing page; layar pertama harus langsung menjadi pengalaman aplikasi.

## Kebutuhan teknis

- Aplikasi dapat dibuat sebagai website statis.
- Data disimpan menggunakan local storage.
- Tidak membutuhkan backend untuk MVP.
- Tidak membutuhkan autentikasi.
- Aplikasi harus responsif.
- Perhitungan deadline harus menggunakan tanggal lokal pengguna.
- Struktur kode harus cukup sederhana agar bisa diselesaikan dalam 2 hari.

## Data model awal

```text
Task
- id: string
- title: string
- course: string
- dueDate: string
- priority: "rendah" | "sedang" | "tinggi"
- status: "belum_mulai" | "dikerjakan" | "selesai"
- notes: string
- createdAt: string
- updatedAt: string
```

## Metrik keberhasilan

- Pengguna dapat menambahkan tugas pertama dalam waktu kurang dari 1 menit.
- Pengguna dapat melihat tugas terlambat tanpa membuka halaman tambahan.
- Pengguna dapat melihat tugas minggu ini dari dashboard.
- Pengguna dapat memahami persentase tugas selesai secara langsung.
- Data tugas tetap tersedia setelah halaman ditutup dan dibuka kembali.

## Rencana pengerjaan 2 hari

### Hari 1

- Menentukan struktur aplikasi dan data model.
- Membuat layout dashboard utama.
- Membuat fitur tambah, edit, hapus tugas.
- Menyimpan dan membaca data dari local storage.
- Membuat ringkasan dasar: total selesai, persentase selesai, tugas terlambat, tugas minggu ini.

### Hari 2

- Menambahkan filter tugas.
- Menambahkan kartu mata kuliah aktif.
- Menambahkan timeline atau daftar deadline terdekat.
- Merapikan desain responsif.
- Mengisi contoh data awal bila diperlukan.
- Melakukan pengujian manual untuk alur utama.
- Memperbaiki bug dan polish UI.

## Risiko dan mitigasi

- Risiko: Scope desain terlalu besar untuk 2 hari.
  Mitigasi: Fokus pada satu halaman dashboard dan fitur inti terlebih dahulu.

- Risiko: Kalender penuh memakan waktu implementasi.
  Mitigasi: Gunakan kalender mini sederhana atau daftar deadline mingguan untuk MVP.

- Risiko: Data lokal hilang jika browser storage dibersihkan.
  Mitigasi: Jelaskan bahwa local storage hanya solusi MVP; ekspor/impor bisa menjadi pengembangan berikutnya.

- Risiko: UI pastel terlalu playful untuk mahasiswa.
  Mitigasi: Gunakan warna pastel sebagai aksen, dengan layout yang tetap rapi dan produktif.

## Pertanyaan terbuka

- Apakah versi pertama perlu fitur ekspor/impor data?
- Apakah progres cukup memakai status sederhana, atau perlu persentase manual 0% sampai 100%?
- Apakah timeline lebih cocok untuk jadwal belajar, deadline, atau rencana pengerjaan tugas?
- Apakah navigasi sidebar perlu benar-benar berpindah halaman, atau cukup menjadi anchor/filter pada satu halaman?
- Apakah aplikasi perlu mode gelap pada versi awal?
