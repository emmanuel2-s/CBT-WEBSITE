import React from "react";
import Backbutton from "../../utils/backbutton";
import CardHeader from "../CardHeader";

function Subject() {
  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full mt-10">
        <CardHeader title="Subjects Setup" />

        <form className="flex items-center justify-center mt-10">
          <div className="block w-full md:w-6/12 mr-4">
            {/* <label htmlFor="class" className="">
              Class
            </label> */}
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Create subjects"
              className="outline-none w-full py-2 rounded border-2 border-gray-400 px-2 focus:outline-[#fcd0d0] focus:outline-offset-4 focus:outline-4 text-lg "
            />
          </div>
          <button className="login px-8 py-2.5 rounded text-white text-xl">
            Add
          </button>
        </form>

        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
            <button className="py-2 px-8 bg-blue-600 text-white text-xl rounded">
              Save
            </button>
          </div>
          <table className="table-auto w-full mt-4 team-table">
            <tr className="table-arrange">
              <th className="whitespace-nowrap text-left px-4">Name</th>
              <th className="whitespace-nowrap text-center px-4">Action</th>
            </tr>

            <tbody>
              <tr>
                <td className="whitespace-nowrap text-left px-4 font-medium">
                  English
                </td>
                <td className="whitespace-nowrap text-center px-4">
                  <div className="">
                    <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                      Edit
                    </button>
                    <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap text-left px-4 font-medium">
                  Mathematics
                </td>
                <td className="whitespace-nowrap text-center px-4">
                  <div className="">
                    <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                      Edit
                    </button>
                    <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Subject;
