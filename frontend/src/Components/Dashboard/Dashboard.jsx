import React, { useState } from 'react'
import LoginNavbar from '../LoginNavbar/LoginNavbar'
import './Dashboard.css'
import SideNavbar from '../SideNavbar/SideNavbar'
import Chart from '../Chart/Chart'

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <LoginNavbar className='login-navbar' />
      <div className='dashboard-content'>
        <SideNavbar className="sidenav-box" />
        <div className='main-content'>
          <Chart className="chart-area"/>
        </div> 
      </div>
    </div>
  )
}

export default Dashboard