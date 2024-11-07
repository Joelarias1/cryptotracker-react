/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MdOutlineManageSearch } from "react-icons/md";
import { CoinInformation } from "./CoinData";
import { percentageValue } from "../../api/utils";
import { SearchComponent } from "./Search";
import { getCoinsList } from "../../api/main-api";

const TABLE_HEAD = [
  { label: "#", key: "rank" },
  { label: "Asset", key: "crypto" },
  { label: "Price", key: "price" },
  { label: "1h %", key: "1h" },
  { label: "24h %", key: "24h" },
  { label: "7d %", key: "7d" },
  { label: "Market Cap", key: "marketCap" },
  { label: "", key: "actions" },
];

const CoinDetailsButton = ({ coinId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 ease-in-out group"
      >
        <MdOutlineManageSearch className="text-2xl text-neutral-300 group-hover:text-white transform group-hover:scale-110 transition-all duration-300" />
      </button>
      <CoinInformation
        isOpen={dialogOpen}
        handler={handleOpen}
        coinId={coinId}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      />
    </>
  );
};

export const Table = ({ name }) => {
  const [coinsData, setCoinsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coinsList = await getCoinsList();
        setCoinsData(coinsList);
      } catch (error) {
        console.error("Error fetching coins list:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section id={name} className="py-10 lg:py-20 overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={ref}
        className={`relative z-10 transition-opacity duration-700 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center px-4 mb-12">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-xl"></div>
            <h1 className="relative  text-center text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 md:text-5xl px-1 py-2">
              Cryptocurrency Prices
            </h1>
          </div>
          <p className="text-base md:text-lg text-neutral-300/80 max-w-2xl text-center">
            Real-time prices of top cryptocurrencies
          </p>
        </div>

        <SearchComponent />

        <div className="px-4 lg:px-8 mt-8">
          {loading ? (
            <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-center h-96 gap-4">
                <div className="text-xl font-semibold text-white">Loading</div>
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head.key}
                          className="p-4 transition-colors duration-200"
                        >
                          <span className="text-sm font-semibold text-neutral-300 text-left">
                            {head.label}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coinsData.map((coin) => (
                      <tr
                        key={coin.name}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="p-4">
                          <span className="text-sm font-medium text-neutral-400">
                            {coin.rank}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 p-1.5 backdrop-blur-sm border border-white/10 overflow-hidden">
                              <img
                                src={coin.image}
                                alt={coin.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-50">
                                {coin.name}
                              </span>
                              <span className="text-xs font-medium text-neutral-400 uppercase">
                                {coin.symbol}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-semibold text-slate-50">
                            {coin.currentPrice}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            style={percentageValue(
                              coin.priceChangePercentage1h
                            )}
                            className="text-sm font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-opacity-20"
                          >
                            {coin.priceChangePercentage1h}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            style={percentageValue(
                              coin.priceChangePercentage24h
                            )}
                            className="text-sm font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-opacity-20"
                          >
                            {coin.priceChangePercentage24h}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            style={percentageValue(
                              coin.priceChangePercentage7d
                            )}
                            className="text-sm font-medium px-2 py-1 rounded-lg backdrop-blur-sm bg-opacity-20"
                          >
                            {coin.priceChangePercentage7d}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-medium text-white">
                            {coin.marketcap}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end">
                            <CoinDetailsButton coinId={coin.id} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
