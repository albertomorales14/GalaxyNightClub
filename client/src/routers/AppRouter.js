import {Routes as Switch, Route} from 'react-router-dom';
import HomePage from '../views/homePage/HomePage';
import LoginPage from '../views/LoginPage';
import NotFoundPage from '../views/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import React, { Fragment } from 'react';
import routes from '../Utils/routes';
import GestionClubPage from '../views/gestionClub/GestionClubPage';
import DJResidentePage from '../views/djfolder/DJResidentePage';
import GestionAlmacenPage from '../views/gestionAlmacen/GestionAlmacenPage';
import MejorasNegocioPage from '../views/mejorasNegocio/MejorasNegocioPage';
import VentaProductosPage from '../views/ventaProductos/VentaProductosPage';
import CambiarPassword from '../components/layouts/settings/CambiarPassword';
import { useEffect, useState } from 'react';

export default function AppRouter() {

    // Modal
    const [isOpenModal, setIsOpenModal] = useState(true);
    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const [lista, setLista] = useState([]);

    // Backend
    useEffect(() => {
        const getClub = async () => {
            fetch('http://localhost:5050/api/Club')
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data)
                })
                .catch(error => {
                    // Handle any errors
                    alert('A problem occurred with your fetch operation: ', error)
                });
        }
        getClub(); //llamada
    }, [lista]) // dependencia variable de estado lista

    var fama = lista[0]?.fama;

    return (
        <Switch>
            <Route exact path={routes.login} element={<PublicRoute />}>
                <Route exact path={routes.login} element={<LoginPage />} />
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


            <Route exact path={routes.cambiarPassword} element={<PrivateRoute />}>
                <Route exact path={routes.cambiarPassword} element={<CambiarPassword isOpen={isOpenModal} close={closeModal} />} />
            </Route>
            

            <Route path="*" element={<NotFoundPage />} />            
        </Switch>
    )
}