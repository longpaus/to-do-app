import {createBrowserRouter} from "react-router-dom";
import HomePage from "./routes/HomePage";
import RegisterPage from "./routes/RegisterPage";
import TaskController from "./components/TaskController";
import LoginPage from "./routes/LoginPage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/tasks",
        element: <TaskController/>
    }
])

export default Router;