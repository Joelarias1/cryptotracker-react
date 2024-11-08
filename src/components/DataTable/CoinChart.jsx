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

            const formattedData = result.prices.map((price, index) => ({
              x: result.labels[index],
              y: price
            }));

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
                  data: formattedData,
                  fill: true,
                  borderColor: lineColor,
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    return createGradient(ctx);
                  },
                  tension: 0.4,
                  borderWidth: 1.5,
                  pointRadius: 0,
                  pointHitRadius: 10,
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
                  parsing: {
                    xAxisKey: 'x',
                    yAxisKey: 'y'
                  }
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
  }, [coinId, timeframe, chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
      includeInvisible: true,
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
      decimation: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(17, 17, 17, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        intersect: false,
        mode: "nearest",
        axis: "x",
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
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const currentValue = formatPrice(context.raw.y);
            const firstValue = context.dataset.data[0].y;
            const percentageChange =
              ((context.raw.y - firstValue) / firstValue) * 100;

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
        ticks: {
          display: false,
        },
        distribution: 'linear',
        offset: false,
      },
      y: {
        position: "right",
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
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
          color: "rgba(255, 255, 255, 0.7)",
          callback: (value) => formatPrice(value),
          padding: 12,
          count: 5,
          align: "center",
        },
      },
    },
  };

  if (loading && !chartData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-transparent">
        <div className="relative w-12 h-12">
          <div className="absolute w-full h-full border-4 border-neutral-800 rounded-full"></div>
          <div className="absolute w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-400 font-medium">
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
        className="filter drop-shadow-xl"
      />
    </div>
  );
}

CoinChart.propTypes = {
  coinId: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
};

export default CoinChart;