import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  SignUp,
  TeacherLayout,
  AdminLayout,
  StudentLayout,
  Course,
  Branch,
  Student,
  Worker,
  LoginProtected,
  Groups,
  OneGroup,
  LogoutProtected,
} from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="worker" element={<Worker />} />
        <Route
          index
          element={
            <LoginProtected>
              <SignIn />
            </LoginProtected>
          }
        />
        <Route path="sign-up" element={<SignUp />} />
        {/* admin layout */}
        <Route
          path="admin"
          element={
            <LogoutProtected>
              <AdminLayout />
            </LogoutProtected>
          }
        >
          <Route index element={<Groups />} />
          <Route path="group" element={<Groups />} />
          <Route path="course" element={<Course />} />
          <Route path="branch" element={<Branch />} />
          <Route path="student" element={<Student />} />
          <Route path="group/:id" element={<OneGroup />} />
        </Route>
        {/* teacher layout */}
        <Route path="teacher" element={<TeacherLayout />}></Route>
        {/* student layout */}
        <Route path="student" element={<StudentLayout />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
