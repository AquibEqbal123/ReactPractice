import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaTasks,
  FaCalendarAlt,
} from "react-icons/fa";

export default function EmployeeSidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/employee",
      icon: <FaTachometerAlt />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "My Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Leave Requests",
      path: "/leave",
      icon: <FaCalendarAlt />,
    },
  ];

  return (
    <div className="fixed bg-gray-900 min-h-screen">
      <div className="mb-3 text-center">
        <h1 className="font-semibold text-xl text-gray-800 dark:text-white">
          Employee Panal
        </h1>
      </div>

      {/* Menu */}
      <div className="rounded-xl shadow p-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 text-sm rounded-md hover:bg-gray-800
              ${
                location.pathname === item.path
                  ? "bg-gray-800 font-medium text-white"
                  : "text-white"
              }
            `}
          >
            {/* ICON */}
            <span className="text-lg">{item.icon}</span>

            {/* TEXT */}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
