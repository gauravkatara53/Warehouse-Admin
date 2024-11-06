import PartnerData from "./PartnerData/PartnerData";
import PartnerCard from "./PartnerCard";
import React from "react";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: string; // Changed from String to string
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: string; // Changed from String to string
  lastActive: string; // Changed from String to string
  dob: string; // Changed from String to string
}

interface PartnerIndexProps {
  onSelectPartner: (partner: Partner) => void;
}
const PartnerIndex: React.FC<PartnerIndexProps> = ({ onSelectPartner }) => {
  return (
    <div>
      <PartnerCard />
      <div>
        <PartnerData onSelectPartner={onSelectPartner} />
      </div>
    </div>
  );
};

export default PartnerIndex;
