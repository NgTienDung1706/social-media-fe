import React, { useState, useRef, useEffect } from "react";
import {
  FaCog,
  FaClosedCaptioning,
  FaVolumeUp,
  FaHeartBroken,
  FaFlag,
  FaEdit,
  FaUserShield,
} from "react-icons/fa";
import { SlOptions } from "react-icons/sl";

const OptionsMenu = ({ options = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState("bottom");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && menuRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Kiểm tra nếu menu vượt quá chiều cao màn hình
      const spaceBelow = windowHeight - buttonRect.bottom;
      const spaceNeeded = menuRect.height;

      if (spaceBelow < spaceNeeded && buttonRect.top > spaceNeeded) {
        setMenuPosition("top"); // Hiển thị menu lên trên
      } else {
        setMenuPosition("bottom"); // Hiển thị menu xuống dưới
      }
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-2"
      >
        <SlOptions size={20} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50 ${
            menuPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                if (option.toggle) {
                  option.onToggle();
                } else {
                  option.action();
                  setIsOpen(false);
                }
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-black focus:outline-none hover:bg-gray-200 "
            >
              <span className="mr-2">{option.icon}</span>
              <span>{option.label}</span>
              {/* {option.toggle && (
                <span className="ml-auto">
                  <input
                    type="checkbox"
                    checked={option.value}
                    onChange={option.onToggle}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </span>
              )} */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionsMenu;
