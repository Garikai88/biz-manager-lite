// js/services/trelloServices.js
import { ApiService } from './apiService.js';

export const TrelloService = {
    /**
     * Fetches open cards from a public Trello board using its unique short-ID
     * @param {string} boardId - The public token ID of the Trello board
     */
    async getBoardCards(boardId) {
        if (!boardId) return [];

        // Corrected parameter typos and removed spaces for strict URL parsing
        const url = `https://api.trello.com/1/boards/${boardId}/cards?fields=name,desc,due,labels`;

        // Pass the URL to our centralized API client and return its promise directly
        return await ApiService.get(url);
    }
};