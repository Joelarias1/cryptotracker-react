/* eslint-disable react/prop-types */
import { Dialog, DialogHeader } from "@material-tailwind/react";
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
    const isPositive = !value?.startsWith("-");
    const baseClasses = "inline-flex items-center gap-1";
    const sizeClasses =
      size === "small"
        ? "text-xs px-1.5 py-0.5 rounded-md"
        : "text-sm px-2 py-1 rounded-lg font-medium";

    return (
      <div
        className={`
          ${baseClasses} 
          ${sizeClasses}
          ${
            isPositive
              ? "bg-green-400/10 text-green-400"
              : "bg-red-400/10 text-red-400"
          }
        `}
      >
        <span className="tracking-tight">{value || "0%"}</span>
        {value?.startsWith("-") ? (
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
      className="bg-neutral-900/95 backdrop-blur-xl max-h-[95vh] overflow-auto rounded-xl m-2 sm:m-4 border border-white/10"
      size="xl"
    >
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : coinInfo ? (
        <div className="flex flex-col w-full">
          {/* Header section */}
          <DialogHeader className="bg-white/5 p-4 lg:p-6 backdrop-blur-sm border-b border-white/10">
            <div className="w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-6">
              {/* Left section: Basic info */}
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>

                    {/* Container for the image */}
                    <div className="absolute inset-0 p-2.5 backdrop-blur-[2px]">
                      <div className="relative w-full h-full rounded-full bg-white/10 p-1.5 backdrop-filter">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={coinInfo.image}
                            alt={coinInfo.name}
                            className="w-full h-full rounded-full object-cover scale-[1.15]"
                            style={{
                              objectPosition: "center",
                              aspectRatio: "1/1",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {coinInfo.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-600 w-5 h-5 rounded-full flex items-center justify-center border border-white/20">
                      <span className="text-xs font-bold text-white">
                        #{coinInfo.rank}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-xl sm:text-2xl tracking-tight">
                      {coinInfo.name}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 bg-blue-400/10 text-blue-400 rounded-md text-xs font-semibold uppercase tracking-wide">
                        {coinInfo.symbol}
                      </span>
                      {coinInfo.rank > 3 && (
                        <span className="px-2 py-0.5 bg-white/5 text-neutral-300 rounded-md text-xs font-medium">
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                    >
                      <CiLink className="text-base" />
                      Official Website
                    </a>
                  </div>
                </div>
              </div>

              {/* Right section: Prices */}
              <div className="flex flex-col lg:ml-auto lg:items-end w-full lg:w-auto bg-white/5 p-3 rounded-xl lg:bg-transparent lg:p-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl lg:text-3xl font-bold text-white tabular-nums tracking-tight">
                    {coinInfo.price || "$0.00"}
                  </span>
                  <PriceChangeIndicator
                    value={coinInfo.price24h}
                    className="lg:-mt-1"
                  />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg lg:bg-transparent lg:px-0">
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
                      ATH
                    </span>
                    <span className="text-sm font-semibold text-neutral-200 tabular-nums">
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

          {/* Chart section */}
          <div className="p-4 lg:p-6">
            <div className="flex justify-end gap-1.5 mb-4">
              {timeframes.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 border-white/10 ${
                    timeframe === tf.value
                      ? "bg-blue-400/10 text-blue-400"
                      : "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-neutral-300 "
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
            <div className="h-[250px] sm:h-[300px] lg:h-[400px] w-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
              <CoinChart coinId={coinId} timeframe={timeframe} />
            </div>
          </div>

          {/* Footer stats */}
          <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 text-white p-4 lg:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="flex flex-col">
                <span className="text-neutral-400 text-xs">
                  Circulating Supply
                </span>
                <span className="text-sm lg:text-base font-medium mt-0.5 tabular-nums text-white">
                  {coinInfo.totalSupply}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-neutral-400 text-xs">Max Supply</span>
                <span className="text-sm lg:text-base font-medium mt-0.5 tabular-nums text-white">
                  {coinInfo.maxSupply}
                </span>
              </div>
              <div className="flex flex-col col-span-2 lg:col-span-1">
                <span className="text-neutral-400 text-xs">Watchlist</span>
                <span className="text-sm lg:text-base font-medium mt-0.5 flex items-center gap-1.5 tabular-nums text-white">
                  {coinInfo.userWatchlist}
                  <FaStar className="text-yellow-400 w-4 h-4" />
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
