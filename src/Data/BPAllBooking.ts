export interface Booking {
  name: string;
  warehouseName: string;
  email: string;
  idNumber: string;
  startDate: string;
  endDate: string;
  address: string;
  phoneNumber: string;
  subtotal: number;
  gst: number;
}

export const bookings: Booking[] = [
  {
    name: "John Doe",
    warehouseName: "Warehouse A",
    email: "johndoe@example.com",
    idNumber: "12345",
    startDate: "2024-07-01",
    endDate: "2024-07-30",
    address: "1234 Elm Street, City, Country",
    phoneNumber: "+123456789",
    subtotal: 5000,
    gst: 500,
  },
  {
    name: "Jane Smith",
    warehouseName: "Warehouse B",
    email: "janesmith@example.com",
    idNumber: "67890",
    startDate: "2024-08-01",
    endDate: "2024-08-31",
    address: "4321 Oak Avenue, City, Country",
    phoneNumber: "+987654321",
    subtotal: 7000,
    gst: 700,
  },
  {
    name: "Alice Johnson",
    warehouseName: "Warehouse C",
    email: "alicejohnson@example.com",
    idNumber: "11223",
    startDate: "2024-09-01",
    endDate: "2024-09-30",
    address: "555 Maple Lane, City, Country",
    phoneNumber: "+192837465",
    subtotal: 4500,
    gst: 450,
  },
  {
    name: "Bob Williams",
    warehouseName: "Warehouse D",
    email: "bobwilliams@example.com",
    idNumber: "44556",
    startDate: "2024-10-01",
    endDate: "2024-10-31",
    address: "789 Birch Street, City, Country",
    phoneNumber: "+102938475",
    subtotal: 8000,
    gst: 800,
  },
  {
    name: "Carol Brown",
    warehouseName: "Warehouse E",
    email: "carolbrown@example.com",
    idNumber: "77889",
    startDate: "2024-11-01",
    endDate: "2024-11-30",
    address: "246 Pine Avenue, City, Country",
    phoneNumber: "+564738291",
    subtotal: 6000,
    gst: 600,
  },
  {
    name: "David Clark",
    warehouseName: "Warehouse F",
    email: "davidclark@example.com",
    idNumber: "99100",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    address: "333 Oak Boulevard, City, Country",
    phoneNumber: "+132435465",
    subtotal: 9000,
    gst: 900,
  },
  {
    name: "Emma Davis",
    warehouseName: "Warehouse G",
    email: "emmadavis@example.com",
    idNumber: "33112",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    address: "777 Cedar Avenue, City, Country",
    phoneNumber: "+987654123",
    subtotal: 5500,
    gst: 550,
  },
];
