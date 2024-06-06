import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPAssword";
import ForgetPassword from "./pages/ForgetPassword";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Home /> }],
  },
  { path: "/forget-Password", element: <ForgetPassword /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
