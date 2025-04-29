import { useContext } from "react";
import UserContext, { UserContextProps } from "../context/userContext";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuthenticate } = contextData;

  return isAuthenticate ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
