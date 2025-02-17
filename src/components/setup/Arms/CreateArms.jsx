import React, { useEffect, useState } from "react";
// import Backbutton from "../../../utils/backbutton";
import CardHeader from "../../CardHeader";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import api from "../../../utils/api/api";
import { useNavigate } from "react-router-dom";

function Arms() {
  const [createArm, setCreateArm] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  const [armList, setArmList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedArms = JSON.parse(localStorage.getItem("arms")) || [];
    setArmList(savedArms);
  }, []);

  const Add = (e) => {
    e.preventDefault();
    if (createArm === "") {
      notifyError("input must not be empty");
      return;
    }
    const data = {
      name: createArm.toLocaleUpperCase(),
    };
    // let d = JSON.parse(localStorage.getItem("arms")) || [];
    // d.push(data);
    // localStorage.setItem("arms", JSON.stringify(d));
    // setIsvisible(true);
    const updatedArmsList = [...armList, data];
    setArmList(updatedArmsList);
    localStorage.setItem("arms", JSON.stringify(updatedArmsList));
    setCreateArm("");
    notifySuccess("Arm added successfully");
  };

  const save = async () => {
    setLoading(true);
    const localDetails = JSON.parse(localStorage.getItem("arms")) || [];
    if (localDetails.length === 0) {
      notifyError("No data to save");
      setLoading(false);
      return;
    }

    try {
      // for (const arm of localDetails) {
      //   const response = await api.arms.create(arm);

      // Use Promise.all to save all levels concurrently
      const savePromises = localDetails.map((arm) => api.arms.create(arm));
      const responses = await Promise.all(savePromises);

      // Check responses for success or failure
      const allSuccessful = responses.every((response) => response.isSuccess);

      console.log("Save response:", responses);
      if (allSuccessful) {
        setArmList([]);
        localStorage.removeItem("arms");
        notifySuccess("Data saved successfully");
        // setLoading(false);
        navigate("/armslist");
      }
    } catch (error) {
      console.log("Error", error);
      notifyError("Failed to save data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full md:mt-10 pb-10">
        <CardHeader title="Arms Setup" />

        <form className="flex items-center justify-center mt-10" onSubmit={Add}>
          <div className="block w-full md:w-6/12 mr-4">
            {/* <label htmlFor="class" className="">
              Class
            </label> */}
            <input
              type="text"
              name="class"
              id="class"
              value={createArm}
              placeholder="Create class arms"
              onChange={(e) => setCreateArm(e.target.value)}
              className="outline-none w-full py-2 rounded border-2 border-gray-400 px-2 focus:outline-[#fcd0d0] focus:outline-offset-4 focus:outline-4 text-lg uppercase"
            />
          </div>
          <button className="login px-8 py-2.5 rounded text-white text-xl">
            Add
          </button>
        </form>
      </div>
      {armList.length > 0 && (
        <div className="mt-6 md:mt-8 bg-white rounded px-4 w-full py-4">
          <div className="flex justify-end">
            <button
              className="py-2 px-8 bg-blue-600 text-white font-medium rounded"
              onClick={save}
              disabled={loading ? true : false}
            >
              {loading ? "Saving" : "Save"}
            </button>
          </div>

          <table className="table-auto w-full mt-4 team-table">
            <tr className="table-arrange">
              <th className="whitespace-nowrap text-left px-4">Name</th>
              {/* <th className="whitespace-nowrap text-left px-4">CreateBy</th> */}
              <th className="whitespace-nowrap text-center px-4">Action</th>
            </tr>

            <tbody>
              {armList.map((arm, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-left px-4 font-medium uppercase">
                    {arm.name}
                  </td>
                  {/* <td className="whitespace-nowrap text-left px-4 font-medium"></td> */}
                  <td className="whitespace-nowrap text-center px-4">
                    {/* <div className="">
                      <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                        <MdEdit />
                      </button> */}
                    <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                      <IoMdTrash />
                    </button>
                    {/* </div> */}
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

export default Arms;
