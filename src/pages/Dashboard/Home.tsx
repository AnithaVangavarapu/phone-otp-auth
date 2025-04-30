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
      navigate("/");
    } else {
      navigate("/signin");
    }
  }, [isAuthenticate]);
  return (
    <div className="flex justify-between mx-5 mt-2 border rounded-md p-2 items-center border-gray-200">
      <div className="text-blue-950 font-medium text-[20px]">Dashboard</div>
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
