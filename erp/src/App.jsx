// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LoginChoice from "./pages/LoginChoice";
// import AdminLogin from "./pages/AdminLogin";
// import ForgotPassword from "../ForgotPassword";

// // Admin components
// import MainScreen from "./pages/Admin/MainScreen";
// import Employees from "./pages/Admin/Employees";
// import Inventory from "./pages/Admin/Inventory";
// import Sales from "./pages/Admin/Sales";
// import LeaveRequests from "./pages/Admin/LeaveRequests";
// import AssignTasks from "./pages/Admin/AssignTasks";
// import Departments from "./pages/Admin/Departments";

// // Employee components
// import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
// import Profile from "./pages/Employee/Profile";
// import Tasks from "./pages/Employee/Tasks";
// import Leave from "./pages/Employee/Leave";

// import DashboardLayout from "./layouts/DashboardLayout";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdTopbar from "./components/AdTopbar";

// import EmployeeLayout from "./layouts/EmployeeLayout";
// import Topbar from "./components/Topbar";

// function App() {
//   return (
//     <Routes>
//       {/* ===== PUBLIC ROUTES ===== */}
//       <Route path="/" element={<Login />} />
//       <Route path="/login-choice" element={<LoginChoice />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* ===== ADMIN & EMPLOYEE ROUTES (MIXED) ===== */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <AdTopbar />
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/dashboard" element={<MainScreen />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route path="/inventory" element={<Inventory />} />
//         <Route path="/sales" element={<Sales />} />
//         <Route path="/leaves" element={<LeaveRequests />} />
//         <Route path="/assign-tasks" element={<AssignTasks />} />
//         <Route path="/departments" element={<Departments />} />
//       </Route>

//       {/* Commented out and duplicated employee routes */}
//       {/* <Route path="/employee/dashboard" element={<EmployeeDashboard />} /> */}
//       <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
//       <Route path="/employee/profile" element={<Profile />} />

//       {/* Incorrect layout for employee routes */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <AdTopbar />
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/employee/tasks" element={<Tasks />} />
//         <Route path="/employee/leave" element={<Leave />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LoginChoice from "./pages/LoginChoice";
// import AdminLogin from "./pages/AdminLogin";
// import ForgotPassword from "../ForgotPassword";

// Admin components
import MainScreen from "./pages/Admin/MainScreen";
import Employees from "./pages/Admin/Employees";
import Inventory from "./pages/Admin/Inventory";
import Sales from "./pages/Admin/Sales";
import LeaveRequests from "./pages/Admin/LeaveRequests";
import AssignTasks from "./pages/Admin/AssignTasks";
import Departments from "./pages/Admin/Departments";

// Employee components
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile";
import Tasks from "./pages/Employee/Tasks";
import Leave from "./pages/Employee/Leave";

import DashboardLayout from "./layouts/DashboardLayout";
import AdTopbar from "./components/AdTopbar";

function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      {/* <Route path="/" element={<Login />} />
      <Route path="/login-choice" element={<LoginChoice />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} /> */}

      {/* ===== ADMIN ROUTES (NO AUTH) ===== */}
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
      </Route>

      {/* ===== EMPLOYEE ROUTES (NO AUTH) ===== */}
      <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
      <Route path="/employee/profile" element={<Profile />} />

      <Route
        element={
          <>
            <AdTopbar />
            <DashboardLayout />
          </>
        }
      >
        <Route path="/employee/tasks" element={<Tasks />} />
        <Route path="/employee/leave" element={<Leave />} />
      </Route>
    </Routes>
  );
}

export default App;
