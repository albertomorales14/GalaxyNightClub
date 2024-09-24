import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import routes from '../Utils/routes';

export default function PublicRoute(props) {

    const { isLogged } = useAuth();

    if (isLogged()) return <Navigate to={routes.home} />

    // Outlet renderiza elementos hijos
    return (<Outlet />)
}