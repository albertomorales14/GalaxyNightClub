import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../Utils/routes';

function PrivateRoute() {

    const location = useLocation(); // Hook del react Router dom
    const { isLogged } = useAuth();

    if (!isLogged()) {
        return <Navigate to={
            {
                pathname: routes.login,
                state: {
                    from: location
                }
            }
        } replace={true} />
    }

    // Outlet renderiza elementos hijos
    return (<Outlet />)
}

export default PrivateRoute;