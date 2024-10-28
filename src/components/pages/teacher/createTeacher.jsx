import React from "react";
import Backbutton from "../../../utils/backbutton";
import CardHeader from "../../CardHeader";

function CreateTeacher() {
  return (
    <div className="mx-auto container w-full">
      <div className="bg-white rounded px-4 w-full mt-10 pb-2 overflow-auto">
        <CardHeader title="Create Teacher" />
        <form className="grid w-full md:grid-cols-3 md:max-w-[1240px] mx-auto mt-10">
          <div className="block w-full md:w-10/12 mt-2">
            <label htmlFor="class" className="font-medium">
              FullName
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Enter fullname"
              className="outline-none w-full py-2 mt-1 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>
          <div className="block w-full md:w-10/12 mt-2">
            <label htmlFor="class" className="font-medium">
              Phone No
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Phone no"
              className="outline-none w-full py-2 mt-1 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>

          <div className="block w-full md:w-10/12 mt-2">
            <label htmlFor="class" className="font-medium">
              Email
            </label>
            <input
              type="text"
              name="class"
              id="class"
              placeholder="Enter email"
              className="outline-none w-full mt-1 py-2 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            />
          </div>

          <div className="block w-full md:w-10/12 mt-2">
            <label htmlFor="class" className="font-medium">
              Subjects
            </label>
            <select
              name="class"
              className="outline-none w-full mt-1 py-2 rounded border-2 border-gray-400 px-2 focus:shadow-[4px_4px_10px_6px_#ccc] text-lg "
            >
              <option>Select subject</option>
              <option> English Language</option>
              <option> Mathematics</option>
              <option>Civics</option>
            </select>
          </div>
          <div className="mt-4 md:mt-8">
            <button className="login px-8 py-2 md:py-2 rounded text-white text-xl">
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
          <section className="bg-white pb-4 h-auto overflow-auto no-scrollbar">
            <table className="table-auto w-full mt-4 team-table">
              <tr className="table-arrange">
                <th className="whitespace-nowrap text-left px-4">FullName</th>
                <th className="whitespace-nowrap text-left px-4">Phone No</th>
                <th className="whitespace-nowrap text-left px-4">Email</th>
                <th className="whitespace-nowrap text-left px-4">Subject</th>
                <th className="whitespace-nowrap text-left px-4">Created On</th>
                <th className="whitespace-nowrap text-left px-4">CreateBy</th>
                <th className="whitespace-nowrap text-left px-4">Action</th>
              </tr>

              <tbody>
                <tr>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    Mrs Enebome
                  </td>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    JSS1A
                  </td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>

                  <td className="whitespace-nowrap text-left px-4">
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
                    JSS1B
                  </td>

                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    Mrs Tina
                  </td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>
                  <td className="whitespace-nowrap text-left px-4 font-medium"></td>

                  <td className="whitespace-nowrap text-left px-4">
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
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreateTeacher;
