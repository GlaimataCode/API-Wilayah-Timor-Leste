# 🇹🇱 API Wilayah Timor-Leste

API statis yang menyediakan data wilayah Timor-Leste meliputi kabupaten/kota, kecamatan, dan desa/kelurahan.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [API Endpoints](#-api-endpoints)
- [Contoh Penggunaan](#-contoh-penggunaan)
- [Struktur Data](#-struktur-data)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur

- ✅ Data kabupaten/kota lengkap Timor-Leste
- ✅ Data kecamatan dari semua wilayah
- ✅ Data desa/kelurahan dengan informasi populasi
- ✅ Pencarian data wilayah
- ✅ Interface web untuk testing API
- ✅ CORS enabled untuk cross-origin requests
- ✅ Response dalam format JSON

## 🚀 Instalasi

### Prasyarat

- Python 3.6+ atau Node.js 14+
- Web browser modern

### Clone Repository

```bash
git clone https://github.com/GlaimataCode/API-Wilayah-Timor-Leste.git
cd timor-leste-region-api
```

### Struktur File

```
timor-leste-region-api/
├── index.html          # Halaman utama & dokumentasi API
├── styles.css          # Styling untuk interface web
├── api.js             # JavaScript API client
├── app.js             # JavaScript aplikasi frontend
├── server.py          # Python HTTP server
├── package.json       # Node.js configuration
├── data/              # Folder data JSON
│   ├── districts.json    # Data kabupaten/kota
│   ├── subdistricts.json # Data kecamatan
│   └── villages.json     # Data desa/kelurahan
└── README.md          # Dokumentasi ini
```

## 🏃 Cara Menjalankan

### Opsi 1: Python Server (Direkomendasikan)

```bash
python server.py
```

Server akan berjalan di: http://localhost:8000

### Opsi 2: Node.js Server

```bash
npm install
npm start
```

### Opsi 3: Simple HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server -p 8000
```

## 📡 API Endpoints

### Base URL
```
http://localhost:8000/api/
```

### Endpoints Tersedia

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/districts` | Mendapatkan semua kabupaten/kota |
| GET | `/api/districts/{id}` | Mendapatkan detail kabupaten berdasarkan ID |
| GET | `/api/subdistricts` | Mendapatkan semua kecamatan |
| GET | `/api/villages` | Mendapatkan semua desa/kelurahan |
| GET | `/api/search?q={query}` | Mencari data wilayah |

### Contoh Request

```bash
# Mendapatkan semua districts
curl http://localhost:8000/api/districts

# Mendapatkan district berdasarkan ID
curl http://localhost:8000/api/districts/1

# Pencarian
curl "http://localhost:8000/api/search?q=dili"
```

## 💡 Contoh Penggunaan

### JavaScript (Browser)
```javascript
// Menggunakan API di browser
const response = await fetch('/api/districts');
const data = await response.json();
console.log(data);
```

### JavaScript (Node.js)
```javascript
const fetch = require('node-fetch');

async function getDistricts() {
  const response = await fetch('http://localhost:8000/api/districts');
  const data = await response.json();
  return data;
}
```

### Python
```python
import requests

def get_districts():
    response = requests.get('http://localhost:8000/api/districts')
    return response.json()
```

## 📊 Struktur Data

### District/Kabupaten
```json
{
  "id": 1,
  "name": "Dili",
  "type": "Município",
  "capital": "Dili",
  "area_km2": 368,
  "population": 277279,
  "description": "Ibu kota Timor-Leste"
}
```

### Subdistrict/Kecamatan
```json
{
  "id": 1,
  "name": "Cristo Rei",
  "district_id": 1,
  "district_name": "Dili",
  "type": "Administrativo",
  "capital": "Cristo Rei"
}
```

### Village/Desa
```json
{
  "id": 1,
  "name": "Bairro Pite",
  "subdistrict_id": 1,
  "subdistrict_name": "Cristo Rei",
  "district_id": 1,
  "district_name": "Dili",
  "type": "Suco",
  "population": 2500
}
```

## 🔍 Testing API

1. Buka browser dan akses: http://localhost:8000
2. Gunakan tombol "Test Endpoint" untuk mencoba setiap endpoint
3. Gunakan fitur pencarian untuk mencari data wilayah
4. Lihat response di bagian bawah setiap endpoint

## 🛠️ Pengembangan

### Menambah Data Baru

1. Edit file JSON di folder `data/`
2. Pastikan format JSON valid
3. Restart server untuk melihat perubahan

### Menambah Endpoint Baru

1. Edit file `server.py` (Python) atau buat server baru
2. Tambahkan logic untuk endpoint baru
3. Update dokumentasi di `index.html`

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch untuk fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Tambah fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📝 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

📄 Detail License:
Jenis Lisensi: MIT License
Copyright: API Wilayah Timor-Leste (2025)
Lokasi File: LICENSE di root directory project
📋 Isi License:
File LICENSE berisi teks lengkap MIT License yang mencakup:

✅ Hak untuk menggunakan, mengkopi, memodifikasi, dan mendistribusikan
✅ Izin untuk penggunaan komersial
✅ Disclaimer tanggung jawab
✅ Persyaratan untuk menyertakan copyright notice
🔗 MIT License memungkinkan:
Penggunaan bebas untuk tujuan pribadi maupun komersial
Modifikasi kode tanpa batasan
Distribusi dalam bentuk asli maupun termodifikasi
Integrasi ke dalam project lain
Open source dan komersial
Dengan lisensi MIT ini, project API Wilayah Timor-Leste dapat digunakan secara luas oleh developer dan organisasi di seluruh dunia untuk pengembangan aplikasi yang membutuhkan data wilayah Timor-Leste.

License file sekarang sudah tersedia dan siap digunakan! 🎉


## 📞 Kontak

Untuk pertanyaan atau saran, silakan buat issue di repository ini.
Link Repository: https://github.com/GlaimataCode/API-Wilayah-Timor-Leste

---

**Halo ho ❤️ BA Timor Timor-Leste**
