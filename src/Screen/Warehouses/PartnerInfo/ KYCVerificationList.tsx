import React from "react";
import { Partner } from "./PartnerData";

interface KYCVerificationListProps {
  partners: Partner[];
  onViewAndVerify: (partner: Partner) => void;
}

const KYCVerificationList: React.FC<KYCVerificationListProps> = ({
  partners,
  onViewAndVerify,
}) => {
  return (
    <div>
      {partners.map((partner) => (
        <div key={partner.id} className="rounded-lg p-4 px-0 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-start">
              <img
                src={partner.imageUrl || "/path/to/default-avatar.png"}
                alt={partner.name}
                className="w-12 h-12 rounded-full bg-gray-200 mr-4"
              />
              <div>
                <p className="font-medium">{partner.name}</p>
                <p className="text-gray-400">{partner.id}</p>
              </div>
            </div>
            <div>
              <button
                className="text-green-500"
                onClick={() => onViewAndVerify(partner)}
              >
                View and Verify
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KYCVerificationList;
