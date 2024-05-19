/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { Context } from "../contextProvider";

export default function UnProtectedPath({ children }) {
  const navigate = useNavigate();
  const status = useContext(Context);
  if (status.user?.success === null) return <Loader />;
  return status.user?.success ? (
    navigate('/dashboard')
  ) : (
    children
  );
}
