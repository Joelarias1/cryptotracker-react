// Configuración central de la API
export const API_CONFIG = {
    BASE_URL: "https://api.coingecko.com/api/v3",
    DEFAULT_PARAMS: {
      x_cg_demo_api_key: import.meta.env.VITE_API_KEY,
    },
    DEFAULT_OPTIONS: {
      headers: {
        'Accept': 'application/json',
      },
    }
  };
  
  // Sistema de caché simple
  const CACHE_DURATION = 60000; // 1 minuto
  const cache = new Map();
  
  export const CACHE_DURATIONS = {
    '1': 30000,    // 30 segundos para datos de 24h
    '7': 60000,    // 1 minuto para datos de 7 días
    '30': 300000,  // 5 minutos para datos de 30 días
    '365': 900000, // 15 minutos para datos anuales
  };
  
  // Utilidades
  export const createUrl = (endpoint, params = {}) => {
    const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    const allParams = { ...API_CONFIG.DEFAULT_PARAMS, ...params };
    Object.keys(allParams).forEach(key => 
      url.searchParams.append(key, allParams[key])
    );
    return url;
  };
  
  export const fetchWithCache = async (key, fetchFn) => {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    const data = await fetchFn();
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  };
  