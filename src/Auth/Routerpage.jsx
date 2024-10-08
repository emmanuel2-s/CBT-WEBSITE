import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import HomePage from "../components/HomePage";
import TestPage from "../components/TestPage";

function Routerpage() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="/home" Component={HomePage} />
          <Route path="/test" Component={TestPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routerpage;
