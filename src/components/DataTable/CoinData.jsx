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
  const [timeframe, setTimeframe] = useState("7");

  const timeframes = [
    { label: "24h", value: "1" },
    { label: "7d", value: "7" },
    { label: "30d", value: "30" },
    { label: "1y", value: "365" },
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
    const baseClasses = "inline-flex items-center gap-1";
    const sizeClasses = size === "small" 
      ? "text-xs px-1.5 py-0.5 rounded-md" 
      : "text-sm px-2 py-1 rounded-lg font-medium";
    
    return (
      <div
        className={`
          ${baseClasses} 
          ${sizeClasses}
          ${isPositive 
            ? 'bg-green-50 text-green-600' 
            : 'bg-red-50 text-red-600'
          }
        `}
      >
        <span className="tracking-tight">
          {value || '0%'}
        </span>
        {value?.startsWith('-') ? (
          <BiSolidDownArrow className="w-2.5 h-2.5" />
        ) : (
          <BiSolidUpArrow className="w-2.5 h-2.5" />
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
          {/* Seccion superior */}
          <DialogHeader className="bg-gray-50/80 p-4 lg:p-6 backdrop-blur-sm">
            <div className="w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
              {/* Sección izquierda: Info básica */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Avatar
                    src={coinInfo.image}
                    alt={coinInfo.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-sm ring-1 ring-gray-100 p-2"
                  />
                  {coinInfo.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-xs font-bold text-white">
                        #{coinInfo.rank}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Typography className="font-bold text-gray-900 text-xl sm:text-2xl tracking-tight">
                      {coinInfo.name}
                    </Typography>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-gray-800 text-white rounded-md text-xs font-semibold uppercase tracking-wide">
                        {coinInfo.symbol}
                      </span>
                      {coinInfo.rank > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          Rank #{coinInfo.rank}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={coinInfo.linkHome}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors bg-white/80 hover:bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
                    >
                      <CiLink className="text-base" />
                      Official Website
                    </a>
                    {/* Aquí podrías agregar más acciones como Add to Watchlist */}
                  </div>
                </div>
              </div>

              {/* Sección derecha: Precios */}
              <div className="flex flex-col lg:ml-auto lg:items-end w-full lg:w-auto bg-white/60 p-3 rounded-xl lg:bg-transparent lg:p-0">
                {/* Precio actual y cambio 24h */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <Typography className="text-2xl lg:text-3xl font-bold text-gray-900 tabular-nums tracking-tight">
                    {coinInfo.price || "$0.00"}
                  </Typography>
                  <PriceChangeIndicator
                    value={coinInfo.price24h}
                    className="lg:-mt-1"
                  />
                </div>

                {/* ATH */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg lg:bg-transparent lg:px-0">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      ATH
                    </span>
                    <span className="text-sm font-semibold text-gray-700 tabular-nums">
                      {coinInfo.ath || "$0.00"}
                    </span>
                  </div>
                  <PriceChangeIndicator
                    value={coinInfo.athChange}
                    size="small"
                  />
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
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                <span className="text-gray-400 text-xs">
                  Circulating Supply
                </span>
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
