import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ navigate, component: Component, ...rest }) => {
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return null;
    }
  }, [user]);

  return <Component {...rest} />;
};

export default PrivateRoute;
