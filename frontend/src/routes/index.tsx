import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages";
import { Navbar, Footer } from "@/components";
// import { AuthProvider } from "@/contexts/AuthContext";

const MainLayout = () => {
    return (
        <div className="bg-[#19181B]">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

const AuthLayout = () => {
    return <Outlet />;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/auth",
                element: <Home />,
            }
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;