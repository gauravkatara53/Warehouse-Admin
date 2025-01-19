import React, { useState, useEffect } from "react";
import {
  faSearch,
  faFilter,
  faChevronUp,
  faRedo,
  faChevronDown,
  faDownload,
  faSms,
  faBell,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "../../../../Components/Customers/Calendar"; // Import your custom Calendar component
import DownloadingXL from "./DownloadingXL/DownloadingXL";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

interface FilterBarProps {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedKYCStatus:
    | "completed"
    | "Verified"
    | "Processing"
    | "Rejected"
    | "Not Found"
    | null;
  setSelectedKYCStatus: (
    status:
      | "completed"
      | "Verified"
      | "Processing"
      | "Rejected"
      | "Not Found"
      | null
  ) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrderType: string | null;
  setSelectedOrderType: (orderType: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedDate,
  setSelectedDate,
  selectedKYCStatus,
  setSelectedKYCStatus,
  searchQuery,
  setSearchQuery,
  selectedOrderType,
  setSelectedOrderType,
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

  const toggleKYCStatusDropdown = () => {
    setShowKYCStatusDropdown((prev) => !prev);
  };
  const toggleDownloadingXLModal = () => {
    setShowDownloadingXLModal((prev) => !prev);
  };

  const handleDownloadXLClick = () => {
    toggleDownloadingXLModal();
  };

  const handleDateSelect = (date: string | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleKYCStatusSelect = (
    status: "completed" | "Verified" | "Processing" | "Rejected" | "Not Found"
  ) => {
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
    <div className="mt-4 relative">
      <div className="flex items-center rounded-lg text-gray-600">
        <div className="flex items-center bg-white flex-none w-1/8 rounded-md p-2 mr-1">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none text-sm flex-1 h-10 w-36"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="cursor-pointer ml-2 text-sm w-5 h-5"
          />
        </div>

        <div className="flex items-center rounded-lg  w-full justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg p-4 mr-2 w-full space-x-4 justify-between">
            <div className=" -mr-4 -ml-2">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="self-stretch h-4 w-4"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className=" ml-4 self-stretch h-4 w-4"
              />
              <FontAwesomeIcon
                icon={faSms}
                className=" ml-4  self-stretch h-4 w-4"
              />
              <FontAwesomeIcon
                icon={faBell}
                className="ml-4 self-stretch h-4 w-4"
              />
            </div>
            <div className="flex items-center h-full">
              <FontAwesomeIcon
                icon={faFilter}
                className="mx-2  border-r border-l border-gray-300 px-3 self-stretch"
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
              className="whitespace-nowrap border-r border-gray-300 pr-3 cursor-pointer flex-1 flex justify-between items-center h-full self-stretch order-type-button"
              onClick={toggleOrderTypeModal}
            >
              {selectedOrderType || "Order Type"}
              <FontAwesomeIcon icon={faChevronDown} />
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
                {selectedKYCStatus || "KYC Status"}
                <FontAwesomeIcon
                  icon={showKYCStatusDropdown ? faChevronUp : faChevronDown}
                  className="ml-2"
                />
              </span>
              {showKYCStatusDropdown && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg z-50 kyc-dropdown">
                  <ul className="py-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleKYCStatusSelect("Verified")}
                    >
                      Verified
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleKYCStatusSelect("Processing")}
                    >
                      Processing
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleKYCStatusSelect("Rejected")}
                    >
                      Rejected
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleKYCStatusSelect("Not Found")}
                    >
                      Not Found
                    </li>
                  </ul>
                </div>
              )}
            </span>
            <span
              className="text-red-500 cursor-pointer flex-1 flex items-center h-full  whitespace-nowrap "
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Reset Filter
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
