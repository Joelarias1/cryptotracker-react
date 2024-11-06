import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";
import { getCoinHistoricalData, formatPrice } from "../../api/main-api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function CoinChart({ coinId, timeframe }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const isInitialMount = useRef(true);
  const previousTimeframe = useRef(timeframe);

  useEffect(() => {
    if (isInitialMount.current || timeframe !== previousTimeframe.current) {
      const fetchData = async () => {
        try {
          if (!chartData) {
            setLoading(true);
          }

          const result = await getCoinHistoricalData(coinId, timeframe);

          if (result) {
            const priceChange =
              result.prices[result.prices.length - 1] - result.prices[0];
            const lineColor =
              priceChange >= 0 ? "rgb(22, 199, 132)" : "rgb(234, 57, 67)";

            const createGradient = (ctx) => {
              const gradient = ctx.createLinearGradient(
                0,
                0,
                0,
                ctx.canvas.height
              );
              if (priceChange >= 0) {
                gradient.addColorStop(0, "rgba(22, 199, 132, 0.2)");
                gradient.addColorStop(0.5, "rgba(22, 199, 132, 0.05)");
                gradient.addColorStop(1, "rgba(22, 199, 132, 0)");
              } else {
                gradient.addColorStop(0, "rgba(234, 57, 67, 0.2)");
                gradient.addColorStop(0.5, "rgba(234, 57, 67, 0.05)");
                gradient.addColorStop(1, "rgba(234, 57, 67, 0)");
              }
              return gradient;
            };

            setChartData({
              labels: result.labels,
              datasets: [
                {
                  label: "Price",
                  data: result.prices,
                  fill: true,
                  borderColor: lineColor,
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    return createGradient(ctx);
                  },
                  tension: 0.4,
                  borderWidth: 1.5,
                  pointRadius: 0,
                  pointHoverRadius: 6,
                  pointHoverBackgroundColor: lineColor,
                  pointHoverBorderColor: "#fff",
                  pointHoverBorderWidth: 2,
                  segment: {
                    borderColor: (ctx) => {
                      if (ctx.p0.parsed.y > ctx.p1.parsed.y) {
                        return "rgb(234, 57, 67)";
                      }
                      return "rgb(22, 199, 132)";
                    },
                  },
                },
              ],
            });
          }
        } catch (error) {
          console.error("Error fetching chart data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      isInitialMount.current = false;
      previousTimeframe.current = timeframe;
    }
  }, [coinId, timeframe]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    animations: {
      tension: {
        duration: 750,
        easing: "linear",
      },
      y: {
        duration: 750,
        easing: "easeInOutCubic",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#374151",
        bodyColor: "#111827",
        titleFont: {
          size: 12,
          weight: "500",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 14,
          weight: "600",
          family: "'Inter', sans-serif",
        },
        padding: {
          x: 12,
          y: 8,
        },
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
          label: (context) => {
            const currentValue = formatPrice(context.raw);
            const firstValue = context.dataset.data[0];
            const percentageChange =
              ((context.raw - firstValue) / firstValue) * 100;

            return [
              `${currentValue}`,
              `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(
                2
              )}%`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        position: "right",
        grid: {
          color: "rgba(0, 0, 0, 0.03)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: "500",
            family: "'Inter', sans-serif",
          },
          color: "rgba(0, 0, 0, 0.7)",
          callback: (value) => formatPrice(value),
          padding: 12,
          count: 5,
          maxTicksLimit: 5,
          align: "center",
        },
      },
    },
  };

  if (loading && !chartData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white bg-opacity-80">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full border-4 border-gray-100 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Line
        ref={chartRef}
        data={chartData}
        options={options}
        className="filter drop-shadow-sm"
      />
    </div>
  );
}

CoinChart.propTypes = {
  coinId: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
};
