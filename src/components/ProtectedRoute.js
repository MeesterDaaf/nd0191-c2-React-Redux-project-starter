import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const authedUser = useSelector((state) => state.authedUser);

    if (!authedUser) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return children;
};

export default ProtectedRoute;
