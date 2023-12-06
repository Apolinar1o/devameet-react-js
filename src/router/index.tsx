import { createBrowserRouter } from "react-router-dom";
import { Login } from "../views/Login";
import { Register } from "../views/registar";


export const router = createBrowserRouter([
    {
        path: "*",
        id:"login",
        element: <Login/>
    },
    {
        path: "/register",
        id: "register",
        element: <Register/>
    }
])