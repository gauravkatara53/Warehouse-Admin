import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns"; // Import format from date-fns
import { Link } from "react-router-dom";

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

interface ProfileAboveSecProps {
  warehouse: Warehouse;
}

const ProfileAboveSec: React.FC<ProfileAboveSecProps> = ({ warehouse }) => {
  const formattedDate = warehouse.createdAt
    ? format(new Date(warehouse.createdAt), "d MMM yyyy 'at' h:mm a")
    : "N/A";

  return (
    <div className="flex flex-col bg-gray-100 pt-10 px-4">
      <div className="self-start mb-4">
        <Link to={"/warehouses"}>
          <button className="text-gray-600">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
          </button>
        </Link>
      </div>

      <div className="p-2 -ml-2 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
        <div className="flex-shrink-0 flex items-stretch">
          <img
            src={warehouse.avatar || warehouse.thumbnail}
            alt="Profile"
            className="rounded-lg object-cover w-72 h-80"
          />
        </div>

        <div className="flex-1 mx-4 min-h-[22rem] flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {warehouse.name || "N/A"}
          </h2>
          <p className="text-gray-500 mb-6">
            Warehouse ID: {warehouse._id || "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
            <div className="mr-4">
              <p className="font-semibold">Mobile Number</p>
              <p className="text-gray-600">
                {warehouse.partnerName.phone || "N/A"}
              </p>
              <p className="font-semibold mt-4">Email</p>
              <p className="text-gray-600">
                {warehouse.partnerName.email || "N/A"}
              </p>
              <p className="font-semibold mt-4">Joined Date</p>
              <p className="text-gray-600">{formattedDate || "N/A"}</p>
            </div>
            <div className="ml-4">
              <p className="font-semibold">Business Name</p>
              <p className="text-gray-600">{warehouse.businessName || "N/A"}</p>
              <p className="font-semibold mt-4">Gender</p>
              <p className="text-gray-600">{warehouse.gender || "N/A"}</p>
              <p className="font-semibold mt-4">Last Active</p>
              <p className="text-gray-600">{warehouse.lastActive || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAboveSec;
