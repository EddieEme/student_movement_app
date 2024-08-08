import React from 'react'
import './SideNavbar.css'
import dashboard_icon from '../../assets/Images/dashboard-icon.png'
import student_icon from '../../assets/Images/student-icon.png'
import notification_icon from '../../assets/Images/notification-icon.png'
import transfer_icon from '../../assets/Images/transfer-icon.png'

const SideNavbar = () => {
  return (
      <nav className='side-nav'>
          <ul>
            <div className='icon-box'><img src={dashboard_icon} alt="" className='icons'/><li >Dashboard</li></div>
              <div className='icon-box'><img src={student_icon} alt="" className='icons'/> <li>Add Student</li></div>
             <div className='icon-box'><img src={transfer_icon} alt="" className='icons'/><li>Transfer</li></div>
              <div className='icon-box'><img src={notification_icon} alt="" className='icons'/><li>Notification</li></div>
              

          </ul>
          
    </nav>
  )
}

export default SideNavbar