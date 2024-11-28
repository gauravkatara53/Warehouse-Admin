import React, { useState, useEffect } from "react";
import CustomButton2 from "@/Screen/Partner/PartnerInfo/CustomButton2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faTimes } from "@fortawesome/free-solid-svg-icons";
import CardWrapper2 from "./WHWrapper2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClipLoader } from "react-spinners";
import Message from "@/Components/Common/NotFoundPage/Message";

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
    maximumDiscountAmount: "",
    usageLimit: "",
    expiryDate: null as Date | null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<boolean>(false);

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
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAddCoupon = async () => {
    setIsLoading(true); // Start loader
    const selectedWarehouses = ["66d6b933743d8652008b646c"];
    const uniqueWarehouses = Array.from(new Set(selectedWarehouses));

    const formattedExpiryDate = newCoupon.expiryDate
      ? newCoupon.expiryDate.toISOString()
      : null;

    const newCouponData = {
      couponCode: newCoupon.heading,
      discountType: "Percentage",
      discountValue: parseInt(newCoupon.bottomHeading),
      minimumPurchaseAmount: parseInt(newCoupon.subHeading),
      maximumDiscountAmount: parseInt(newCoupon.maximumDiscountAmount),
      expiryDate: formattedExpiryDate,
      isActive: true,
      usageLimit: parseInt(newCoupon.usageLimit),
      applicableWarehouses: uniqueWarehouses,
    };

    try {
      const response = await fetch(
        "https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/create-coupon",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCouponData),
        }
      );

      const data = await response.json();
      if (data.success) {
        const createdCoupon: Coupon = {
          _id: data.data?._id || "NA",
          couponCode: newCoupon.heading,
          discountType: "Percentage",
          discountValue: parseInt(newCoupon.bottomHeading),
          minimumPurchaseAmount: parseInt(newCoupon.subHeading),
          maximumDiscountAmount: parseInt(newCoupon.maximumDiscountAmount),
          expiryDate: formattedExpiryDate!,
          isActive: true,
          usageLimit: parseInt(newCoupon.usageLimit),
          applicableWarehouses: uniqueWarehouses,
        };

        setActiveCoupons((prevCoupons) => [...prevCoupons, createdCoupon]);
        setShowModal(false);
        setNewCoupon({
          heading: "",
          subHeading: "",
          bottomHeading: "",
          maximumDiscountAmount: "",
          usageLimit: "",
          expiryDate: null,
        });
      } else {
        console.error(
          "Failed to create coupon:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setIsLoading(false); // End loader
    }
  };

  const updateCoupon = async (id: string, updatedIsActive: boolean) => {
    try {
      const response = await fetch(
        `https://bookmywarehouse-cwd2a3hgejevh8ht.eastus-01.azurewebsites.net/api/v1/coupons/update-coupon/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: updatedIsActive }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

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
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        console.log("Delete response:", data);

        fetchCoupons();

        if (data.success) {
          fetchCoupons();
          console.log("Coupon deleted successfully");
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

  const activeCouponsList = activeCoupons.filter((coupon) => coupon.isActive);
  const inactiveCouponsList = activeCoupons.filter(
    (coupon) => !coupon.isActive
  );

  return (
    <section className="px-3 lg:px-6 py-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg lg:text-md pb-4 font-medium sm:text-xl">
          Manage Coupons
        </h2>
        <button
          className="bg-[#9F8EF2] text-white px-2 text-sm py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          Add New
        </button>
      </div>

      <div className="mb-4">
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

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <ClipLoader color="#9F8EF2" size={50} />
        </div>
      ) : error ? (
        <Message message="Something went wrong" />
      ) : activeTab === "verified" ? (
        activeCouponsList.length > 0 ? (
          <div className="mt-4 space-y-4">
            <div className="flex flex-col bg-white p-4 rounded-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {activeCouponsList.map((coupon) => (
                  <CardWrapper2
                    key={coupon._id}
                    heading={coupon.couponCode}
                    subHeading={`Min: ₹${coupon.minimumPurchaseAmount}`}
                    bottomHeading={`${coupon.discountValue}% off`}
                    icon={<FontAwesomeIcon icon={faWallet} />}
                    onUpdate={() => updateCoupon(coupon._id, false)}
                    onDelete={() => handleDelete(coupon._id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Message message="No active coupons available" />
        )
      ) : inactiveCouponsList.length > 0 ? (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col bg-white p-4 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {inactiveCouponsList.map((coupon) => (
                <CardWrapper2
                  key={coupon._id}
                  heading={coupon.couponCode}
                  subHeading={`Min: ₹${coupon.minimumPurchaseAmount}`}
                  bottomHeading={`${coupon.discountValue}% off`}
                  icon={<FontAwesomeIcon icon={faWallet} />}
                  onUpdate={() => updateCoupon(coupon._id, true)}
                  onDelete={() => handleDelete(coupon._id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Message message="No inactive coupons available" />
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Coupon</h3>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-500 cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="heading"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="heading"
                    placeholder="Coupon Code"
                    value={newCoupon.heading}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subHeading"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Minimum Purchase Amount
                  </label>
                  <input
                    type="text"
                    name="subHeading"
                    placeholder="Minimum Purchase Amount"
                    value={newCoupon.subHeading}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bottomHeading"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Discount Percentage
                  </label>
                  <input
                    type="text"
                    name="bottomHeading"
                    placeholder="Discount Percentage"
                    value={newCoupon.bottomHeading}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="maximumDiscountAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Maximum Discount Amount
                  </label>
                  <input
                    type="text"
                    name="maximumDiscountAmount"
                    placeholder="Maximum Discount Amount"
                    value={newCoupon.maximumDiscountAmount}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="usageLimit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Usage Limit
                  </label>
                  <input
                    type="text"
                    name="usageLimit"
                    placeholder="Usage Limit"
                    value={newCoupon.usageLimit}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <DatePicker
                    selected={newCoupon.expiryDate}
                    onChange={(date: Date | null) =>
                      setNewCoupon({ ...newCoupon, expiryDate: date })
                    }
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Expiry Date"
                    className="w-[335px] border border-gray-300 px-3 py-2 rounded"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddCoupon}
              className={`mt-6 w-full bg-[#9F8EF2] text-white px-4 py-2 rounded-lg flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? <ClipLoader size={20} color="#FFFFFF" /> : "Add"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Coupons;
