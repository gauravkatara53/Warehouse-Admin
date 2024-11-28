import React, { useState } from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import WarehouseInfo from "./WarehousList/WarehousesInfo";
import WarehouseCard from "../../Components/Warehouse/WarehouseCard";
import WarehouseProfile from "./WarehousList/WarehouseProfile/WarehouseProfile";

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
}
const Warehouses: React.FC = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );

  // Handler for selecting a warehouse
  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
  };

  // Handler for going back to the list view
  const handleBackClick = () => {
    setSelectedWarehouse(null);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        {/* Conditional rendering based on selectedWarehouse */}
        {selectedWarehouse ? (
          // Show WarehouseProfile if a warehouse is selected
          <WarehouseProfile
            warehouse={selectedWarehouse}
            onBackClick={handleBackClick}
          />
        ) : (
          // Show list view if no warehouse is selected
          <>
            <div>
              <WarehouseCard />
            </div>
            <div className="flex flex-wrap lg:flex-nowrap gap-6">
              <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
                <div className="min-h-[200px] rounded-lg">
                  <WarehouseInfo onWarehouseSelect={handleWarehouseSelect} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Warehouses;
