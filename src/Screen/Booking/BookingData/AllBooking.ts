export interface Booking {
  name: string;
  warehouseName: string;
  email: string;
  idNumber: string;
}

export const bookings: Booking[] = [
  {
    name: "John Doe",
    warehouseName: "Warehouse A",
    email: "johndoe@example.com",
    idNumber: "12345",
  },
  {
    name: "Jane Smith",
    warehouseName: "Warehouse B",
    email: "janesmith@example.com",
    idNumber: "67890",
  },
  {
    name: "Alice Johnson",
    warehouseName: "Warehouse C",
    email: "alicejohnson@example.com",
    idNumber: "11223",
  },
  {
    name: "Bob Williams",
    warehouseName: "Warehouse D",
    email: "bobwilliams@example.com",
    idNumber: "44556",
  },
  {
    name: "Carol Brown",
    warehouseName: "Warehouse E",
    email: "carolbrown@example.com",
    idNumber: "77889",
  },
  {
    name: "David Clark",
    warehouseName: "Warehouse F",
    email: "davidclark@example.com",
    idNumber: "99100",
  },
  {
    name: "Emma Davis",
    warehouseName: "Warehouse G",
    email: "emmadavis@example.com",
    idNumber: "33112",
  },
];
