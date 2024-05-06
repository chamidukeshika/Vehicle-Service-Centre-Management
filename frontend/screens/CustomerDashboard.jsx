import React from 'react'
import CusSlider from '../src/components/CusSlidebar.jsx'
import Content from '../src/components/Content.jsx'
import '../src/Styles/Admindashboard.css';
import Profile from '../src/components/Profile.jsx';

const AdminDashboard = () => {
  return (
    <div className='dashboard'>
      <CusSlider/>
      <div className="dashboard--content">
        <Content />
        <Profile />

        
      </div>
    </div>
  )
}

export default AdminDashboard;
