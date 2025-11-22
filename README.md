# ✨Address Book
Web simpel untuk menyimpan dan mengelola daftar kontak.
Dibuat menggunakan HTML, Tailwind CSS dan JavaScript

## ⚠️Fitur

- Tambah kontak : Nama Lengkap, No. Telepon, Email, Alamat dan Kategori lalu simpan
- Daftar Kontak : Kategori/Keterangan Data, List/Card data, Mengedit dan Menghapus data.
- Tampilan dari Tailwind CSS

## 🚀Teknologi yg digunakan

- HTML
- Tailwind CSS
- JavaScript

## ⬇️ Flowchart

```mermaid
flowchart TD

A[Halaman dibuka] --> B[Ambil data kontak dari LocalStorage]
B --> C[Tampilkan kontak ke layar]

C --> D[User isi form tambah kontak]
D --> E[Klik tombol Simpan]

E --> F{Lagi edit data?}

F -- Ya --> G[Update kontak yang dipilih]
F -- Tidak --> H[Tambah kontak baru]

G --> I[Simpan ke LocalStorage]
H --> I[Simpan ke LocalStorage]

I --> J[Form dikosongkan]
J --> C

C --> K[User mengetik di kolom cari]
K --> C

C --> L[User pilih kategori filter]
L --> C

C --> M[User klik Edit]
M --> N[Isi form dengan data kontak]
N --> D

C --> O[User klik Hapus]
O --> P{Yakin mau hapus?}
P -- Ya --> Q[Hapus kontak dari data<br>dan simpan ulang]
P -- Tidak --> C
Q --> C

```
