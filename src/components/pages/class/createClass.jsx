import React from "react";
import Backbutton from "../../../utils/backbutton";

function CreateClass() {
  return (
    <div className="container mx-auto w-full">
      <div className="bg-white container rounded px-4 w-full mt-10 py-4 overflow-auto">
        <Backbutton />
        <h1 className="text-xl uppercase text-center font-medium pb-12">
          Create Class
        </h1>

        <form className="block w-full md:flex md:items-center md:justify-center mt-10">
          <div className="block w-full md:w-3/12 mr-4">
            <label htmlFor="class" className="font-medium">
              Class
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Create class"
              className="outline-none w-full py-2 mt-1 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>
          <div className="block w-full md:w-3/12 mr-4">
            <label htmlFor="class" className="font-medium">
              Arm
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Create arm"
              className="outline-none w-full py-2 mt-1 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>

          <div className="block w-full md:w-3/12 mr-4">
            <label htmlFor="class" className="font-medium">
              Form Teacher
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Create form teacher "
              className="outline-none w-full mt-1 py-2 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>
          <div className="mt-6">
            <button className="login px-8 py-2 md:py-2.5 rounded text-white text-xl">
              Add
            </button>
          </div>
        </form>

        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
            <button className="py-2 px-8 bg-blue-600 text-white font-medium rounded">
              Save
            </button>
          </div>
          <table className="table-auto w-full mt-4 team-table">
            <tr className="table-arrange">
              <th className="whitespace-nowrap text-center px-4">Class</th>
              <th className="whitespace-nowrap text-center px-4">
                Form-teacher
              </th>
              <th className="whitespace-nowrap text-center px-4">Action</th>
            </tr>

            <tbody>
              <tr>
                <td className="whitespace-nowrap text-center px-4 font-medium">
                  JSS1A
                </td>
                <td className="whitespace-nowrap text-center px-4 font-medium">
                  Mrs Enebome
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
                <td className="whitespace-nowrap text-center px-4 font-medium">
                  JSS1B
                </td>

                <td className="whitespace-nowrap text-center px-4 font-medium">
                  Mrs Tina
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

export default CreateClass;
