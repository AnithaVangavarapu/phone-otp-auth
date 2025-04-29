import { useEffect, useContext } from "react";
import UserContext, { UserContextProps } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../commonComponents";
const Home = () => {
  const contextData = useContext<UserContextProps>(UserContext);
  const { isAuthenticate, setIsAuthenticate } = contextData;
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticate) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticate]);
  return (
    <div className="flex justify-between m-10">
      <div>Dashboard</div>
      <Button
        label="Logout"
        type="button"
        onClick={() => {
          setIsAuthenticate(false);
          window.location.reload();
          localStorage.clear();
        }}
        classname="w-[15%] p-1 text-[14px] bg-blue-950 text-white font-medium cursor-pointer"
      />
    </div>
  );
};

export default Home;
