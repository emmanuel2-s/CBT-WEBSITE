import React from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../utils/toaster";
import logImgBg from "../assets/imgs/image.png";

function Login() {
  const history = useNavigate();
  const handleSubmit = () => {
    //   setTimeout(() => {
    history("/home");
    // }, 1500);
    notifySuccess("Login successful");
  };
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex justify-between items-center bg-white mt-16 px-4 mb-3 w-full rounded-3xl">
        <img src={logImgBg} alt="/" className="w-[398px]" />
        <div className="w-full">
          <h2 className="text-center text-3xl uppercase font-semibold py-6 leading-10">
            Login Here
          </h2>
          <form className="max-w-lg mx-auto block">
            <div className="flex">
              <label htmlFor="username" className="text-lg font-medium">
                Email/Id
              </label>
              <span className="text-red-600">*</span>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter email or id"
              className="w-full py-3 outline-none border-2 border-gray-300 rounded-md mt-1 px-2"
              required
            />

            <div className="mt-6">
              <div className="flex ">
                <label htmlFor="password" className="text-lg font-medium">
                  Password
                </label>
                <span className="text-red-600">*</span>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="**********"
                className="w-full py-3 outline-none border-2 border-gray-300 rounded-md mt-1 px-2"
                required
              />
            </div>

            <button
              className="login text-white py-3 font-medium text-2xl font-serif mt-10 rounded w-full hover:bg-gray-600 ease-in-out duration-200"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
