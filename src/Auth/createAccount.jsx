import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { FiUserPlus, TiPlus } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import SelectField from "../components/textFields/selectField";
import PlainTextField from "../components/textFields/plainTextField";
import Modal from "../utils/Modal";
import { notifyError, notifySuccess } from "../utils/toaster";
import api from "../utils/api/api";

function CreateAccount() {
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

  const handleOnChange = async (e) => {
    const { name, value } = e.target;
    setcreateAccount({
      ...createAccount,
      [name]: value,
    });
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    reset();
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
      setLoading(true);
      if (createAccount.password !== createAccount.confirmPassword) {
        notifyError("password do not match");
        return;
      }

      const response = await api.Auth.register(payload);
      if (response.errorMessage) {
        notifyError(response.errorMessage || "An error occurred");
        return;
      }
      // console.log("response", response);
      notifySuccess(successMessage);
      reset();
      setIsCreateModalOpen(false);
      // setLoading(false);
    } catch (error) {
      console.log("Error", error);
      notifyError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className=" flex items-center py-2 px-4 bg-blue-600 mr-3 hover:bg-blue-800 text-white font-medium rounded"
        onClick={openCreateModal}
      >
        <FiUserPlus size={20} />
        <span className="px-1 text-lg hidden sm:block">Create Account</span>
      </button>

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
              options={[
                <option key="" value="">
                  Select Role
                </option>,
                ...roles?.map((option) => (
                  <option key={option.id} value={option?.id}>
                    {option?.name}
                  </option>
                )),
              ]}
              error={errors?.roleId?.type}
              a={register("roleId", {
                required: true,
                onChange: (e) => {
                  handleOnChange(e);
                },
              })}
            />
            {createAccount.roleId === "Teacher" && (
              <SelectField
                name="subjectIName"
                title="Subject"
                // options={roles?.map((option) => (
                //   <option key={option.id} value={option.id}>
                //     {option.name}
                //   </option>
                // ))}
                error={errors?.subjectName?.type}
                a={register("subjectName", {
                  // required: true,
                  onChange: (e) => {
                    handleOnChange(e);
                  },
                })}
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CreateAccount;
