import React from "react";
import { Partner } from "./PartnerData";

interface KYCVerificationPopupProps {
  partner: Partner;
  onClose: () => void;
  onVerify: (partner: Partner) => void;
}

const KYCVerificationPopup: React.FC<KYCVerificationPopupProps> = ({
  partner,
  onClose,
  onVerify,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Verify KYC</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Details</h3>
          <p>Name: {partner.name}</p>
          <p>Email: {partner.email ? partner.email : "N/A"}</p>
          <p>Mobile: {partner.mobile ? partner.mobile : "N/A"}</p>

          <h3 className="text-lg font-semibold mt-4">Document</h3>
          <div className="bg-gray-300 p-2 rounded mb-4">Adhar Card</div>

          <h3 className="text-lg font-semibold">Image</h3>
          <img
            src="https://cdn.pixabay.com/photo/2022/11/09/00/44/aadhaar-card-7579588_1280.png"
            alt="Adhar"
            className="w-full rounded mb-4"
          />
        </div>

        <div className="flex space-x-4">
          <button
            className="bg-white text-gray-700 border  px-4 py-2 rounded hover:bg-[#9F8EF2] hover:text-white"
            onClick={onClose} // Closes the popup on Reject
          >
            Reject
          </button>
          <button
            className="bg-white text-gray-700 border  px-4 py-2 rounded hover:bg-[#9F8EF2] hover:text-white"
            onClick={() => onVerify(partner)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationPopup;
