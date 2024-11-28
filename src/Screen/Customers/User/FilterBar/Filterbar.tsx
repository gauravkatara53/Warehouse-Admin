import React, { useState, useEffect } from "react";
import {
  faSearch,
  faFilter,
  faChevronUp,
  faRedo,
  faChevronDown,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../../../Components/Customers/Calendar";
import DownloadingXL from "./DownloadingXL/DownloadingXL";

interface FilterBarProps {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedKYCStatus: "completed" | "Not completed" | null;
  setSelectedKYCStatus: (status: "completed" | "Not completed" | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrderType: string | null; // Add selected order type
  setSelectedOrderType: (orderType: string | null) => void; // Add set function for order type
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedDate,
  setSelectedDate,
  selectedKYCStatus,
  setSelectedKYCStatus,
  searchQuery,
  setSearchQuery,
  selectedOrderType,
  setSelectedOrderType, // Add prop for order type
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showKYCStatusDropdown, setShowKYCStatusDropdown] = useState(false);
  const [showOrderTypeModal, setShowOrderTypeModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempOrderType, setTempOrderType] = useState<string | null>(null);
  const [showDownloadingXLModal, setShowDownloadingXLModal] = useState(false);

  const toggleOrderTypeModal = () => {
    setShowOrderTypeModal((prev) => !prev);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };
  const toggleDownloadingXLModal = () => {
    setShowDownloadingXLModal((prev) => !prev);
  };

  const handleDownloadXLClick = () => {
    toggleDownloadingXLModal();
  };

  const toggleKYCStatusDropdown = () => {
    setShowKYCStatusDropdown((prev) => !prev);
  };

  const handleDateSelect = (date: string | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleKYCStatusSelect = (status: "completed" | "Not completed") => {
    setSelectedKYCStatus(status);
    setShowKYCStatusDropdown(false);
  };

  const handleOrderTypeSelect = (orderType: string) => {
    setTempOrderType(orderType); // Update temporary order type selection
  };

  const applyOrderType = () => {
    setSelectedOrderType(tempOrderType); // Apply the selected order type
    setShowOrderTypeModal(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      showCalendar &&
      !target.closest(".calendar-modal") &&
      !target.closest(".calendar-button")
    ) {
      setShowCalendar(false);
    }
    if (
      showKYCStatusDropdown &&
      !target.closest(".kyc-dropdown") &&
      !target.closest(".kyc-status-button")
    ) {
      setShowKYCStatusDropdown(false);
    }
    if (
      showOrderTypeModal &&
      !target.closest(".order-type-modal") &&
      !target.closest(".order-type-button")
    ) {
      setShowOrderTypeModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    showCalendar,
    showKYCStatusDropdown,
    showOrderTypeModal,
    showDownloadingXLModal,
  ]);

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedKYCStatus(null);
    setSearchQuery("");
    setSelectedOrderType(null);
    setTempOrderType(null); // Reset temporary order type selection
  };

  return (
    <div className="mt-10 relative">
      <div className="flex items-center rounded-lg text-gray-600">
        <div className="flex items-center bg-white flex-none w-1/3 rounded-lg p-4 mr-2">
          <input
            type="text"
            placeholder="Search by name or number..."
            className="border-none outline-none flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
        </div>
        <div className="flex items-center rounded-lg  w-full justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg p-4 mr-2 w-full space-x-4 justify-between">
            <div className="flex items-center h-full">
              <FontAwesomeIcon
                icon={faFilter}
                className="mr-2 border-r border-gray-300 pr-3 self-stretch"
              />
            </div>

            <div className="flex items-center justify-between border-r border-gray-300 pr-3 h-full self-stretch">
              <span className="whitespace-nowrap">
                {selectedDate || "Select Date"}
              </span>
              <span
                className="cursor-pointer ml-2 flex items-center calendar-button"
                onClick={toggleCalendar}
              >
                {showCalendar ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </span>
              {showCalendar && (
                <>
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40" />
                  <Calendar
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    selectedDate={selectedDate}
                    setSelectedDate={handleDateSelect}
                    closeCalendar={() => setShowCalendar(false)}
                  />
                </>
              )}
            </div>

            <span
              className="border-r border-gray-300 pr-3 cursor-pointer flex-1 flex justify-between items-center h-full self-stretch order-type-button whitespace-nowrap overflow-hidden text-ellipsis"
              onClick={toggleOrderTypeModal}
            >
              {selectedOrderType || "Order Type"}
              <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
            </span>

            {showOrderTypeModal && (
              <>
                <div className="fixed inset-0  bg-opacity-50 z-40">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-40">
                    <div className="flex items-center justify-center  fixed inset-0">
                      <div className="order-type-modal bg-white border border-gray-300 rounded-lg p-4 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                          Select Order Type
                        </h3>
                        <div className="flex justify-between mb-2">
                          <button
                            className={`border rounded-lg w-1/2 mx-1 px-4 py-2 ${
                              tempOrderType === "A-Z"
                                ? "bg-[#4FD1C5] text-white"
                                : ""
                            }`}
                            onClick={() => handleOrderTypeSelect("A-Z")}
                          >
                            A → Z
                          </button>
                          <button
                            className={`border rounded-lg w-1/2 mx-1 px-4 py-2 ${
                              tempOrderType === "Z-A"
                                ? "bg-[#4FD1C5] text-white"
                                : ""
                            }`}
                            onClick={() => handleOrderTypeSelect("Z-A")}
                          >
                            Z → A
                          </button>
                        </div>
                        <div className="flex justify-between mb-2">
                          <button
                            className={`border rounded-lg w-1/2 mx-1 px-4 py-2 ${
                              tempOrderType === "1-50"
                                ? "bg-[#4FD1C5] text-white"
                                : ""
                            }`}
                            onClick={() => handleOrderTypeSelect("1-50")}
                          >
                            1 → 50
                          </button>
                          <button
                            className={`border rounded-lg w-1/2 mx-1 px-4 py-2 ${
                              tempOrderType === "50-1"
                                ? "bg-[#4FD1C5] text-white"
                                : ""
                            }`}
                            onClick={() => handleOrderTypeSelect("50-1")}
                          >
                            50 → 1
                          </button>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-center">
                          <button
                            className="bg-[#4FD1C5] text-white rounded-lg w-full px-4 py-2"
                            onClick={applyOrderType}
                          >
                            Apply now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <span className="border-r border-gray-300 pr-2 relative flex-1 flex justify-between items-center h-full self-stretch">
              <span
                className="cursor-pointer flex items-center kyc-status-button whitespace-nowrap"
                onClick={toggleKYCStatusDropdown}
              >
                {selectedKYCStatus || "Profile status"}
                <FontAwesomeIcon
                  icon={showKYCStatusDropdown ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </span>
              {showKYCStatusDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg z-50 kyc-dropdown">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                      onClick={() => handleKYCStatusSelect("completed")}
                    >
                      Completed
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                      onClick={() => handleKYCStatusSelect("Not completed")}
                    >
                      Not completed
                    </li>
                  </ul>
                </div>
              )}
            </span>
            <span
              className="text-red-500 cursor-pointer flex items-center h-full"
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              <span className="flex-1 text-center">Reset Filter</span>
            </span>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg p-4 px-2 justify-between">
            <span
              className="cursor-pointer flex-1 flex items-center h-full whitespace-nowrap download-button"
              onClick={handleDownloadXLClick}
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" />
              Download in XL
            </span>
          </div>

          {showDownloadingXLModal && (
            <DownloadingXL onClose={toggleDownloadingXLModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;