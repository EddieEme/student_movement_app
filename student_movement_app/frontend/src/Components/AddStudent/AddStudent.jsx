import React from 'react'
import './AddStudent.css'
import LoginNavbar from '../LoginNavbar/LoginNavbar'
import SideNavbar from '../SideNavbar/SideNavbar'


const AddStudent = () => {
  return (
      <div className='add-student'>
          <LoginNavbar />
          <div className='addstudent-content'>
              <SideNavbar /> 
              <div className='addstudent-main'>
                  <div className='student-form'>
                    <div className="login-card">
                    <h2 className="login-title">Add Student</h2>
                    <div className="login-divider"></div>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                              </div>
                              <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <button type="submit" className="login-button">Submit</button>
                    </form>
                      
                  </div>
                    
                </div>
                  
              </div>
          </div>
         

          
      
    </div>
  )
}

export default AddStudent