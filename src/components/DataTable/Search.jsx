/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
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
        className="cursor-pointer hover:bg-white/5 p-2 flex items-center transition-colors duration-200 border-b border-white/5 last:border-0"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 p-1 backdrop-blur-sm border border-white/10 mr-3 overflow-hidden">
          <img 
            src={result.large} 
            alt={result.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium truncate">{result.name}</p>
          <p className="text-neutral-400 text-sm uppercase truncate">{result.symbol}</p>
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

  const showResults = searchTerm.trim() !== "";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative" ref={searchRef}>
      <div className="relative w-full">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-100"></div>
        
        {/* Input */}
        <div className="relative">
          <Input
            placeholder="Search..."
            labelProps={{
              className: "hidden",
            }}
            icon={<MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />}
            className="!border !border-white/10 bg-white/5 backdrop-blur-md text-white shadow-lg placeholder:text-neutral-400 focus:!border-white/20 w-full !ring-0"
            containerProps={{
              className: "min-w-[200px]"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Results dropdown */}
        {showResults && (
          <div className="absolute mt-2 backdrop-blur-md bg-neutral-800/50 border border-white/10 shadow-2xl w-full max-h-[300px] overflow-y-auto z-50 rounded-xl">
            {isLoading ? (
              <div className="p-4 text-center text-neutral-400">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
              <div className="p-4 text-center text-neutral-400">
                No results found for {searchTerm}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
