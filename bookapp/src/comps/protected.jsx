/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { Context } from "../contextProvider";
import Header from "./Header";
import Footer from "./footer";

export default function ProtectedPath({ children }) {
  const status = useContext(Context);
  const navigate = useNavigate();
  if (status.user?.success === null) return <Loader />;
  if (status.user?.success) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        {children}
        <Footer />
      </div>
    );
  } else {
    return navigate("/login");
  }
}
