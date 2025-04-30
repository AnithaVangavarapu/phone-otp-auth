import { createContext, ReactNode, useState, useEffect } from "react";
export interface UserContextProps {
  isAuthenticate: boolean;
  setIsAuthenticate: (val: boolean) => void;
}
interface UserProviderProps {
  children: ReactNode;
}
const UserContext = createContext<UserContextProps>({
  isAuthenticate: false,
  setIsAuthenticate: () => {},
});

export default UserContext;
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus) {
      setIsAuthenticate(true);
    } else {
      setIsAuthenticate(false);
    }
  }, []);

  return (
    <UserContext value={{ isAuthenticate, setIsAuthenticate }}>
      {children}
    </UserContext>
  );
};
