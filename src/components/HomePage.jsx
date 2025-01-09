import React, { useEffect, useState } from "react";
import Bg from "../assets/imgs/bg-1.jpg";
import Logo from "../assets/imgs/image.png";
import { MdComputer, MdKeyboardArrowDown } from "react-icons/md";
import { HiOutlineLibrary } from "react-icons/hi";
import { CgMenuBoxed } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import Modal from "../utils/Modal";
import { TiPlus, TiUpload } from "react-icons/ti";
import PlainTextField from "./textFields/plainTextField";
import { useForm } from "react-hook-form";
import SelectField from "./textFields/selectField";
import api from "../utils/api/api";
import { notifyError, notifySuccess } from "../utils/toaster";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createAccount, setcreateAccount] = useState({
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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setcreateAccount({
      ...createAccount,
      [name]: value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
    // fetchRoles();
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    reset();
  };

  const history = useNavigate();
  const handleTest = () => {
    history("/test");
  };

  useEffect(() => {
    try {
      const fetchRoles = async () => {
        const res = await api.Auth.getRoles();
        // console.log("first", res);
        setRoles(res.data.$values);
        // console.log(res.data.$values);
      };
      fetchRoles();
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  const checkPassword = () => {
    if (createAccount.confirmPassword !== createAccount.password) {
      setErrorMessage("Password do not match");
    } else {
      setErrorMessage("");
    }
  };
  const formSubmit = async () => {
    setLoading(true);
    const payload = {
      userName: createAccount.userName,
      password: createAccount.password,
      confirmPassword: createAccount.confirmPassword,
      email: createAccount.email,
      phoneNumber: createAccount.phoneNumber,
      subjectId: createAccount.subjectId,
      roleId: createAccount.roleId,
    };
    try {
      if (createAccount.password !== createAccount.confirmPassword) {
        notifyError("password do not match");
        return;
      }

      const response = await api.Auth.register(payload);
      if (response.errorMessage) {
        notifyError(response.errorMessage || "An error occurred");
        return;
      }
      console.log("response", response);
      notifySuccess(successMessage);
      reset();
      setIsCreateModalOpen(false);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      notifyError(error);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white">
        <div className="flex justify-between items-center px-8 w-full">
          <img
            src={Logo}
            alt="logo"
            className="w-20 h-20 object-cover rounded-md"
          />

          <div className="dropdown overflow-hidden float-left group">
            <button className="text-white text-xl flex items-center bg-red-600 px-6 py-2">
              Setup
              <MdKeyboardArrowDown />
            </button>
            <div
              className="absolute hidden bg-[#f9f9f9] group-hover:block shadow-[0px 8px 16px 0px rgba(0,0,0,0.2)] min-w-40 z-10"
              id="myDropdown"
            >
              <Link
                to="/classlist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Class Level
              </Link>
              <Link
                to="/armslist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Arms
              </Link>
              <Link
                to="/subjectlist"
                className="float-none p-4 block text-left text-black hover:bg-gray-200 text-lg"
              >
                Subject
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" container mx-auto flex justify-end items-end mt-4 px-4">
        <button
          className=" flex items-center py-2 px-4 bg-blue-600 mr-3 hover:bg-blue-800 text-white font-medium rounded"
          onClick={openCreateModal}
        >
          <TiPlus size={20} />
          <span className="px-1 text-lg">Create Account</span>
        </button>
        <button
          className=" flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-800 text-white font-medium rounded"
          onClick={openModal}
        >
          <TiUpload size={20} />
          <span className="px-1 text-lg">Upload</span>
        </button>
      </div>
      <div>
        <DashboardCard />
      </div>

      <section className=" container mx-auto pb-4 h-auto overflow-auto no-scrollbar px-4 mt-12">
        <table className="table-auto w-full mt-4 team-table bg-white">
          <caption class="caption-top bg-white py-2 text-xl">
            Table 1.1: Total student and their classes.
          </caption>
          <tr className="table-arrange">
            <th className="whitespace-nowrap text-left px-4">S/N</th>
            <th className="whitespace-nowrap text-left px-4">JSS1</th>
            <th className="whitespace-nowrap text-left px-4">JSS2</th>
            <th className="whitespace-nowrap text-left px-4">JSS3</th>
            <th className="whitespace-nowrap text-left px-4">SS1 </th>
            <th className="whitespace-nowrap text-left px-4">SS2</th>
            <th className="whitespace-nowrap text-left px-4">SS3</th>
          </tr>
          <tbody>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                A
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                B
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                C
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
          </tbody>
        </table>
      </section>

      <section className=" container mx-auto pb-4 h-auto overflow-auto no-scrollbar px-4 mt-12">
        <table className="table-auto w-full mt-4 team-table bg-white">
          <caption class="caption-top bg-white py-2 text-xl">
            Table 1.1: Total student and their classes.
          </caption>
          <tr className="table-arrange">
            <th className="whitespace-nowrap text-left px-4">S/N</th>
            <th className="whitespace-nowrap text-left px-4">JSS1</th>
            <th className="whitespace-nowrap text-left px-4">JSS2</th>
            <th className="whitespace-nowrap text-left px-4">JSS3</th>
            <th className="whitespace-nowrap text-left px-4">SS1 </th>
            <th className="whitespace-nowrap text-left px-4">SS2</th>
            <th className="whitespace-nowrap text-left px-4">SS3</th>
          </tr>
          <tbody>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                A
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                B
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
            <tr>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                C
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                63
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                58
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                95
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                105
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>
              <td className="whitespace-nowrap text-left px-4 font-medium">
                70
              </td>

              {/* <td className="whitespace-nowrap text-left px-4">
                <div className="">
                  <button className="py-2 px-4 rounded text-lg text-black bg-gray-300 mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-4 rounded text-lg text-white bg-red-600">
                    Delete
                  </button>
                </div>
              </td> */}
            </tr>
          </tbody>
        </table>
      </section>

      <div className="block md:flex md:justify-center md:items-center my-12 gap-6 container mx-auto px-3">
        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <MdComputer size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">
            Computer-Based Test (CBT)
          </h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            onClick={handleTest}
          >
            Start Test
          </button>
        </div>

        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4 mt-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <HiOutlineLibrary size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">Library</h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-200 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            disabled
          >
            Coming Soon
          </button>
        </div>

        <div className="w-full bg-white shadow rounded h-full py-6 md:w-4/12 p-4 mt-4">
          <div className="flex justify-center items-center my-4 bg-slate-300 rounded-full w-20 h-20 mx-auto">
            <CgMenuBoxed size={50} />
          </div>
          <h2 className="text-center text-3xl font-semibold py-4">Others</h2>
          <p className="font-serif">
            Take your exam online with our Computer-Based Testing (CBT)
            platform. The CBT system is designed to simulate real exam
            conditions, providing a secure and interactive way to take your test
            from anywhere. Ensure you are ready and have a stable internet
            connection before you begin.
          </p>
          <button
            className="bg-gray-200 px-24 py-2 mx-auto my-4 flex justify-center text-lg font-medium rounded"
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>

      {/* Upload modal */}
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

      {/* creating users */}
      {isCreateModalOpen && (
        <Modal
          header={"Create Users Account"}
          isOpen={openCreateModal}
          onClose={closeCreateModal}
          handleClick={handleSubmit(formSubmit)}
          value={"Create Account"}
        >
          <div className="grid sm:grid-cols-2">
            <PlainTextField
              title="Username"
              name={"userName"}
              type={"text"}
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
                required: true,
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
                  required: true,
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
              options={roles?.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
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
              // options={roles?.map((option) => (
              //   <option key={option.id} value={option.id}>
              //     {option.name}
              //   </option>
              // ))}
              error={errors?.subjectId?.type}
              a={register("subjectId", {
                // required: true,
                onChange: (e) => {
                  handleOnChange(e);
                },
              })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
