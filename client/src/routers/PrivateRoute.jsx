import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../Utils/routes';

function PrivateRoute() {

    const location = useLocation();
    const { isLogged } = useAuth();

    if (!isLogged) {
        return <Navigate to={routes.login} state={{ from: location }} replace />
    }

    // Outlet renderiza elementos hijos
    return (<Outlet />)
}

export default PrivateRoute;
