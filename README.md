# 🇹🇱 Timor-Leste Regional API

A static API that provides regional data for Timor-Leste, including districts/cities, sub-districts, and villages/wards.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [How to Run](#-how-to-run)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [Data Structures](#-data-structures)
- [Contributions](#-contributions)
- [License](#-license)

## ✨ Features

- ✅ Complete district/city data for Timor-Leste
- ✅ Sub-district data from all regions
- ✅ Village/sub-district data with population information
- ✅ Regional data search
- ✅ Web interface for API testing
- ✅ CORS enabled for cross-origin requests
- ✅ Responses in JSON format

## 🚀 Installation

### Prerequisites

- Python 3.6+ or Node.js 14+
- Modern web browser

### Clone Repository

```bash
git clone https://github.com/GlaimataCode/API-Wilayah-Timor-Leste.git
cd timor-leste-region-api
```

### File Structure

```
timor-leste-region-api/
├── index.html # Homepage & API documentation
├── styles.css # Styling for the web interface
├── api.js # JavaScript API client
├── app.js # JavaScript frontend application
├── server.py # Python HTTP server
├── package.json # Node.js configuration
├── data/ # JSON data folder
│ ├── districts.json # Regency/City data
│ ├── subdistricts.json # Subdistrict data
│ └── villages.json # Village/Kelurahan data
└── README.md # This documentation
```

## 🏃 How to Run

### Option 1: Python Server (Recommended)

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

1. Open a browser and access: <http://localhost:8000>
2. Use the "Test Endpoint" button to test each endpoint.
3. Use the search feature to find region data.
4. View the response at the bottom of each endpoint.

## 🛠️ Development

### Adding New Data

1. Edit the JSON file in the `data/` folder
2. Ensure the JSON format is valid
3. Restart the server to see the changes

### Adding a New Endpoint

1. Edit the `server.py` file (Python) or create a new server
2. Add logic for the new endpoint
3. Update the documentation in `index.html`

## 🤝 Contributions

Contributions are very welcome! Please:

1. Fork the repository
2. Create a branch for the new feature (`git checkout -b new-feature`)
3. Commit the changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

📄 License Details:
License Type: MIT License
Copyright: Timor-Leste Regional API (2025)
File Location: LICENSE in the project root directory
📋 License Contents:
The LICENSE file contains the full text of the MIT License, which includes:

✅Rights to use, copy, modify, and distribute
✅ Permission for commercial use
✅ Disclaimer of liability
✅ Requirement to include a copyright notice
🔗 The MIT License allows:
Free use for personal and commercial purposes
Unrestricted code modification
Distribution in original or modified form
Integration into other projects
Open source and commercial
With this MIT license, the Timor-Leste Region API project can be widely used by developers and organizations around the world for the development of applications that require Timor-Leste region data.

The license file is now available and ready to use!🎉


## 📞 Kontak : 

For questions or suggestions, please create an issue in this repository.
Link Repository: https://github.com/GlaimataCode/API-Wilayah-Timor-Leste

---

**Halo ho ❤️ Ba Timor-Leste**
