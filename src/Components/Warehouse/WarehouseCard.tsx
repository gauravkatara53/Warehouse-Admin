import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface WarehouseStatsResponse {
  success: boolean;
  data: Array<{
    totalWarehouses: number;
    activeWarehouses: number;
  }>;
}

const WarehouseCard = () => {
  const [warehouseStats, setWarehouseStats] = useState({
    totalWarehouses: 0,
    activeWarehouses: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const data = await apiService.get<WarehouseStatsResponse>(
        "/admin/getCardStatistics"
      );
      if (data && data.success && data.data.length > 0) {
        const stats = data.data[0]; // Access the first object in the data array
        setWarehouseStats({
          totalWarehouses: stats.totalWarehouses,
          activeWarehouses: stats.activeWarehouses,
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
          heading="No of warehouses"
          mainNumber={
            <AnimatedNumber target={warehouseStats.totalWarehouses} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="Active warehouses"
          mainNumber={
            <AnimatedNumber target={warehouseStats.activeWarehouses} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
      </div>
    </div>
  );
};

export default WarehouseCard;
