import React, { useState } from "react";
import CustomButton2 from "@/Screen/Warehouses/PartnerInfo/CustomButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTimes } from "@fortawesome/free-solid-svg-icons"; // Wallet and close icons
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import CardWrapper2 from "@/Components/Common/WHWrapper2";

interface Coupon {
  heading: string;
  subHeading: string;
  bottomHeading: string;
  icon: JSX.Element;
}

const Coupons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("verified");
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([
    {
      heading: "FIRSTUSER",
      subHeading: "First time user",
      bottomHeading: "50% off",
      icon: <FontAwesomeIcon icon={faWallet} />,
    },
    {
      heading: "HAPDIW",
      subHeading: "Diwali Offer",
      bottomHeading: "Flat $500 off",
      icon: <FontAwesomeIcon icon={faPaypal} />,
    },
  ]);

  const [newCoupon, setNewCoupon] = useState({
    heading: "",
    subHeading: "",
    bottomHeading: "",
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleAddCoupon = () => {
    // Add the new coupon to activeCoupons
    const newCouponData: Coupon = {
      heading: newCoupon.heading,
      subHeading: newCoupon.subHeading,
      bottomHeading: newCoupon.bottomHeading,
      icon: <FontAwesomeIcon icon={faWallet} />, // You can change the icon as needed
    };

    setActiveCoupons([...activeCoupons, newCouponData]); // Add new coupon to activeCoupons list
    setShowModal(false); // Close modal after adding coupon

    // Clear the form
    setNewCoupon({
      heading: "",
      subHeading: "",
      bottomHeading: "",
    });
  };

  return (
    <section className="px-3 lg:px-6 py-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md pb-4 font-medium sm:text-xl">
          Manage Coupons
        </h2>
        <div className="">
          <button
            className="bg-[#9F8EF2] text-white px-2 text-sm py-1 rounded"
            onClick={() => setShowModal(true)} // Show modal on click
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

      {/* Coupon Cards */}
      <div className="mt-4 space-y-4">
        {activeTab === "verified" && (
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {activeCoupons.map((coupon, index) => (
                <CardWrapper2
                  key={index}
                  heading={coupon.heading}
                  subHeading={coupon.subHeading}
                  bottomHeading={coupon.bottomHeading}
                  icon={coupon.icon}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <CardWrapper2
                heading="HOLIUSER"
                subHeading="First Holi User"
                bottomHeading="40% off"
                icon={<FontAwesomeIcon icon={faWallet} />}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/4 p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Coupon</h3>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowModal(false)} // Close modal on click
              />
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Coupon</label>
                <input
                  type="text"
                  name="heading"
                  value={newCoupon.heading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter coupon code"
                />
              </div>

              <div>
                <label className="block font-medium">About Coupon</label>
                <input
                  type="text"
                  name="subHeading"
                  value={newCoupon.subHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter about coupon"
                />
              </div>

              <div>
                <label className="block font-medium">Discount</label>
                <input
                  type="text"
                  name="bottomHeading"
                  value={newCoupon.bottomHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter discount (e.g. 50% off)"
                />
              </div>

              {/* Add Coupon Button */}
              <button
                onClick={handleAddCoupon}
                className="bg-[#9F8EF2] text-white px-4 py-2 rounded-md w-full"
              >
                Add Coupon
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Coupons;
