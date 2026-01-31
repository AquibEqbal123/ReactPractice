import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// PUBLIC
import LoginChoice from "./pages/LoginChoice";
import Login from "./pages/Login";

// Admin components
import MainScreen from "./pages/Admin/MainScreen";
import Employees from "./pages/Admin/Employees";
import Inventory from "./pages/Admin/Inventory";
import Sales from "./pages/Admin/Sales";
import LeaveRequests from "./pages/Admin/LeaveRequests";
import AssignTasks from "./pages/Admin/AssignTasks";
import Departments from "./pages/Admin/Departments";
import Announcements from "./pages/Admin/Announcements";

// Employee components
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile";
import Tasks from "./pages/Employee/Tasks";
import Leave from "./pages/Employee/Leave";

import DashboardLayout from "./layouts/DashboardLayout";
import AdTopbar from "./components/AdTopbar";
import EmployeeLogin from "./pages/EmployeeLogin";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import EmployeeLayout from "./layouts/EmployeeLayout";

function App() {
  return (
    <Routes>
      ===== LOGIN CHOICE =====
      <Route path="/" element={<LoginChoice />} />

      {/* ===== PUBLIC ===== */}
      <Route path="/admin-login" element={<Login />} />

      <Route path="/employee-login" element={<EmployeeLogin />} />


      {/* ===== ADMIN ROUTES ===== */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          element={
            <>
              <AdTopbar />
              <DashboardLayout />
            </>
          }
        >
          <Route path="/dashboard" element={<MainScreen />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/leaves" element={<LeaveRequests />} />
          <Route path="/assign-tasks" element={<AssignTasks />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/announcements" element={<Announcements />} />
        </Route>

      </Route>

      {/* ===== EMPLOYEE ROUTES ===== */}
      {/* <Route element={<ProtectedRoute allowedRoles={["employee"]} />}> */}

      {/* <Route
          element={
            <>
              <Topbar />
              <Sidebar />
            </>
          }
        >
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/tasks" element={<Tasks />} />
        <Route path="/employee/leave" element={<Leave />} />
      </Route></Route> */}

      {/* ===== EMPLOYEE (🔥 IMPORTANT PART) ===== */}
      <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route path="dashboard" element={<EmployeeDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="leave" element={<Leave />} />
        </Route>
      </Route>



    </Routes>
  );
}

export default App;
