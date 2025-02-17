import React, { useEffect, useState } from "react";
import Backbutton from "../../../utils/backbutton";
import CardHeader from "../../CardHeader";
import PlainTextField from "../../textFields/plainTextField";
import SelectField from "../../textFields/selectField";
import { useForm } from "react-hook-form";
import api from "../../../utils/api/api";
import { notifyError, notifySuccess } from "../../../utils/toaster";

function CreateTeacher() {
  const [roles, setRoles] = React.useState([]);
  const [teacherRole, setTeacherRole] = useState("");
  const [sub, setSub] = React.useState([]);
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

  useEffect(() => {
    try {
      const fetchRoles = async () => {
        const res = await api.Auth.getRoles();
        // console.log("firsttt", res);
        const allRoles = res.data?.$values || [];
        setRoles(allRoles);

        const getTeacherRole = allRoles.find((x) => x.name === "Teacher");
        // console.log(getTeacherRole);
        if (getTeacherRole) {
          setTeacherRole(getTeacherRole);
        }
      };
      fetchRoles();
    } catch (error) {
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchSubject = async () => {
        const res = await api.subjects.getSubjects();
        // console.log("first", res);
        setSub(res.data?.$values);
        // console.log(res.data.$values);
      };
      fetchSubject();
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
      } else {
        reset();
        notifySuccess(response?.successMessage);
      }
      // console.log("response", response);
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
    <div className="mx-auto container w-full">
      <div className="bg-white rounded px-4 w-full mt-10 pb-2 overflow-auto">
        <CardHeader title="Create Teacher" />
        <form
          className="grid w-full md:grid-cols-3 md:max-w-[1240px] mx-auto mt-10"
          onSubmit={handleSubmit(formSubmit)}
        >
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
            name="password"
            type="password"
            title="Password"
            error={errors.password?.type}
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
              name="confirmPassword"
              type="password"
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
              <option key={teacherRole?.id} value={teacherRole?.id}>
                {teacherRole?.name}
              </option>,
            ]}
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
            options={[
              <option key="1" value="">
                Select Subject
              </option>,
              ...sub?.map((option) => (
                <option key={option?.id} value={option?.id}>
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
          {/* </div> */}
          <div className="mt-4 md:mt-8">
            <button className="login w-full md:w-44 py-2 md:py-2 rounded text-white text-xl">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTeacher;
