import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface WarehouseModalProps {
  warehouse: any;
  onClose: () => void;
}

const WarehouseModal: React.FC<WarehouseModalProps> = ({
  warehouse,
  onClose,
}) => {
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="relative bg-white w-full max-w-md p-6 pb-1 rounded-lg ">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Modal Content */}
      <h2 className=" font-medium mb-4">
        <span className="text-gray-600 text-lg">Warehouse Detail:</span>{" "}
        <span className="text-gray-400 text-sm">{warehouse._id}</span>
      </h2>

      <div className="flex mb-4">
        <div className="w-3/4 flex items-center">
          <img
            src="Mask Group.png"
            alt="Logo"
            className="h-12 w-12 border rounded-md mr-2"
          />
          <h1 className="text-gray-800 text-lg whitespace-nowrap">
            {warehouse.name}
          </h1>
        </div>
        <div className="w-1/4 flex items-center justify-end">
          <span className="bg-white border text-green-500 px-3 py-1 rounded">
            Active
          </span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-100 p-3 rounded-xl">
          <span className="text-gray-600 text-lg">Partner Name</span>
          <span className="text-right">{warehouse.PartnerName || "N/A"}</span>
        </div>
        <div className="bg-gray-100 mb-4 p-3 rounded-xl">
          <h3 className="font-semibold mb-2 text-gray-600">
            Warehouse Details
          </h3>
          <div className="grid grid-cols-2 gap-2 text-gray-600">
            <span>Listed on</span>
            <span className="text-right">
              {warehouse.createdAt ? formatDate(warehouse.createdAt) : "N/A"}
            </span>
            <span>No. of Booking</span>
            <span className="text-right">{warehouse.bookings || "N/A"}</span>
            <span>{warehouse.price[0].title}</span>
            <span className="text-right">₹ {warehouse.price[0].amount}</span>
            <span>Discount on Rent</span>
            <span className="text-right">₹ {warehouse.price[0].discount}</span>
            {warehouse.price[1] && (
              <>
                <span>{warehouse.price[1].title}</span>
                <span className="text-right">
                  ₹ {warehouse.price[1].amount}
                </span>
                {warehouse.price[1].discount !== undefined && (
                  <>
                    <span>Discount on Maintenance</span>
                    <span className="text-right">
                      ₹ {warehouse.price[1].discount}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
          <span>Address</span>
          <span className="text-right">{warehouse.warehouseAddress}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4 text-gray-600 bg-gray-100 p-3 rounded-xl">
          <span>Contact Details</span>
          <div className="flex justify-between">
            <span>{warehouse.phoneNumber || "N/A"}</span>
            <button className="text-[#47A374]">Call Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseModal;
