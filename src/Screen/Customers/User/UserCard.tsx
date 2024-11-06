import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faUser,
  faGlobe,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface UserStatsResponse {
  success: boolean;
  totalUsers: number;
  thisMonthUsers: number;
  thisYearUsers: number;
  profileCompletedUsers: number;
}

const UserCard = () => {
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    thisMonthUsers: 0,
    thisYearUsers: 0,
    profileCompletedUsers: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchUserStats = async () => {
      const data = await apiService.get<UserStatsResponse>(
        "/admin/user-statistics"
      );
      if (data && data.success) {
        setUserStats({
          totalUsers: data.totalUsers,
          thisMonthUsers: data.thisMonthUsers,
          thisYearUsers: data.thisYearUsers,
          profileCompletedUsers: data.profileCompletedUsers,
        });
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchUserStats();
  }, []);

  const AnimatedNumber = ({ target }: { target: number }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: dataFetched ? target : 0 },
      config: { duration: 500 },
    });

    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-[96vw] sm:max-w-none">
        <CardWrapper1
          heading="Total Users"
          mainNumber={<AnimatedNumber target={userStats.totalUsers} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="This Month Users"
          mainNumber={<AnimatedNumber target={userStats.thisMonthUsers} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="This Year"
          mainNumber={<AnimatedNumber target={userStats.thisYearUsers} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <CardWrapper1
          heading="Profile Completed"
          mainNumber={
            <AnimatedNumber target={userStats.profileCompletedUsers} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faStar} />}
        />
      </div>
    </div>
  );
};

export default UserCard;
