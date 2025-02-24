export interface User {
  id: string; // Change to string if that's the correct type in usersData
  name: string;
  address: string;
  number: string;
  email: string;
  profileStatus: "completed" | "processing" | "rejected" | "Not completed"; // Ensure this matches your data
  date: string; // Adjust the type if you have a specific date type
}

const users: User[] = [
  {
    id: "00001",
    name: "Rajesh",
    address: "Delhi",
    number: "987654321",
    email: "example@email.com",
    profileStatus: "completed",
    date: "19 Sept 2023",
  },
  {
    id: "00002",
    name: "Aisha",
    address: "Mumbai",
    number: "987654322",
    email: "aisha@email.com",
    profileStatus: "Not completed",
    date: "20 Sept 2023",
  },
  {
    id: "00003",
    name: "Rahul",
    address: "Bangalore",
    number: "987654323",
    email: "rahul@email.com",
    profileStatus: "completed",
    date: "21 Sept 2024",
  },
  {
    id: "00004",
    name: "Sneha",
    address: "Kolkata",
    number: "987654324",
    email: "sneha@email.com",
    profileStatus: "Not completed",
    date: "22 Sept 2024",
  },
  {
    id: "00005",
    name: "Vikram",
    address: "Chennai",
    number: "987654325",
    email: "vikram@email.com",
    profileStatus: "completed",
    date: "23 Sept 2024",
  },
  {
    id: "00006",
    name: "Neha",
    address: "Hyderabad",
    number: "987654326",
    email: "neha@email.com",
    profileStatus: "Not completed",
    date: "24 Sept 2024",
  },
  {
    id: "00007",
    name: "Karan",
    address: "Pune",
    number: "987654327",
    email: "karan@email.com",
    profileStatus: "Not completed",
    date: "25 Sept 2024",
  },
  {
    id: "00008",
    name: "Meera",
    address: "Ahmedabad",
    number: "987654328",
    email: "meera@email.com",
    profileStatus: "completed",
    date: "26 Sept 2024",
  },
  {
    id: "00009",
    name: "Suresh",
    address: "Jaipur",
    number: "987654329",
    email: "suresh@email.com",
    profileStatus: "Not completed",
    date: "27 Sept 2024",
  },
  {
    id: "00010",
    name: "Ananya",
    address: "Surat",
    number: "987654330",
    email: "ananya@email.com",
    profileStatus: "Not completed",
    date: "28 Sept 2024",
  },
  {
    id: "00011",
    name: "Ajay",
    address: "Kanpur",
    number: "987654331",
    email: "ajay@email.com",
    profileStatus: "Not completed",
    date: "29 Sept 2024",
  },
  {
    id: "00012",
    name: "Pooja",
    address: "Nagpur",
    number: "987654332",
    email: "pooja@email.com",
    profileStatus: "Not completed",
    date: "30 Sept 2024",
  },
  {
    id: "00013",
    name: "Ravi",
    address: "Coimbatore",
    number: "987654333",
    email: "ravi@email.com",
    profileStatus: "completed",
    date: "01 Oct 2024",
  },
  {
    id: "00014",
    name: "Kavya",
    address: "Visakhapatnam",
    number: "987654334",
    email: "kavya@email.com",
    profileStatus: "Not completed",
    date: "02 Oct 2024",
  },
  {
    id: "00015",
    name: "Nitin",
    address: "Thane",
    number: "987654335",
    email: "nitin@email.com",
    profileStatus: "completed",
    date: "03 Oct 2024",
  },
  {
    id: "00016",
    name: "Riya",
    address: "Gurgaon",
    number: "987654336",
    email: "riya@email.com",
    profileStatus: "Not completed",
    date: "04 Oct 2024",
  },
  {
    id: "00017",
    name: "Arjun",
    address: "Nashik",
    number: "987654337",
    email: "arjun@email.com",
    profileStatus: "Not completed",
    date: "05 Oct 2024",
  },
  {
    id: "00018",
    name: "Snehal",
    address: "Mysore",
    number: "987654338",
    email: "snehal@email.com",
    profileStatus: "completed",
    date: "06 Oct 2024",
  },
  {
    id: "00019",
    name: "Vinay",
    address: "Madurai",
    number: "987654339",
    email: "vinay@email.com",
    profileStatus: "Not completed",
    date: "07 Oct 2024",
  },
  {
    id: "00020",
    name: "Shivani",
    address: "Tirupati",
    number: "987654340",
    email: "shivani@email.com",
    profileStatus: "Not completed",
    date: "08 Oct 2024",
  },
  {
    id: "00021",
    name: "Puneet",
    address: "Bhopal",
    number: "987654341",
    email: "puneet@email.com",
    profileStatus: "completed",
    date: "09 Oct 2024",
  },
  {
    id: "00022",
    name: "Sakshi",
    address: "Ranchi",
    number: "987654342",
    email: "sakshi@email.com",
    profileStatus: "completed",
    date: "10 Oct 2024",
  },
  {
    id: "00023",
    name: "Dev",
    address: "Patna",
    number: "987654343",
    email: "dev@email.com",
    profileStatus: "Not completed",
    date: "11 Oct 2024",
  },
  {
    id: "00024",
    name: "Neelam",
    address: "Jammu",
    number: "987654344",
    email: "neelam@email.com",
    profileStatus: "Not completed",
    date: "12 Oct 2024",
  },
  {
    id: "00025",
    name: "Prakash",
    address: "Raipur",
    number: "987654345",
    email: "prakash@email.com",
    profileStatus: "Not completed",
    date: "13 Oct 2024",
  },
  {
    id: "00026",
    name: "Kriti",
    address: "Agra",
    number: "987654346",
    email: "kriti@email.com",
    profileStatus: "Not completed",
    date: "14 Oct 2024",
  },
  {
    id: "00027",
    name: "Samir",
    address: "Dehradun",
    number: "987654347",
    email: "samir@email.com",
    profileStatus: "completed",
    date: "15 Oct 2024",
  },
  {
    id: "00028",
    name: "Gaurav",
    address: "Indore",
    number: "987654348",
    email: "gaurav@email.com",
    profileStatus: "Not completed",
    date: "16 Oct 2024",
  },
  {
    id: "00029",
    name: "Tanya",
    address: "Puducherry",
    number: "987654349",
    email: "tanya@email.com",
    profileStatus: "completed",
    date: "17 Oct 2024",
  },
  {
    id: "00030",
    name: "Lakshmi",
    address: "Bhubaneswar",
    number: "987654350",
    email: "lakshmi@email.com",
    profileStatus: "completed",
    date: "18 Oct 2024",
  },
  {
    id: "00031",
    name: "Anil",
    address: "Visakhapatnam",
    number: "987654351",
    email: "anil@email.com",
    profileStatus: "completed", // Removed the extra space
    date: "19 Oct 2024",
  },
];

export default users;
