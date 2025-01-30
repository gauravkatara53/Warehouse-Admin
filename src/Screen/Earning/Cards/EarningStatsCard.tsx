import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState, useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

interface EarningStatsCard {
  success: boolean;
  data: {
    todayEarnings: number;
    weeklyEarnings: number;
    monthEarnings: number;
    yearlyEarnings: number;
  };
}

const EarningStatsCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    todayEarnings: 0,
    weeklyEarnings: 0,
    monthEarnings: 0,
    yearlyEarnings: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<EarningStatsCard>(
        "/admin/card/transactions"
      );
      if (data && data.success) {
        setPartnerStats({
          todayEarnings: data.data.todayEarnings,
          weeklyEarnings: data.data.weeklyEarnings,
          monthEarnings: data.data.monthEarnings,
          yearlyEarnings: data.data.yearlyEarnings,
        });
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchPartnerStats();
  }, []);

  const AnimatedNumber = useMemo(
    () =>
      ({ target }: { target: number }) => {
        const { number } = useSpring({
          from: { number: 0 },
          to: { number: dataFetched ? target : 0 }, // Start from 0 to target
          config: { duration: 500 }, // Adjust the duration for speed
          reset: false, // Prevents animation restart
        });

        return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
      },
    [dataFetched] // Only re-create animation if dataFetched changes
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-[96vw] sm:max-w-none">
        <CardWrapper1
          heading="Today’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.todayEarnings} />}
          className="sm:mb-0 -mb-3 text-green-500"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="Week’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.weeklyEarnings} />}
          className="sm:mb-0 -mb-3  text-green-500"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Month’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.monthEarnings} />}
          className="sm:mb-0 -mb-3  text-green-500"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Year’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.yearlyEarnings} />}
          className="sm:mb-0 -mb-3  text-green-500"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
      </div>
    </div>
  );
};

export default EarningStatsCard;
