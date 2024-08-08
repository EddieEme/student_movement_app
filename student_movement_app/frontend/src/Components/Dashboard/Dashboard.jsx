import React from 'react'
import LoginNavbar from '../LoginNavbar/LoginNavbar'
import './Dashboard.css'
import SideNavbar from '../SideNavbar/SideNavbar'
import Chart from '../Chart/Chart'

const Dashboard = () => {
  return (
      <div className='dashboard'>
      <LoginNavbar className='login-navbar'/>      
      <SideNavbar className='sidenav'/>
      <Chart className='chart'/>
          </div>
  )
}

export default Dashboard