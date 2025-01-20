import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCalendarAlt,
  faSearch,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";
import Pagination from "@/Components/Common/Pagination/Pagination";
import RentOrSellTag from "../../../Components/Warehouse/RentorSellTag";
import DateRangeModal from "../../../Components/Warehouse/DateRangeModal";
import Message from "@/Components/Common/NotFoundPage/Message";

interface Price {
  title: string;
  amount: number;
  discount: number;
  _id: string;
}

interface Warehouse {
  _id: string;
  name: string;
  about: string;
  price: Price[];
  location: {
    type: string;
    coordinates: [number, number];
  };
  rentOrSell: "Rent" | "Sell";
  warehouseAddress: string;
  imageUrl?: string;
  phone: string;
  createdAt: string;
  bookings: string;
  partnerName: string;
  ratingCount: string;
  state: string;
  city: string;
  pincode: number;
  address: string;
  country: string;
  thumbnail: string;
  WarehouseStatus: string;
  totalPrice: number;
}

const WarehouseInfo: React.FC = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [filteredWarehouses, setFilteredWarehouses] = useState<Warehouse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const WAREHOUSES_PER_PAGE = 10;

  const fetchWarehouses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<{
        success: boolean;
        data: {
          warehouses: Warehouse[];
        };
      }>("/warehouse/all/warehouse");

      if (response?.success) {
        setWarehouses(response.data.warehouses);
        setFilteredWarehouses(response.data.warehouses); // Set the filtered list initially
      } else {
        setError("Failed to fetch warehouses.");
      }
    } catch {
      setError("An error occurred while fetching warehouses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, startDate, endDate]);

  const applyFilters = () => {
    let filtered = [...warehouses];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((warehouse) => {
        const createdAtDate = new Date(warehouse.createdAt);
        return createdAtDate >= startDate && createdAtDate <= endDate;
      });
    }

    setFilteredWarehouses(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      applyFilters();
      closeModal();
    } else {
      console.log("Please select both start and end dates.");
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Pagination Logic
  const startIndex = (currentPage - 1) * WAREHOUSES_PER_PAGE;
  const currentPageWarehouses = filteredWarehouses.slice(
    startIndex,
    startIndex + WAREHOUSES_PER_PAGE
  );
  const handlePartnerClick = (partnerId: string) => {
    if (partnerId) {
      navigate(`/warehouse-profile/${partnerId}`);
    } else {
      alert("Partner document ID is missing.");
    }
  };

  return (
    <div>
      <section className="px-3 rounded-md bg-white lg:px-6 py-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-md font-medium sm:text-xl">
            Warehouses Listing Information
          </h2>
          <div className="flex items-center space-x-2" onClick={openModal}>
            <span className="text-gray-500 flex items-center space-x-1 cursor-pointer">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-500" />
              <span>
                {startDate && endDate
                  ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                  : "Select Date Range"}
              </span>
            </span>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search by warehouse name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
          </div>
        ) : error ? (
          <Message message={error} />
        ) : currentPageWarehouses.length === 0 ? (
          <Message message="No Warehouse found." />
        ) : (
          currentPageWarehouses.map((warehouse) => (
            <div
              key={warehouse._id}
              onClick={() => handlePartnerClick(warehouse._id)}
              className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-md"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={warehouse.thumbnail || "default-image.png"}
                    alt={warehouse.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium">
                    {warehouse.name}{" "}
                    <RentOrSellTag type={warehouse.rentOrSell} />
                  </h3>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span className="text-gray-600">
                      {warehouse.WarehouseStatus}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Price:{" "}
                    <span className="text-gray-600">
                      ₹ {warehouse.totalPrice}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Address:{" "}
                    <span className="text-gray-600">{warehouse.address}</span>
                  </p>
                </div>
              </div>
              <div
                onClick={() => handlePartnerClick(warehouse._id)}
                className="flex items-center border border-gray-400 p-2 rounded-full cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-gray-600"
                />
              </div>
            </div>
          ))
        )}
      </section>

      <Pagination
        totalPages={Math.ceil(filteredWarehouses.length / WAREHOUSES_PER_PAGE)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <DateRangeModal
        isOpen={modalOpen}
        onClose={closeModal}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApply={handleApply}
      />
    </div>
  );
};

export default WarehouseInfo;
