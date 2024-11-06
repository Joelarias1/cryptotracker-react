/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogHeader,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { CoinChart } from "./CoinChart";
import { getCoinInfo } from "../../api/main-api";

export function CoinInformation({ isOpen, handler, coinId }) {
  const [coinInfo, setCoinInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7');

  const timeframes = [
    { label: '24h', value: '1' },
    { label: '7d', value: '7' },
    { label: '30d', value: '30' },
    { label: '1y', value: '365' },
  ];

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const coinData = await getCoinInfo(coinId);
        setCoinInfo(coinData);
      } catch (error) {
        console.error("Error fetching coin information:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && coinId) {
      setLoading(true);
      fetchCoinInfo();
    }
  }, [isOpen, coinId]);

  const PriceChangeIndicator = ({ value, size = "normal" }) => {
    const isPositive = !value?.startsWith('-');
    const baseClasses = "flex items-center gap-1 rounded-full px-2 py-0.5";
    const sizeClasses = size === "small" ? "text-xs" : "text-sm";
    const colorClasses = isPositive ? "bg-green-50" : "bg-red-50";

    return (
      <div className={`${baseClasses} ${colorClasses} ${sizeClasses}`}>
        <span className={isPositive ? "text-green-600" : "text-red-600"}>
          {value || '0%'}
        </span>
        {value?.startsWith('-') ? (
          <BiSolidDownArrow className="text-red-500 w-3 h-3" />
        ) : (
          <BiSolidUpArrow className="text-green-500 w-3 h-3" />
        )}
      </div>
    );
  };

  return (
    <Dialog
      open={isOpen}
      handler={handler}
      className="bg-white max-h-[95vh] overflow-auto rounded-xl m-2 sm:m-4"
      size="xl"
    >
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : coinInfo ? (
        <div className="flex flex-col w-full">
          <DialogHeader className="bg-gray-50 p-4 lg:p-6">
            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6">
              {/* Información básica de la moneda */}
              <div className="flex items-start gap-4">
                <Avatar
                  src={coinInfo.image}
                  alt={coinInfo.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-white p-1.5 ring-1 ring-gray-100"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Typography className="font-bold text-gray-900 text-lg sm:text-xl">
                      {coinInfo.name}
                    </Typography>
                    <div className="flex gap-1.5">
                      <span className="px-2 py-0.5 bg-gray-700 text-white rounded-full text-xs font-medium">
                        {coinInfo.symbol}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-600 text-white rounded-full text-xs font-medium">
                        #{coinInfo.rank}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <a
                      href={coinInfo.linkHome}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <CiLink className="text-base" />
                      Sitio web oficial
                    </a>
                  </div>
                </div>
              </div>

              {/* Información de precios */}
              <div className="flex flex-col lg:ml-auto mt-3 lg:mt-0">
                <div className="flex flex-col gap-1">
                  {/* Precio actual */}
                  <div className="flex items-center gap-2">
                    <Typography className="text-2xl lg:text-3xl font-bold text-gray-900 tabular-nums">
                      {coinInfo.price || '$0.00'}
                    </Typography>
                    <PriceChangeIndicator value={coinInfo.price24h} />
                  </div>
                  {/* ATH */}
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs text-gray-500">ATH:</span>
                    <span className="text-sm font-medium text-gray-700 tabular-nums">
                      {coinInfo.ath || '$0.00'}
                    </span>
                    <PriceChangeIndicator value={coinInfo.athChange} size="small" />
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Sección del gráfico */}
          <div className="p-4 lg:p-6">
            <div className="flex justify-end gap-1.5 mb-4">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    timeframe === tf.value
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
            <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full">
              <CoinChart coinId={coinId} timeframe={timeframe} />
            </div>
          </div>

          {/* Estadísticas del footer */}
          <div className="bg-gray-800 text-white p-4 lg:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Circulating Supply</span>
                <span className="text-sm lg:text-base font-medium mt-0.5 tabular-nums">
                  {coinInfo.totalSupply}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs">Max Supply</span>
                <span className="text-sm lg:text-base font-medium mt-0.5 tabular-nums">
                  {coinInfo.maxSupply}
                </span>
              </div>
              <div className="flex flex-col col-span-2 lg:col-span-1">
                <span className="text-gray-400 text-xs">Watchlist</span>
                <span className="text-sm lg:text-base font-medium mt-0.5 flex items-center gap-1.5 tabular-nums">
                  {coinInfo.userWatchlist}
                  <FaStar className="text-yellow-500 w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

export default CoinInformation;