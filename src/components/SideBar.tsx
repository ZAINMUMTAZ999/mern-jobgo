import { Link, useLocation } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import { IconType } from "react-icons";

interface SidebarLinkProps {
  to: string;
  icon: IconType;
  label: string;
}

const SideBar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links: SidebarLinkProps[] = [
    { to: "/addjob", icon: IoMdAdd, label: "Post a Job" },
    { to: "/search", icon: FaSearch, label: "Find Jobs" },
    { to: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { to: "/userProfile", icon: CgProfile, label: "Profile" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const Logo = () => (
    <div className="flex items-center justify-center h-16 border-b border-gray-200">
      <span className="text-2xl font-bold text-blue-600">{collapsed ? "J" : "JobFinder"}</span>
    </div>
  );

  const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center p-3 text-gray-700 hover:bg-blue-100 transition-colors ${isActive ? "bg-blue-200 font-bold" : ""}`}
        onClick={() => isMobile && setMobileOpen(false)}
      >
        <Icon size={20} className="mr-3" />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <button onClick={toggleMobile} className="fixed top-4 left-4 z-50 p-2 bg-gray-100 rounded-md">
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>

        {mobileOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMobile}></div>
            <div className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg">
              <Logo />
              <div className="flex flex-col">
                {links.map(link => (
                  <SidebarLink key={link.to} {...link} />
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className={`h-screen bg-white shadow-lg flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <Logo />
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 text-gray-500 hover:bg-gray-100 transition-colors"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      <div className="flex flex-col mt-4">
        {/* Render the icons at the top */}
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center justify-center p-3 text-gray-700 hover:bg-blue-100 transition-colors ${location.pathname === link.to ? "bg-blue-200 font-bold" : ""}`}
            onClick={() => setCollapsed(true)}
          >
            <link.icon size={20} />
            {/* Only display the label when not collapsed */}
            {!collapsed && <span className="ml-2">{link.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
