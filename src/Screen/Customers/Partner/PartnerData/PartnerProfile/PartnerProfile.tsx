import ProfileAboveSec from "./ProfileAboveSec";
import RecentListings from "./RecentListing/PartnerData";

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

interface PartnerProfileProps {
  partner: Partner;
  onBackClick: () => void;
}

export default function PartnerProfile({
  partner,
  onBackClick,
}: PartnerProfileProps) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap -mt-8">
      <div className="p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        <ProfileAboveSec partner={partner} onBackClick={onBackClick} />
        <RecentListings partner={partner} />
      </div>
    </div>
  );
}
