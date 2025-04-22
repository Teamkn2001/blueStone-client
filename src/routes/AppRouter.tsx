import AuthLayout from "@/layouts/AuthLayout";
import AuthPage from "@/pages/AuthPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { index: true, element: <AuthPage /> },
        ]
    }
])

export default function AppRouter() {
    return (
        <div >
         <RouterProvider router={router} />
        </div>
    )
}