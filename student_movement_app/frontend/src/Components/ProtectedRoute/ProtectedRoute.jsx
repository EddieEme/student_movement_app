import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

    if (!isAuthenticated) {
        return <div>Loading...</div>; // Show a loading state instead of a blank page
    }

    return children;
}


export default ProtectedRoute;