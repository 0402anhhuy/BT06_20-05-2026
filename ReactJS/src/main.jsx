import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import ProductDetail from "./pages/productDetail.jsx";
import CartPage from "./pages/cart.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import OrdersPage from "./pages/orders.jsx";
import OrderDetail from "./pages/orderDetail.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "product/:id",
                element: <ProductDetail />,
            },
                {
                    path: "cart",
                    element: <CartPage />,
                },
                {
                    path: "checkout",
                    element: <CheckoutPage />,
                },
                {
                    path: "orders",
                    element: <OrdersPage />,
                },
                {
                    path: "orders/:id",
                    element: <OrderDetail />,
                },
            {
                path: "user",
                element: <UserPage />,
            },
        ],
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthWrapper>
            <RouterProvider router={router} />
        </AuthWrapper>
    </React.StrictMode>,
);
