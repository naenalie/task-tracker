Refleksi Pengembangan dengan Bantuan AI
Apa yang Saya Bangun
Saya membangun aplikasi web Student Task Tracker untuk mahasiswa. Aplikasi ini membantu mahasiswa mencatat tugas akademik, mengelompokkan tugas berdasarkan mata kuliah, menentukan deadline, memilih prioritas, memperbarui status tugas, dan memantau progres dari satu dashboard.
Aplikasi ini memiliki form tambah tugas, daftar tugas, pencarian dan filter, pengurutan berdasarkan deadline, statistik progres, kalender mini, timeline deadline, serta penyimpanan data lokal menggunakan localStorage. MVP ini berjalan langsung di browser dengan HTML, CSS, dan JavaScript tanpa login, backend server, atau proses build.
AI Tools yang Saya Gunakan di Setiap Tahap
1. Klarifikasi Ide
Saya menggunakan AI untuk membantu memperjelas ide awal produk. AI memberikan pertanyaan tentang target pengguna, field tugas, pilihan status, reminder, login, layout dashboard, dan batasan MVP. Dari proses ini, ide yang awalnya masih umum berubah menjadi aplikasi yang lebih spesifik untuk mahasiswa.
2. Requirements dan PRD
Saya menggunakan AI untuk membantu menyusun requirements dan product requirement document. AI membantu merapikan problem statement, target pengguna, tujuan pengguna, functional requirements, non-functional requirements, asumsi, batasan, dan open questions.
3. Perencanaan Desain
Saya menggunakan AI untuk memberi saran tentang struktur aplikasi, user flow, pembagian komponen, data model, aturan status, aturan sorting, dan trade-off. Ini membantu saya memiliki rencana yang lebih jelas sebelum mulai implementasi.
4. Bantuan Implementasi
Saya menggunakan AI untuk membantu merancang dan memperbaiki struktur HTML, CSS, dan JavaScript. AI menyarankan penggunaan state sederhana, fungsi render, localStorage, helper sorting, dan helper statistik agar aplikasi tetap mudah dikelola walaupun tidak menggunakan framework.
5. Testing dan Dokumentasi
Saya menggunakan AI untuk membantu menentukan bagian logic yang perlu diuji, terutama date handling, status terlambat, sorting, dan statistik progres. Saya juga menggunakan AI untuk membantu menulis dokumentasi seperti README dan file refleksi ini.
Keputusan Saya Sendiri vs Saran AI
Keputusan yang Saya Buat Sendiri
Aplikasi ditujukan untuk mahasiswa.
Aplikasi fokus pada tugas dan assignment akademik.
Setiap tugas idealnya memiliki judul, mata kuliah, deadline, prioritas, status, catatan, lampiran atau referensi, dan estimasi waktu.
MVP harus tetap sederhana dan berjalan langsung di browser.
Project tidak menggunakan login, fitur kolaborasi, fitur dosen, atau backend yang kompleks.
Aplikasi harus mudah digunakan oleh mahasiswa yang hanya membutuhkan task tracker cepat.
Saran dari AI
Menggunakan status seperti Belum mulai, Dikerjakan, Selesai, dan status otomatis Terlambat.
Menggunakan level prioritas seperti Rendah, Sedang, dan Tinggi.
Membuat versi pertama sebagai MVP dengan fitur tambah, edit, hapus tugas, filter, dashboard ringkasan, dan pelacakan deadline.
Menggunakan localStorage untuk penyimpanan sederhana.
Menambahkan dashboard metrics, daftar fokus, kalender mini, dan timeline agar aplikasi lebih berguna.
Menyimpan fitur reminder, login, export, dan kolaborasi sebagai pengembangan berikutnya, bukan bagian dari versi pertama.
Apa yang Saya Pelajari
Saya belajar bahwa menentukan scope adalah salah satu bagian paling penting dalam membuat aplikasi web kecil. Aplikasi task tracker bisa cepat menjadi terlalu besar jika fitur seperti reminder, upload file, login akun, kolaborasi, dan cloud sync ditambahkan terlalu awal.
Saya juga belajar bahwa logic tanggal perlu ditangani dengan hati-hati. Fitur seperti status terlambat, filter minggu ini, dan sorting deadline bisa menghasilkan bug jika tanggal tidak dinormalisasi secara konsisten.
Hal penting lain yang saya pelajari adalah dokumentasi membantu mengarahkan implementasi. Dengan menulis requirements, design notes, testing notes, dan refleksi, project menjadi lebih mudah dipahami dan dikembangkan.
Saya juga belajar bahwa helper function kecil sangat berguna dalam JavaScript biasa. Fungsi untuk sorting, format tanggal, statistik, rendering, dan storage membuat kode lebih mudah dikelola meskipun tanpa framework.
Apa yang Akan Saya Lakukan Berbeda
Jika mengerjakan project ini lagi, saya akan menentukan nama file sejak awal agar file HTML utama memiliki nama yang lebih jelas seperti index.html, bukan index6.html.
Saya juga akan memisahkan JavaScript menjadi beberapa file kecil jika project berkembang lebih besar. Misalnya, logic storage, helper tanggal, fungsi render, dan logic task bisa dipisahkan ke file masing-masing.
Saya akan menambahkan field lampiran dan estimasi waktu lebih awal jika field tersebut wajib ada di produk akhir, karena field itu memengaruhi data model, layout form, dan desain task card.
Saya juga akan merencanakan testing mobile lebih awal. Karena mahasiswa mungkin memakai aplikasi di laptop dan handphone, layout responsive sebaiknya dicek sepanjang proses pengembangan, bukan hanya di bagian akhir.
Tantangan yang Dihadapi
Menjaga MVP tetap kecil tetapi tetap berguna.
Merancang aturan status agar tugas terlambat tampil dengan benar tanpa mengubah tugas yang sudah selesai.
Menangani perbandingan tanggal secara konsisten di JavaScript.
Membuat dashboard menampilkan informasi penting tanpa terlihat terlalu penuh.
Menjaga UI tetap mudah dibaca dan responsive.
Menggunakan localStorage sambil memahami bahwa data hanya tersimpan di satu browser.
Menyeimbangkan saran AI dengan tujuan project dan batasan tugas.
Refleksi Akhir
Secara keseluruhan, AI paling membantu sebagai partner untuk perencanaan, penyusunan ide, dan review. AI membantu saya memecah project menjadi bagian kecil, memikirkan edge case, dan menulis dokumentasi dengan lebih jelas. Namun, saya tetap perlu menentukan scope utama, memilih fitur yang paling penting, dan memastikan aplikasi akhir sesuai dengan kebutuhan mahasiswa.
