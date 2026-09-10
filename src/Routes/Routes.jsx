import { createBrowserRouter } from "react-router-dom";
import UserWrapper from "../userpannel/UserWrapper";
import Home from "../Pages/User/Home";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Menu from "../Pages/User/Menu";
import MenuDetails from "../Pages/User/MenuDetials";
import AdminProtected from "../Components/AdminProtected";
import AdminHome from "../Pages/admin/adminHome";
import AdminWrapper from "../Pages/admin/adminWrapper";
import AddMenu from "../Pages/admin/AddMenu";
import AdminMenu from "../Pages/admin/AdminMenu";
import ManageMenu from "../Pages/admin/ManageMenu";
import AdminUsers from "../Pages/admin/AdminUsers";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Signup />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "menu/:id",
        element: <MenuDetails />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtected />,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <AdminHome />,
          },
          {
            path: "addmenu",
            element: <AddMenu />,
          },
          {
            path: "menu",
            element: <AdminMenu />,
          },
          {
            path: "menu/manage/:id",
            element: <ManageMenu/>,
          },
          {
            path: "users",
            element: <AdminUsers/>,
          },
        ],
      },
    ],
  },
]);

export default Routes;
