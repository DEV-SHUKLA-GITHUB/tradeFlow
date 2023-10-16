import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import { IoIosArrowUp} from "react-icons/io";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown(props) {
  
  const [selectedOption, setSelectedOption] = useState(
    props.itemList && props.itemList.length > 0 ? props.itemList[0].value : null
  );

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    if (props.onSelect) {
      props.onSelect(value);
    }
  };

  // Ensure itemList is defined and has values before rendering
  const itemList = props.itemList || [];

  return (
    <div className="w-20 ">
      {props.label&&(
        <label className="block text-sm  font-medium text-gray-700 bg-green-500">
        {props.label}
      </label>
      )}
      <div className="relative inline-block text-right">
        <div>
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="inline-flex w-36  justify-center gap-x-1.5 rounded-lg text-white  px-3 py-3 text-sm font-semibold text-gray-400 shadow-sm border border-gray-400 hover:border-green-500">
                  {selectedOption === null ? props.heading : selectedOption}
                  {props.downarrow&&(
                    <FaChevronDown
                    className="-mr-1 h-5 w-3  text-gray-400"
                    aria-hidden="true"
                  />
                  )}
                  <div className="pl-4">
                  {props.uparrow&&(
                    <IoIosArrowUp
                    className=""
                    aria-hidden="true"
                  />
                  )}
                  {props.uparrow&&(
                    <IoIosArrowUp
                    className=""
                    aria-hidden="true"
                  />
                  )}
                  </div>
                </Menu.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute bg-transparent  overflow-hidden border-gray-700 right-0 z-10 mt-2 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
              
                    <div className="max-h-44 border overflow-y-auto ">
                      {itemList.map((item) => (
                        <Menu.Item key={item.value}>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-700 bg-black "
                                  : "text-gray-400",
                                "block px-4 py-2 text-sm border border-gray-700"
                              )}
                              onClick={() => handleOptionSelect(item.value)}
                            >
                              {item.text}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
}
