import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTachometerAlt,
  faUser,
  faDollarSign, // Replace with appropriate icon
  faCalendarCheck,
  faBuilding, // Replace with appropriate icon
  faExclamationCircle, // Replace with appropriate icon
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
