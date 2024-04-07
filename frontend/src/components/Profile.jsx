import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import '../Styles/Profile.css';
import imgp from "../assets/6.png";



const Profile = () => {
    return (
        <div className="Profile">
            <ProfileHeader />
            <div className="user--profile">
                <div className="user--details">
                    <img src={imgp} alt="" />
                    <h3 className="username">Chamidu Keshika</h3>
                    <span className="profession">Admin</span>


                </div>
                <div className="user-courses"></div>

            </div>
    </div>
    );
    };
        
    

export default Profile;