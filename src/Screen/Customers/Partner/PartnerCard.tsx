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

interface PartnerStatsResponse {
  success: boolean;
  data: {
    totalPartners: number;
    activePartners: number;
    membershipNotPaid: number;
    kycNotUploaded: number;
  };
}

const PartnerCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    totalPartners: 0,
    activePartners: 0,
    membershipNotPaid: 0,
    kycNotUploaded: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<PartnerStatsResponse>(
        "admin/partner-card/statistics-card"
      );
      if (data && data.success) {
        setPartnerStats(data.data);
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchPartnerStats();
  }, []);

  const AnimatedNumber = ({ target }: { target: number }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: dataFetched ? target : 0 }, // Start from 0 to target
      config: { duration: 500 }, // Adjust the duration for speed
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
        <CardWrapper1
          heading="Membership Not paid"
          mainNumber={
            <AnimatedNumber target={partnerStats.membershipNotPaid} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <CardWrapper1
          heading="KYC Not Uploaded"
          mainNumber={<AnimatedNumber target={partnerStats.kycNotUploaded} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faStar} />}
        />
      </div>
    </div>
  );
};

export default PartnerCard;
