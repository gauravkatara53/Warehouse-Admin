import ProfileAboveSec from "./ProfileAboveSec";
import RecentListings from "./RecentListing/WarehouseData";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiService from "@/Components/APIService/apiService";
import Sidebar from "@/Components/Common/SideBar/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";

interface Warehouse {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  createdAt: string;
  gender: string;
  lastActive: string;
  avatar: string;
  businessName: string;
  about: string;
  category: string;
  price: { title: string; amount: number }[];
  WarehouseStatus: string;
  location: {
    coordinates: [number, number];
  };
  ratingDetails: [];
  partnerName: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  thumbnail: string;
}

export default function WarehouseProfileMain({}: {}) {
  const { warehouseId } = useParams<{ warehouseId: string }>();
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await apiService.get<{ data: Warehouse }>(
          `/warehouse/admin/get/detail/${warehouseId}`
        );
        if (response && response.data) {
          setWarehouse(response.data);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch partner details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (warehouseId) {
      fetchWarehouseDetails();
    }
  }, [warehouseId]);

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
          {warehouse && warehouseId && (
            <>
              <ProfileAboveSec warehouse={warehouse} />
              <RecentListings warehouseId={warehouseId} />{" "}
              {/* Pass partnerId instead of partner */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
