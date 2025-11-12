import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/kategori" && <ScrollRestoration />}
      <Outlet />
    </>
  );
};

export default AppLayout;
