import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faBoxOpen,
  faCalendarDay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState, useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

interface DashBoardUpperStatsResponse {
  success: boolean;
  data: {
    todaysBookingsCount: number;
    monthBookingsCount: number;
    warehouseCount: number;
    activeWarehousesCount: number;
  };
}

const DashBoardUpperCard = () => {
  const [partnerStats, setPartnerStats] = useState({
    todaysBookingsCount: 0,
    monthBookingsCount: 0,
    warehouseCount: 0,
    activeWarehousesCount: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<DashBoardUpperStatsResponse>(
        "/admin/dashboard-card"
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
          heading="Today’s Booking"
          mainNumber={
            <AnimatedNumber target={partnerStats.todaysBookingsCount} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
        />
        <CardWrapper1
          heading="Month’s Booking"
          mainNumber={
            <AnimatedNumber target={partnerStats.monthBookingsCount} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <CardWrapper1
          heading="No of Warehouses"
          mainNumber={<AnimatedNumber target={partnerStats.warehouseCount} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWarehouse} />}
        />
        <CardWrapper1
          heading="Active Warehouses"
          mainNumber={
            <AnimatedNumber target={partnerStats.activeWarehousesCount} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
        />
      </div>
    </div>
  );
};

export default DashBoardUpperCard;
