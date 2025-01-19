import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import apiService from "@/Components/APIService/apiService";

interface Partner {
  _id: string;
  status: string;
  kycDocId: string;
  partnerDocId: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  documentType?: string;
  image?: string;
  documentNumber?: string;
  nameOnDocument?: string;
  frontImage?: string;
  backImage?: string;
}

interface KYCVerificationPopupProps {
  partner: Partner;
  onClose: () => void;
  onVerify: (partner: Partner) => void;
  onReject: () => void;
}

const KYCVerificationPopup: React.FC<KYCVerificationPopupProps> = ({
  partner,
  onClose,
  onVerify,
  onReject,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState<
    "Verified" | "Rejected" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [detailedData, setDetailedData] = useState<any>(null);

  const fetchPartnerDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.get<any>(
        `/kyc/admin/kyc/detail/${partner._id}`
      );
      setDetailedData(response.data.kycRecord || null);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to fetch detailed data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerDetails();
  }, [partner]);

  const handleVerify = async () => {
    try {
      setLoadingButton("Verified");
      setErrorMessage("");

      const requestData = {
        kycStatus: "Verified",
        message: "KYC is successfully verified",
      };

      const response = await apiService.put(
        `/kyc/verify/${partner.kycDocId}`,
        requestData
      );

      if (response) {
        onVerify(partner);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to verify KYC.");
    } finally {
      setLoadingButton(null);
      onClose();
    }
  };

  const handleReject = async () => {
    const rejectionReason = prompt("Please provide a reason for rejection:");
    if (!rejectionReason) {
      setErrorMessage("Rejection reason is required.");
      return;
    }

    try {
      setLoadingButton("Rejected");
      setErrorMessage("");

      const requestData = {
        kycStatus: "Rejected",
        message: rejectionReason,
      };

      const response = await apiService.put(
        `/kyc/verify/${partner.kycDocId}`,
        requestData
      );

      if (response) {
        onReject(); // Trigger data refresh on rejection
        onClose();
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to reject KYC.");
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">KYC Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center pb-4 items-center">
            <ClipLoader size={30} color="#4A90E2" />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          detailedData && (
            <div>
              <h3 className="text-lg font-semibold">Details</h3>
              <p>Name: {detailedData.nameOnDocument}</p>
              <p>Email: {partner.email || "N/A"}</p>
              <p>Mobile: {partner.phone || "N/A"}</p>
              <h3 className="text-lg font-semibold mt-4">Document Type</h3>
              <div className="bg-gray-300 p-2 rounded mb-4">
                {detailedData.documentType || "N/A"}
              </div>
              <h3 className="text-lg font-semibold">
                {detailedData.documentType || "Document"} Number
              </h3>
              <div className="bg-gray-300 p-2 rounded mb-4">
                {detailedData.documentNumber || "N/A"}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <a
                  href={detailedData.frontImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-md font-semibold">Front Image</h3>
                  <div className="w-full rounded border overflow-hidden">
                    <img
                      src={
                        detailedData.frontImage ||
                        "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                      }
                      alt="frontImage"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </a>
                <a
                  href={detailedData.backImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-md font-semibold">Back Image</h3>
                  <div className="w-full rounded border overflow-hidden">
                    <img
                      src={
                        detailedData.backImage ||
                        "https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
                      }
                      alt="Back Image"
                      className="w-full h-32 object-cover"
                    />
                  </div>
                </a>
              </div>
            </div>
          )
        )}

        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded border ${
              loadingButton === "Verified"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#9F8EF2] hover:text-white"
            }`}
            onClick={handleVerify}
            disabled={loadingButton !== null}
          >
            {loadingButton === "Verified" ? (
              <ClipLoader size={15} color="#4A90E2" />
            ) : (
              "Verify"
            )}
          </button>
          <button
            className={`px-4 py-2 rounded border ${
              loadingButton === "Rejected"
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#9F8EF2] hover:text-white"
            }`}
            onClick={handleReject}
            disabled={loadingButton !== null}
          >
            {loadingButton === "Rejected" ? (
              <ClipLoader size={15} color="#E94E77" />
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationPopup;
