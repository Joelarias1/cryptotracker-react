export const handleApiResponse = async (response) => {
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }
  
    const data = await response.json();
    return data;
  };
  
  export const handleApiError = (error, endpoint) => {
    console.error(`Error in ${endpoint}:`, error);
    if (error.response) {
      throw new Error(`API Error (${endpoint}): ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error(`Network Error (${endpoint}): No response received`);
    } else {
      throw new Error(`Request Error (${endpoint}): ${error.message}`);
    }
  };
  