import React, { useEffect, useRef, useState } from "react";
import Bg from "../assets/imgs/bg-1.jpg";
import Logo from "../assets/imgs/image.png";
import { MdComputer, MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLibrary } from "react-icons/hi";
import { CgMenuBoxed } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import Modal from "../utils/Modal";
import { TiPlus, TiPlusOutline, TiUpload } from "react-icons/ti";
import PlainTextField from "./textFields/plainTextField";
import { useForm } from "react-hook-form";
import SelectField from "./textFields/selectField";
import api from "../utils/api/api";
import { notifyError, notifySuccess } from "../utils/toaster";
import CreateAccount from "../Auth/createAccount";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { DropdownIcon } from "../utils/dropDownIcon";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const page = 0;

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const history = useNavigate();
  const handleTest = () => {
    history("/test");
  };

  const handleSearchByChange = (option) => {
    setSearchBy(option);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value) {
      // fetchDraws();
      console.log("first");
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api.Auth.getAllUser();
      console.log("users", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDropDownChange = (value) => {
    setSearchQuery(value);
    setIsMobileModalOpen(false);
    handleSearchFunc(value);
  };

  const handleSearchFunc = async (value) => {
    const page = 0;
    const limit = 1000;

    if (searchBy === "Name") {
      setLoading(true);
      try {
        const response = await api.draws.searchquery({
          pageNumber: page,
          pageSize: limit,
          name: searchQuery,
        });
        const resData = response.data;
        const count = response.data.totalElements;
        console.log("Search Results:", response.data);
        // setPageCount(Math.ceil(count / limit));
        // setDrawList(resData);
        setLoading(false);
      } catch (error) {
        console.error("Search Error:", error);
        setLoading(false);
        notifyError("Invalid search term on a wrong searchBy selected");
      }
    } else if (searchBy === "Category") {
      try {
        setLoading(true);
        const response = await api.draws.searchquery({
          pageNumber: page,
          pageSize: limit,
          category: searchQuery.toUpperCase() || value.toUpperCase(),
        });
        const resData = response.data.content;
        const count = response.data.totalElements;
        console.log("Search Results:", response.data);
        // setPageCount(Math.ceil(count / limit));
        // setDrawList(resData);
        setLoading(false);
      } catch (error) {
        console.error("Search Error:", error);
        setLoading(false);
        notifyError("Invalid search term on a wrong searchBy selected");
      }
    } else if (searchBy === "Channel") {
      setLoading(true);
      try {
        const response = await api.draws.searchquery({
          pageNumber: page,
          pageSize: limit,
          channel: searchQuery,
        });
        const resData = response.data.content;
        const count = response.data.totalElements;
        console.log("Search Results:", response.data);
        // setPageCount(Math.ceil(count / limit));
        // setDrawList(resData);
        setLoading(false);
      } catch (error) {
        console.error("Search Error:", error);
        notifyError("Invalid search term on a wrong searchBy selected");
        setLoading(false);
      }
    }
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // setPreviewModal(false);
      setCategoryDropDown(false);
      setIsDropdownOpen(false);
      setIsMobileModalOpen(false);
    }
  };

  useEffect(() => {
    if (categoryDropDown || isDropdownOpen || isMobileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [categoryDropDown, isDropdownOpen, isMobileModalOpen]);

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
              className="absolute hidden bg-[#f9f9f9] group-hover:block shadow-[0px 8px 16px 0px rgba(0,0,0,0.2)] min-w-40 z-10 overflow-hidden"
              id="myDropdown"
            >
              <Link
                to="/classlist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Class Level
              </Link>
              <Link
                to="/armslist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Arms
              </Link>
              <Link
                to="/subjectlist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Subject
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" container mx-auto flex justify-end items-end mt-4 px-4">
        <CreateAccount />
        <Link
          to={"/rolelist"}
          className=" flex items-center py-2 px-4 mr-3 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded"
        >
          <TiPlusOutline size={20} title="Add Role" />
          <span className="px-1 text-lg hidden sm:block">Add Role</span>
        </Link>
        <button
          className=" flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded"
          onClick={openModal}
        >
          <TiUpload size={20} title="Upload" />
          <span className="px-1 text-lg hidden sm:block">Upload</span>
        </button>
      </div>
      <div>
        <DashboardCard />
      </div>
      {/* ALL STUDENT AND CLASSES TABLE */}
      <section className=" container mx-auto pb-4 h-auto overflow-auto no-scrollbar px-4 mt-12">
        <table className="table-auto w-full mt-4 team-table bg-white">
          <caption className="caption-top bg-white py-2 text-xl">
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

      {/* ALL USERS TABLE */}

      <section className=" container mx-auto mt-12">
        <div className="flex justify-between items-center py-2 px-2 md:px-6 font-semibold bg-white font-custom">
          <h1 className="text-lg font-bold text-nowrap">All Users</h1>
          <div className="flex items-center">
            {/* Custom Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border-none rounded px-2 py-1 flex items-center text-nowrap"
              >
                {searchBy ? searchBy : "Search By"}
                <IoMdArrowDropdown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute bg-white border border-gray-300 rounded shadow-lg mt-1 z-50"
                  ref={dropdownRef}
                >
                  <ul className="py-1 whitespace-nowrap">
                    <li
                      onClick={() => handleSearchByChange("Name")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Name
                    </li>
                    <li
                      onClick={() => handleSearchByChange("Category")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-start"
                    >
                      Category
                    </li>
                    <li
                      onClick={() => handleSearchByChange("Channel")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      Channel
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className=" border-2 border-gray-300 hidden py-1 w-8/12 mx-3 rounded-3xl px-2 md:flex justify-between items-center">
              <input
                type="search"
                placeholder={`Search By ${searchBy}`}
                value={searchQuery}
                onChange={handleInputChange}
                className="border-r-2 border-r-gray-400 mr-1 focus:outline-none w-full pr-2 px-2 bg-transparent"
                onKeyDown={(e) => e.key === "Enter" && handleSearchFunc()}
                // disabled={searchBy === "Category"}
                onKeyUp={(e) => handleSearchFunc(e.target.value)}
              />
              <CiSearch
                size={25}
                className="text-gray-600"
                onClick={handleSearchFunc}
              />
            </div>
            {/* mobile search icon */}
            <div className="text-gray-600 p-1 bg-gray-200 rounded block md:hidden">
              <CiSearch
                size={30}
                className="text-gray-600"
                onClick={() => setIsMobileModalOpen(true)}
              />
            </div>

            {/* Modal for Small Screens */}
            {isMobileModalOpen && (
              <div
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
                onClick={handleClickOutside}
              >
                <div
                  className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto relative"
                  ref={dropdownRef}
                >
                  <button
                    className="absolute top-3 right-6 text-lg p-2 text-white rounded-full w-10 h-10 bg-blue-700 shadow-md z-50"
                    // onClick={resetAll}
                  >
                    ✕
                  </button>
                  <div>
                    <div className="relative">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="border-none rounded px-2 py-1 flex items-center text-nowrap"
                      >
                        {searchBy ? searchBy : "Search By"}
                        <IoMdArrowDropdown className="ml-2" />
                      </button>

                      {isDropdownOpen && (
                        <div
                          className="absolute bg-white border border-gray-300 rounded shadow-lg mt-1 z-50"
                          ref={dropdownRef}
                        >
                          <ul className="py-1 whitespace-nowrap">
                            <li
                              onClick={() => handleSearchByChange("Name")}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              Name
                            </li>
                            <li
                              onClick={() => handleSearchByChange("Category")}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              Category
                            </li>
                            <li
                              onClick={() => handleSearchByChange("Channel")}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              Channel
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Search Input */}
                    <div className=" border-2 border-gray-300 py-1 mt-4 w-full rounded-3xl px-2 flex justify-between items-center">
                      <input
                        type="search"
                        placeholder={`Search By ${searchBy}`}
                        value={searchQuery}
                        onChange={handleInputChange}
                        className="border-r-2 border-r-gray-400 mr-1 focus:outline-none w-full pr-2 px-2 bg-transparent"
                        // onKeyDown={(e) =>
                        //   e.key === "Enter" && handleSearchFunc()
                        // }
                        // disabled={searchBy === "Category"}
                        // onKeyUp={(e) => handleSearchFunc(e.target.value)}
                      />
                      <CiSearch
                        size={35}
                        className="text-gray-600"
                        onClick={handleSearchFunc}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* <div>
              <button
                className="bg-blue-600 rounded ml-2 px-2 py-1.5 focu text-nowrap text-center text-white hover:bg-blue-700 font-bold flex items-center"
                onClick={openModal}
              >
                <TiPlus size={25} className="block" />
                <span className="text-white hidden md:block pt-1">Create</span>
              </button>
            </div> */}
          </div>
        </div>
      </section>

      <section className=" container mx-auto pb-4 h-auto overflow-auto no-scrollbar bg-white">
        <table className="table-auto w-full mt-4 team-table ">
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
            {users?.map((user,index)=>
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

              <td className="whitespace-nowrap text-left">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownToggle(index);
                  }}
                >
                  <DropdownIcon
                    index={index}
                    isOpen={openDropdownIndex === index}
                    btnDelete="Delete"
                    handleView={`/drawdetails/${draw?.drawId}`}
                    handleEdit={() => handleEdit(draw?.drawId)}
                    showDelete={true}
                    handleDelete={() => handleDelete(draw?.drawId)}
                    showOptions={true}
                    showOtherItems={true}
                    showCreate={true}
                    handleClick={() => openWinnerModal(draw?.drawId)}
                  />
                </div>
              </td>
            </tr>
            )}
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

      {/* Upload modal */}
      {isModalOpen && (
        <Modal
          header={"Upload Excel File"}
          isOpen={openModal}
          onClose={closeModal}
          handleClick={"/"}
          value={"Upload"}
        >
          <div className="flex justify-center flex-col items-center mt-10">
            <img src="" alt="" />
            <input type="file" name="file" id="file" className="mb-4" />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
