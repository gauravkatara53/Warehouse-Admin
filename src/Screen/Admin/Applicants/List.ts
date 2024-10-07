interface Applicant {
  name: string; // Display name of the user
  fullName: string; // Full name of the user
  mobile: string; // User's mobile number
  email: string; // User's email address
  location: string; // User's location
  status: "Pending" | "Approved" | "Rejected";
}

export const ListData: Applicant[] = [
  {
    name: "Rajesh",
    fullName: "Rajesh Kumar",
    mobile: "+1 123456789",
    email: "rajesh@example.com",
    location: "United States",
    status: "Pending",
  },
  {
    name: "Anjali",
    fullName: "Anjali Gupta",
    mobile: "+91 9876543210",
    email: "anjali@example.com",
    location: "India",
    status: "Pending",
  },
  {
    name: "John",
    fullName: "John Doe",
    mobile: "+44 7700001111",
    email: "john@example.co.uk",
    location: "United Kingdom",
    status: "Approved",
  },
  {
    name: "Maria",
    fullName: "Maria Gonzalez",
    mobile: "+34 600111222",
    email: "maria@example.es",
    location: "Spain",
    status: "Rejected",
  },
  {
    name: "Xiao",
    fullName: "Xiao Ming",
    mobile: "+86 13800138000",
    email: "xiaoming@example.cn",
    location: "China",
    status: "Pending",
  },
  {
    name: "Fatima",
    fullName: "Fatima Al-Zahra",
    mobile: "+971 500555555",
    email: "fatima@example.ae",
    location: "United Arab Emirates",

    status: "Approved",
  },
  {
    name: "Liam",
    fullName: "Liam O'Connor",
    mobile: "+353 861234567",
    email: "liam@example.ie",
    location: "Ireland",
    status: "Rejected",
  },
];
