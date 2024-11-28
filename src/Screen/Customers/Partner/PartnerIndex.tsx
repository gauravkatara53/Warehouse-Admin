import PartnerData from "./PartnerData/PartnerData";
import PartnerCard from "./PartnerCard";
import React from "react";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: String;
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: String;
  lastActive: String;
  dob: String;
  avatar: string;
  businessName: string;
  rentOrSell: string;
  numberOfBooking: string;
  price: { amount: number; title: string; discount: number }[];
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
