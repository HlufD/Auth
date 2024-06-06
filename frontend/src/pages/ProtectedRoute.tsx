import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.user);

  return user.id > -1 ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
