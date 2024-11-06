import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Define CalendarProps and export as part of Calendar itself

interface CalendarProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  closeCalendar: () => void;
  reopenDownloadingXL: () => void; // Ensure this method is included
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  setCurrentMonth,
  selectedDate,
  setSelectedDate,
  closeCalendar,
  reopenDownloadingXL,
}) => {
  const [tempSelectedDate, setTempSelectedDate] = useState<string | null>(
    selectedDate
  );

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const formattedDate = `${String(selected.getDate()).padStart(
      2,
      "0"
    )} ${selected.toLocaleString("default", {
      month: "short",
    })} ${selected.getFullYear()}`;

    setTempSelectedDate(formattedDate);
    setSelectedDate(formattedDate);
    closeCalendar();
    reopenDownloadingXL();
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(
      currentMonth.getMonth() + (direction === "prev" ? -1 : 1)
    );
    setCurrentMonth(newMonth);
  };

  return (
    <div className="calendar-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg p-4 z-50 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <div className="flex space-x-2">
          <button
            className="p-1 rounded hover:bg-gray-200"
            onClick={() => handleMonthChange("prev")}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-200"
            onClick={() => handleMonthChange("next")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={i} />
        ))}
        {daysArray.map((day) => (
          <div
            key={day}
            className={`p-2 cursor-pointer rounded-full transition-all duration-200 ${
              tempSelectedDate ===
              `${String(day).padStart(2, "0")} ${currentMonth.toLocaleString(
                "default",
                { month: "short" }
              )} ${currentMonth.getFullYear()}`
                ? "bg-[#4FD1C5] text-white scale-110"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
