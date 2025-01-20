import React from "react";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import WarehouseInfo from "./WarehousList/WarehousesInfo";
import WarehouseCard from "../../Components/Warehouse/WarehouseCard";

const Warehouses: React.FC = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        <div>
          <div>
            <WarehouseCard />
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-6">
            <div className="flex flex-col w-full lg:w-[55%] space-y-6 flex-shrink-0">
              <div className="min-h-[200px] rounded-lg">
                <WarehouseInfo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warehouses;
