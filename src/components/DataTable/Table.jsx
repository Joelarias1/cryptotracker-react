/* eslint-disable react/prop-types */
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import { getCoinsList } from "../../api/main-api";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdOutlineManageSearch } from "react-icons/md";
import { CoinInformation } from "./CoinData";
import { percentageValue } from "../../api/utils";
import { SearchComponent } from "./Search";
import { Spinner } from "@material-tailwind/react";

const TABLE_HEAD = [
  "Rank",
  "Crypto",
  "Price",
  "1h",
  "24h",
  "7d",
  "MarketCap",
  "See More",
];

const CoinDetailsButton = ({ coinId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
        <MdOutlineManageSearch
          className="text-slate-50 text-3xl bg-zinc-600 rounded-3xl p-1 cursor-pointer hover:scale-110"
          onClick={handleOpen}
        />
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
        <div className="flex flex-col items-center justify-center px-4 mb-6">
          <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl sm:text-center">
            Check Our Demo
          </h1>
          <p className="mt-3 text-base md:text-lg lg:text-xl text-center text-slate-500">
            See the most important assets across the market
          </p>
        </div>

        <SearchComponent />

        <div className="flex justify-center items-center mx-2 md:mx-5 mt-5">
          {loading ? (
            <Card className="w-full xl:w-4/5">
              <div className="flex items-center justify-center h-full gap-4 py-64">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="font-bold"
                >
                  Loading...
                </Typography>
                <Spinner color="blue" size="4xl" />
              </div>
            </Card>
          ) : (
            <Card className="w-full xl:w-4/5 shadow-xl">
              <CardBody className="overflow-auto scrollbar-thin">
                <table className="w-full min-w-max table-auto text-left overflow-hidden">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {coinsData.map((coin) => (
                      <tr key={coin.name}>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-light"
                          >
                            {coin.rank}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={coin.image}
                              alt={coin.name}
                              size="md"
                              className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {coin.name}
                            </Typography>
                          </div>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {coin.currentPrice}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            style={percentageValue(
                              coin.priceChangePercentage1h
                            )}
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {coin.priceChangePercentage1h}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            style={percentageValue(
                              coin.priceChangePercentage24h
                            )}
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {coin.priceChangePercentage24h}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            style={percentageValue(
                              coin.priceChangePercentage7d
                            )}
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {coin.priceChangePercentage7d}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {coin.marketcap}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <CoinDetailsButton coinId={coin.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          )}
        </div>
      </motion.div>
    </section>
  );
};
