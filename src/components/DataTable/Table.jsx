/* eslint-disable react/prop-types */
import { Card, Typography, CardBody, Avatar, Spinner } from "@material-tailwind/react";
import { getCoinsList } from "../../api/main-api";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdOutlineManageSearch } from "react-icons/md";
import { CoinInformation } from "./CoinData";
import { percentageValue } from "../../api/utils";
import { SearchComponent } from "./Search";

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
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
      >
        <MdOutlineManageSearch className="text-2xl text-gray-600 group-hover:text-gray-800" />
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

  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 0.6 } },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id={name} className="py-10 lg:py-20 bg-zinc-50">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={motionVariants}
        ref={ref}
      >
        <div className="flex flex-col items-center justify-center px-4 mb-8">
          <h1 className="text-3xl font-black text-gray-800 md:text-5xl">
            Cryptocurrency Prices
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Real-time prices of top cryptocurrencies
          </p>
        </div>

        <SearchComponent />

        <div className="px-4 lg:px-8 mt-6">
          {loading ? (
            <Card className="w-full overflow-hidden">
              <div className="flex items-center justify-center h-full gap-4 py-64">
                <Typography variant="h3" color="blue-gray" className="font-bold">
                  Loading...
                </Typography>
                <Spinner color="blue" size="4xl" />
              </div>
            </Card>
          ) : (
            <Card className="w-full overflow-hidden bg-white shadow-lg">
              <CardBody className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-max table-auto">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        {TABLE_HEAD.map((head) => (
                          <th key={head.key} className="p-4">
                            <Typography
                              variant="small"
                              className="text-sm font-semibold text-gray-600 text-left"
                            >
                              {head.label}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {coinsData.map((coin) => (
                        <tr
                          key={coin.name}
                          className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="p-4">
                            <Typography className="text-sm font-medium text-gray-500">
                              {coin.rank}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={coin.image}
                                alt={coin.name}
                                size="sm"
                                className="rounded-full bg-white border border-gray-100 p-0.5 shadow-sm"
                              />
                              <div className="flex flex-col">
                                <Typography className="text-sm font-semibold text-gray-800">
                                  {coin.name}
                                </Typography>
                                <Typography className="text-xs font-medium text-gray-500 uppercase">
                                  {coin.symbol}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Typography className="text-sm font-semibold text-gray-800">
                              {coin.currentPrice}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              style={percentageValue(coin.priceChangePercentage1h)}
                              className="text-sm font-medium"
                            >
                              {coin.priceChangePercentage1h}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              style={percentageValue(coin.priceChangePercentage24h)}
                              className="text-sm font-medium"
                            >
                              {coin.priceChangePercentage24h}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              style={percentageValue(coin.priceChangePercentage7d)}
                              className="text-sm font-medium"
                            >
                              {coin.priceChangePercentage7d}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography className="text-sm font-medium text-gray-800">
                              {coin.marketcap}
                            </Typography>
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
              </CardBody>
            </Card>
          )}
        </div>
      </motion.div>
    </section>
  );
};