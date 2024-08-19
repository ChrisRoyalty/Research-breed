import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

function Main() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default Main;
