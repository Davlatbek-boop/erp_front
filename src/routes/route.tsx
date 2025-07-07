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
} from "@pages";
import { Groups, OneGroup } from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        {/* admin layout */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="group" element={<Groups />} />

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
