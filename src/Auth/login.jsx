import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { notifySuccess } from "../utils/toaster";

function Login() {
  const history = useNavigate();
  const handleSubmit = () => {
    //   setTimeout(() => {
    history("/home");
    // }, 1500);
    notifySuccess("Login successful");
  };
  return (
    <div className="max-w-lg mx-auto w-full">
      <div className="bg-white mt-28 px-4 mb-3 py-12 shadow-md">
        <h2 className="text-center text-3xl uppercase font-semibold py-6 leading-10">
          Member Login
        </h2>
        <form className="max-w-md mx-auto block">
          <label htmlFor="username" className="text-lg font-medium">
            UserName
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full py-3 outline-none border-2 border-gray-300 rounded-md mt-1 px-2"
            required
          />

          <div className="mt-6">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full py-3 outline-none border-2 border-gray-300 rounded-md mt-1 px-2"
              required
            />
          </div>

          <button
            className="bg-gray-300 py-3 font-medium text-xl mt-10 rounded w-full hover:bg-gray-400 ease-in-out duration-200"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
