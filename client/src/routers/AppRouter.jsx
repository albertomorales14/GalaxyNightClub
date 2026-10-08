import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from '../views/LoginPage';
import NotFoundPage from '../views/NotFoundPage';
import routes from '../Utils/routes';
import useAuth from '../auth/useAuth';

// Cada página se descarga solo cuando se visita
const HomePage = lazy(() => import('../views/homePage/HomePage'));
const GestionClubPage = lazy(() => import('../views/gestionClub/GestionClubPage'));
const DJResidentePage = lazy(() => import('../views/djfolder/DJResidentePage'));
const GestionAlmacenPage = lazy(() => import('../views/gestionAlmacen/GestionAlmacenPage'));
const MejorasNegocioPage = lazy(() => import('../views/mejorasNegocio/MejorasNegocioPage'));
const VentaProductosPage = lazy(() => import('../views/ventaProductos/VentaProductosPage'));

const PageFallback = () => <div className="main-common-container" style={{ margin: '8px', marginLeft: '0', minHeight: '50vh' }} />;

function AppRouter() {

    const { club } = useAuth();
    const fama = club?.fama;

    return (
        <Suspense fallback={<PageFallback />}>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path={routes.login} element={<LoginPage />} />
                    <Route path={routes.logout} element={<LoginPage />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path={routes.home} element={<HomePage fama={fama} />} />
                    <Route path={routes.gestionClub} element={<GestionClubPage fama={fama} />} />
                    <Route path={routes.djresidente} element={<DJResidentePage fama={fama} />} />
                    <Route path={routes.gestionAlmacen} element={<GestionAlmacenPage />} />
                    <Route path={routes.ventaProductos} element={<VentaProductosPage />} />
                    <Route path={routes.mejorasNegocio} element={<MejorasNegocioPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default AppRouter;
