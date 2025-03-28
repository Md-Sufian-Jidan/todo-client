import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AddTodo from "../Pages/AddTodo/AddTodo";
import MyTodo from "../Pages/MyTodo/MyTodo";
import MyWishList from "../Pages/MyWishList/MyWishList";
import DoneTodo from "../Pages/DoneTodo/DoneTodo";
import MyBucketList from "../Pages/MyBucketlist/MyBucketlist";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../Components/Shared/Error/Error";
import UpdateTodo from "../Components/Todo/UpdateTodo";
import axios from "axios";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/add-todo',
                element: <ProtectedRoute><AddTodo /></ProtectedRoute>
            },
            {
                path: '/my-todo',
                element: <ProtectedRoute><MyTodo /></ProtectedRoute>
            },
            {
                path: '/wishlist',
                element: <ProtectedRoute><MyWishList /></ProtectedRoute>
            },
            {
                path: '/done',
                element: <ProtectedRoute><DoneTodo /></ProtectedRoute>,
                loader: () => axios.get(`${import.meta.env.VITE_LOCALHOST_API}/done-todo`)
            },
            {
                path: '/bucketList',
                element: <ProtectedRoute><MyBucketList /></ProtectedRoute>
            },
            {
                path: '/update/:id',
                element: <ProtectedRoute><UpdateTodo /></ProtectedRoute>,
                loader: ({ params }) => axios(`${import.meta.env.VITE_LOCALHOST_API}/todo/${params?.id}`)
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
]);