import React from "react";
import { navigate } from "@reach/router";
import { useSelector } from "react-redux";
import { useLocation } from "@reach/router";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const user = useSelector((state) => state?.user);

  // const location = useLocation();

  if (!user?.id) {
    navigate("/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
