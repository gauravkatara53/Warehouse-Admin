import ProfileAboveSec from "./ProfileAboveSec";
import RecentListings from "./RecentListing/PartnerData";

interface User {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  profileStatus: string;
  date: string;
  gender: string;
  lastActive: string;
  dob: string;
  createdAt: string;
  username: string;
  avatar: string;
}

interface UserProfileProps {
  user: User;
  onBackClick: () => void;
}

export default function UserProfile({ user, onBackClick }: UserProfileProps) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap -mt-8">
      <div className="p-2 -mt-3 sm:p-4 lg:mt-0 sm:mt-6">
        <ProfileAboveSec user={user} onBackClick={onBackClick} />
        <RecentListings user={user} />
      </div>
    </div>
  );
}
