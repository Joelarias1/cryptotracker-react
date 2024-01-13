import PropTypes from "prop-types";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCoinInfo } from "../../api/main-api";
import { percentageValue } from "../../api/utils";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { CiLink } from "react-icons/ci";

export function CoinInformation({ isOpen, handler, coinId }) {
  const [coinInfo, setCoinInfo] = useState(null);

  useEffect(() => {
    const fetchCoinInfo = async () => {
      try {
        const coinData = await getCoinInfo(coinId);
        setCoinInfo(coinData);
      } catch (error) {
        console.error("Error fetching coin information:", error.message);
      }
    };

    if (isOpen && coinId) {
      fetchCoinInfo();
    }
  }, [isOpen, coinId]);

  return (
    <Dialog
      open={isOpen}
      handler={handler}
      className="bg-zinc-100 w-full overflow-hidden h-fit"
      size="xl"
    >
      {coinInfo ? (
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
          {/* <DialogBody className="overflow-hidden bg-white rounded-lg shadow-xl my-8 mx-5 flex items-center justify-center">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Soon...
            </Typography>
          </DialogBody> */}
        </>
      ) : (
        <DialogHeader className="flex flex-col sm:flex-row items-center sm:items-start bg-zinc-100 justify-center">
          <Typography variant="h4" color="blue-gray" className="font-medium ">
            Loading...
          </Typography>
        </DialogHeader>
      )}
    </Dialog>
  );
}

// Definición de PropTypes para el componente CoinInformation.
CoinInformation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  coinId: PropTypes.string,
};
