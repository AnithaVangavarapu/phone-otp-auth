import { Signin } from "./pages/SignIn";
import { Home } from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/userContext";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { NotFound } from "./components";
function App() {
  return (
    <div className="font-poppins ">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/signin" element={<Signin />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
