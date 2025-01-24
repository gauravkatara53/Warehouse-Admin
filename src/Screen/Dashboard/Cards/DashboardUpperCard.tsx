import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faBoxOpen,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface DashBoardUpperStatsResponse {
  statusCode: number;
  data: {
    todayBooking: number;
    monthBooking: number;
    numberWarehouses: number;
    availableWarehouses: number;
  };
  message: string;
  success: boolean;
  errors: null | string;
  timestamp: string;
}

const DashBoardUpperCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    todayBooking: 0,
    monthBooking: 0,
    numberWarehouses: 0,
    availableWarehouses: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const response = await apiService.get<DashBoardUpperStatsResponse>(
        "/admin/card/dashboard/details"
      );
      if (response && response.success && response.data && !dataFetched) {
        setPartnerStats(response.data);
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchPartnerStats();
  }, [dataFetched]);

  const AnimatedNumber = ({ target }: { target: number }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: dataFetched ? target : 0 },
      config: { duration: 500 },
      reset: !dataFetched, // Ensure animation starts only once
    });

    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-[96vw] sm:max-w-none">
        <CardWrapper1
          heading="Today’s Booking"
          mainNumber={<AnimatedNumber target={partnerStats.todayBooking} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
        />
        <CardWrapper1
          heading="Month’s Booking"
          mainNumber={<AnimatedNumber target={partnerStats.monthBooking} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <CardWrapper1
          heading="No of Warehouses"
          mainNumber={<AnimatedNumber target={partnerStats.numberWarehouses} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWarehouse} />}
        />
        <CardWrapper1
          heading="Active Warehouses"
          mainNumber={
            <AnimatedNumber target={partnerStats.availableWarehouses} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
        />
      </div>
    </div>
  );
};

export default DashBoardUpperCard;
