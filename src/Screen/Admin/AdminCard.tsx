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

interface AdminCardResponse {
  success: boolean;
  data: {
    complaintsSupport: number;
    customerSupport: number;
    warehouseSupport: number;
    saleSupport: number;
  };
}

const AdminCard = () => {
  const [adminStats, setAdminStats] = useState({
    complaintsSupport: 0,
    customerSupport: 0,
    warehouseSupport: 0,
    saleSupport: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchAdminStats = async () => {
      const response = await apiService.get<AdminCardResponse>(
        "/admin/card/details"
      );
      if (response && response.success && response.data && !dataFetched) {
        setAdminStats({
          complaintsSupport: response.data.complaintsSupport,
          customerSupport: response.data.customerSupport,
          warehouseSupport: response.data.warehouseSupport,
          saleSupport: response.data.saleSupport,
        });
        setDataFetched(true); // Trigger animation after data fetch
      }
    };

    fetchAdminStats();
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
          heading="Customer Support"
          mainNumber={<AnimatedNumber target={adminStats.customerSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
        />
        <CardWrapper1
          heading="Complaint Support "
          mainNumber={<AnimatedNumber target={adminStats.complaintsSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <CardWrapper1
          heading="Warehouse Support "
          mainNumber={<AnimatedNumber target={adminStats.warehouseSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWarehouse} />}
        />
        <CardWrapper1
          heading="Sale Support "
          mainNumber={<AnimatedNumber target={adminStats.saleSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
        />
      </div>
    </div>
  );
};

export default AdminCard;
