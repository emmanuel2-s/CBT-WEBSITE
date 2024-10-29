import React from "react";
import { HiOutlineLibrary } from "react-icons/hi";
import { Link } from "react-router-dom";

function DashboardCard() {
  return (
    <div className="container mx-auto w-full">
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full px-4">
          <Link
            to="/teacherlist"
            className="bg-white shadow rounded h-full py-6 p-4 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
              <HiOutlineLibrary size={50} />
            </div>
            <h2 className="text-center text-2xl font-semibold py-4">Teacher</h2>
          </Link>

          <Link
            to="/classlist"
            className="bg-white shadow rounded h-full py-6 p-4 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
              <HiOutlineLibrary size={50} />
            </div>
            <h2 className="text-center text-2xl font-semibold py-4">Class</h2>
          </Link>

          <Link
            to="/student"
            className="bg-white shadow rounded h-full py-6 p-4 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
              <HiOutlineLibrary size={50} />
            </div>
            <h2 className="text-center text-2xl font-semibold py-4">Student</h2>
          </Link>

          <Link
            to="/exam"
            className="bg-white shadow rounded h-full py-6 p-4 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
              <HiOutlineLibrary size={50} />
            </div>
            <h2 className="text-center text-2xl font-semibold py-4">Exam</h2>
          </Link>

          <Link
            to="/result"
            className="bg-white shadow rounded h-full py-6 p-4 hover:bg-gray-200 cursor-pointer"
          >
            <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
              <HiOutlineLibrary size={50} />
            </div>
            <h2 className="text-center text-2xl font-semibold py-4">Result</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
