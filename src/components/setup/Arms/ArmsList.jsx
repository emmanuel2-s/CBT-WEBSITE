import React, { useEffect, useState } from "react";
// import Backbutton from "../../../utils/backbutton";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import CardHeader from "../../CardHeader";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import api from "../../../utils/api/api";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";
import Modal from "../../../utils/Modal";
import PlainTextField from "../../textFields/plainTextField";
import { useForm } from "react-hook-form";

function ArmsList() {
  const [armsList, setArmsList] = useState([]);
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

  const fetchArmsList = async () => {
    try {
      const resp = await api.arms.getAllArms();
      console.log("resp", resp);
      const data = resp.data.$values.sort((a, b) =>
        a?.name?.localeCompare(b?.name)
      );
      setArmsList(data);
    } catch (error) {
      console.log("Error", error);
      notifyError(error.errorMessage);
    }
  };

  useEffect(() => {
    fetchArmsList();
  }, []);

  const handleEdit = (id) => {
    setEditModalOpen(true);
    const getArm = armsList.find((x) => x.id === id);
    if (getArm) {
      setFormData(getArm);
      setEditedArm(getArm);
      console.log("Edit", getArm);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const id = editArm.id;
    const payload = {
      name: formData,
    };
    try {
      const response = await api.arms.updateArms(id, payload);
      console.log("edited", response);
      if (response.successMessage) {
        notifySuccess(response.successMessage);
        setLoading(false);
        setEditModalOpen(false);
        fetchArmsList();
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
          const resp = await api.arms.delete(id);
          if (resp) {
            notifySuccess(resp.successMessage);
            fetchArmsList();
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
        <CardHeader title="Arms List" />

        <div className="mt-10 md:mt-20">
          <div className="flex justify-end">
            <Link to="/createarms">
              <button className=" flex items-center py-2 px-4 bg-blue-600 ml-3 text-white font-medium rounded">
                <TiPlus size={20} />
                <span className="px-1 text-lg">Create</span>
              </button>
            </Link>
          </div>
          <section className="bg-white pb-4 h-auto overflow-auto no-scrollbar">
            <table className="table-auto w-full mt-4 team-table">
              <tr className="table-arrange">
                <th className="whitespace-nowrap text-left px-4">Name</th>
                <th className="whitespace-nowrap text-left px-4">CreateBy</th>
                <th className="whitespace-nowrap text-center px-4">Action</th>
              </tr>

              <tbody>
                {armsList.map((arm, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap text-left px-4 font-medium uppercase">
                      {arm.name}
                    </td>
                    <td className="whitespace-nowrap text-left px-4 font-medium capitalize">
                      {arm.createdBy}
                    </td>
                    <td className="whitespace-nowrap text-center px-4">
                      <div className="">
                        <button
                          className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3"
                          onClick={() => handleEdit(arm.id)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="py-2 px-4 rounded text-lg text-white bg-red-600"
                          onClick={() => handleDelete(arm.id)}
                        >
                          <IoMdTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {editModalOpen && (
        <Modal
          isOpen={openModal}
          onClose={closeModal}
          handleClick={handleSubmit(handleUpdate)}
          value={"Update Arm"}
          header="Edit Arm Modal"
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
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default ArmsList;
