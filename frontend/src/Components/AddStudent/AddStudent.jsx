import React, { useState } from 'react';
import './AddStudent.css';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import SideNavbar from '../SideNavbar/SideNavbar';
import NigeriaStatesLGAs from '../NigeriaStatesLGAs/NigeriaStatesLGAs';
import axios from 'axios';
// import { decode } from 'jwt-decode';

const AddStudent = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [error, setError] = useState('');

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedLGA(''); // Reset LGA when state changes
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    const decoded = jwt_decode(token);
    return decoded.exp * 1000 < Date.now();
  };

  // Function to refresh the accessToken
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });
      localStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    } catch (error) {
      setError('Session expired. Please log in again.');
      throw error;
    }
  };

  // Function to get a valid accessToken (refresh if expired)
  const getValidAccessToken = async () => {
    let accessToken = localStorage.getItem('accessToken');
    if (isTokenExpired(accessToken)) {
      // Token expired, refresh it
      accessToken = await refreshAccessToken();
    }
    return accessToken;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      student_id: e.target.student_id.value,
      student_name: e.target.student_name.value,
      date_of_birth: e.target.dob.value,
      state_of_origin: selectedState,
      lga_of_origin: selectedLGA,
      town: e.target.town.value,
      student_class: e.target.student_class.value,
    };

    try {
      // Get a valid token (either current or refreshed)
      const token = await getValidAccessToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/add_student/`,
        studentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Student added successfully:', response.data);
    } catch (error) {
      console.error('Error adding student:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-student">
      <LoginNavbar />
      <div className="addstudent-content">
        <SideNavbar />
        <div className="addstudent-main">
          <div className="student-form">
            <div className="login-card">
              <h2 className="login-title">Add Student</h2>
              <div className="login-divider"></div>
              {error && <div className="error-message">{error}</div>}
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="student_id">Student ID</label>
                  <input type="text" id="student_id" name="student_id" required />
                </div>
                <div className="form-group">
                  <label htmlFor="student_name">Student Name (Full)</label>
                  <input type="text" id="student_name" name="student_name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="date" id="dob" name="dob" required />
                </div>
                <div className="form-group">
                  <label htmlFor="town">Town</label>
                  <input type="text" id="town" name="town" />
                </div>
                <div className="form-group">
                  <label htmlFor="student_class">Student Class</label>
                  <input type="text" id="student_class" name="student_class" />
                </div>
                <NigeriaStatesLGAs selectedState={selectedState} onStateChange={handleStateChange} selectedLGA={selectedLGA} onLGAChange={handleLGAChange} />
                <button type="submit" className="login-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
