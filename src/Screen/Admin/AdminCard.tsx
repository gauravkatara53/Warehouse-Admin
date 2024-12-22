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

interface AdminCardResponse {
  success: boolean;
  data: { count: number; role: string }[];
}

interface AdminCardData {
  CustomerSupport: number;
  SaleSupport: number;
  complaintsSupport: number;
  WarehouseSupport: number;
}

const AdminCard = () => {
  const [partnerStats, setPartnerStats] = useState<AdminCardData>({
    CustomerSupport: 0,
    SaleSupport: 0,
    complaintsSupport: 0,
    WarehouseSupport: 0,
  });

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchPartnerStats = async () => {
      try {
        const response = await apiService.get<AdminCardResponse>(
          "/admin/card-statistics"
        );
        if (response && response.success) {
          // Transform the data array into an object
          const transformedData: AdminCardData = response.data.reduce(
            (acc, { count, role }) => {
              switch (role) {
                case "Customer Support":
                  acc.CustomerSupport = count;
                  break;
                case "Sale Support":
                  acc.SaleSupport = count;
                  break;
                case "Complaints Support":
                  acc.complaintsSupport = count;
                  break;
                case "Warehouse Support":
                  acc.WarehouseSupport = count;
                  break;
              }
              return acc;
            },
            {
              CustomerSupport: 0,
              SaleSupport: 0,
              complaintsSupport: 0,
              WarehouseSupport: 0,
            }
          );
          setPartnerStats(transformedData);
          setDataFetched(true);
        }
      } catch (error) {
        console.error("Error fetching partner stats:", error);
      }
    };

    fetchPartnerStats();
  }, []);

  const AnimatedNumber = useMemo(
    () =>
      ({ target }: { target: number }) => {
        const { number } = useSpring({
          from: { number: 0 },
          to: { number: dataFetched ? target : 0 },
          config: { duration: 500 },
          reset: false,
        });

        return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
      },
    [dataFetched]
  );

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-[96vw] sm:max-w-none">
        <CardWrapper1
          heading="Customer Support Admins"
          mainNumber={<AnimatedNumber target={partnerStats.CustomerSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
        />
        <CardWrapper1
          heading="Complaint Support Admins"
          mainNumber={
            <AnimatedNumber target={partnerStats.complaintsSupport} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faClock} />}
        />
        <CardWrapper1
          heading="Warehouse Support Admins"
          mainNumber={<AnimatedNumber target={partnerStats.WarehouseSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWarehouse} />}
        />
        <CardWrapper1
          heading="Sale Support Admins"
          mainNumber={<AnimatedNumber target={partnerStats.SaleSupport} />}
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faBoxOpen} />}
        />
      </div>
    </div>
  );
};

export default AdminCard;
