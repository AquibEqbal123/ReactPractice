// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// export default function EmployeeLayout() {
//   return (
//     <div className="flex h-screen bg-gray-100">

//       {/* SIDEBAR */}
//       <Sidebar />

//       {/* MAIN AREA */}
//       <div className="flex-1 flex flex-col">

//         {/* TOPBAR */}
//         <Topbar />

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// }
import { Link, Outlet } from "react-router-dom";
import {
  FaChartLine,
  FaUsers,
  FaBoxes,
  FaShoppingCart,
  FaSignOutAlt,
  FaUserTie,
} from "react-icons/fa";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


export default function EmployeeLayout() {
  const navigate = useNavigate();

  const employee = JSON.parse(localStorage.getItem("employee"));

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        {/* <img src="src/assets/Images/p4.jpg" alt="logo" className="w-10 h-10 mt-4 ml-9 rounded-full" />
        <div className="pl-3">Fule IT Online</div>
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Employee Panel
        </div> */}

        <nav className="flex-1 p-3 space-y-2 text-sm">
          <Sidebar />
        </nav>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="m-4 flex items-center gap-2 text-red-400 hover:text-red-300"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1">
        {/* 🔥 PASS AS PROPS HERE */}
        <Outlet context={{ employee }} />

      </main>
    </div>
  );
}

function NavItem({ to, icon, text }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
