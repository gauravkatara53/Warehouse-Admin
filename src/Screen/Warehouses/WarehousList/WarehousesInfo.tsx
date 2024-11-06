import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import "react-datepicker/dist/react-datepicker.css";

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
}
interface WarehouseInfoProps {
  onWarehouseSelect: (Warehouse: Warehouse) => void;
}

const WarehouseInfo = ({ onWarehouseSelect }: WarehouseInfoProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [allWarehouse, setAllWarehouse] = useState<Warehouse[]>([]);
  const warehousePerPage = 5;

  useEffect(() => {
    const fetchWarehouses = async () => {
      setLoading(true);
      let page = 1;
      let fetchedWarehouses: Warehouse[] = [];
      let totalFetchedWarehouses = 0;

      try {
        do {
          const response = await apiService.get<{
            success: boolean;
            data: Warehouse[];
            page: number;
            pages: number;
            pageSize: number;
            total: number;
          }>(
            `/warehouse/all-warehouses?page=${page}&pageSize=${warehousePerPage}`
          );

          if (response && response.data) {
            fetchedWarehouses = [...fetchedWarehouses, ...response.data];
            totalFetchedWarehouses = response.total;
            page++;
          }
        } while (page <= Math.ceil(totalFetchedWarehouses / warehousePerPage));

        setAllWarehouse(fetchedWarehouses);
        // setWarehouses(fetchedWarehouses);
        // setTotalPages(Math.ceil(totalFetchedWarehouses / warehousePerPage));
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateSelection = () => {
    if (startDate && endDate) {
      closeModal();
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const filteredWarehouses = allWarehouse.filter((warehouse) => {
    const matchesSearchTerm = warehouse.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isWithinDateRange =
      (!startDate || new Date(warehouse.createdAt) >= startDate) &&
      (!endDate || new Date(warehouse.createdAt) <= endDate);

    return matchesSearchTerm && isWithinDateRange;
  });

  const sortFilteredWarehouse = (warehouses: Warehouse[]) => {
    return warehouses.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortedWarehouse = sortFilteredWarehouse(filteredWarehouses);

  const paginatedWarehouse = sortedWarehouse.slice(
    (currentPage - 1) * warehousePerPage,
    currentPage * warehousePerPage
  );

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
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center ">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Search by warehouse name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader size={50} color={"#4FD1C5"} loading={loading} />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredWarehouses.length === 0 ? (
          <p>No results found.</p>
        ) : (
          paginatedWarehouse.map((warehouse) => (
            <div
              key={warehouse._id}
              className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-md"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24  -my-2 -ml-1 bg-gray-200 rounded-md overflow-hidden">
                  <img
                    src={warehouse.imageUrl || "Group 48096434.png"}
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
                    {warehouse.price[0].title}:{" "}
                    <span className="text-gray-600">
                      ₹{warehouse.price[0].amount}
                    </span>{" "}
                    (Discount: ₹{warehouse.price[0].discount})
                  </p>
                  <p className="text-sm text-gray-400">
                    Address:{" "}
                    <span className="text-gray-600">
                      {warehouse.warehouseAddress}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Partner ID:{" "}
                    <span className="text-gray-600">{warehouse._id}</span>
                  </p>
                </div>
              </div>
              <div
                className="flex items-center border border-gray-400 p-2 rounded-full cursor-pointer"
                onClick={() => onWarehouseSelect(warehouse)}
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
        totalPages={Math.ceil(sortedWarehouse.length / warehousePerPage)}
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
        onApply={handleDateSelection}
      />
    </div>
  );
};

export default WarehouseInfo;
