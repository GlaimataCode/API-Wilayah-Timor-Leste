#!/usr/bin/env node
/**
 * Simple HTTP server untuk API Wilayah Timor-Leste (Node.js)
 * Untuk menjalankan: node server.js atau npm start
 * Akses di browser: http://localhost:8000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoints
  if (pathname.startsWith('/api/')) {
    handleAPIRequest(pathname, parsedUrl.query, res);
  } else {
    // Serve static files
    serveStaticFile(pathname, res);
  }
});

function handleAPIRequest(pathname, query, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  try {
    if (pathname === '/api/districts') {
      serveJSONFile('data/districts.json', res);
    }
    else if (pathname.startsWith('/api/districts/')) {
      const districtId = pathname.split('/').pop();
      serveDistrictById(districtId, res);
    }
    else if (pathname === '/api/subdistricts') {
      serveJSONFile('data/subdistricts.json', res);
    }
    else if (pathname === '/api/villages') {
      serveJSONFile('data/villages.json', res);
    }
    else if (pathname.startsWith('/api/search')) {
      handleSearch(query.q, res);
    }
    else {
      res.writeHead(404);
      res.end(JSON.stringify({
        status: 'error',
        data: null,
        message: 'Endpoint tidak ditemukan'
      }, null, 2));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({
      status: 'error',
      data: null,
      message: `Terjadi kesalahan: ${error.message}`
    }, null, 2));
  }
}

function serveJSONFile(filename, res) {
  const filePath = path.join(__dirname, filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({
        status: 'error',
        data: null,
        message: 'Gagal membaca file data'
      }, null, 2));
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}

function serveDistrictById(districtId, res) {
  const filePath = path.join(__dirname, 'data/districts.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(JSON.stringify({
        status: 'error',
        data: null,
        message: 'Gagal membaca file data'
      }, null, 2));
    } else {
      const jsonData = JSON.parse(data);
      const district = jsonData.data.find(d => d.id == districtId);

      if (district) {
        res.writeHead(200);
        res.end(JSON.stringify({
          status: 'success',
          data: district,
          message: 'Data kabupaten/kota berhasil diambil'
        }, null, 2));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({
          status: 'error',
          data: null,
          message: 'Kabupaten/kota tidak ditemukan'
        }, null, 2));
      }
    }
  });
}

function handleSearch(searchQuery, res) {
  if (!searchQuery) {
    res.writeHead(400);
    res.end(JSON.stringify({
      status: 'error',
      data: [],
      message: 'Parameter q diperlukan untuk pencarian'
    }, null, 2));
    return;
  }

  const searchTerm = searchQuery.toLowerCase();
  const results = [];

  // Search in all data files
  const dataFiles = [
    { file: 'data/districts.json', type: 'district' },
    { file: 'data/subdistricts.json', type: 'subdistrict' },
    { file: 'data/villages.json', type: 'village' }
  ];

  let filesProcessed = 0;

  dataFiles.forEach(({ file, type }) => {
    const filePath = path.join(__dirname, file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (!err) {
        const jsonData = JSON.parse(data);

        jsonData.data.forEach(item => {
          if (item.name.toLowerCase().includes(searchTerm)) {
            results.push({
              type: type,
              ...item
            });
          }
        });
      }

      filesProcessed++;

      // Send response when all files are processed
      if (filesProcessed === dataFiles.length) {
        res.writeHead(200);
        res.end(JSON.stringify({
          status: 'success',
          data: results,
          message: `Ditemukan ${results.length} hasil pencarian`
        }, null, 2));
      }
    });
  });
}

function serveStaticFile(pathname, res) {
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.setHeader('Content-Type', mimeType);
      res.writeHead(200);
      res.end(data);
    }
  });
}

// Start server
server.listen(PORT, () => {
  console.log('🚀 Memulai server API Wilayah Timor-Leste (Node.js)...');
  console.log(`📍 Server berjalan di: http://localhost:${PORT}`);
  console.log(`📚 Dokumentasi API: http://localhost:${PORT}`);
  console.log('🔄 Tekan Ctrl+C untuk menghentikan server');
  console.log('');
  console.log('✅ Server berhasil dimulai!');
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Server dihentikan oleh pengguna');
  server.close(() => {
    console.log('👋 Terima kasih telah menggunakan API Wilayah Timor-Leste!');
    process.exit(0);
  });
});
