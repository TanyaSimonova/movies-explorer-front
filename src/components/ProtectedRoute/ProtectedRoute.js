import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = (props) => {
  return props.loggedIn ? props.children : <Navigate to="/" replace />;
};

export default ProtectedRouteElement;
