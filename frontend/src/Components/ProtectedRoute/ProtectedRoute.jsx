import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                navigate('/login');
            } else {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, [navigate]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    if (!isAuthenticated) {
        return null; // Return nothing if not authenticated (redirects already handled)
    }

    return <Outlet />; // Render child routes
}

export default ProtectedRoute;
