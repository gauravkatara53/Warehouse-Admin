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
    activePartner: number; // Corrected to match API response
    membershipNotPaid: number;
    kycNotUploaded: number;
  };
}

const PartnerCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    totalPartners: 0,
    activePartner: 0,
    membershipNotPaid: 0,
    kycNotUploaded: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<PartnerStatsResponse>(
        "admin/get/partner/customer/data"
      );
      if (data && data.success) {
        setPartnerStats(data.data);
        setDataFetched(true);
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
          mainNumber={<AnimatedNumber target={partnerStats.activePartner} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Membership Not Paid"
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
