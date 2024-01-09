import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";

export const SearchComponent = () => {


  return (
    <div className="mb-4 flex flex-col justify-center md:flex-row md:items-center mx-5 items-center">
      <div className="flex w-full md:w-6/12 lg:w-5/12 xl:w-4/12 gap-2">
        <Input
          disabled
          placeholder="Soon..."
          labelProps={{
            className: "hidden",
          }}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          className="!border-1 !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 w-full"
        />
      </div>
    </div>
  );
};
