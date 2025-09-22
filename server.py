#!/usr/bin/env python3
"""
Simple HTTP server untuk API Wilayah Timor-Leste
Untuk menjalankan: python server.py
Akses di browser: http://localhost:8000
"""

import http.server
import socketserver
import os
import json
from urllib.parse import urlparse, parse_qs

PORT = 8000

class TimorLesteAPIHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory='.', **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query = parse_qs(parsed_url.query)

        # API endpoints
        if path.startswith('/api/'):
            self.handle_api_request(path, query)
        else:
            # Serve static files
            super().do_GET()

    def handle_api_request(self, path, query):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        try:
            if path == '/api/districts':
                with open('data/districts.json', 'r', encoding='utf-8') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))

            elif path.startswith('/api/districts/'):
                district_id = path.split('/')[-1]
                with open('data/districts.json', 'r', encoding='utf-8') as f:
                    data = json.load(f)
                district = next((d for d in data['data'] if str(d['id']) == district_id), None)

                if district:
                    response = {
                        "status": "success",
                        "data": district,
                        "message": "Data kabupaten/kota berhasil diambil"
                    }
                else:
                    response = {
                        "status": "error",
                        "data": None,
                        "message": "Kabupaten/kota tidak ditemukan"
                    }
                self.wfile.write(json.dumps(response, ensure_ascii=False, indent=2).encode('utf-8'))

            elif path == '/api/subdistricts':
                with open('data/subdistricts.json', 'r', encoding='utf-8') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))

            elif path == '/api/villages':
                with open('data/villages.json', 'r', encoding='utf-8') as f:
                    data = json.load(f)
                self.wfile.write(json.dumps(data, ensure_ascii=False, indent=2).encode('utf-8'))

            elif path.startswith('/api/search'):
                search_query = query.get('q', [''])[0].lower()
                results = []

                # Search in all data files
                for data_file in ['data/districts.json', 'data/subdistricts.json', 'data/villages.json']:
                    with open(data_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        data_type = data_file.split('/')[-1].replace('.json', '').replace('s', '')

                        for item in data['data']:
                            if search_query in item['name'].lower():
                                results.append({
                                    'type': data_type,
                                    **item
                                })

                response = {
                    "status": "success",
                    "data": results,
                    "message": f"Ditemukan {len(results)} hasil pencarian"
                }
                self.wfile.write(json.dumps(response, ensure_ascii=False, indent=2).encode('utf-8'))

            else:
                response = {
                    "status": "error",
                    "data": None,
                    "message": "Endpoint tidak ditemukan"
                }
                self.wfile.write(json.dumps(response, ensure_ascii=False, indent=2).encode('utf-8'))

        except Exception as e:
            error_response = {
                "status": "error",
                "data": None,
                "message": f"Terjadi kesalahan: {str(e)}"
            }
            self.wfile.write(json.dumps(error_response, ensure_ascii=False, indent=2).encode('utf-8'))

def main():
    print("🚀 Memulai server API Wilayah Timor-Leste...")
    print(f"📍 Server berjalan di: http://localhost:{PORT}")
    print(f"📚 Dokumentasi API: http://localhost:{PORT}")
    print("🔄 Tekan Ctrl+C untuk menghentikan server")

    try:
        with socketserver.TCPServer(("", PORT), TimorLesteAPIHandler) as httpd:
            print(f"\n✅ Server berhasil dimulai di port {PORT}")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 Server dihentikan oleh pengguna")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} sudah digunakan. Coba port lain.")
        else:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()
