export const ApiService = {
    /**
     * Generic GET request wrapper with centralized error handling
     * @param {string} url - The endpoint to fetch data from
     * @returns {Promise<any>} - The parsed JSON response data or null if it fails 
     */
    async get(url) {
        try {
            const response = await fetch(url);

            // This is a centralized check for HTTP status errors (404, 500, etc.)
            if (!response.ok) {
                throw new Error(`Network response error: ${response.status} ${response.statusText}`);
            }

            // Parse and return the data
            return await response.json();
        } catch (error) {
            // This is our centralized loggin engine
            console.error(`[ApiService Failure] Fetch failed for URL: ${url}`, error);
            return null;
        }
    }
};