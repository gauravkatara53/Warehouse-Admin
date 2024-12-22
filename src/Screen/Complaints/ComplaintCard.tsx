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

interface ComplaintStatsResponse {
  success: boolean;
  totalComplaints: number;
  solvedComplaints: number;
  pendingComplaints: number;
  repliedComplaints: number;
  holdComplaints?: number;
  closedComplaints?: number;
}

const ComplaintCard = () => {
  const [complaintStats, setComplaintStats] = useState<ComplaintStatsResponse>({
    success: false,
    totalComplaints: 0,
    solvedComplaints: 0,
    pendingComplaints: 0,
    repliedComplaints: 0,
    holdComplaints: 0,
    closedComplaints: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchComplaintCard = async () => {
      try {
        const data = await apiService.get<ComplaintStatsResponse>(
          "admin/complaint-card"
        );

        if (data && data.success) {
          setComplaintStats({
            success: data.success, // Add success property
            totalComplaints: data.totalComplaints || 0,
            solvedComplaints: data.solvedComplaints || 0,
            pendingComplaints: data.pendingComplaints || 0,
            repliedComplaints: data.repliedComplaints || 0,
            holdComplaints: data.holdComplaints || 0,
            closedComplaints: data.closedComplaints || 0,
          });
          setDataFetched(true);
        } else {
          console.error("Unexpected response data:", data);
        }
      } catch (error) {
        console.error("Error fetching complaint stats:", error);
      }
    };

    fetchComplaintCard();
  }, []);

  const AnimatedNumber = ({ target }: { target: number }) => {
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: dataFetched ? target || 0 : 0 },
      config: { duration: 500 },
    });

    return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-[96vw] sm:max-w-none">
        <CardWrapper1
          heading="No of complaints"
          mainNumber={
            <AnimatedNumber target={complaintStats.totalComplaints} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faWallet} />}
        />

        <CardWrapper1
          heading="Solved complaints"
          mainNumber={
            <AnimatedNumber target={complaintStats.solvedComplaints} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faGlobe} />}
        />

        <CardWrapper1
          heading="Pending complaints"
          mainNumber={
            <AnimatedNumber target={complaintStats.pendingComplaints} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faUser} />}
        />

        <CardWrapper1
          heading="Replied complaints"
          mainNumber={
            <AnimatedNumber target={complaintStats.repliedComplaints} />
          }
          className="sm:mb-0 -mb-3"
          icon={<FontAwesomeIcon icon={faStar} />}
        />

        {/* {complaintStats.holdComplaints !== undefined && (
          <CardWrapper1
            heading="Hold Complaints"
            mainNumber={
              <AnimatedNumber target={complaintStats.holdComplaints} />
            }
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        )}

        {complaintStats.closedComplaints !== undefined && (
          <CardWrapper1
            heading="Closed Complaints"
            mainNumber={
              <AnimatedNumber target={complaintStats.closedComplaints} />
            }
            className="sm:mb-0 -mb-3"
            icon={<FontAwesomeIcon icon={faStar} />}
          />
        )} */}
      </div>
    </div>
  );
};

export default ComplaintCard;
