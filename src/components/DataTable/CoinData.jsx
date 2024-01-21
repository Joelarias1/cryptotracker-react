import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCoinInfo } from "../../api/main-api";
import { percentageValue } from "../../api/utils";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CiLink } from "react-icons/ci";
import { Spinner } from "@material-tailwind/react";

export function CoinInformation({ isOpen, handler, coinId }) {
  const [coinInfo, setCoinInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <Dialog
      open={isOpen}
      handler={handler}
      className="bg-none w-full overflow-hidden h-fit "
      size="xl"
    >
      {loading ? (
        <div className="flex items-center justify-center h-full gap-4 py-6">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Loading... 
          </Typography>
          <Spinner color="blue" size="4xl" />
        </div>
      ) : coinInfo ? (
        <>
          <DialogHeader className="flex flex-col sm:flex-row items-center sm:items-start bg-zinc-100 md:px-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center sm:mr-3">
              <Avatar
                src={coinInfo.image}
                alt={coinInfo.name}
                size="xxl"
                className="bg-blue-gray-50/50 object-contain p-1 shadow-sm"
              />
              <div className="flex flex-col sm:text-start items-center sm:items-start">
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="font-bold"
                >
                  {coinInfo.name}
                </Typography>
                <div className="flex items-center gap-2 mt-2 sm:mt-1">
                  <div className="rounded-full bg-zinc-600 px-3">
                    <Typography
                      variant="paragraph"
                      color="white"
                      className="font-medium"
                    >
                      {coinInfo.symbol}
                    </Typography>
                  </div>
                  <div className="rounded-full bg-zinc-500 px-3">
                    <Typography
                      variant="paragraph"
                      color="white"
                      className="font-medium"
                    >
                      # {coinInfo.rank}
                    </Typography>
                  </div>
                  <div className="rounded-full bg-lime-600 px-3">
                    <a href={coinInfo.linkHome}>
                      <Typography
                        variant="paragraph"
                        color="white"
                        className="font-medium cursor-pointer flex gap-1"
                      >
                        Website <CiLink className="text-2xl" />
                      </Typography>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center sm:ml-auto mt-5 sm:mt-8 md:mt-8 sm:text-right">
              <div className="flex items-center gap-3">
                <Typography
                  variant="h2"
                  color="blue-gray"
                  className="font-bold text-2xl sm:text-3xl md:text-3xl"
                >
                  $ {coinInfo.price || 0}
                </Typography>
                <div className="flex items-center">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium text-base sm:text-lg md:text-xl"
                    style={percentageValue(coinInfo.price24h)}
                  >
                    {coinInfo.price24h || 0}
                  </Typography>
                  {percentageValue(coinInfo.price24h).color === "red" ? (
                    <BiSolidDownArrow className="text-red-500 ml-1 text-base sm:text-lg md:text-xl" />
                  ) : (
                    <BiSolidUpArrow className="text-green-500 ml-1 text-base sm:text-lg md:text-xl" />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="font-medium text-base sm:text-lg md:text-md"
                >
                  ATH: $ {coinInfo.ath || "$ 0"}
                </Typography>
                <div className="flex items-center">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium text-base sm:text-lg md:text-md"
                    style={percentageValue(coinInfo.athChange)}
                  >
                    {coinInfo.athChange || 0}
                  </Typography>
                  {percentageValue(coinInfo.athChange).color === "red" ? (
                    <BiSolidDownArrow className="text-red-500 ml-1 text-base sm:text-lg md:text-xl" />
                  ) : (
                    <BiSolidUpArrow className="text-green-500 ml-1 text-base sm:text-lg md:text-xl" />
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          <DialogHeader className="flex flex-col sm:flex-row bg-zinc-600 text-white px-8 justify-center">
            <div className="flex flex-col sm:flex-row gap-8">
              <Typography
                variant="lead"
                color="blue-gray"
                className="text-base font-medium pb-1 sm:mb-0"
              >
                Circulating Supply:
                <span className="font-normal"> {coinInfo.totalSupply} </span>
              </Typography>
              <Typography
                variant="lead"
                color="blue-gray"
                className="text-base font-medium pb-1 sm:mb-0"
              >
                Max Supply:
                <span className="font-normal"> {coinInfo.maxSupply} </span>
              </Typography>
              <Typography
                variant="lead"
                color="blue-gray"
                className="text-base font-medium pb-1 sm:mb-0 flex items-center gap-1"
              >
                Users Watchlist:
                <span className="font-normal"> {coinInfo.userWatchlist} </span>
                <FaStar className="text-medium" />
              </Typography>
            </div>
          </DialogHeader>
        </>
      ) : null}
    </Dialog>
  );
}

// Definición de PropTypes para el componente CoinInformation.
CoinInformation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  coinId: PropTypes.string,
};
