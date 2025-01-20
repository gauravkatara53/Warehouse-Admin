import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faWallet } from "@fortawesome/free-solid-svg-icons";
import CardWrapper1 from "@/Components/Common/WHWrapper1";
import apiService from "@/Components/APIService/apiService";
import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface WarehouseStatsResponse {
  success: boolean;
  data: {
    totalWarehouses: number;
    availableWarehouse: number;
    rentedWarehouse: number;
    soldWarehouse: number;
  };
}

const WarehouseCard = () => {
  const [warehouseStats, setWarehouseStats] = useState({
    totalWarehouses: 0,
    availableWarehouse: 0,
    rentedWarehouse: 0,
    soldWarehouse: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      const response = await apiService.get<WarehouseStatsResponse>(
        "/warehouse/admin/get/warehouse/card"
      );
      if (response && response.success && response.data && !dataFetched) {
        setWarehouseStats({
          totalWarehouses: response.data.totalWarehouses,
          availableWarehouse: response.data.availableWarehouse,
          rentedWarehouse: response.data.rentedWarehouse,
          soldWarehouse: response.data.soldWarehouse,
        });
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
          heading="No of warehouses"
          mainNumber={
            <AnimatedNumber target={warehouseStats.totalWarehouses} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />
        <CardWrapper1
          heading="Available warehouses"
          mainNumber={
            <AnimatedNumber target={warehouseStats.availableWarehouse} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Rented warehouses"
          mainNumber={
            <AnimatedNumber target={warehouseStats.rentedWarehouse} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
        <CardWrapper1
          heading="Sold warehouses"
          mainNumber={<AnimatedNumber target={warehouseStats.soldWarehouse} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />
      </div>
    </div>
  );
};

export default WarehouseCard;
