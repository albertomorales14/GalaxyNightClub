import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../Utils/routes';

function PublicRoute() {

    const { isLogged } = useAuth();

    if (isLogged()) return <Navigate to={routes.home} />

    // Outlet renderiza elementos hijos
    return (<Outlet />)
}

export default PublicRoute;