import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import App from "../App";
import {Login, Register, Home, SinglePage } from '../pages'
import Layout from '../layout'

export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path='/dashboard/*' element={<Layout/>}>
                    <Route index element={<Home/>} />
                    <Route path="singleuser" element={<SinglePage/>} />
                </Route>
            </Route>
        )
    )
    return <RouterProvider router={root} />
}
