import React, { useEffect, useState } from "react";
import Backbutton from "../../../utils/backbutton";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import CardHeader from "../../CardHeader";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import api from "../../../utils/api/api";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Modal from "../../../utils/Modal";
import PlainTextField from "../../textFields/plainTextField";
import TableSkeleton from "../../tableSkeleton";

function ClassListSetup() {
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState("");
  const [editArm, setEditedArm] = useState({});
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = () => {
    setEditModalOpen(true);
  };
  const closeModal = () => {
    setEditModalOpen(false);
    reset();
  };

  useEffect(() => {
    fetchClassList();
  }, []);

  const fetchClassList = async () => {
    setLoading(true);
    try {
      const resp = await api.classLevel.getAllClass();
      console.log("resp", resp);
      if (resp.isSuccess) {
        const data = resp.data?.$values.sort((a, b) =>
          a?.name?.localeCompare(b?.name)
        );
        setClassList(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error", error);
      notifyError(error.errorMessage);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleEdit = (id) => {
    setEditModalOpen(true);
    const getClass = classList.find((x) => x.id === id);
    if (getClass) {
      setFormData(getClass);
      setEditedArm(getClass);
      console.log("Edit", getClass);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const id = editArm.id;
    const payload = {
      name: formData,
    };
    try {
      const response = await api.classLevel.updateclass(id, payload);
      console.log("edited", response);
      if (response.successMessage) {
        notifySuccess(response.successMessage);
        setLoading(false);
        setEditModalOpen(false);
        fetchClassList();
        reset();
      }
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          const resp = await api.classLevel.delete(id);
          if (resp) {
            notifySuccess(resp.successMessage);
            fetchClassList();
          }
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Error Occurred", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto w-full">
      <div className="bg-white rounded px-4 w-full mt-10 pb-2">
        <CardHeader title="Class Level List" />

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
            {loading ? (
              <TableSkeleton />
            ) : (
              <table className="table-auto w-full mt-4 team-table">
                <thead>
                  <tr className="table-arrange">
                    <th className="whitespace-nowrap text-left px-4">Name</th>
                    <th className="whitespace-nowrap text-left px-4">
                      CreateBy
                    </th>
                    <th className="whitespace-nowrap text-center px-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {classList.map((level, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap text-left px-4 font-medium uppercase">
                        {level.name}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium capitalize">
                        {level.createdBy}
                      </td>
                      <td className="whitespace-nowrap text-center px-4">
                        <div className="">
                          <button
                            className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3"
                            onClick={() => handleEdit(level.id)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="py-2 px-4 rounded text-lg text-white bg-red-600"
                            onClick={() => handleDelete(level.id)}
                          >
                            <IoMdTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {classList.length === 0 && (
              <div>
                <p className="text-center text-lg text-slate-300 capitalize pt-8">
                  No Class record found
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      {editModalOpen && (
        <Modal
          isOpen={openModal}
          onClose={closeModal}
          handleClick={handleSubmit(handleUpdate)}
          value={"Update Class"}
          header="Edit Class Modal"
        >
          <div>
            <PlainTextField
              name={"name"}
              type={"text"}
              value={formData.name}
              error={errors?.name?.type}
              a={register("name", {
                required: true,
                onChange: (e) => setFormData(e.target.value),
              })}
              className="uppercase"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ClassListSetup;
