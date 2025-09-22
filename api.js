// API endpoints untuk data wilayah Timor-Leste
const API = {
    // Base URL untuk API
    baseURL: window.location.origin,

    // Mendapatkan semua data kabupaten/kota
    async getDistricts() {
        try {
            const response = await fetch('./data/districts.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching districts:', error);
            return {
                status: 'error',
                data: [],
                message: 'Gagal mengambil data kabupaten/kota'
            };
        }
    },

    // Mendapatkan detail kabupaten/kota berdasarkan ID
    async getDistrictById(id) {
        try {
            const response = await fetch('./data/districts.json');
            const data = await response.json();
            const district = data.data.find(d => d.id == id);

            if (district) {
                return {
                    status: 'success',
                    data: district,
                    message: 'Data kabupaten/kota berhasil diambil'
                };
            } else {
                return {
                    status: 'error',
                    data: null,
                    message: 'Kabupaten/kota tidak ditemukan'
                };
            }
        } catch (error) {
            console.error('Error fetching district by ID:', error);
            return {
                status: 'error',
                data: null,
                message: 'Gagal mengambil data kabupaten/kota'
            };
        }
    },

    // Mendapatkan semua data kecamatan
    async getSubdistricts() {
        try {
            const response = await fetch('./data/subdistricts.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching subdistricts:', error);
            return {
                status: 'error',
                data: [],
                message: 'Gagal mengambil data kecamatan'
            };
        }
    },

    // Mendapatkan semua data desa/kelurahan
    async getVillages() {
        try {
            const response = await fetch('./data/villages.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching villages:', error);
            return {
                status: 'error',
                data: [],
                message: 'Gagal mengambil data desa/kelurahan'
            };
        }
    },

    // Mencari data wilayah berdasarkan query
    async search(query) {
        try {
            const [districtsResponse, subdistrictsResponse, villagesResponse] = await Promise.all([
                fetch('./data/districts.json'),
                fetch('./data/subdistricts.json'),
                fetch('./data/villages.json')
            ]);

            const [districtsData, subdistrictsData, villagesData] = await Promise.all([
                districtsResponse.json(),
                subdistrictsResponse.json(),
                villagesResponse.json()
            ]);

            const results = [];

            // Cari di districts
            districtsData.data.forEach(district => {
                if (district.name.toLowerCase().includes(query.toLowerCase()) ||
                    district.capital.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'district',
                        ...district
                    });
                }
            });

            // Cari di subdistricts
            subdistrictsData.data.forEach(subdistrict => {
                if (subdistrict.name.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'subdistrict',
                        ...subdistrict
                    });
                }
            });

            // Cari di villages
            villagesData.data.forEach(village => {
                if (village.name.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'village',
                        ...village
                    });
                }
            });

            return {
                status: 'success',
                data: results,
                message: `Ditemukan ${results.length} hasil pencarian`
            };
        } catch (error) {
            console.error('Error searching:', error);
            return {
                status: 'error',
                data: [],
                message: 'Gagal melakukan pencarian'
            };
        }
    }
};

// Export API untuk digunakan di file lain
window.API = API;
