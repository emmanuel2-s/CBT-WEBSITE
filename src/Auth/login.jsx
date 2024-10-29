import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/toaster";
import logImgBg from "../assets/imgs/image.png";

function Login() {
  // const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const student = "student@gmail.com";
  const Admin = "admin@gmail.com";
  const pass = "123456";

  const handleLogin = () => {
    if (username === student && password === pass) {
      navigate("/student");
      notifySuccess("Login successful");
    } else if (username === Admin && password === pass) {
      navigate("/home");
      notifySuccess("Login successful");
    } else {
      // navigate("/");
      notifyError("Wrong Credential");
    }

    // let role;
    // if (username.includes("@")) {
    //   // Email format, so user is either a teacher or admin
    //   if (username.startsWith("admin")) {
    //     role = "admin";
    //   } else {
    //     role = "teacher";
    //   }
    // } else {
    //   // Assume student ID format
    //   role = "student";
    // }

    // // Set user data and role
    // setUser({ username, role });

    // if (role === "student") navigate("/test");
    // else if (role === "teacher") navigate("/teacherlist");
    // else if (role === "admin") navigate("/home");
  };
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex justify-between items-center mt-10 bg-white px-4 w-full rounded-xl">
        <img src={logImgBg} alt="/" className="w-[300px]" />
        <div className="w-full">
          {/* <h2 className="text-center text-3xl uppercase font-semibold py-6 leading-10">
            Login Here
          </h2> */}
          <form className="max-w-lg mx-auto block">
            <div className="flex">
              <label htmlFor="username" className="text-lg font-medium">
                Email/Id
              </label>
              <span className="text-red-600">*</span>
            </div>
            <input
              type="email"
              name="username"
              id="username"
              value={username}
              placeholder="Enter email or id"
              onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 outline-none border-2 border-gray-300 rounded-md mt-1 px-2"
                required
              />
            </div>

            <button
              className="login text-white py-3 font-medium text-2xl font-serif mt-10 rounded w-full hover:bg-gray-600 ease-in-out duration-200"
              onClick={handleLogin}
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
