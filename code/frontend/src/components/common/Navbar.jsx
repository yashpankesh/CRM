import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTheme } from "../../context/ThemeContext";

const CalendarIcon = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ cursor: "pointer" }}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Navbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => {
    setCalendarOpen((prev) => !prev);
  };

  return (
    <nav
      className={`w-full px-6 py-4 shadow-sm border-b ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
    >
      <div className="relative flex justify-between items-center gap-4">
        {/* Left: Logo */}
        <div className="text-xl font-bold text-blue-600">RealEstate CRM</div>

        {/* Center: Search (absolutely centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-xs hidden md:block">
          <input
            type="search"
            placeholder="Search..."
            className={`w-full px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500
              ${isDark
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
          />
        </div>

        {/* Right: Nav links and calendar */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li
            className={`font-bold hover:text-blue-500 cursor-pointer ${isDark ? "text-gray-300" : "text-gray-700"
              }`}
          >
            Team
          </li>

          <li className="relative">
            <CalendarIcon
              className={`w-6 h-6 hover:text-blue-500 ${isDark ? "text-gray-300" : "text-gray-700"
                }`}
              onClick={toggleCalendar}
            />
            {calendarOpen && (
              <div
                className={`absolute top-8 right-0 z-50 ${isDark ? "bg-gray-800" : "bg-white"
                  } p-2 rounded shadow-lg`}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }}
                  inline
                  calendarClassName={isDark ? "react-datepicker-dark" : ""}
                />
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
