import React, { useState } from 'react'
import './AddStudent.css'
import LoginNavbar from '../LoginNavbar/LoginNavbar'
import SideNavbar from '../SideNavbar/SideNavbar'

const AddStudent = () => {
  const [selectedLevel, setSelectedLevel] = useState('')

  const levelOptions = ['Primary', 'Junior Secondary', 'Senior Secondary']

  const getClassOptions = (level) => {
    switch (level) {
      case 'Primary':
        return ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6']
      case 'Junior Secondary':
        return ['JSS 1', 'JSS 2', 'JSS 3']
      case 'Senior Secondary':
        return ['SSS 1', 'SSS 2', 'SSS 3']
      default:
        return []
    }
  }

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value)
  }

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
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" id="firstname" name="firstname" />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" id="lastname" name="lastname" />
                </div>
                <div className="form-group">
                  <label htmlFor="level">Level</label><br />
                  <select id="level" name="level" value={selectedLevel} onChange={handleLevelChange}>
                    <option value="">Select Level</option>
                    {levelOptions.map((level, index) => (
                      <option key={index} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="class">Class</label><br />
                  <select id="class" name="class" disabled={!selectedLevel}>
                    <option value="">Select Class</option>
                    {getClassOptions(selectedLevel).map((classOption, index) => (
                      <option key={index} value={classOption.toLowerCase().replace(' ', '')}>
                        {classOption}
                      </option>
                    ))}
                  </select>
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