import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login";
import HomePage from "../components/HomePage";
import TestPage from "../components/TestPage";
import Arms from "../components/setup/Arms";
import Class from "../components/setup/Class";
import Subject from "../components/setup/Subject";
import CreateClass from "../components/pages/class/createClass";
import ClassList from "../components/pages/class/classList";
import TeacherList from "../components/pages/teacher/teacherList";
import CreateTeacher from "../components/pages/teacher/createTeacher";

function Routerpage() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="/home" Component={HomePage} />
          <Route path="/test" Component={TestPage} />
          <Route path="/arms" Component={Arms} />
          <Route path="/classsetup" Component={Class} />
          <Route path="/subjectsetup" Component={Subject} />
          <Route path="/teacherlist" Component={TeacherList} />
          <Route path="/createteacher" Component={CreateTeacher} />
          <Route path="/createclass" Component={CreateClass} />
          <Route path="/classlist" Component={ClassList} />
          <Route path="/student" Component={Arms} />
          <Route path="/subject" Component={Arms} />
          <Route path="/result" Component={Arms} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routerpage;
