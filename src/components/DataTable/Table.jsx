/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import { getCoinsList } from "../../api/main-api";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MdOutlineManageSearch } from "react-icons/md";
import { CoinInformation } from "./CoinData";
import { percentageValue } from "../../api/utils";
import { SearchComponent } from "./Search";

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
      <div>
        <MdOutlineManageSearch
          className="text-gray-700 text-2xl"
          onClick={handleOpen}
        />
      </div>

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

  const buttonAnimation = {
    scale: 1.1,
    transition: { duration: 0.6 },
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
    threshold: 0.15
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

        <SearchComponent/>

        <div className="flex justify-center items-center mx-3">
          {loading ? (
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-2xl"
            >
              Loading...
            </Typography>
          ) : (
            <Card className="w-full xl:w-4/5">
              <CardBody className="overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-zinc-50 p-4"
                        >
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
                          <motion.div
                            whileHover={buttonAnimation}
                            className="cursor-pointer"
                          >
                            <CoinDetailsButton coinId={coin.id} />
                          </motion.div>
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
