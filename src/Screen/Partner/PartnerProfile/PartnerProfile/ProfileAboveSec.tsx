import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns"; // Import format from date-fns
import { Link } from "react-router-dom";
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
}

interface ProfileAboveSecProps {
  partner: Partner;
}

const ProfileAboveSec: React.FC<ProfileAboveSecProps> = ({ partner }) => {
  const formattedDate = partner.createdAt
    ? format(new Date(partner.createdAt), "d MMM yyyy 'at' h:mm a")
    : "N/A";

  return (
    <div className="flex flex-col bg-gray-100 pt-10 px-4">
      <div className="self-start mb-4">
        <Link to={"/partners"}>
          <button className="text-gray-600">
            <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5" />
          </button>
        </Link>
      </div>

      <div className="p-2 -ml-2 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-stretch gap-6">
        <div className="flex-shrink-0 flex items-stretch">
          <img
            src={
              partner.avatar ||
              "https://pub-50749ce34b5e4abfa121ac60a6fdd9b2.r2.dev/AVATAR/ca6ea07a-fae9-4d78-834c-53a1adfd9ab7.jpg"
            }
            alt="Profile"
            className="rounded-lg object-cover w-72 h-80"
          />
        </div>

        <div className="flex-1 mx-4 min-h-[22rem] flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {partner.name || "N/A"}
          </h2>
          <p className="text-gray-500 mb-6">
            Partner ID: {partner._id || "N/A"}
          </p>

          <div className="grid grid-cols-2 gap-6 text-gray-700 mb-16">
            <div className="mr-4">
              <p className="font-semibold">Mobile Number</p>
              <p className="text-gray-600">{partner.phone || "N/A"}</p>
              <p className="font-semibold mt-4">Email</p>
              <p className="text-gray-600">{partner.email || "N/A"}</p>
              <p className="font-semibold mt-4">Joined Date</p>
              <p className="text-gray-600">{formattedDate || "N/A"}</p>
            </div>
            <div className="ml-4">
              <p className="font-semibold">Business Name</p>
              <p className="text-gray-600">{partner.businessName || "N/A"}</p>
              <p className="font-semibold mt-4">Gender</p>
              <p className="text-gray-600">{partner.gender || "N/A"}</p>
              <p className="font-semibold mt-4">Last Active</p>
              <p className="text-gray-600">{partner.lastActive || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAboveSec;
