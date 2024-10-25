import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from "react-toastify";
import NotFound from "./Modules/Shared/Components/NotFound/NotFound";
import Home from "./Modules/Shared/Components/Home/Home";
import MasterLayout from "./Modules/Shared/Components/MasterLayout/MasterLayout";
import CardFormat from "./Modules/Card/CardFormat";
import Login from "./Modules/Auth/Components/Login/Login";
import AuthLayout from "./Modules/Shared/Components/AuthLayout/AuthLayout";
import Register from "./Modules/Auth/Components/Register/Register";
import ForgetPassword from "./Modules/Auth/Components/ForgetPassword/ForgetPassword";
import ChangePassword from "./Modules/Auth/Components/ChangePassword/ChangePasowrd";
import Verify from "./Modules/Auth/Components/Verify/Verify";
import ShowAqar from "./Modules/ShowAqar/ShowAqar";
import Profile from "./Modules/Profile/Components/Profile" ;

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element:<MasterLayout/>,
      errorElement: <NotFound />,
      children: [
        {index:true,element:<Home/>},
        {path:"showdata",element:<ShowAqar/>},
        {path:"profile/:id",element:<Profile/>},
        {path:":id",element:<CardFormat/>},
      ],
    },
    {
      path: "/auth",
      element:<AuthLayout/>,
      errorElement: <NotFound />,
      children: [
        {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forget-password",element:<ForgetPassword/>},
        {path:"change-password",element:<ChangePassword/>},
        // {path:"reset-password",element:<ResetPassword/>},
        {path:"verify",element:<Verify/>},
      ],
    },
  ]);

  return (
    <>
      <GoogleOAuthProvider clientId="1073694185818-sslphelpovolu9v4mdq8osuer8b3h653.apps.googleusercontent.com">
      <ToastContainer />
      <RouterProvider router={routes} />
    </GoogleOAuthProvider>
    </>
  );
  }

export default App;
