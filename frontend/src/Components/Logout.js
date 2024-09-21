export const logout = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    await fetch(`${import.meta.env.VITE_API_URL}${import.meta.env.VITE_LOGOUT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    // Remove the token from local storage
    localStorage.removeItem('accessToken');
    // Redirect the user or update the UI as needed
    window.location.href = '/student_movement_app/'; // Redirect to login page
  } catch (error) {
    console.error('Logout failed', error);
  }
};