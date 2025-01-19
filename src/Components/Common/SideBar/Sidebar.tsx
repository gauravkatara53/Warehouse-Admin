import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { tabs } from "./SideBarTab"; // Import the tabs data

export default function Sidebar() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null); // State to track hovered tab
  const [isScrollable, setIsScrollable] = useState(false); // State to track if sidebar should be scrollable
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

  useEffect(() => {
    const checkScrollable = () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        setIsScrollable(sidebar.scrollHeight > sidebar.clientHeight);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  const handleTabClick = (path: string) => {
    if (path !== activeTab) {
      setActiveTab(path);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-full bg-gray-100 w-60 z-40 ${
          isScrollable ? "overflow-y-auto" : "overflow-hidden"
        } max-h-screen`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-start p-3 pb-1 pt-6">
          <img src={"/logo1.png"} alt="Logo" className="h-10 w-auto" />
        </div>
        <div className="mx-4 h-1 border-b border-gray-600 opacity-10"></div>

        {/* Tabs */}
        <div className="flex-grow pl-4 pb-14">
          <ul className="mt-3">
            {tabs.map((tab) => (
              <li
                key={tab.path}
                className={`flex items-center mr-3 p-2 mb-2 rounded-lg cursor-pointer group transition-transform duration-300 hover:scale-105 ${
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
        <div className="relative flex justify-center items-center -mt-12 mb-0">
          <div className="p-2 max-w-sm w-full">
            <div
              className="rounded-lg bg-cover bg-center p-2 text-left py-4"
              style={{
                backgroundImage: `url('/Background-s.png')`,
              }}
            >
              <h4 className="text-md font-bold text-white mb-1">Need help?</h4>
              <p className="text-gray-200 text-xs mb-2">
                Please check our docs for support.
              </p>
              <button className="px-2 py-1 bg-white text-black rounded hover:bg-gray-200 text-xs">
                Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-grow ml-60 overflow-y-auto pt-16">
        {/* Your page content goes here */}
      </div>
    </div>
  );
}
