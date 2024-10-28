import React from "react";
import { Link } from "react-router-dom";

function WelcomeScreen() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="text-center p-16 w-full mx-auto bg-white shadow-md">
        <h1 className="text-4xl font-medium mb-10 leading-10">
          Welcome to the Exam
        </h1>
        <Link
          to="/exam"
          className="bg-blue-500 text-white text-xl py-2 px-8 rounded hover:bg-blue-600"
        >
          Start Exam
        </Link>
      </div>
    </div>
  );
}

export default WelcomeScreen;
