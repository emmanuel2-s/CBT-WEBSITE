import React, { useEffect, useState } from "react";
import Backbutton from "../../../utils/backbutton";
import { TiPlus, TiUpload } from "react-icons/ti";
import { Link } from "react-router-dom";
import Modal from "../../../utils/Modal";
import CardHeader from "../../CardHeader";
import api from "../../../utils/api/api";
import TableSkeleton from "../../tableSkeleton";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";
import { notifyError, notifySuccess } from "../../../utils/toaster";
import PlainTextField from "../../textFields/plainTextField";
import SelectField from "../../textFields/selectField";
import { useForm } from "react-hook-form";
import { DropdownIcon } from "../../../utils/dropDownIcon";

function TeacherList() {
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [sub, setSub] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editSub, setEditedSub] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
    subjectId: "",
    roleId: "",
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openModal = () => {
    setEditModalOpen(true);
  };
  const closeModal = () => {
    setEditModalOpen(false);
  };

  const getAllTeachers = async () => {
    setLoading(true);
    try {
      const response = await api.Auth.getAllUser();
      console.log("first", response);
      const data = response.data.$values;

      if (data) {
        setTeacherList(data);
      }
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const fetchSubject = async () => {
        const res = await api.subjects.getSubjects();
        // console.log("first", res);
        setSub(res.data.$values);
        // console.log(res.data.$values);
      };
      fetchSubject();
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    getAllTeachers();
  }, []);

  const checkPassword = () => {
    if (formData.confirmPassword !== formData.password) {
      setErrorMessage("Password do not match");
    } else {
      setErrorMessage("");
    }
  };

  const handleEdit = (id) => {
    setEditModalOpen(true);
    const getSub = teacherList.find((x) => x.id === id);
    if (getSub) {
      setFormData(getSub);
      setEditedSub(getSub);
      console.log("Edit", getSub);
    }
  };

  const handleUpdate = async () => {
    const id = editSub.id;

    const payload = {
      userName: formData.userName,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      subjectId: formData.subjectId,
      roleId: formData.roleId,
    };
    try {
      setLoadingModal(true);
      const response = await api.Auth.updateUser(id, payload);
      console.log("edited", response);
      if (response.isSuccess) {
        notifySuccess(response.successMessage);
        // setLoading(false);
        setEditModalOpen(false);
        getAllTeachers();
        reset();
      } else {
        setLoadingModal(false);
      }
    } catch (error) {
      console.log("Error", error);
      setLoadingModal(false);
      notifyError(error);
    } finally {
      setLoadingModal(false);
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
          const resp = await api.Auth.deleteUser(id);
          if (resp) {
            notifySuccess(resp.successMessage);
            getAllTeachers();
          }
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("Error Occurred", error);
      setLoading(false);
      notifyError(error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
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
          </div>
          <section className="bg-white pb-4 h-auto overflow-auto no-scrollbar">
            {loading ? (
              <TableSkeleton />
            ) : (
              <table className="table-auto w-full mt-4 team-table">
                <thead>
                  <tr className="table-arrange">
                    <th className="whitespace-nowrap text-left px-4">
                      Full Name
                    </th>
                    <th className="whitespace-nowrap text-left px-4">Email</th>
                    <th className="whitespace-nowrap text-left px-4">
                      Phone No
                    </th>
                    <th className="whitespace-nowrap text-left px-4">
                      Subject
                    </th>
                    <th className="whitespace-nowrap text-left px-4">Role</th>
                    {/* <th className="whitespace-nowrap text-left px-4">CreateBy</th> */}
                    <th className="whitespace-nowrap text-left px-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {teacherList?.map((teacher, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        {teacher?.userName}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        {teacher?.email}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        {teacher?.phoneNumber}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        {/* Check if subjectName and $values exist */}
                        {teacher?.subjectName?.$values?.map(
                          (subject, subIndex) => (
                            <div key={subIndex}>{subject?.name}</div>
                          )
                        )}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        {teacher?.roleName}
                      </td>
                      <td className="whitespace-nowrap text-left px-4 font-medium">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropdownToggle(index);
                          }}
                        >
                          <DropdownIcon
                            index={index}
                            isOpen={openDropdownIndex === index}
                            btnDelete="Delete"
                            handleEdit={() => handleEdit(teacher?.id)}
                            showDelete={true}
                            handleDelete={() => handleDelete(teacher?.id)}
                            showOptions={true}
                            showOtherItems={true}
                            enableUser="Enable"
                            showEnable={true}
                            handleEnable={() => handleEnable(teacher?.id)}
                            disableUser="Disable"
                            showDisable={true}
                            handleDisable={() => handleDisable(teacher?.id)}
                          />
                        </div>
                      </td>

                      {/* <td className="whitespace-nowrap text-left px-4">
                        <div className="">
                          <button
                            className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3"
                            onClick={() => handleEdit(teacher?.id)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="py-2 px-4 rounded text-lg text-white bg-red-600"
                            onClick={() => handleDelete(teacher?.id)}
                          >
                            <IoMdTrash />
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
        {/* upload teacher Modal */}
        {editModalOpen && (
          <Modal
            header={"Update Users Account"}
            isOpen={openModal}
            onClose={closeModal}
            handleClick={handleSubmit(handleUpdate)}
            loading={loadingModal}
            value={"Update"}
          >
            <div className="grid sm:grid-cols-2">
              <PlainTextField
                title="Username"
                name={"userName"}
                type={"text"}
                value={editSub?.userName}
                error={errors?.userName?.type}
                a={register("userName", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />

              <PlainTextField
                title="Email"
                name={"email"}
                type={"email"}
                value={editSub?.email}
                error={errors?.email?.type}
                a={register("email", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />

              <PlainTextField
                name={"password"}
                type={"password"}
                title="Password"
                error={errors?.password?.type}
                a={register("password", {
                  // required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />
              <div>
                <PlainTextField
                  title="Confirm Password"
                  name={"confirmPassword"}
                  type={"password"}
                  error={errors?.confirmPassword?.type}
                  keyup={checkPassword}
                  a={register("confirmPassword", {
                    // required: true,
                    onChange: (e) => {
                      handleOnChange(e);
                    },
                  })}
                />
                <p id="check" className="text-red-600 pl-2">
                  {errorMessage}
                </p>
              </div>

              <PlainTextField
                title="Phone Number"
                name={"phoneNumber"}
                type={"text"}
                value={editSub?.phoneNumber}
                error={errors?.phoneNumber?.type}
                a={register("phoneNumber", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />

              <SelectField
                name="roleId"
                title="Role"
                options={
                  <option key={editSub?.roleName} value={editSub?.roleName}>
                    {editSub?.roleName}
                  </option>
                  // ...roles?.map((option) => (
                  //   <option key={option.id} value={option?.id}>
                  //     {option?.name}
                  //   </option>
                  // )),
                }
                error={errors?.roleId?.type}
                a={register("roleId", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />

              <SelectField
                name="subjectId"
                title="Subject"
                value={editSub?.subjectId}
                options={[
                  <option key="" value="">
                    Select Role
                  </option>,
                  ...sub?.map((option) => (
                    <option key={option.id} value={option?.id}>
                      {option?.name}
                    </option>
                  )),
                ]}
                error={errors?.subjectId?.type}
                a={register("subjectId", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />

              {/* <SelectField
                name="subjectName"
                title="Subject"
                options={
                  <option
                    key={editSub?.subjectName}
                    value={editSub?.subjectName}
                  >
                    {editSub?.subjectName}
                  </option>
                }
                error={errors?.subjectName?.type}
                a={register("subjectName", {
                  required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              /> */}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TeacherList;
