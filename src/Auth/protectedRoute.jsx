import React from "react";
import { Navigate } from "react-router";
import api from "../utils/api/api";

// import AuthMain from "../components/authMain";
const ProtectedRoute = ({ Component }) => {
  if (api.Auth.isAuth()) {
    return (
      <>
        <Component />
      </>
    );
  } else {
    localStorage.setItem("lastAccessedUrl", window.location.pathname);
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
