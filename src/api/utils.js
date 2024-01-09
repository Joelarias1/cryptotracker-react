
// Format Percentages
export const formatPercentage = (percentage) => {
    return `${parseFloat(percentage).toFixed(2)} %`;
  };
  

  export const percentageValue = (value) => {
    const numericValue = parseFloat(value);
    return numericValue > 0
      ? { color: "green" }
      : numericValue < 0
      ? { color: "red" }
      : {};
  };