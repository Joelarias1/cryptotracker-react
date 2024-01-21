import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, Input } from "@material-tailwind/react";
import { searchCoins } from "../../api/main-api";
import { CoinInformation } from "./CoinData";

// eslint-disable-next-line react/prop-types
const CoinDetailsButton = ({ coinId, children }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(!dialogOpen);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
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

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        const results = await searchCoins(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    };

    const searchTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300); 

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  return (
    <div className="mb-4 flex flex-col justify-center md:flex-row md:items-center mx-5 items-center relative">
      <div className="flex w-full md:w-6/12 lg:w-5/12 xl:w-4/12 gap-2">
        <Input
          placeholder="Search..."
          labelProps={{
            className: "hidden",
          }}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          className="!border-1 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchResults.length > 0 && (
          <div className="absolute bg-white border border-gray-300 shadow-md mt-11 w-full md:w-6/12 lg:w-5/12 xl:w-4/12 max-h-48 overflow-y-auto z-10 rounded">
            <ul>
              {searchResults.map((result) => (
                <CoinDetailsButton coinId={result.id} key={result.id}>
                  <li key={result.id} className="cursor-pointer hover:bg-gray-100 p-2 flex items-center">
                    <Avatar src={result.large} alt={result.name} size="sm" className="mr-2" />
                    <div>
                      <p>{result.name}</p>
                      <p className="text-gray-500 text-sm">{result.symbol}</p>
                    </div>
                  </li>
                </CoinDetailsButton>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
