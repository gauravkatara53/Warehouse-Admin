import ProfileAboveSec from "./ProfileAboveSec";
import RecentListings from "./RecentListing/PartnerData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "@/Components/APIService/apiService";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";

interface Partner {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  membershipStatus: string;
  kycStatus: string;
  date: string;
  createdAt: string;
  gender: string;
  lastActive: string;
  dob: string;
  avatar: string;
  businessName: string;
  rentOrSell: string;
  numberOfBooking: string;
  price: { amount: number; title: string; discount: number }[];
}

export default function PartnerProfileMain({}: {}) {
  const { partnerId } = useParams<{ partnerId: string }>();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await apiService.get<{ data: Partner }>(
          `/partner/admin/partner/profile/${partnerId}`
        );
        if (response && response.data) {
          setPartner(response.data);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch partner details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchPartnerDetails();
    }
  }, [partnerId]);

  if (loading)
    return (
      <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-center w-full h-full">
          {/* Clip Loader displayed while loading */}
          <ClipLoader
            className="mt-48"
            size={50}
            color="#4FD1C5"
            loading={loading}
          />
        </div>
      </div>
    );

  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="flex flex-wrap lg:flex-nowrap overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-wrap lg:flex-nowrap -mt-8">
        <div className="p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
          {partner && partnerId && (
            <>
              <ProfileAboveSec partner={partner} />
              <RecentListings partnerId={partnerId} />{" "}
              {/* Pass partnerId instead of partner */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
