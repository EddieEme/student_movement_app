// export const fetchStatistics = async () => {
//   const token = localStorage.getItem('accessToken');
//   const apiUrl = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_STATISTICS_ENDPOINT}`;

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch school statistics');
//     }

//     return await response.json(); // Return the response data
//   } catch (error) {
//     throw new Error(error.message); // Throw error for handling in components
//   }
// };