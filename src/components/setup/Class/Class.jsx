import React, { useEffect, useState } from "react";
// import Backbutton from "../../../utils/backbutton";
import CardHeader from "../../CardHeader";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import api from "../../../utils/api/api";
import { useNavigate, useLocation } from "react-router-dom";

function Class() {
  const [createClass, setCreateClass] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataSaved, setIsDataSaved] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedClass = JSON.parse(localStorage.getItem("classlevel")) || [];
    setClassList(savedClass);
  }, []);

  const Add = (e) => {
    e.preventDefault();
    if (createClass === "") {
      notifyError("input must not be empty");
      return;
    }
    const data = {
      name: createClass.toLocaleUpperCase(),
    };
    // let d = JSON.parse(localStorage.getItem("arms")) || [];
    // d.push(data);
    // localStorage.setItem("arms", JSON.stringify(d));
    // setIsvisible(true);
    const updatedClassList = [...classList, data];
    setClassList(updatedClassList);
    localStorage.setItem("classlevel", JSON.stringify(updatedClassList));
    setCreateClass("");
    notifySuccess("Arm added successfully");
  };

  const save = async () => {
    setLoading(true);
    const localDetails = JSON.parse(localStorage.getItem("classlevel")) || [];
    if (localDetails.length === 0) {
      notifyError("No data to save");
      setLoading(false);
      return;
    }

    try {
      // Use Promise.all to save all levels concurrently
      const savePromises = localDetails.map((level) =>
        api.classLevel.create(level)
      );
      const responses = await Promise.all(savePromises);

      // Check responses for success or failure
      const allSuccessful = responses.every((response) => response.isSuccess);

      // for (const level of localDetails) {
      //   const response = await api.classLevel.create(level);
      console.log("Save response:", responses);
      if (allSuccessful) {
        setClassList([]);
        notifySuccess("Data saved successfully");
        localStorage.removeItem("classlevel");
        navigate("/classlist");
      }
    } catch (error) {
      console.log("Error", error);
      notifyError("Failed to save data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //  useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     if (isDataSaved) {
  //       e.preventDefault();
  //       e.returnValue = "";
  //     }
  //   };

  //   const handleNavigate = (e) => {
  //     if (isDataSaved) {
  //       const confirmLeave = window.confirm(
  //         "You have unsaved changes. Do you want to leave without saving?"
  //       );
  //       if (!confirmLeave) {
  //         e.preventDefault();
  //       } else {
  //         window.removeEventListener("beforeunload", handleBeforeUnload);
  //         navigate(e.pathname);
  //       }
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [isDataSaved, navigate, location]);

  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full md:mt-10 pb-10">
        <CardHeader title="Class Level Setup" />

        <form className="flex items-center justify-center mt-10" onSubmit={Add}>
          <div className="block w-full md:w-6/12 mr-4">
            {/* <label htmlFor="class" className="">
              Class
            </label> */}
            <input
              type="text"
              name="class"
              id="class"
              value={createClass}
              placeholder="Create class levels "
              onChange={(e) => setCreateClass(e.target.value)}
              className="outline-none w-full py-2 rounded border-2 border-gray-400 px-2 focus:outline-[#fcd0d0] focus:outline-offset-4 focus:outline-4 text-lg uppercase"
            />
          </div>
          <button className="login px-8 py-2.5 rounded text-white text-xl">
            Add
          </button>
        </form>
      </div>
      {classList.length > 0 && (
        <div className="mt-6 md:mt-8 bg-white rounded px-4 w-full py-4">
          <div className="flex justify-end ">
            <button
              className="py-2 px-8 bg-blue-600 text-white font-medium rounded"
              onClick={save}
              disabled={loading ? true : false}
            >
              {loading ? "Saving" : "Save"}
            </button>
          </div>
          <table className="table-auto w-full mt-4 team-table">
            <thead>
              <tr className="table-arrange">
                <th className="whitespace-nowrap text-left px-4">Name</th>
                <th className="whitespace-nowrap text-center px-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {classList.map((level, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    {level?.name}
                  </td>
                  <td className="whitespace-nowrap text-center px-4">
                    <div className="">
                      <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                        <MdEdit />
                      </button>
                      <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                        <IoMdTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    // </div>
  );
}

export default Class;
