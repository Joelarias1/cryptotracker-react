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
    const globalResponse = await fetch(`${BASE_URL}/global?x_cg_demo_api_key=${API_KEY}`);
    const { data } = await handleApiResponse(globalResponse);

    const exchangesResponse = await fetch(`${BASE_URL}/exchanges?x_cg_demo_api_key=${API_KEY}`);
    
    if (!exchangesResponse.ok) {
      throw new Error(`Failed to fetch exchanges data. Status: ${exchangesResponse.status}`);
    }

    const totalExchanges = exchangesResponse.headers.get('total');

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

export const getCoinInfo = async (coinId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${coinId}?localization=false&x_cg_demo_api_key=${API_KEY}`
    );
    const data = await handleApiResponse(response);

    return {
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      image: data.image.large,
      rank: data.market_cap_rank,
      description: data.description?.en,
      price: data.market_data.current_price.usd.toLocaleString("en-US"),
      ath: data.market_data.ath.usd.toLocaleString("en-US"),
      price24h:formatPercentage( data.market_data.price_change_percentage_24h),

    };
  } catch (error) {
    console.error(`Error in getCoinInfo: ${error.message}`);
    throw error;
  }
};
