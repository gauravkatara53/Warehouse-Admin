import UserData from "./UserData/Userdata";
import UserCard from "./UserCard";

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
}
interface UserIndexProps {
  onSelectUser: (user: User) => void;
}

const UserIndex: React.FC<UserIndexProps> = ({ onSelectUser }) => {
  return (
    <div>
      <div className=" ">
        {/* Top section with four CardWrapper1 components */}
        <div>
          <UserCard />
        </div>
        <div>
          <UserData onSelectUser={onSelectUser} />
        </div>
      </div>
    </div>
  );
};

export default UserIndex;
