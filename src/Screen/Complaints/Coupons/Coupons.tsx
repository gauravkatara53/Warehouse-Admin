import React, { useState } from "react";

import CustomButton2 from "@/Screen/Warehouses/PartnerInfo/CustomButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; // Wallet icon
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import CardWrapper2 from "@/Components/Common/WHWrapper2";

const Coupons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("verified");

  // Filter complaints based on the active tab

  return (
    <section className="px-3 lg:px-6 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md pb-4 font-medium sm:text-xl">
          Manage Coupouns
        </h2>
        <div className="">
          <button
            className="bg-[#9F8EF2] text-white px-2 text-sm py-1 rounded"
            onClick={() => {
              /* Add logic to show modal or form for adding new card */
            }}
          >
            Add New
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <div className="relative">
          <div className="flex space-x-4 mb-6">
            <CustomButton2
              className={
                activeTab === "verified"
                  ? "text-white w-30"
                  : "border border-gray-300 bg-white w-30"
              }
              onClick={() => setActiveTab("verified")}
            >
              Active Coupons
            </CustomButton2>
            <CustomButton2
              className={
                activeTab === "premium"
                  ? "text-white w-30"
                  : "border border-gray-300 bg-white w-30"
              }
              onClick={() => setActiveTab("premium")}
            >
              Inactive Coupons
            </CustomButton2>
          </div>
        </div>
      </div>

      {/* coupon Cards */}
      <div className="mt-4 space-y-4">
        {activeTab === "verified" && (
          <div className="flex flex-col sm:flex-row justify-center items-start bg-white  p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <CardWrapper2
                heading="FIRSTUSER"
                subHeading="First time user"
                bottomHeading="50% off"
                icon={<FontAwesomeIcon icon={faWallet} />}
                className="w-full sm:w-[200px]" // Set fixed width for desktop
              />
              <CardWrapper2
                heading="HAPDIW"
                subHeading="Diwali Offer"
                bottomHeading="Flat $500 off"
                icon={<FontAwesomeIcon icon={faPaypal} />}
                className="w-full sm:w-[200px]" // Set fixed width for desktop
              />
            </div>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="flex flex-col sm:flex-row justify-center items-start bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <CardWrapper2
                heading="HOLIUSER"
                subHeading="First Holi User"
                bottomHeading="40% off"
                icon={<FontAwesomeIcon icon={faWallet} />}
                className="w-full sm:w-[200px]" // Set fixed width for desktop
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Coupons;
