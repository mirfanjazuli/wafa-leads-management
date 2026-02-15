# Wafa Lead Management System

Aplikasi ini merupakan sistem penampungan dan pengelolaan data calon pelanggan (Leads) berbasis web yang dibangun menggunakan **Laravel 12**, **Inertia.js**, dan **React**. Sistem dirancang agar aman, responsif (mobile-friendly), dan mudah digunakan oleh admin.

## Security Features (Checklist)

Fitur keamanan yang telah diimplementasikan:

- **Authentication & Session:** Menggunakan Laravel Fortify untuk manajemen sesi yang aman.
- **CSRF Protection:** Semua request (POST/PUT/DELETE) dilindungi dari serangan Cross-Site Request Forgery.
- **Data Encapsulation (API Resources):** Menggunakan `LeadResource` dan `ActivityLogResource` untuk memastikan hanya data publik yang terkirim ke frontend. Data sensitif tetap di server.
- **Route Protection:** Implementasi middleware `auth` pada route dashboard dan leads.
- **Secure Delete:** Dialog konfirmasi hapus menggunakan pola Wayfinder Route dengan method `DELETE`.
- **Sanitized Inputs:** Validasi data ketat menggunakan Laravel Request Validation.

## Screenshots & Demo

- **Landing Page**
  <img width="2560" height="1440" alt="Screenshot 2026-02-15 at 20 20 23" src="https://github.com/user-attachments/assets/6dc22a46-c701-4fed-8d08-dcf2123a2add" />

- **Login**
  <img width="2560" height="1440" alt="Screenshot 2026-02-15 at 20 20 30" src="https://github.com/user-attachments/assets/250f0979-5310-413f-ba84-07541b593ddb" />

- **Dashboard**
  <img width="2560" height="1440" alt="Screenshot 2026-02-15 at 20 20 45" src="https://github.com/user-attachments/assets/3ced45db-1aba-41e0-8c79-31150423ec2a" />

- **Leads**
  <img width="2560" height="1440" alt="Screenshot 2026-02-15 at 20 20 54" src="https://github.com/user-attachments/assets/18d8d034-db13-4a8b-820e-ac6be7c52cd3" />

- **Activity Logs**
  <img width="2560" height="1440" alt="Screenshot 2026-02-15 at 20 21 01" src="https://github.com/user-attachments/assets/c28b884b-65ee-4cda-962b-b644e6d2a157" />

### Mobile View

<img width="392" height="846" alt="Screenshot 2026-02-15 at 20 56 34" src="https://github.com/user-attachments/assets/eb6c2a9c-49cf-43dc-8a12-59e6e4d17415" />
<img width="393" height="844" alt="Screenshot 2026-02-15 at 20 56 44" src="https://github.com/user-attachments/assets/e6d7d1f3-6f49-4f49-b583-de70a442a421" />
<img width="391" height="850" alt="Screenshot 2026-02-15 at 20 55 02" src="https://github.com/user-attachments/assets/277829db-1865-43a4-a465-3372b1bbdc7c" />
<img width="393" height="845" alt="Screenshot 2026-02-15 at 20 55 16" src="https://github.com/user-attachments/assets/804a6d9f-79e3-48b5-a347-990e74561023" />
<img width="391" height="847" alt="Screenshot 2026-02-15 at 20 56 06" src="https://github.com/user-attachments/assets/d22a5510-81ca-47ea-99fd-bbda0aee84b9" />
<img width="394" height="845" alt="Screenshot 2026-02-15 at 20 56 20" src="https://github.com/user-attachments/assets/88e4b88e-6ea2-4467-b596-bb654f7fd0e4" />

### Video Demo

[Tonton Video Demo](https://youtu.be/Vtk0HldHDbM)

## Installation

1. Clone repository ini.
2. Jalankan `composer install` & `npm install`.
3. Copy `.env.example` ke `.env` dan pastikan database yang digunakan adalah sqlite.
4. Jalankan `php artisan migrate --seed`.
5. Jalankan `php artisan serve` dan `npm run dev`.

## Email dan Password Admin
Email: admin@gmail.com
Password: admin123
