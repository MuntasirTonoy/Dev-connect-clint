import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animation/loading.json";
import Swal from "sweetalert2";
import { AuthContext } from "../Firebase/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByEmail } from "../Hoocks/Api";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Fetch user role data if user exists
  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: () => fetchUserByEmail(user?.email),
    enabled: !!user?.email,
  });

  // Show loading animation while checking auth state or fetching user data
  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    Swal.fire({
      icon: "error",
      title: "You need to login first",
      showConfirmButton: false,
      timer: 2000,
    });
    console.log(location);
    return <Navigate to="/join" state={{ from: location.pathname }} replace />;
  }

  // Check if route requires specific roles
  if (allowedRoles && !allowedRoles.includes(userInfo?.role)) {
    Swal.fire({
      icon: "warning",
      title: "Unauthorized Access",
      text: "You don't have permission to view this page",
      showConfirmButton: false,
      timer: 4000,
    });
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the protected content
  return children;
};

export default PrivateRoute;
