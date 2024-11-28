import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import apiService from "@/Components/APIService/apiService";
import CardWrapper2 from "@/Components/Common/WHWrapper2";
import { useSpring, animated } from "@react-spring/web";

interface CardStats {
  todaysEarnings: number;
  monthEarnings: number;
}

const AnimatedNumber = ({ target }: { target: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: target },
    config: { duration: 500 },
  });

  return (
    <span>
      ₹<animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
    </span>
  );
};

export default function Card2() {
  const [cardStats, setCardStats] = useState<CardStats>({
    todaysEarnings: 0,
    monthEarnings: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardStats = async () => {
      try {
        const response = await apiService.get<{
          success: boolean;
          data: CardStats;
        }>("/admin/dashboard-card");

        if (response?.success) {
          setCardStats(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchCardStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <CardWrapper2
        heading="Today"
        subHeading="Earnings"
        bottomHeading={<AnimatedNumber target={cardStats.todaysEarnings} />}
        icon={<FontAwesomeIcon icon={faWallet} />}
      />
      <CardWrapper2
        heading="This Month"
        subHeading="Earnings"
        bottomHeading={<AnimatedNumber target={cardStats.monthEarnings} />}
        icon={<FontAwesomeIcon icon={faPaypal} />}
      />
      {error && (
        <p className="col-span-2 text-md text-red-500 rounded-sm">{error}</p>
      )}
    </div>
  );
}
