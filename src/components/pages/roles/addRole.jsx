import React, { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import CardHeader from "../../CardHeader";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import api from "../../../utils/api/api";
import Swal from "sweetalert2";
import PlainTextField from "../../textFields/plainTextField";
import Modal from "../../../utils/Modal";
import { useForm } from "react-hook-form";

function Role() {
  const [createRole, setCreateRole] = useState("");
  const [RoleList, setRoleList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState("");
  const [editedRole, setEditedRole] = useState({});
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

  const fetchRoles = async () => {
    const resp = await api.Auth?.getRoles();
    console.log("Roles", resp);
    const data = resp.data?.$values.sort((a, b) =>
      a?.name.localeCompare(b?.name)
    );
    setRoleList(data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const Add = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (createRole === "") {
      notifyError("input must not be empty");
      setLoading(false);
      return;
    }
    const data = {
      name: createRole.toLocaleUpperCase(),
    };
    try {
      const resp = await api.Auth?.addRole(data);
      console.log("response", resp);
      if (resp.isSuccess) {
        notifySuccess(resp?.successMessage || "Role added successfully");
        fetchRoles();
        setCreateRole("");
      }
    } catch (error) {
      console.log("Error", error);
      notifyError(error.errorMessage);
    } finally {
      setLoading(false);
    }

    // setCreateRole("");
  };

  // const handleEdit = (id) => {
  //   setEditModalOpen(true);
  //   const getClass = RoleList.find((x) => x.id === id);
  //   if (getClass) {
  //     setFormData(getClass);
  //     setEditedRole(getClass);
  //     console.log("Edit", getClass);
  //   }
  // };

  // const handleUpdate = async () => {
  //   setLoading(true);
  //   const id = editArm.id;
  //   const payload = {
  //     name: formData,
  //   };
  //   try {
  //     const response = await api.Auth.updateclass(id, payload);
  //     console.log("edited", response);
  //     if (response.successMessage) {
  //       notifySuccess(response.successMessage);
  //       setLoading(false);
  //       setEditModalOpen(false);
  //       fetchClassList();
  //       reset();
  //     }
  //   } catch (error) {
  //     console.log("Error", error);
  //     setLoading(false);
  //   }
  // };

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
          const resp = await api.Auth.deleteRole(id);
          if (resp) {
            notifySuccess(resp.successMessage);
            fetchRoles();
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
      <div className="bg-white rounded px-4 w-full md:mt-10 pb-10">
        <CardHeader title="Role Setup" />

        <form className="flex items-center justify-center mt-10" onSubmit={Add}>
          <div className="block w-full md:w-6/12 mr-4">
            <input
              type="text"
              name="class"
              id="class"
              value={createRole}
              placeholder="Create Role"
              onChange={(e) => setCreateRole(e.target.value)}
              className="outline-none w-full py-2 rounded border-2 border-gray-400 px-2 focus:outline-[#fcd0d0] focus:outline-offset-4 focus:outline-4 text-lg uppercase"
            />
          </div>
          <button
            className="login px-8 py-2.5 rounded text-white text-xl"
            disabled={loading ? true : false}
          >
            Add
          </button>
        </form>
      </div>
      {RoleList.length > 0 && (
        <div className="mt-6 md:mt-8 bg-white rounded px-4 w-full py-4">
          <table className="table-auto w-full mt-4 team-table">
            <tr className="table-arrange">
              <th className="whitespace-nowrap text-left px-4">Name</th>
              {/* <th className="whitespace-nowrap text-left px-4">CreateBy</th> */}
              <th className="whitespace-nowrap text-center px-4">Action</th>
            </tr>

            <tbody>
              {RoleList.map((role, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap text-left px-4 font-medium uppercase">
                    {role?.name}
                  </td>
                  {/* <td className="whitespace-nowrap text-left px-4 font-medium"></td> */}
                  <td className="whitespace-nowrap text-center px-4">
                    <div className="">
                      <button
                        className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3"
                        onClick={(e) => handleEdit(role?.id)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="py-2 px-4 rounded text-lg text-white bg-red-600"
                        onClick={(e) => handleDelete(role?.id)}
                      >
                        <IoMdTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {RoleList.length === 0 && (
            <div>
              <p className="text-center text-lg text-slate-300 capitalize pt-8">
                No Roles Record Found
              </p>
            </div>
          )}
        </div>
      )}

      {editModalOpen && (
        <Modal
          isOpen={openModal}
          onClose={closeModal}
          handleClick={handleSubmit(handleUpdate)}
          value={"Update Role"}
          header="Edit Role Modal"
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

export default Role;
