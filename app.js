// Function to display response on the page
function showResponse(elementId, data) {
    const responseElement = document.getElementById(elementId);
    const responseDiv = responseElement;

    responseDiv.innerHTML = `
        <h4>Response:</h4>
        <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
    `;
    responseDiv.classList.add('show');
}

// Function to test endpoint
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
                    message: 'Endpoint not found'
                };
                showResponse(endpoint + '-response', result);
        }
    } catch (error) {
        console.error('Error testing endpoint:', error);
        const result = {
            status: 'error',
            data: null,
            message: 'An error occurred while accessing the API'
        };
        showResponse(endpoint + '-response', result);
    }
}

// Function for search
async function searchEndpoint() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (!query) {
        alert('Please enter a keyword for search');
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
            message: 'An error occurred while performing the search'
        };
        showResponse('search-response', result);
    }
}

// Function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// Function to display statistics
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

        console.log('Timor-Leste Regional Statistics:', stats);
        return stats;
    } catch (error) {
        console.error('Error getting statistics:', error);
        return null;
    }
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Timor-Leste Regional API is ready to use!');

    // Display statistics in console
    const stats = await showStatistics();
    if (stats) {
        console.log(`📊 Total: ${stats.districts} districts/municipalities, ${stats.subdistricts} subdistricts, ${stats.villages} villages/sucos`);
        console.log(`👥 Total population: ${formatNumber(stats.totalPopulation)} people`);
    }

    // Add event listener for Enter key in search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchEndpoint();
            }
        });
    }
});

// Export functions for use in browser console
window.testEndpoint = testEndpoint;
window.searchEndpoint = searchEndpoint;
window.showStatistics = showStatistics;
