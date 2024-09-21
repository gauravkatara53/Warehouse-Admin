// PremiumPartnerList.tsx
import React from "react";
import { Partner } from "./PartnerData";

interface PremiumPartnerListProps {
  partners: Partner[];
}

const PremiumPartnerList: React.FC<PremiumPartnerListProps> = ({
  partners,
}) => {
  return (
    <div>
      {partners.map((partner) => (
        <div key={partner.id} className=" rounded-lg p-4 px-0 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <img
                src={partner.imageUrl || "/path/to/default-avatar.png"}
                alt={partner.name}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
              />
              <div>
                <p className="font-medium text-yellow-500">{partner.name}</p>
                <p className="text-gray-400">{partner.id}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-yellow-500">
                {partner.email}
              </p>
              <p className="text-gray-500 text-right">{partner.mobile}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumPartnerList;
