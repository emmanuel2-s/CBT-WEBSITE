import React, { useState } from "react";
import Backbutton from "../../../utils/backbutton";
import { TiPlus, TiUpload } from "react-icons/ti";
import { Link } from "react-router-dom";
import Modal from "../../../utils/Modal";

function TeacherList() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full mt-10 py-4">
        <h1 className="text-xl uppercase text-center font-medium pb-12">
          Teacher List
        </h1>

        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
            <Backbutton />
            <Link to="/createteacher">
              <button className=" flex items-center py-2 px-4 bg-blue-600 ml-3 text-white font-medium rounded">
                <TiPlus size={20} />
                <span className="px-1 text-lg">Create</span>
              </button>
            </Link>
            <button
              className=" flex items-center py-2 px-4 bg-blue-600 ml-3 text-white font-medium rounded"
              onClick={openModal}
            >
              <TiUpload size={20} />
              <span className="px-1 text-lg">Upload</span>
            </button>
          </div>
          <table className="table-auto w-full mt-4 team-table overflow-auto">
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
        </div>

        {/* Create Winner Modal */}
        {isModalOpen && (
          <Modal
            header={"Upload Excel File"}
            isOpen={openModal}
            onClose={closeModal}
            handleClick={"/"}
            value={"Upload"}
          ></Modal>
        )}
      </div>
    </div>
  );
}

export default TeacherList;
