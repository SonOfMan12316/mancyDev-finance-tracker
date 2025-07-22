import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../api/helper/authService";
import LoadingDots from "../ui/LoadingDots";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center my-auto">
        <LoadingDots />
      </div>
    );
  if (!user) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
