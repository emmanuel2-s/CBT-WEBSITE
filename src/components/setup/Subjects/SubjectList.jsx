import React from "react";
import Backbutton from "../../../utils/backbutton";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import CardHeader from "../../CardHeader";

function SubjectList() {
  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full mt-10 pb-2">
        <CardHeader title="Class List" />

        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
            <Link to="/createclass">
              <button className=" flex items-center py-2 px-4 bg-blue-600 ml-3 text-white font-medium rounded">
                <TiPlus size={20} />
                <span className="px-1 text-lg">Create</span>
              </button>
            </Link>
          </div>
          <section className="bg-white pb-4 h-auto overflow-auto no-scrollbar">
            <table className="table-auto w-full mt-4 team-table">
              <tr className="table-arrange">
                <th className="whitespace-nowrap text-left px-4">Class</th>
                <th className="whitespace-nowrap text-left px-4">
                  Form-teacher
                </th>
                <th className="whitespace-nowrap text-left px-4">Created On</th>
                <th className="whitespace-nowrap text-left px-4">CreateBy</th>
                <th className="whitespace-nowrap text-left px-4">Action</th>
              </tr>

              <tbody>
                <tr>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    JSS1A
                  </td>
                  <td className="whitespace-nowrap text-left px-4 font-medium">
                    Mrs Enebome
                  </td>
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

export default SubjectList;
