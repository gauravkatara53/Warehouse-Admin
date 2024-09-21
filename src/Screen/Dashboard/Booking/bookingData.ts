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
  // Add more bookings as needed
];
