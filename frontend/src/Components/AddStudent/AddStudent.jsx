import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './AddStudent.css';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import SideNavbar from '../SideNavbar/SideNavbar';
import NigeriaStatesLGAs from '../NigeriaStatesLGAs/NigeriaStatesLGAs';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
const generateStudentID = () => `STU-${uuidv4().slice(0, 8)}`;

const AddStudent = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [studentID, setStudentID] = useState(generateStudentID());

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedLGA(''); // Reset LGA when state changes
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
  };

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Assume token is expired if it can't be decoded
    }
  };

  // Function to refresh the accessToken
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });
      
      const newAccessToken = response.data.access;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setError('Session expired. Please log in again.');
      throw error;
    }
  };

  // Function to get a valid accessToken (refresh if expired)
  const getValidAccessToken = async () => {
    try {
      let accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        throw new Error('No access token available');
      }

      if (isTokenExpired(accessToken)) {
        accessToken = await refreshAccessToken();
      }

      return accessToken;
    } catch (error) {
      throw new Error('Failed to get valid access token');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

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
      const token = await getValidAccessToken();

      const response = await axios.post(
        'http://127.0.0.1:8000/api/add_student/',
        studentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccessMessage(`Student ${studentData.student_name} added successfully`)
      // Reset form or redirect as needed
      e.target.reset();
      setSelectedState('');
      setSelectedLGA('');
      setStudentID(generateStudentID());
    } catch (error) {
      console.error('Error adding student:', error);
      if (error.response?.status === 401) {
        setError('Your session has expired. Please log in again.');
      } else if (error.response) {
        setError(`Server error: ${error.response.data.error || error.response.statusText}`);
      } else if (error.request) {
        setError('No response received from the server. Please try again.');
      } else {
        setError(`An error occurred: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
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

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick={() => setError('')}
                  ></button>
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="alert" 
                    aria-label="Close"
                    onClick={() => setSuccessMessage('')}
                  ></button>
                </div>
              )}

              {/* {error && <div className="error-message">{error}</div>} */}
              <form className="login-form" onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="student_id">Student ID</label>
                  <input type="text" id="student_id" name="student_id" value={studentID} readOnly required />
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
                <NigeriaStatesLGAs 
                  selectedState={selectedState} 
                  onStateChange={handleStateChange} 
                  selectedLGA={selectedLGA} 
                  onLGAChange={handleLGAChange} 
                />
                <button 
                  type="submit" 
                  className="login-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;