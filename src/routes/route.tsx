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
} from "@pages";
import { Groups, OneGroup } from "@pages";
import LogoutProtected from "../pages/protected-routes/layout-protected";
import LoginProtected from "../pages/protected-routes/login-protected";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<LoginProtected><SignIn /></LoginProtected>} />
        <Route path="sign-up" element={<SignUp />} />
        {/* admin layout */}
        <Route path="admin" element={<LogoutProtected><AdminLayout/></LogoutProtected>}>
          <Route index element={<Groups />} />
          <Route path="group" element={<Groups />} />
          <Route path="course" element={<Course/>}/>
          <Route path="branch" element={<Branch/>}/>
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
