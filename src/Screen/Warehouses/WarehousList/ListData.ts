// Define the Booking interface with the updated properties
export interface Booking {
  warehouseNumber: string;
  rent: string;
  address: string;
  partnerId: string;
  imageSrc: string; // Image URL
}

// Updated ListData with new properties
export const ListData: Booking[] = [
  {
    warehouseNumber: "Warehouse 1",
    rent: "$1500/month",
    address: "123 Main St, Springfield",
    partnerId: "P12345",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 2",
    rent: "$1800/month",
    address: "456 Elm St, Shelbyville",
    partnerId: "P67890",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 3",
    rent: "$1200/month",
    address: "789 Oak St, Capital City",
    partnerId: "P11223",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 4",
    rent: "$2000/month",
    address: "101 Maple St, Ogdenville",
    partnerId: "P44556",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 5",
    rent: "$1600/month",
    address: "202 Birch St, North Haverbrook",
    partnerId: "P77889",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 6",
    rent: "$1400/month",
    address: "303 Cedar St, Brockway",
    partnerId: "P99100",
    imageSrc: "Group 48096434.png", // Image URL
  },
  {
    warehouseNumber: "Warehouse 7",
    rent: "$1900/month",
    address: "404 Pine St, Cypress Creek",
    partnerId: "P33112",
    imageSrc: "Group 48096434.png", // Image URL
  },
];
