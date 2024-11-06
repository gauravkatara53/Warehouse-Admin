// ListingData.ts
export interface ListingData {
  SnNo: string;
  Warehouse: string;
  bookedOn: string;
  amount: number;
  bookingBy: string;
  paidAmount: string;
  warehousetype: string;
}

const ListingDatas: ListingData[] = [
  {
    SnNo: "1",
    Warehouse: "Central Hub",
    bookedOn: "2024-10-01",
    amount: 5000,
    bookingBy: "John Doe",
    paidAmount: "3000",
    warehousetype: "Cold Storage",
  },
  {
    SnNo: "2",
    Warehouse: "East Wing",
    bookedOn: "2024-10-02",
    amount: 7000,
    bookingBy: "Jane Smith",
    paidAmount: "7000",
    warehousetype: "Dry Storage",
  },
  {
    SnNo: "3",
    Warehouse: "West Yard",
    bookedOn: "2024-10-03",
    amount: 4500,
    bookingBy: "Robert Brown",
    paidAmount: "4500",
    warehousetype: "Hazardous Materials",
  },
  {
    SnNo: "4",
    Warehouse: "North Facility",
    bookedOn: "2024-10-04",
    amount: 6200,
    bookingBy: "Alice Green",
    paidAmount: "3200",
    warehousetype: "General Storage",
  },
  {
    SnNo: "5",
    Warehouse: "South Depot",
    bookedOn: "2024-10-05",
    amount: 3800,
    bookingBy: "Michael Johnson",
    paidAmount: "3800",
    warehousetype: "Cold Storage",
  },
  {
    SnNo: "6",
    Warehouse: "Downtown Storage",
    bookedOn: "2024-10-06",
    amount: 5500,
    bookingBy: "Emily White",
    paidAmount: "3000",
    warehousetype: "Dry Storage",
  },
  {
    SnNo: "7",
    Warehouse: "Industrial Park",
    bookedOn: "2024-10-07",
    amount: 4800,
    bookingBy: "Chris Black",
    paidAmount: "2500",
    warehousetype: "General Storage",
  },
  {
    SnNo: "8",
    Warehouse: "Portside Facility",
    bookedOn: "2024-10-08",
    amount: 9000,
    bookingBy: "Karen Wilson",
    paidAmount: "4500",
    warehousetype: "Hazardous Materials",
  },
  {
    SnNo: "9",
    Warehouse: "Highland Storage",
    bookedOn: "2024-10-09",
    amount: 7600,
    bookingBy: "George King",
    paidAmount: "3800",
    warehousetype: "Cold Storage",
  },
  {
    SnNo: "10",
    Warehouse: "Lowland Depot",
    bookedOn: "2024-10-10",
    amount: 6400,
    bookingBy: "Nina Brooks",
    paidAmount: "3200",
    warehousetype: "General Storage",
  },
];

export default ListingDatas;
