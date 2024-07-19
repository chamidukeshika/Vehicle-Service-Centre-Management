import React from "react";
import { BiHome, BiMessage, BiMoney, BiSolidReport, BiListCheck, BiPackage, BiTask, BiHelpCircle,BiSolidBookBookmark } from 'react-icons/bi';
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
                    <BiHome className="icon" />
                    Home
                </a>
                <a href="/listlubricant/add" className="item">
                    <BiListCheck className="icon" />
                    List Items
                </a>
                <a href="/admin/records/add" className="item">
                    <BiTask className="icon" />
                    Service
                </a>
                <a href="/orders/view" className="item">
                    <BiPackage className="icon" />
                    Order
                </a>
                <a href="/payment/view" className="item">
                    <BiMoney className="icon" />
                    Payment
                </a>
                <a href="/admin/equipments/add" className="item">
                    <BiSolidReport className="icon" />
                    Equipments
                </a>

                <a href="/viewfeedbackadmin" className="item">
                    <BiMessage className="icon" />
                    Feedback
                </a>
                <a href="/app/viewn" className="item">
                    <BiSolidBookBookmark className="icon" />
                    Appointments
                </a>
                <a href="/ViewInquiryAdmin" className="item">
                    <BiHelpCircle className="icon" />
                    Inquiries
                </a>

            </div>
        </div>)
};

export default Sidebar;