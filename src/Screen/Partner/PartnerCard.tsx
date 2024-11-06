import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface WarehouseStatsResponse {
  success: boolean;
  data: Array<{
    totalPartners: number;
    activePartners: number;
  }>;
}

const PartnerCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    activePartners: 0,
    totalPartners: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<WarehouseStatsResponse>(
        "/admin/getCardStatistics"
      );
      if (data && data.success && data.data.length > 0) {
        const stats = data.data[0]; // Access the first object in the data array
        setPartnerStats({
          totalPartners: stats.totalPartners,
          activePartners: stats.activePartners,
        });
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchPartnerStats();
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
          heading="No of Partner"
          mainNumber={<AnimatedNumber target={partnerStats.totalPartners} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="Active Partner"
          mainNumber={<AnimatedNumber target={partnerStats.activePartners} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
      </div>
    </div>
  );
};

export default PartnerCard;
