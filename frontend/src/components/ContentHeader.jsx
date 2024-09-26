import React from "react";
import { BiNotification, BiSearch } from "react-icons/bi";
import "../Styles/Content.css";

const ContentHeader = () => {
    return (
        <div className="content--header">
            <h1 className="header--title">Admin Dashboard</h1>
            <div className="header--activity">
                <div className="search-box">
                    <input type="text" placeholder="Search anything here.." />
                    <BiSearch className="icon" />
            
                </div>
                <div className="notify">
                    <BiNotification className="icon" />
                </div>
            </div>
        </div>
    );
}

export default ContentHeader;