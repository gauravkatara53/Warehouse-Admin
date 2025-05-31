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
  data: {
    totalUser: number;
    thisMonthUser: number;
    thisYearUser: number;
    membershipNotPaid: number;
  };
  message: string;
  statusCode: number;
  errors: any;
  timestamp: string;
}

const UserCard = () => {
  const [userStats, setUserStats] = useState({
    totalUser: 0,
    thisMonthUser: 0,
    thisYearUser: 0,
    membershipNotPaid: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchUserStats = async () => {
      const response = await apiService.get<UserStatsResponse>(
        "/admin/get/user/customer/data"
      );
      if (response && response.success) {
        setUserStats(response.data);
        setDataFetched(true);
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
          mainNumber={<AnimatedNumber target={userStats.totalUser} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="This Month Users"
          mainNumber={<AnimatedNumber target={userStats.thisMonthUser} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="This Year Users"
          mainNumber={<AnimatedNumber target={userStats.thisYearUser} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <CardWrapper1
          heading="Membership Not Paid"
          mainNumber={<AnimatedNumber target={userStats.membershipNotPaid} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faStar} />}
        />
      </div>
    </div>
  );
};

export default UserCard;
