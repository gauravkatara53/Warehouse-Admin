import React, { useState, useEffect } from "react";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTimes } from "@fortawesome/free-solid-svg-icons"; // Wallet and close icons
import CardWrapper2 from "./WHWrapper2";

interface Coupon {
  _id: string;
  couponCode: string;
  discountType: string;
  discountValue: number;
  minimumPurchaseAmount: number;
  maximumDiscountAmount: number;
  expiryDate: string;
  isActive: boolean;
  usageLimit: number;
  applicableWarehouses: string[];
}

const Coupons: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("verified");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    heading: "",
    subHeading: "",
    bottomHeading: "",
  });

  // Fetch coupons from the API
  const fetchCoupons = async () => {
    try {
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/get-coupon"
      );
      const data = await response.json();
      if (data.success) {
        const fetchedCoupons: Coupon[] = data.data.map((coupon: any) => ({
          _id: coupon._id,
          couponCode: coupon.couponCode,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          minimumPurchaseAmount: coupon.minimumPurchaseAmount,
          maximumDiscountAmount: coupon.maximumDiscountAmount,
          expiryDate: coupon.expiryDate,
          isActive: coupon.isActive,
          usageLimit: coupon.usageLimit,
          applicableWarehouses: coupon.applicableWarehouses,
        }));
        setActiveCoupons(fetchedCoupons);
      }
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleAddCoupon = async () => {
    const selectedWarehouses = [
      "66d6b933743d8652008b646c",
      "66d6b933743d8652008b646c",
    ];

    const uniqueWarehouses = Array.from(new Set(selectedWarehouses));

    const newCouponData = {
      couponCode: newCoupon.heading,
      discountType: "Percentage",
      discountValue: parseInt(newCoupon.bottomHeading),
      minimumPurchaseAmount: parseInt(newCoupon.subHeading),
      maximumDiscountAmount: 50,
      expiryDate: "2024-12-31T23:59:59Z",
      isActive: true,
      usageLimit: 100,
      applicableWarehouses: uniqueWarehouses,
    };

    try {
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/create-coupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCouponData),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        const createdCoupon: Coupon = {
          _id: data.data?._id || "NA", // Fallback to "NA" if _id is not found
          couponCode: newCoupon.heading,
          discountType: "Percentage",
          discountValue: parseInt(newCoupon.bottomHeading),
          minimumPurchaseAmount: parseInt(newCoupon.subHeading),
          maximumDiscountAmount: 50,
          expiryDate: "2024-12-31T23:59:59Z",
          isActive: true,
          usageLimit: 100,
          applicableWarehouses: uniqueWarehouses,
        };

        setActiveCoupons((prevCoupons) => [...prevCoupons, createdCoupon]);

        // Close the modal and reset the new coupon state
        setShowModal(false);
        setNewCoupon({
          heading: "",
          subHeading: "",
          bottomHeading: "",
        });
      } else {
        console.error(
          "Failed to create coupon:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    }
  };

  // Define your update and delete functions here
  const updateCoupon = async (id: string, updatedIsActive: boolean) => {
    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/update-coupon/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: updatedIsActive,
            // Optional fields, include them if necessary:
            // discountType: "Percentage",
            // discountValue: 15,
            // minimumPurchaseAmount: 100,
            // maximumDiscountAmount: 500,
            // expiryDate: "2024-12-31",
            // usageLimit: 5,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Output: "Coupon updated successfully"

        // Update the local coupons state after successful update
        setActiveCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
            coupon._id === id
              ? { ...coupon, isActive: updatedIsActive }
              : coupon
          )
        );
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const response = await fetch(
          `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/delete-coupon/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Delete response:", data);
        fetchCoupons();
        // Check if the delete was successful before removing it from state
        if (data.success) {
          // Fetch updated coupons after deleting
          fetchCoupons(); // Call fetchCoupons to refresh the list
          console.log("Coupon deleted successfully"); // Log only on success
        } else {
          console.error(
            "Failed to delete coupon:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  return (
    <section className="px-3 lg:px-6 py-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md pb-4 font-medium sm:text-xl">
          Manage Coupons
        </h2>
        <div>
          <button
            className="bg-[#9F8EF2] text-white px-2 text-sm py-1 rounded"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>

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

      <div className="mt-4 space-y-4">
        {activeTab === "verified" && (
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {activeCoupons
                .filter((coupon) => coupon.isActive)
                .map((coupon) => (
                  <CardWrapper2
                    key={coupon._id}
                    heading={coupon.couponCode}
                    subHeading={`Min purchase: $${coupon.minimumPurchaseAmount}`}
                    bottomHeading={`${coupon.discountValue}% off`}
                    icon={<FontAwesomeIcon icon={faWallet} />}
                    className="w-full"
                    onUpdate={() => updateCoupon(coupon._id, !coupon.isActive)} // Pass update handler
                    onDelete={() => handleDelete(coupon._id)} // Pass delete handler
                  />
                ))}
            </div>
          </div>
        )}

        {activeTab === "premium" && (
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {activeCoupons
                .filter((coupon) => !coupon.isActive)
                .map((coupon) => (
                  <CardWrapper2
                    key={coupon._id}
                    heading={coupon.couponCode}
                    subHeading={`Min purchase: $${coupon.minimumPurchaseAmount}`}
                    bottomHeading={`${coupon.discountValue}% off`}
                    icon={<FontAwesomeIcon icon={faWallet} />}
                    className="w-full"
                    onUpdate={() => updateCoupon(coupon._id, !coupon.isActive)} // Pass update handler
                    onDelete={() => handleDelete(coupon._id)} // Pass delete handler
                  />
                ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Coupon</h3>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Coupon</label>
                <input
                  type="text"
                  name="heading"
                  value={newCoupon.heading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Coupon Code"
                />
              </div>
              <div>
                <label className="block font-medium">Minimum Purchase</label>
                <input
                  type="text"
                  name="subHeading"
                  value={newCoupon.subHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Minimum Purchase Amount"
                />
              </div>
              <div>
                <label className="block font-medium">Discount</label>
                <input
                  type="text"
                  name="bottomHeading"
                  value={newCoupon.bottomHeading}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Discount Percentage"
                />
              </div>

              <div className="mt-4">
                <CustomButton2
                  className="bg-[#9F8EF2] text-white w-full"
                  onClick={handleAddCoupon}
                >
                  Add Coupon
                </CustomButton2>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Coupons;
