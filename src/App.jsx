import React from "react";
import Routerpage from "./Auth/Routerpage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div>
        <ToastContainer />
        <Routerpage />
      </div>
    </>
  );
}

export default App;
