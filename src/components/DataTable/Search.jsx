/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, Input } from "@material-tailwind/react";
import { searchCoins } from "../../api/main-api";
import { CoinInformation } from "./CoinData";

const CoinListItem = ({ result }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleClick = (e) => {
    e.preventDefault();
    setDialogOpen(!dialogOpen);
  };

  return (
    <>
      <li 
        onClick={handleClick}
        className="cursor-pointer hover:bg-gray-100 p-2 flex items-center transition-colors duration-200"
      >
        <Avatar 
          src={result.large} 
          alt={result.name} 
          size="sm" 
          className="mr-3 border border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-medium truncate">{result.name}</p>
          <p className="text-gray-500 text-sm uppercase truncate">{result.symbol}</p>
        </div>
      </li>
      <CoinInformation
        isOpen={dialogOpen}
        handler={() => setDialogOpen(!dialogOpen)}
        coinId={result.id}
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
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchTerm.trim() === "") {
          setSearchResults([]);
          return;
        }

        setIsLoading(true);
        const results = await searchCoins(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const searchTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchTerm]);

  const showResults = searchResults.length > 0 || (searchTerm && isLoading);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative" ref={searchRef}>
      <div className="relative w-full">
        <Input
          placeholder="Search..."
          labelProps={{
            className: "hidden",
          }}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 w-full"
          containerProps={{
            className: "min-w-[200px]"
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {showResults && (
          <div className="absolute bg-white border border-gray-300 shadow-xl mt-2 w-full max-h-[300px] overflow-y-auto z-50 rounded-lg">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                Loading...
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="py-1">
                {searchResults.map((result) => (
                  <CoinListItem 
                    key={result.id} 
                    result={result}
                  />
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};