// import { Navigate } from "react-router-dom";
// import { isLoggedIn } from "../utils/auth";

// export default function ProtectedRoute({ children }) {
//   if (!isLoggedIn()) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// }

import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function ProtectedRoute({ allowedRoles }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
