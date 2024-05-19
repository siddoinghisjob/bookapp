import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/regsiter";
import NotFound from "./pages/404";
import Dashboard from "./pages/dashboard";
import { ContextProvider } from "./contextProvider";
import useAuth from "./hooks/useAuth";
import UnProtectedPath from "./comps/unprotected";
import ProtectedPath from "./comps/protected";
import Book from "./pages/book";
import Header from "./comps/Header";

function App() {
  const [status, setStatus] = useAuth();
  return (
    <ContextProvider value={{ user: status, setState: setStatus }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <UnProtectedPath>
              <Login />
            </UnProtectedPath>
          }
        />
        <Route
          path="/register"
          element={
            <UnProtectedPath>
              <Register />
            </UnProtectedPath>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedPath>
              <Dashboard />
            </ProtectedPath>
          }
        />
        <Route
          path="/book/works/:id"
          element={
            <ProtectedPath>
              <Book />
            </ProtectedPath>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ContextProvider>
  );
}

export default App;
