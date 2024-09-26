import React from "react";
import { BiHome,BiMessage,BiMoney,BiSolidReport,BiListCheck,BiPackage,BiTask,BiHelpCircle } from 'react-icons/bi';
import "../Styles/Sidebar.css";
import logom from '../assets/Logo2.png'
const Sidebar = () => {

    return(
    <div className="menu bg">
        <div className="logo">
            
            <img src={logom} alt="" style={{ width: '150px', height: '50px' }} />

        </div>
        <div className="menu--list">
            <a href="/" className="item">
                <BiHome className="icon" />
                Home
                </a>
                <a href="/admin/equipments/add" className="item">
                <BiListCheck className="icon"/>
                List Items
            </a>
            <a href="/admin/records/add" className="item">
                <BiTask className="icon" />
                Service 
                </a>
                <a href="/orders/add" className="item">
                <BiPackage className="icon"/>
                Order 
                </a>
                <a href="/payment/add" className="item">
                <BiMoney className="icon"/>
                Payment
            </a>
            <a href="/admin/equipments/add" className="item">
                <BiSolidReport className="icon"/>
                Equipments
            </a>
            
                <a href="/addfeedback" className="item">
                <BiMessage className="icon"/>
                Feedback
            </a>
            <a href="#" className="item">
                <BiHelpCircle className="icon"/>
                Help
                </a>
                
        </div>
        </div>)
};

export default Sidebar;