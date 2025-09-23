// API endpoints for Timor-Leste regional data
const API = {
    // Base URL for API
    baseURL: window.location.origin,

    // Get all district/municipality data
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
                message: 'Failed to fetch district/municipality data'
            };
        }
    },

    // Get district/municipality details by ID
    async getDistrictById(id) {
        try {
            const response = await fetch('./data/districts.json');
            const data = await response.json();
            const district = data.data.find(d => d.id == id);

            if (district) {
                return {
                    status: 'success',
                    data: district,
                    message: 'District/municipality data retrieved successfully'
                };
            } else {
                return {
                    status: 'error',
                    data: null,
                    message: 'District/municipality not found'
                };
            }
        } catch (error) {
            console.error('Error fetching district by ID:', error);
            return {
                status: 'error',
                data: null,
                message: 'Failed to fetch district/municipality data'
            };
        }
    },

    // Get all subdistrict data
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
                message: 'Failed to fetch subdistrict data'
            };
        }
    },

    // Get all village/suco data
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
                message: 'Failed to fetch village/suco data'
            };
        }
    },

    // Search regional data by query
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

            // Search in districts
            districtsData.data.forEach(district => {
                if (district.name.toLowerCase().includes(query.toLowerCase()) ||
                    district.capital.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'district',
                        ...district
                    });
                }
            });

            // Search in subdistricts
            subdistrictsData.data.forEach(subdistrict => {
                if (subdistrict.name.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'subdistrict',
                        ...subdistrict
                    });
                }
            });

            // Search in villages
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
                message: `Found ${results.length} search results`
            };
        } catch (error) {
            console.error('Error searching:', error);
            return {
                status: 'error',
                data: [],
                message: 'Failed to perform search'
            };
        }
    }
};

// Export API for use in other files
window.API = API;
