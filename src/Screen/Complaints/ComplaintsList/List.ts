interface Complaint {
  subject: string;
  timeOfComplaint: string;
  description: string;
  imageSrc: string;
  attachments: number; // For storing the number of attachments
  status: "verified" | "solved"; // Added status field
}

export const ListData: Complaint[] = [
  {
    subject: "Warehouse Fault",
    timeOfComplaint: "12:30 PM, 2nd Sept 2024",
    description: "The warehouse door is not functioning properly.",
    imageSrc: "Group 48096434.png",
    attachments: 2,
    status: "verified", // Status added
  },
  {
    subject: "Power Outage",
    timeOfComplaint: "10:15 AM, 3rd Sept 2024",
    description: "No electricity in the warehouse for the past two days.",
    imageSrc: "Group 48096434.png",
    attachments: 3,
    status: "verified", // Status added
  },
  {
    subject: "Water Leakage",
    timeOfComplaint: "08:45 AM, 1st Sept 2024",
    description: "Water leakage in the warehouse affecting stored goods.",
    imageSrc: "Group 48096434.png",
    attachments: 2,
    status: "solved", // Status changed to solved
  },
  {
    subject: "Security Issue",
    timeOfComplaint: "03:30 PM, 4th Sept 2024",
    description: "Security cameras are malfunctioning.",
    imageSrc: "Group 48096434.png",
    attachments: 2,
    status: "solved", // Status changed to solved
  },
  {
    subject: "Broken Shelves",
    timeOfComplaint: "09:00 AM, 5th Sept 2024",
    description: "Several shelves have collapsed inside the warehouse.",
    imageSrc: "Group 48096434.png",
    attachments: 2,
    status: "verified", // Status added
  },
  {
    subject: "Pest Infestation",
    timeOfComplaint: "11:20 AM, 6th Sept 2024",
    description: "There are signs of pest infestation in the warehouse.",
    imageSrc: "Group 48096434.png",
    attachments: 2,
    status: "verified", // Status added
  },
  {
    subject: "Damaged Goods",
    timeOfComplaint: "01:45 PM, 7th Sept 2024",
    description: "Goods in the warehouse were damaged during handling.",
    imageSrc: "Group 48096434.png",
    attachments: 3,
    status: "solved", // Status changed to solved
  },
];
