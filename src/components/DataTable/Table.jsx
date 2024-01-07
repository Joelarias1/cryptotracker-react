/* eslint-disable react/prop-types */
import {
  Card,
  Typography,
  CardBody,
  Avatar,
  Input
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getCoinsList } from "../../api/main-api";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const TABLE_HEAD = [
  "Rank",
  "Crypto",
  "Price",
  "1h",
  "24h",
  "7d",
  "MarketCap",
  "See More"
];

export const Table = ({name}) => {
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

  const percentageValue = (value) => {
    const numericValue = parseFloat(value);
    return numericValue > 0
      ? { color: "green" }
      : numericValue < 0
      ? { color: "red" }
      : {};
  };

  const motionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
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
          <h1 className="mt-2 text-3xl font-black text-gray-700 md:text-5xl">
            Check Our Demo
          </h1>
          <p className="mt-3 text-base md:text-lg lg:text-xl text-center text-slate-500">
            See the most important assets across the market
          </p>
        </div>

        <div className="mb-4 flex flex-col justify-center md:flex-row md:items-center mx-5">
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <div className="w-full md:w-96">
            <Input
              disabled
              placeholder="Soon..."
              labelProps={{
                className: "hidden",
              }}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              className="!border-1 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900"
            />
          </div>
        </div>
      </div>

      

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
