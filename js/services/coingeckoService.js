import {ApiService} from './apiService.js';

const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const CACHE_KEY = 'biz_lite_crypto_cache';
const CACHE_EXPIRY_MS = 600000; // 10 minutes cache

export const CoinGeckoService = {
    async getBitcoinPrice() {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const {price, timestamp} = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
                return price;
            }
        }

        // We will use our central ApiService instead of raw fetch
        const data = await ApiService.get(COINGECKO_URL);

        if (data && data.bitcoin.usd) {
            const livePrice = data.bitcoin.usd;
            const cachePayload = {price: livePrice, timestamp: Date.now()};
            localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
            return livePrice;
        }

        // Fallback strategy if ApiService returns null
        if (cachedData) {
            return JSON.parse(cachedData).price;
        }
        return 65000;
    }
};