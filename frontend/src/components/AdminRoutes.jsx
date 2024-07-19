import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRoutes = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Check if userInfo exists and if the email and password match
    const isAuthenticated = userInfo && userInfo.email === "chamidukeshikaz@gmail.com";

    return isAuthenticated ? <Outlet /> : <Navigate to = '/profile' replace/>;
}

export default AdminRoutes;
