import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login.jsx';
import Home from './Home.jsx';
import Right from './Right.jsx';
import Post from './Post.jsx';
import Like from './Like.jsx'; 

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            children:[
                {
                    path:"/",
                    element:<Right/>
                },
                {
                    path:"/post",
                    element:<Post/>
                },
                {
                    path:"/like",
                    element:<Like/>
                },
            ]
        },
        {
            path: "/login",
            element: <Login />
        }
    ])
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body