import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTachometerAlt,
  faUser,
  faDollarSign, // Replace with appropriate icon
  faCalendarCheck,
  faBuilding, // Replace with appropriate icon
  faExclamationCircle,
  faKey,
  faUserTag,
  faHandshake,

  // Replace with appropriate icon
} from "@fortawesome/free-solid-svg-icons";

export interface Tab {
  path: string;
  icon: IconDefinition;
  label: string;
}

export const tabs: Tab[] = [
  {
    path: "/",
    icon: faTachometerAlt,
    label: "Dashboard",
  },
  {
    path: "/earning",
    icon: faDollarSign, // Replace with appropriate icon
    label: "Earning",
  },
  {
    path: "/booking",
    icon: faCalendarCheck, // Replace with appropriate icon
    label: "Booking",
  },
  {
    path: "/warehouses",
    icon: faBuilding, // Replace with appropriate icon
    label: "Warehouse",
  },
  {
    path: "/partners",
    icon: faHandshake, // Replace with appropriate icon
    label: "Partner",
  },
  {
    path: "/customers",
    icon: faUserTag,
    label: "Customers",
  },
  {
    path: "/approve-admins",
    icon: faKey,
    label: "Approve Admins",
  },
  {
    path: "/complaints",
    icon: faExclamationCircle, // Replace with appropriate icon
    label: "Complaints",
  },
  {
    path: "/profile",
    icon: faUser,
    label: "Profile",
  },
];
