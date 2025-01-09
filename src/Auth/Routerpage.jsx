import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import HomePage from "../components/HomePage";
import TestPage from "../components/TestPage";
import Arms from "../components/setup/Arms/CreateArms";
import Class from "../components/setup/Class/Class";
import Subject from "../components/setup/Subjects/Subject";
import CreateClass from "../components/pages/class/createClass";
import ClassList from "../components/pages/class/classList";
import TeacherList from "../components/pages/teacher/teacherList";
import CreateTeacher from "../components/pages/teacher/createTeacher";
import Dashboard from "../components/pages/Student/Dashboard";
import ExamScreen from "../components/pages/Student/ExamScreen";
import ProtectedRoute from "./protectedRoute";
import ClassListSetup from "../components/setup/Class/ClassLists";
import ArmsList from "../components/setup/Arms/ArmsList";
import SubjectList from "../components/setup/Subjects/SubjectList";
// import ProtectedRoute from "../Auth/protectedRoute"

function Routerpage() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/home" element={<ProtectedRoute Component={HomePage} />} />
        <Route path="/test" element={<ProtectedRoute Component={TestPage} />} />

        {/* setup start */}
        <Route
          path="/classlist"
          element={<ProtectedRoute Component={ClassListSetup} />}
        />
        <Route
          path="/armslist"
          element={<ProtectedRoute Component={ArmsList} />}
        />
        <Route
          path="/subjectlist"
          element={<ProtectedRoute Component={SubjectList} />}
        />

        <Route
          path="/createarms"
          element={<ProtectedRoute Component={Arms} />}
        />
        <Route
          path="/createclass"
          element={<ProtectedRoute Component={Class} />}
        />
        <Route
          path="/createsubject"
          element={<ProtectedRoute Component={Subject} />}
        />
        {/* setup end  */}

        <Route
          path="/teacherlist"
          element={<ProtectedRoute Component={TeacherList} />}
        />
        <Route
          path="/createteacher"
          element={<ProtectedRoute Component={CreateTeacher} />}
        />
        <Route
          path="/createclass"
          element={<ProtectedRoute Component={CreateClass} />}
        />
        <Route
          path="/classlist"
          element={<ProtectedRoute Component={ClassList} />}
        />
        <Route
          path="/student"
          element={<ProtectedRoute Component={Dashboard} />}
        />
        <Route path="/subject" element={<ProtectedRoute Component={Arms} />} />
        <Route path="/result" element={<ProtectedRoute Component={Arms} />} />
        <Route
          path="/exam"
          element={<ProtectedRoute Component={ExamScreen} />}
        />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default Routerpage;
