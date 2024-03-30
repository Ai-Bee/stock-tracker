import { useEffect, useState } from "react";
import SvgComponent from "./SvgComponent";

interface CustomDropDownProps {
  color?: "blue" | "black";
  options: string[];
  defaultValue?: string
  id: string;
  emitSelectedOption: (arg0: string) => void;
}

const CustomDropDown = ({
  color = "blue",
  id,
  defaultValue = "",
  emitSelectedOption,
  options
}: CustomDropDownProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedValue(defaultValue)
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dropdownButton = document.getElementById(
        `dropdown-button-${id}`
      ) as HTMLButtonElement | null;
      const dropdownMenu = document.getElementById(
        `dropdown-menu-${id}`
      ) as HTMLDivElement | null;

      if (
        dropdownButton &&
        dropdownMenu &&
        !dropdownButton.contains(event.target as Node) &&
        !dropdownMenu.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Attach the outside click event listener when the dropdown is open
    if (isDropdownOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    // Remove the outside click event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [id, isDropdownOpen]);

  return (
    <div className="flex">
      <div className="relative inline-block text-left">
        <button
          id={`dropdown-button-${id}`}
          className="inline-flex justify-center w-full px-4 py-2"
          onClick={toggleDropdown}
        >
          <div className="flex gap-4 justify-center items-center">
            <p className="text-sm font-medium" color={color}>
              {selectedValue || "Select"}
            </p>
            <SvgComponent icon="caret-down" />
          </div>
        </button>
        <div
          id={`dropdown-menu-${id}`}
          className={`origin-top-right z-20 absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
            isDropdownOpen ? "" : "hidden"
          }`}
        >
          <div
            className="py-2 z-30 p-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dropdown-button"
          >
            {options.map((item) => (
              <p
                key={item}
                onClick={() => {
                  setSelectedValue(item);
                  emitSelectedOption(item);
                  toggleDropdown(); // Close the dropdown when an option is clicked
                }}
                className="flex rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                role="menuitem"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDropDown;
