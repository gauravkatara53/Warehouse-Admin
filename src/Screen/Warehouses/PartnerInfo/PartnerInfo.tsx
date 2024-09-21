import React, { useState } from "react";
import { partners, Partner } from "./PartnerData"; // Import Partner interface
import VerifiedPartnerList from "./VerifiedPartnerList";
import PremiumPartnerList from "./PremiumPartnerList";
import KYCVerificationList from "./ KYCVerificationList";
import CustomButton2 from "./CustomButton2";
import KYCVerificationPopup from "./KYCVerificationPopup";

const PartnerInformation: React.FC = () => {
  // Initialize verified partners with those already marked as verified in the data
  const [verifiedPartners, setVerifiedPartners] = useState<Partner[]>(
    partners.filter((p) => p.status === "verified")
  );

  const [kycPartners, setKycPartners] = useState<Partner[]>(
    partners.filter((p) => p.status === "kyc")
  );

  const [activeTab, setActiveTab] = useState("verified");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleViewAndVerify = (partner: Partner) => {
    setSelectedPartner(partner);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPartner(null);
  };

  const handleVerify = (partner: Partner) => {
    const updatedPartner: Partner = {
      ...partner,
      status: "verified",
    };

    // Update state: Remove from KYC list and add to verified list
    setKycPartners((prev) => prev.filter((p) => p.id !== partner.id));
    setVerifiedPartners((prev) => [...prev, updatedPartner]);
    handleClosePopup();
  };

  const premiumPartners = partners.filter(
    (partner) => partner.status === "premium"
  );

  return (
    <div className="p-4">
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
      </div>

      {/* Active Tab Content */}
      <div>
        {activeTab === "verified" && (
          <VerifiedPartnerList partners={verifiedPartners} />
        )}
        {activeTab === "premium" && (
          <PremiumPartnerList partners={premiumPartners} />
        )}
        {activeTab === "kyc" && (
          <KYCVerificationList
            partners={kycPartners}
            onViewAndVerify={handleViewAndVerify}
          />
        )}
      </div>

      {/* KYC Verification Popup */}
      {showPopup && selectedPartner && (
        <KYCVerificationPopup
          partner={selectedPartner}
          onClose={handleClosePopup}
          onVerify={handleVerify}
        />
      )}
    </div>
  );
};

export default PartnerInformation;
