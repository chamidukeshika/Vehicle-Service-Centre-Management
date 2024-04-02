import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AdminRoutes = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Check if userInfo exists and if the email and password match
    const isAuthenticated = userInfo && userInfo.email === "chamidukeshikaz@gmail.com" && userInfo.password === "12345";

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("Log as Admin for continue..");
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : <Navigate to = '/login' replace/>;
}

export default AdminRoutes;
