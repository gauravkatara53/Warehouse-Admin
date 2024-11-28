import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState, useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

interface EarningStatsCard {
  success: boolean;
  data: {
    today: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
}

const EarningStatsCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<EarningStatsCard>(
        "/admin/transactions-card"
      );
      if (data && data.success) {
        setPartnerStats(data.data);
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
          mainNumber={<AnimatedNumber target={partnerStats.today} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="Week’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.weekly} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Month’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.monthly} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Year’s Earning"
          mainNumber={<AnimatedNumber target={partnerStats.yearly} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
      </div>
    </div>
  );
};

export default EarningStatsCard;
