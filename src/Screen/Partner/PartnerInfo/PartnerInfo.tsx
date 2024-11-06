import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import VerifiedPartnerList from "./VerifiedPartnerList";
import WithoutKYCPartnerList from "./WithoutKYCPartnerList";
import KYCVerificationList from "./ KYCVerificationList";
import CustomButton2 from "./CustomButton2";
import PremiumPartnerList from "./PremiumPartnerList";
import Pagination from "@/Components/Common/Pagination/Pagination"; // Import the custom Pagination component

const PartnerInformation: React.FC = () => {
  const location = useLocation();
  const initialTab = location.state?.initialTab || "verified"; // Default to "verified" if no initialTab is provided

  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <div>
      <div className="bg-white p-6 rounded-md">
        <h1 className="text-xl font-medium mb-4">Partner Information</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <CustomButton2
            className={
              activeTab === "verified"
                ? "text-white"
                : "border border-gray-300 bg-white"
            }
            onClick={() => setActiveTab("verified")}
          >
            Verified Partner
          </CustomButton2>
          <CustomButton2
            className={
              activeTab === "premium"
                ? "text-white"
                : "border border-gray-300 bg-white"
            }
            onClick={() => setActiveTab("premium")}
          >
            Premium Partner
          </CustomButton2>
          <CustomButton2
            className={
              activeTab === "kyc"
                ? "text-white"
                : "border border-gray-300 bg-white"
            }
            onClick={() => setActiveTab("kyc")}
          >
            KYC to be Verified
          </CustomButton2>
          <CustomButton2
            className={
              activeTab === "withoutKYC"
                ? "text-white"
                : "border border-gray-300 bg-white"
            }
            onClick={() => setActiveTab("withoutKYC")}
          >
            Users who don’t submit KYC
          </CustomButton2>
        </div>

        {/* Active Tab Content */}
        <div>
          {activeTab === "verified" && (
            <VerifiedPartnerList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
          )}
          {activeTab === "premium" && (
            <PremiumPartnerList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
          )}
          {activeTab === "withoutKYC" && (
            <WithoutKYCPartnerList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
          )}
          {activeTab === "kyc" && (
            <KYCVerificationList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setTotalPages={setTotalPages}
            />
          )}
        </div>
      </div>
      {/* Pagination (Outside white background) */}
      <div className="">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PartnerInformation;
