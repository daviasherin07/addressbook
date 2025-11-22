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
    A["Mulai"] --> B["Aplikasi Dibuka"]

    B --> C["Tampilkan Daftar Kontak"]
    C --> D["Pengguna Bisa Mencari Kontak"]

    D --> E{"Aksi Pengguna?"}

    %% Tambah Kontak
    E --> F["Tambah Kontak Baru"]
    F --> G["Isi Form Kontak"]
    G --> H{"Simpan Kontak?"}
    H -->|Ya| C
    H -->|Batal| C

    %% Edit Kontak
    E --> I["Edit Kontak"]
    I --> J["Form Terisi Data Lama"]
    J --> K{"Simpan Perubahan?"}
    K -->|Ya| C
    K -->|Batal| C

    %% Hapus Kontak
    E --> L["Hapus Kontak"]
    L --> M{"Konfirmasi Hapus?"}
    M -->|Ya| C
    M -->|Tidak| C

    %% Selesai
    E --> N["Selesai"]
```
