// js/storage.js

export class StorageEngine {
    /**
     * Save data securely to the browser's LocalStorage API
     * @param {string} key - The data vault identifier bucket
     * @param {any} data - The array or object collection to serialize
     */
    static saveData(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error(`[Storage Engine Error] Failed to write key "${key}":`, error);
        }
    }

    /**
     * Retrieve data from the browser's LocalStorage API
     * @param {string} key - The data vault identifier bucket
     * @returns {any|null} Parsed collection object or null if vacant
     */
    static getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`[Storage Engine Error] Failed to read key "${key}":`, error);
            return null;
        }
    }

    /**
     * Completely clear a specific tracking database slot
     * @param {string} key - The data vault identifier bucket
     */
    static clearKey(key) {
        localStorage.removeItem(key);
    }
}