import React from "react";
import Bg from "../assets/imgs/bg-1.jpg";
import Logo from "../assets/imgs/image.png";
import { MdComputer, MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLibrary } from "react-icons/hi";
import { CgMenuBoxed } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";

function HomePage() {
  const history = useNavigate();
  const handleTest = () => {
    history("/test");
  };
  return (
    <div className="w-full">
      <div className="bg-white">
        <div className="flex justify-between items-center px-8 w-full">
          <img
            src={Logo}
            alt="logo"
            className="w-20 h-20 object-cover rounded-md"
          />
          <div className="dropdown overflow-hidden float-left group">
            <button className="text-white text-xl flex items-center bg-red-600 px-6 py-2">
              Setup
              <MdKeyboardArrowDown />
            </button>
            <div
              className="absolute hidden bg-[#f9f9f9] group-hover:block shadow-[0px 8px 16px 0px rgba(0,0,0,0.2)] min-w-40 z-10"
              id="myDropdown"
            >
              <Link
                to="/classsetup"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Class
              </Link>
              <Link
                to="/arms"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Arms
              </Link>
              <Link
                to="/subjectsetup"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Subject
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DashboardCard />
      </div>

      <section className=" container mx-auto pb-4 h-auto overflow-auto no-scrollbar px-4 mt-12">
        <table className="table-auto w-full mt-4 team-table bg-white">
          <caption class="caption-top bg-white py-2 text-xl">
            Table 1.1: Total student and their classes.
          </caption>
          <tr className="table-arrange">
            <th className="whitespace-nowrap text-left px-4">S/N</th>
            <th className="whitespace-nowrap text-left px-4">JSS1</th>
            <th className="whitespace-nowrap text-left px-4">JSS2</th>
            <th className="whitespace-nowrap text-left px-4">JSS3</th>
            <th className="whitespace-nowrap text-left px-4">SS1 </th>
            <th className="whitespace-nowrap text-left px-4">SS2</th>
            <th className="whitespace-nowrap text-left px-4">SS3</th>
          </tr>
          <tbody>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                A
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                B
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                C
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
          </tbody>
        </table>
      </section>

      <div className="block md:flex md:justify-center md:items-center my-12 gap-6 container mx-auto px-3">
        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <MdComputer size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">
            Computer-Based Test (CBT)
          </h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            onClick={handleTest}
          >
            Start Test
          </button>
        </div>

        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4 mt-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <HiOutlineLibrary size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">Library</h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-200 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            disabled
          >
            Coming Soon
          </button>
        </div>

        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4 mt-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <CgMenuBoxed size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">Others</h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-200 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
