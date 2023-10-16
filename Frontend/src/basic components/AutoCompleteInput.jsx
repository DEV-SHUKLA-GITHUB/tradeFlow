import React, { Fragment, useState, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { BsSearch } from 'react-icons/bs';
const CustomCombobox = ({ options, onChange,style }) => {
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (query === "") {
      return options;
    }
  
    const queryWords = query.toLowerCase().split(/\s+/);
  
    return options.filter((option) => {
      const nameWords = option.name.toLowerCase().split(/\s+/);
      return queryWords.every((queryWord) =>
        nameWords.some((nameWord) => nameWord.includes(queryWord))
      );
    });
  }, [options, query]);
  

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
    onChange(selectedOption);
  };

  const visibleOptions = filteredOptions.slice(0, 100); // Display only 10 visible options initially

  return (
    <Combobox value={selected} className={style} onChange={handleSelect}>
      <div className="relative  ">
        <div className="relative px-4 py-8 w-full cursor-default overflow-hidden  text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-500 sm:text-sm">
        <Combobox.Input
            value={query}
            className={`w-full bg-[#1C1F25] bg-opacity-25 py-3 pl-5 pr-10 color-transparent text-sm leading-5 border rounded-lg text-white ${query ? "placeholder-transparent" : ""}`}
            placeholder="search"
            displayValue={(option) => option.name}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 h-screen w-full overflow-hidden rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm bg-black text-white border ">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4  text-red-500">
                NOTHING Found .
              </div>
            ) : (
              visibleOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-800 text-white" : "text-white"
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-white"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default CustomCombobox;
