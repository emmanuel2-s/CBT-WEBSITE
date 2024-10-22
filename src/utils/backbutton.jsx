import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Backbutton() {
  const history = useNavigate();
  const backBtn = () => {
    history(-1);
  };
  return (
    <button
      className="bg-black flex items-center float-left rounded text-white text-lg px-2 py-2"
      onClick={backBtn}
    >
      <FaArrowLeftLong className="mr-1" />
      <span>Back</span>
    </button>
  );
}

export default Backbutton;
