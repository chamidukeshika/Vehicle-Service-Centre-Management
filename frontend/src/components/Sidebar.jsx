import React from "react";
import { BiHome,BiMessage,BiSolidReport,BiStats,BiTask,BiHelpCircle } from 'react-icons/bi';
import "../Styles/Sidebar.css";
import logom from '../assets/Logo2.png'
const Sidebar = () => {

    return(
    <div className="menu bg">
        <div className="logo">
            
            <img src={logom} alt="" style={{ width: '150px', height: '50px' }} />

        </div>
        <div className="menu--list">
            <a href="#" className="item">
                <BiHome className="icon" />
                Dashboard
            </a>
            <a href="#" className="item">
                <BiTask className="icon" />
                Service 
                </a>
                <a href="#" className="item">
                <BiStats className="icon"/>
                Order 
                </a>
            <a href="#" className="item">
                <BiSolidReport className="icon"/>
                Report
            </a>
            
                <a href="#" className="item">
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