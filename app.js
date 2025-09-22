// Fungsi untuk menampilkan response di halaman
function showResponse(elementId, data) {
    const responseElement = document.getElementById(elementId);
    const responseDiv = responseElement;

    responseDiv.innerHTML = `
        <h4>Response:</h4>
        <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
    `;
    responseDiv.classList.add('show');
}

// Fungsi untuk test endpoint
async function testEndpoint(endpoint) {
    try {
        let result;

        switch(endpoint) {
            case 'districts':
                result = await API.getDistricts();
                showResponse('districts-response', result);
                break;

            case 'districts/1':
                result = await API.getDistrictById(1);
                showResponse('districts-1-response', result);
                break;

            case 'subdistricts':
                result = await API.getSubdistricts();
                showResponse('subdistricts-response', result);
                break;

            case 'villages':
                result = await API.getVillages();
                showResponse('villages-response', result);
                break;

            default:
                result = {
                    status: 'error',
                    data: null,
                    message: 'Endpoint tidak ditemukan'
                };
                showResponse(endpoint + '-response', result);
        }
    } catch (error) {
        console.error('Error testing endpoint:', error);
        const result = {
            status: 'error',
            data: null,
            message: 'Terjadi kesalahan saat mengakses API'
        };
        showResponse(endpoint + '-response', result);
    }
}

// Fungsi untuk search
async function searchEndpoint() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Masukkan kata kunci untuk pencarian');
        return;
    }

    try {
        const result = await API.search(query);
        showResponse('search-response', result);
    } catch (error) {
        console.error('Error searching:', error);
        const result = {
            status: 'error',
            data: [],
            message: 'Terjadi kesalahan saat melakukan pencarian'
        };
        showResponse('search-response', result);
    }
}

// Fungsi untuk format angka
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Fungsi untuk menampilkan statistik
async function showStatistics() {
    try {
        const [districtsResult, subdistrictsResult, villagesResult] = await Promise.all([
            API.getDistricts(),
            API.getSubdistricts(),
            API.getVillages()
        ]);

        const stats = {
            districts: districtsResult.data.length,
            subdistricts: subdistrictsResult.data.length,
            villages: villagesResult.data.length,
            totalPopulation: villagesResult.data.reduce((sum, village) => sum + (village.population || 0), 0)
        };

        console.log('Statistik Wilayah Timor-Leste:', stats);
        return stats;
    } catch (error) {
        console.error('Error getting statistics:', error);
        return null;
    }
}

// Event listener untuk halaman dimuat
document.addEventListener('DOMContentLoaded', async function() {
    console.log('API Wilayah Timor-Leste siap digunakan!');

    // Tampilkan statistik di console
    const stats = await showStatistics();
    if (stats) {
        console.log(`📊 Total: ${stats.districts} kabupaten/kota, ${stats.subdistricts} kecamatan, ${stats.villages} desa/kelurahan`);
        console.log(`👥 Total populasi: ${formatNumber(stats.totalPopulation)} jiwa`);
    }

    // Tambahkan event listener untuk Enter key di search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEndpoint();
            }
        });
    }
});

// Export fungsi untuk digunakan di console browser
window.testEndpoint = testEndpoint;
window.searchEndpoint = searchEndpoint;
window.showStatistics = showStatistics;
