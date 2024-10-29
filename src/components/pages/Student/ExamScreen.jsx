import React from "react";
import { IoMdMenu } from "react-icons/io";
import userIcon from "../../../assets/imgs/icons-big.png";
import { HiOutlineLibrary, HiOutlineUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";

function ExamScreen() {
  return (
    <div>
      <div className="flex-1 w-full">
        <div className="bg-[#fdfeff] h-16 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-800">Welcome Id</h1>
          <div
            className="block md:hidden cursor-pointer "
            onClick={() => setNav(true)}
          >
            <IoMdMenu size={35} />
          </div>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full px-4">
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">ENGLISH</h3>
                <p className="bg-gray-400 text-white px-2 py-1 font-bold rounded">
                  Active
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: English</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">MATHEMATICS</h3>
                <p className="bg-gray-400 text-white px-2 py-1 font-bold rounded">
                  Active
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: MATHEMATICS</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">ECONOMICS</h3>
                <p className="bg-green-400 text-white px-2 py-1 font-bold rounded">
                  Done
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: ECONOMICS</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">GOVERNMENT</h3>
                <p className="bg-green-400 text-white px-2 py-1 font-bold rounded">
                  Done
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: GOVERNMENT</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">PHYSICS</h3>
                <p className="bg-gray-400 text-white px-2 py-1 font-bold rounded">
                  Active
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: PHYSICS</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">BIOLOGY</h3>
                <p className="bg-green-400 text-white px-2 py-1 font-bold rounded">
                  Done
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: BIOLOGY</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
            <div className="bg-white shadow rounded h-full">
              <div className="flex justify-between items-center bg-gray-300 w-full h-14 px-4">
                <h3 className="text-xl font-medium">FRENCH</h3>
                <p className="bg-red-400 text-white px-2 py-1 font-bold rounded">
                  Expired
                </p>
              </div>
              <ul className="my-4 px-4 text-lg">
                <li className="pb-3">Subject: FRENCH</li>
                <li>Class: SS3</li>
              </ul>

              <button className="login px-8 py-2 text-white text-lg mx-4 rounded md:text-xl my-3 hover:bg-gray-600">
                Start exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamScreen;
