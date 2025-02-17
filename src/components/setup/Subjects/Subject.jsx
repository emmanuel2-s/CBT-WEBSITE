import React, { useEffect, useState } from "react";
// import Backbutton from "../../../utils/backbutton";
import CardHeader from "../../CardHeader";
import api from "../../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

function Subject() {
  const [createSub, setCreateSub] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedSub = JSON.parse(localStorage.getItem("subject")) || [];
    setSubjectList(savedSub);
  }, []);

  const Add = (e) => {
    e.preventDefault();
    if (createSub === "") {
      notifyError("input must not be empty");
      return;
    }
    const data = {
      name: createSub.toLocaleUpperCase(),
    };
    const updatedSubList = [...subjectList, data];
    setSubjectList(updatedSubList);
    localStorage.setItem("subject", JSON.stringify(updatedSubList));
    setCreateSub("");
    notifySuccess("Subject added successfully");
  };

  const save = async () => {
    // setLoading(true);
    const localDetails = JSON.parse(localStorage.getItem("subject")) || [];
    if (localDetails.length === 0) {
      notifyError("No data to save");
      return;
    }

    try {
      setLoading(true);

      // Use Promise.allSettled to handle success and error responses
      const savePromises = localDetails.map((sub) => api.subjects.create(sub));
      const results = await Promise.allSettled(savePromises);

      // Separate successful and failed responses
      const successfulResponses = results.filter(
        (result) => result.status === "fulfilled" && result.value?.isSuccess
      );
      const failedResponses = results.filter(
        (result) => result.status === "rejected" || !result.value?.isSuccess
      );

      // Log for debugging
      console.log("Successful responses:", successfulResponses);
      console.log("Failed responses:", failedResponses);

      // Notify the user of the outcomes
      if (successfulResponses.length > 0) {
        notifySuccess(
          `${successfulResponses.length} subject(s) created successfully`
        );
      }

      if (failedResponses.length > 0) {
        const errorMessages = failedResponses.map((result) => {
          if (result.status === "fulfilled") {
            return result.value?.errorMessage || "An error occurred.";
          }
          return result.reason?.message || "Failed to process request.";
        });

        notifyError(
          `Failed to create ${
            failedResponses.length
          } subject(s): ${errorMessages.join(", ")}`
        );

        localStorage.removeItem("subject");
      }

      // If there are any successful responses, update the state and navigate
      if (successfulResponses.length > 0) {
        setSubjectList([]);
        localStorage.removeItem("subject");
        navigate("/subjectlist");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      notifyError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }

    // try {
    //   // for (const sub of localDetails) {
    //   //   const response = await api.arms.create(sub);
    //   //   console.log("Save response:", response);

    //   // Use Promise.all to save all levels concurrently
    //   const savePromises = localDetails.map((sub) => api.subjects.create(sub));
    //   const responses = await Promise.all(savePromises);

    //   // Check responses for success or failure
    //   const allSuccessful = responses.every((response) => response.isSuccess);

    //   console.log("Save response:", responses);

    //   if (allSuccessful) {
    //     setSubjectList([]);
    //     notifySuccess("Subject Created successfully");
    //     localStorage.removeItem("subject");
    //     navigate("/subjectlist");
    //   }
    // } catch (error) {
    //   console.log("Error", error);
    //   notifyError(error.errorMessage || "Failed to save data");
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleDelete = (index) => {
    const savedSub = JSON.parse(localStorage.getItem("subject")) || [];

    const updateSub = [
      ...savedSub.slice(0, index), // Items before the index
      ...savedSub.slice(index + 1), // Items after the index
    ];
    console.log("del", updateSub);
    localStorage.setItem("subject", JSON.stringify(updateSub));
    notifySuccess("data deleted successfully");
    setSubjectList(updateSub);
  };

  const handleEdit = (indexToEdit, updatedValue) => {
    // Retrieve the subjects from local storage
    const savedSub = JSON.parse(localStorage.getItem("subject")) || [];

    // Update the specific item at the index
    const updatedSub = savedSub.map((item, index) => {
      if (index === indexToEdit) {
        setCreateSub(item.name);
        return { ...item, name: updatedValue }; // Modify the desired property
      }
      return item; // Keep other items unchanged
    });

    // Save the updated list back to local storage
    localStorage.setItem("subject", JSON.stringify(updatedSub));

    // Notify the user and update the UI
    notifySuccess("Data updated successfully");
    setSubjectList(updatedSub); // Update the state
  };

  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full md:mt-10 pb-10">
        <CardHeader title="Create Subjects" />

        <form className="flex items-center justify-center mt-10" onSubmit={Add}>
          <div className="block w-full md:w-6/12 mr-4">
            <input
              type="text"
              name="subject"
              value={createSub}
              onChange={(e) => setCreateSub(e.target.value)}
              placeholder="Create subjects"
              className="outline-none w-full py-2 rounded border-2 border-gray-400 px-2 focus:outline-[#fcd0d0] focus:outline-offset-4 focus:outline-4 text-lg "
            />
          </div>
          <button className="login px-8 py-2.5 rounded text-white text-xl">
            Add
          </button>
        </form>
      </div>

      {subjectList.length > 0 && (
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
              {subjectList.map((subject, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    {subject?.name}
                  </td>
                  <td className="whitespace-nowrap text-center px-4">
                    <div className="">
                      <button
                        className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3"
                        onClick={() => handleEdit(index)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="py-2 px-4 rounded text-lg text-white bg-red-600"
                        onClick={() => handleDelete(index)}
                      >
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

export default Subject;
