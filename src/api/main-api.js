// services/api.js

import { formatPercentage } from "./utils";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.coingecko.com/api/v3";

const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorMessage = `Error: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

// Endpoints

export const getCoinsList = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h,24h,7d&locale=en&x_cg_demo_api_key=${API_KEY}`
    );
    const data = await handleApiResponse(response);

    const formattedData = data.map((coin) => {
      return {
        id: coin.id,
        rank: coin.market_cap_rank,
        name: coin.name,
        image: coin.image,
        priceChangePercentage1h: formatPercentage(
          coin.price_change_percentage_1h_in_currency
        ),
        priceChangePercentage24h: formatPercentage(
          coin.price_change_percentage_24h
        ),
        priceChangePercentage7d: formatPercentage(
          coin.price_change_percentage_7d_in_currency
        ),
        currentPrice: `$ ${coin.current_price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        })}`,
        marketcap: `$ ${coin.market_cap.toLocaleString("en-US")}`,
      };
    });

    return formattedData;
  } catch (error) {
    console.error(`Error in getCoinsList: ${error.message}`);
    throw error;
  }
};

// Market Data

export const getGlobalData = async () => {
  try {
    const globalResponse = await fetch(
      `${BASE_URL}/global?x_cg_demo_api_key=${API_KEY}`
    );
    const { data } = await handleApiResponse(globalResponse);

    const exchangesResponse = await fetch(
      `${BASE_URL}/exchanges?x_cg_demo_api_key=${API_KEY}`
    );

    if (!exchangesResponse.ok) {
      throw new Error(
        `Failed to fetch exchanges data. Status: ${exchangesResponse.status}`
      );
    }

    const totalExchanges = exchangesResponse.headers.get("total");

    return {
      activeCrypto: data.active_cryptocurrencies.toLocaleString(),
      markets: data.markets.toLocaleString(),
      totalExchanges: totalExchanges ? parseInt(totalExchanges) : 0,
      icos: data.ongoing_icos.toLocaleString(),
    };
  } catch (error) {
    console.error(`Error in getGlobalData: ${error.message}`);
    throw error;
  }
};




// Coin details

/**
 * Retrieve detailed information about a specific cryptocurrency.
 * @param {string} coinId - The unique identifier of the cryptocurrency.
 * @returns {Promise<Object>} - An object containing various details about the cryptocurrency.
 * The object includes name, symbol, image, rank, price, ath (all-time high), athChange,
 * price24h (price change in the last 24 hours), totalSupply, maxSupply, userWatchlist, and linkHome properties.
 */
export const getCoinInfo = async (coinId) => {
  try {
    // Make a fetch request to the API to get detailed information about the cryptocurrency
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}?localization=false&x_cg_demo_api_key=${API_KEY}`
    );

    // Process the API response
    const data = await handleApiResponse(response);

    // Format the maxSupply value for display
    const maxSupply =
      data.market_data.max_supply !== null
        ? data.market_data.max_supply.toLocaleString("en-US")
        : "∞";

    // Format the price, ath, and athChange values for display with at least 5 decimal places
    const formatValue = (value) => {
      const parsedValue = parseFloat(value);
      return parsedValue < 0 ? parsedValue.toLocaleString("en-US", { minimumFractionDigits: 5 }) : parsedValue.toLocaleString("en-US");
    };

    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      image: data.image.large,
      rank: data.market_cap_rank,
      price: formatValue(data.market_data.current_price.usd),
      ath: formatValue(data.market_data.ath.usd),
      athChange: formatPercentage(data.market_data.ath_change_percentage.usd),
      price24h: formatPercentage(data.market_data.price_change_percentage_24h),
      totalSupply: data.market_data.circulating_supply.toLocaleString("en-US"),
      maxSupply: maxSupply,
      userWatchlist: data.watchlist_portfolio_users.toLocaleString("en-US"),
      linkHome: data.links.homepage[0] || " ", // Use a space if the link is not available
    };
  } catch (error) {
    console.error(`Error in getCoinInfo: ${error.message}`);
    throw error;
  }
};



// Search coins for search bar.

/**
 * Perform a search for cryptocurrencies based on the provided query.
 * @param {string} query - The search query to find cryptocurrencies.
 * @returns {Promise<Array<Object>>} - An array of objects representing the search results.
 * Each object contains id, name, symbol, and large properties.
 */
export const searchCoins = async (query) => {
  try {
    // Check if the query length is less than 2 characters
    if (query.trim().length < 2) {
      return [];
    }

    // Introduce a delay of 300 milliseconds
    await new Promise(resolve => setTimeout(resolve, 300));

    // Make a fetch request to the API
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&x_cg_demo_api_key=${API_KEY}`
    );

    // Process the API response
    const searchData = await handleApiResponse(response);

    // Check if the response contains an array of coins
    if (Array.isArray(searchData.coins)) {
      // Process and sort the results based on a scoring mechanism
      const sortedResults = searchData.coins
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

      return sortedResults;
    } else {
      console.error("Unexpected response format in searchCoins or no exists", searchData);
      return [];
    }
  } catch (error) {
    console.error(`Error in searchCoins: ${error.message}`);
    throw error;
  }
};





