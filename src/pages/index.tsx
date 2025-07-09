import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("../not-found/not-found"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const Groups = lazy(() => import("./groups/groups"));
const OneGroup = lazy(() => import("./groups/one-group"));
const Course = lazy(() => import("./courses/course"));
const Branch = lazy(()=> import("./branch/branch"))


export { SignIn, SignUp, NotFound, StudentLayout, AdminLayout, TeacherLayout, Groups, OneGroup, Course, Branch };
