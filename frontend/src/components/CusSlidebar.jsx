import React from "react";
import { BiHome, BiMessage, BiMoney, BiSolidReport, BiListCheck, BiPackage, BiTask, BiHelpCircle } from 'react-icons/bi';
import "../Styles/Sidebar.css";
import logom from '../assets/Logo2.png'
const Sidebar = () => {

    return (
        <div className="menu bg">
            <div className="logo">

                <img src={logom} alt="" style={{ width: '150px', height: '50px' }} />

            </div>
            <div className="menu--list">

                <a href="/" className="item">
                    <BiHome className="home" />
                    Home
                </a>
                <a href="/service" className="item">
                    <BiTask className="icon" />
                    My Services
                </a>
                <a href="/orders/cus" className="item">
                    <BiPackage className="icon" />
                    My Orders
                </a>
                <a href="/payment/cus" className="item">
                    <BiMoney className="icon" />
                    Payment Details
                </a>
                <a href="/" className="item">
                    <BiSolidReport className="icon" />
                    My Appointments
                </a>

                <a href="/addfeedback" className="item">
                    <BiMessage className="icon" />
                    Feedback
                </a>
                <a href="#" className="item">
                    <BiHelpCircle className="icon" />
                    Help
                </a>

            </div>
        </div>)
};

export default Sidebar;