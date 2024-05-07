import React from 'react'
import CusSlider from '../src/components/CusSlidebar.jsx'
import Cuscontent from '../src/components/Cuscont.jsx'
import '../src/Styles/Admindashboard.css';
import Profile from '../src/components/Profile.jsx';

const AdminDashboard = () => {
  return (
    <div className='dashboard'>
      <CusSlider/>
      <div className="dashboard--content">
        <Cuscontent />
        <Profile />

        
      </div>
    </div>
  )
}

export default AdminDashboard;
