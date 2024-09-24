import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../Utils/routes';

export default function PrivateRoute() {

    // Hook del react Router dom
    const location = useLocation();

    const { hasRole, isLogged } = useAuth();

    // si existe role
    // user? es para comprobacion null
    //if (props.role && !hasRole(props.role)) return <Navigate to={routes.home} />

    if (!isLogged()) {
        return <Navigate to={
            {pathname: routes.login, 
                state: {
                    from: location
                }
            }
        } replace={true} />
    }

    // Outlet renderiza elementos hijos
    return (<Outlet />)
}