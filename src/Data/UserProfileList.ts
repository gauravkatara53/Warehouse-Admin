// ListingData.ts
export interface ListingData {
  SnNo: string;
  Warehouse: string;
  datebooked: string;
  amount: number;
  bookingid: string;
  noOfPayment: string;
  warehousetype: string;
}

const ListingDatas: ListingData[] = [
  {
    SnNo: "1",
    Warehouse: "Warehouse A",
    datebooked: "2024-10-01",
    amount: 5000,
    bookingid: "BID001",
    noOfPayment: "1",
    warehousetype: "Rental",
  },
  {
    SnNo: "2",
    Warehouse: "Warehouse B",
    datebooked: "2024-10-02",
    amount: 3000,
    bookingid: "BID002",
    noOfPayment: "2",
    warehousetype: "Rental",
  },
  {
    SnNo: "3",
    Warehouse: "Warehouse C",
    datebooked: "2024-10-03",
    amount: 7000,
    bookingid: "BID003",
    noOfPayment: "1",
    warehousetype: "Rental",
  },
  {
    SnNo: "4",
    Warehouse: "Warehouse D",
    datebooked: "2024-10-04",
    amount: 4000,
    bookingid: "BID004",
    noOfPayment: "1",
    warehousetype: "Rental",
  },
  {
    SnNo: "5",
    Warehouse: "Warehouse E",
    datebooked: "2024-10-05",
    amount: 6000,
    bookingid: "BID005",
    noOfPayment: "2",
    warehousetype: "Sale",
  },
  {
    SnNo: "6",
    Warehouse: "Warehouse F",
    datebooked: "2024-10-06",
    amount: 8000,
    bookingid: "BID006",
    noOfPayment: "1",
    warehousetype: "Sale",
  },
  {
    SnNo: "7",
    Warehouse: "Warehouse G",
    datebooked: "2024-10-07",
    amount: 2000,
    bookingid: "BID007",
    noOfPayment: "1",
    warehousetype: "Rental",
  },
  {
    SnNo: "8",
    Warehouse: "Warehouse H",
    datebooked: "2024-10-08",
    amount: 1500,
    bookingid: "BID008",
    noOfPayment: "2",
    warehousetype: "Rental",
  },
  {
    SnNo: "9",
    Warehouse: "Warehouse I",
    datebooked: "2024-10-09",
    amount: 3500,
    bookingid: "BID009",
    noOfPayment: "1",
    warehousetype: "Rental",
  },
  {
    SnNo: "10",
    Warehouse: "Warehouse J",
    datebooked: "2024-10-10",
    amount: 4500,
    bookingid: "BID010",
    noOfPayment: "2",
    warehousetype: "Rental",
  },
];

export default ListingDatas;
