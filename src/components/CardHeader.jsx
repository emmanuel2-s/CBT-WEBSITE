import React from "react";
import Logo from "../assets/imgs/image.png";
import Backbutton from "../utils/backbutton";

function CardHeader({ title }) {
  return (
    <div className="flex justify-between items-center">
      <img
        src={Logo}
        alt="logo"
        className="w-20 h-20 object-cover rounded-md mt-4"
      />
      <h1 className="text-xl uppercase text-center font-medium">{title}</h1>
      <Backbutton />
    </div>
  );
}

export default CardHeader;
