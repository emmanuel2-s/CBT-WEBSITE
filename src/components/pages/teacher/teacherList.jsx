import React, { useState } from "react";
import Backbutton from "../../../utils/backbutton";
import { TiPlus, TiUpload } from "react-icons/ti";
import { Link } from "react-router-dom";
import Modal from "../../../utils/Modal";
import CardHeader from "../../CardHeader";

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
      <div className="bg-white rounded px-4 w-full mt-10">
        <CardHeader title="Teacher List" />
        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
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
        {/* Create Winner Modal */}
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
    </div>
  );
}

export default TeacherList;
