import { Link, useLocation } from "react-router-dom";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  UserGroupIcon as UserGroupIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  UserIcon as UserIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon, iconSolid: HomeIconSolid },
    {
      path: "/collaboration",
      label: "Collaboration",
      icon: UserGroupIcon,
      iconSolid: UserGroupIconSolid,
    },
    {
      path: "/explore",
      label: "Explore",
      icon: MagnifyingGlassIcon,
      iconSolid: MagnifyingGlassIconSolid,
    },
    {
      path: "/profile",
      label: "Profile",
      icon: UserIcon,
      iconSolid: UserIconSolid,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Cog6ToothIcon,
      iconSolid: Cog6ToothIconSolid,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen shadow-sm">
      <div className="p-4 flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = isActive ? item.iconSolid : item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
