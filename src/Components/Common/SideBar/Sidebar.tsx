import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { tabs } from "./SideBarTab"; // Import the tabs data
import {
  faBars,
  faTimes,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"; // Import the icons

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed for mobile
  const [hoveredTab, setHoveredTab] = useState<string | null>(null); // State to track hovered tab
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (activeTab !== location.pathname) {
      navigate(activeTab);
    }
  }, [activeTab, navigate, location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (path: string) => {
    if (path !== activeTab) {
      setActiveTab(path);
    }
    // Close the sidebar on mobile after clicking a tab
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex">
      {/* Mobile Top Bar */}
      <div
        className={`md:hidden flex  justify-between items-center bg-gray-100 p-4 fixed top-0 left-0 right-0 z-50 ${
          isSidebarOpen ? "hidden" : "flex"
        }`}
      >
        <span className="text-gray-700 font-bold">
          {tabs.find((tab) => tab.path === activeTab)?.label || "Menu"}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700"
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 transform transition-transform ${
          isSidebarOpen ? "translate-x-0 w-screen" : "-translate-x-full"
        } md:translate-x-0 z-40`}
        style={{ height: "100vh" }} // Ensures sidebar height matches viewport
      >
        {/* Close Button for Mobile */}
        {isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden"
          >
            <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
          </button>
        )}

        {/* Logo Section */}
        <div className="flex items-center justify-start p-4 pb-2 pt-8">
          <img src={"logo1.png"} alt="Logo" className="h-12 w-auto" />
        </div>
        <div className="mx-6 h-1 border-b border-gray-600 opacity-10"></div>
        <div className="flex-grow pl-4 pb-16 md:pb-0">
          <ul className="mt-4">
            {tabs.map((tab) => (
              <li
                key={tab.path}
                className={`flex items-center mr-4 p-2 mb-3 rounded-xl cursor-pointer group transition-transform duration-300 hover:scale-105 ${
                  activeTab === tab.path ? "bg-white" : "hover:bg-white"
                }`}
                onClick={() => handleTabClick(tab.path)}
                onMouseEnter={() => setHoveredTab(tab.path)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <div
                  className={`icon-square p-2 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.path || hoveredTab === tab.path
                      ? "bg-[#4FD1C5]"
                      : "bg-white"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={tab.icon}
                    className={`h-5 w-5 ${
                      activeTab === tab.path || hoveredTab === tab.path
                        ? "text-white"
                        : "text-[#4FD1C5]"
                    }`}
                  />
                </div>
                <span
                  className={`ml-2 transition-colors duration-200 ${
                    activeTab === tab.path
                      ? "text-gray-900"
                      : "text-gray-400 group-hover:text-black"
                  }`}
                >
                  {tab.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Section */}
        <div className="-mt-20 md:mt-4 lg:mt-4 relative flex justify-center items-center">
          <div className="p-4 max-w-sm w-full">
            <div
              className="rounded-lg bg-cover bg-center p-4 text-left"
              style={{
                backgroundImage: `url('Background-s.png')`,
              }}
            >
              <div className="flex items-center mb-2">
                <div className="icon-square p-2 rounded-lg bg-white">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="h-5 w-5 text-[#4FD1C5]"
                  />
                </div>
              </div>
              <h4 className="text-md font-bold text-white mb-2">Need help?</h4>
              <p className="text-gray-200 text-xs mb-4">
                Please check our docs for support.
              </p>
              <button className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 text-xs">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-grow ml-64 overflow-y-auto pt-16 md:pt-0">
        {/* Your page content goes here */}
      </div>
    </div>
  );
}
