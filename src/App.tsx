import { Signin } from "./pages/SignIn";
import { Home } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
function App() {
  return (
    <div className="font-poppins ">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
