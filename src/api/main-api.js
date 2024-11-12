// services/api.js

import { handleApiError, handleApiResponse } from "./api-handler";
import { API_CONFIG, CACHE_DURATIONS, createUrl, fetchWithCache } from "./api-utils";
import { formatPercentage } from "./utils";






// Funciones de formato
export const formatPrice = (value) => {
  const parsedValue = parseFloat(value);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: parsedValue < 1 ? 6 : 2,
    maximumFractionDigits: parsedValue < 1 ? 6 : 2,
  }).format(parsedValue);
};

export const formatMarketCap = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(value);
};



// Endpoints
export const getCoinsList = async () => {
  const cacheKey = 'coinsList';
  
  const fetchCoins = async () => {
    try {
      const params = {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: '1h,24h,7d',
        locale: 'en'
      };

      const url = createUrl('/coins/markets', params);
      const response = await fetch(url.toString(), API_CONFIG.DEFAULT_OPTIONS);
      const data = await handleApiResponse(response);

      return data.map(coin => ({
        id: coin.id,
        rank: coin.market_cap_rank,
        name: coin.name,
        image: coin.image,
        priceChangePercentage1h: formatPercentage(coin.price_change_percentage_1h_in_currency),
        priceChangePercentage24h: formatPercentage(coin.price_change_percentage_24h),
        priceChangePercentage7d: formatPercentage(coin.price_change_percentage_7d_in_currency),
        currentPrice: formatPrice(coin.current_price),
        marketcap: formatMarketCap(coin.market_cap)
      }));
    } catch (error) {
      handleApiError(error, '/coins/markets');
    }
  };

  return fetchWithCache(cacheKey, fetchCoins);
};

export const getGlobalData = async () => {
  const cacheKey = 'globalData';

  const fetchGlobalData = async () => {
    try {
      const globalUrl = createUrl('/global');
      const exchangesUrl = createUrl('/exchanges');

      const [globalResponse, exchangesResponse] = await Promise.all([
        fetch(globalUrl.toString(), API_CONFIG.DEFAULT_OPTIONS),
        fetch(exchangesUrl.toString(), API_CONFIG.DEFAULT_OPTIONS)
      ]);

      const { data } = await handleApiResponse(globalResponse);
      
      if (!exchangesResponse.ok) {
        throw new Error(`Failed to fetch exchanges data. Status: ${exchangesResponse.status}`);
      }

      const totalExchanges = exchangesResponse.headers.get("total");

      return {
        activeCrypto: data.active_cryptocurrencies.toLocaleString(),
        markets: data.markets.toLocaleString(),
        totalExchanges: totalExchanges ? parseInt(totalExchanges) : 0,
        icos: data.ongoing_icos.toLocaleString(),
      };
    } catch (error) {
      handleApiError(error, '/global');
    }
  };

  return fetchWithCache(cacheKey, fetchGlobalData);
};

export const getCoinInfo = async (coinId) => {
  const cacheKey = `coin_${coinId}`;

  const fetchCoinInfo = async () => {
    try {
      const url = createUrl(`/coins/${coinId}`, { localization: false });
      const response = await fetch(url.toString(), API_CONFIG.DEFAULT_OPTIONS);
      const data = await handleApiResponse(response);

      const maxSupply = data.market_data.max_supply !== null
        ? data.market_data.max_supply.toLocaleString("en-US")
        : "∞";

      return {
        name: data.name,
        symbol: data.symbol.toUpperCase(),
        image: data.image.large,
        rank: data.market_cap_rank,
        price: formatPrice(data.market_data.current_price.usd),
        ath: formatPrice(data.market_data.ath.usd),
        athChange: formatPercentage(data.market_data.ath_change_percentage.usd),
        price24h: formatPercentage(data.market_data.price_change_percentage_24h),
        totalSupply: data.market_data.circulating_supply.toLocaleString("en-US"),
        maxSupply,
        userWatchlist: data.watchlist_portfolio_users.toLocaleString("en-US"),
        linkHome: data.links.homepage[0] || " ",
      };
    } catch (error) {
      handleApiError(error, `/coins/${coinId}`);
    }
  };

  return fetchWithCache(cacheKey, fetchCoinInfo);
};

export const searchCoins = async (query) => {
  if (query.trim().length < 2) {
    return [];
  }

  const cacheKey = `search_${query}`;

  const fetchSearchResults = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const url = createUrl('/search', { query: encodeURIComponent(query) });
      const response = await fetch(url.toString(), API_CONFIG.DEFAULT_OPTIONS);
      const searchData = await handleApiResponse(response);

      if (!Array.isArray(searchData.coins)) {
        console.error("Unexpected response format in searchCoins");
        return [];
      }

      return searchData.coins
        .map((result) => {
          const nameMatch = result.name.toLowerCase().includes(query.toLowerCase());
          const symbolMatch = result.symbol.toLowerCase().includes(query.toLowerCase());

          return {
            ...result,
            score: (nameMatch ? query.length : 0) + (symbolMatch ? query.length : 0),
            large: result.large || null,
          };
        })
        .filter((result) => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ id, name, symbol, large }) => ({ id, name, symbol, large }));
    } catch (error) {
      handleApiError(error, '/search');
      return [];
    }
  };

  return fetchWithCache(cacheKey, fetchSearchResults);
};

// Endpoints para Graficos
export const getCoinHistoricalData = async (coinId, days = '7', vs_currency = 'usd') => {
  const cacheKey = `historical_${coinId}_${days}_${vs_currency}`;
  const cacheDuration = CACHE_DURATIONS[days] || 60000; // Default a 1 minuto
  
  return fetchWithCache(cacheKey, async () => {
    try {
      const params = {
        vs_currency: vs_currency,
        days: days
      };

      const url = createUrl(`/coins/${coinId}/market_chart`, params);
      const response = await fetch(url.toString(), API_CONFIG.DEFAULT_OPTIONS);
      const data = await handleApiResponse(response);

      const formattedData = data.prices.map(([timestamp, price]) => ({
        timestamp,
        date: new Date(timestamp).toLocaleDateString(),
        price: parseFloat(price)
      }));

      return {
        labels: formattedData.map(item => item.date),
        prices: formattedData.map(item => item.price)
      };

    } catch (error) {
      handleApiError(error, `/coins/${coinId}/market_chart`);
      return null;
    }
  }, cacheDuration);
};

