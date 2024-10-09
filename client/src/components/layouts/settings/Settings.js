import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import routes from '../../../Utils/routes';
import useAuth from '../../../auth/useAuth';
import { useState, useEffect } from 'react';
import CambiarPassword from './CambiarPassword';
import CambiarImagenPerfil from './CambiarImagenPerfil';
import logService from '../../../Utils/logService';

export default function Settings({ isVisible, layoutRef, clickSettingsButton }) {

    const { logout, setError } = useAuth();

// Modal password
const [isOpenPssWdPage, setIsOpenPssWdPage] = useState(false);
const openPssWdPage = () => {setIsOpenPssWdPage(true); setError(null)};
const closePssWdPage = () => {setIsOpenPssWdPage(false); setError(null)};
// Modal img
const [isOpenImgPage, setIsOpenImgPage] = useState(false);
const openImgPage = () => setIsOpenImgPage(true);
const closeImgPage = () => setIsOpenImgPage(false);





    return (
        <>
        <CambiarPassword isOpen={isOpenPssWdPage} close={closePssWdPage} />
        <CambiarImagenPerfil isOpen={isOpenImgPage} close={closeImgPage} />

            {
                isVisible ? (
                    <div className={`setting-container ${isVisible ? 'slide-down' : ''}`} ref={layoutRef}>
                        <h3>Opciones</h3>
                        <Button onClick={() => { openPssWdPage(); }}>
                                Cambiar contraseña
                        </Button>
                        
                        <Button onClick={() => { openImgPage(); }}>
                                Cambiar imagen de perfil
                            </Button>

                        <Button onClick={() => { clickSettingsButton(); logout() }}>
                            Cerrar sesión
                        </Button>
                    </div>
                ) : (<></>)
            }</>

    )
}