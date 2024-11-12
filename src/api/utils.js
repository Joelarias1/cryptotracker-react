
// Format Percentages
export const formatPercentage = (percentage) => {
    return `${parseFloat(percentage).toFixed(2)} %`;
  };
  

  export const percentageValue = (value) => {
    const numericValue = parseFloat(value);
    return numericValue > 0
      ? { color: "rgb(134 239 172)" }
      : numericValue < 0
      ? { color: "rgb(244 63 94)" }
      : {color: "white"};
  };
  
  