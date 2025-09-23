#!/usr/bin/env node
/**
 * Simple HTTP server for Timor-Leste Regional API (Node.js)
 * To run: node server.js or npm start
 * Access in browser: http://localhost:8000
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
        message: 'Endpoint not found'
      }, null, 2));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({
      status: 'error',
      data: null,
      message: `An error occurred: ${error.message}`
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
        message: 'Failed to read data file'
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
        message: 'Failed to read data file'
      }, null, 2));
    } else {
      const jsonData = JSON.parse(data);
      const district = jsonData.data.find(d => d.id == districtId);

      if (district) {
        res.writeHead(200);
        res.end(JSON.stringify({
          status: 'success',
          data: district,
          message: 'District/municipality data retrieved successfully'
        }, null, 2));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({
          status: 'error',
          data: null,
          message: 'District/municipality not found'
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
      message: 'Parameter q is required for search'
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
          message: `Found ${results.length} search results`
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
  console.log('🚀 Starting Timor-Leste Regional API server (Node.js)...');
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log(`📚 API documentation: http://localhost:${PORT}`);
  console.log('🔄 Press Ctrl+C to stop the server');
  console.log('');
  console.log('✅ Server successfully started!');
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Server stopped by user');
  server.close(() => {
    console.log('👋 Thank you for using Timor-Leste Regional API!');
    process.exit(0);
  });
});
