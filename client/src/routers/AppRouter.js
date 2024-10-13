import React, { useEffect } from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from '../views/LoginPage';
import HomePage from '../views/homePage/HomePage';
import GestionClubPage from '../views/gestionClub/GestionClubPage';
import DJResidentePage from '../views/djfolder/DJResidentePage';
import GestionAlmacenPage from '../views/gestionAlmacen/GestionAlmacenPage';
import MejorasNegocioPage from '../views/mejorasNegocio/MejorasNegocioPage';
import VentaProductosPage from '../views/ventaProductos/VentaProductosPage';
import NotFoundPage from '../views/NotFoundPage';
import routes from '../Utils/routes';
import useAuth from '../auth/useAuth';

function AppRouter() {

    const { club, getClub } = useAuth();

    useEffect(() => {
        getClub('AppRouter.js');
    }, []);

    var fama = club?.fama;

    return (
        <Switch>
            <Route exact path={routes.login} element={<PublicRoute />}>
                <Route exact path={routes.login} element={<LoginPage />} />
            </Route>
            <Route exact path={routes.logout} element={<PublicRoute />}>
                <Route exact path={routes.logout} element={<LoginPage />} />
            </Route>
            <Route exact path={routes.home} element={<PrivateRoute />}>
                <Route exact path={routes.home} element={<HomePage fama={fama} />} />
            </Route>
            <Route exact path={routes.gestionClub} element={<PrivateRoute />}>
                <Route exact path={routes.gestionClub} element={<GestionClubPage fama={fama} />} />
            </Route>
            <Route exact path={routes.djresidente} element={<PrivateRoute />}>
                <Route exact path={routes.djresidente} element={<DJResidentePage fama={fama} />} />
            </Route>
            <Route exact path={routes.gestionAlmacen} element={<PrivateRoute />}>
                <Route exact path={routes.gestionAlmacen} element={<GestionAlmacenPage />} />
            </Route>
            <Route exact path={routes.ventaProductos} element={<PrivateRoute />}>
                <Route exact path={routes.ventaProductos} element={<VentaProductosPage />} />
            </Route>
            <Route exact path={routes.mejorasNegocio} element={<PrivateRoute />}>
                <Route exact path={routes.mejorasNegocio} element={<MejorasNegocioPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Switch>
    )
}

export default AppRouter;