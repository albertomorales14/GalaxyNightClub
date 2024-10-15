import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import CambiarPassword from './CambiarPassword';
import CambiarImagenPerfil from './CambiarImagenPerfil';
import DeleteAccountModal from './DeleteAccountModal';
import routes from '../../../Utils/routes';

function Settings({ isVisible, layoutRef, clickSettingsButton }) {

    const { logout, setError } = useAuth();

    // Modal password
    const [isOpenPssWdPage, setIsOpenPssWdPage] = useState(false);
    const openPssWdPage = () => { setIsOpenPssWdPage(true); setError(null) };
    const closePssWdPage = () => { setIsOpenPssWdPage(false); setError(null) };

    // Modal img
    const [isOpenImgPage, setIsOpenImgPage] = useState(false);
    const openImgPage = () => setIsOpenImgPage(true);
    const closeImgPage = () => setIsOpenImgPage(false);

    // Modal delete account
    const [isOpenDelAccountPage, setIsOpenDelAccountPage] = useState(false);
    const openDelAccountPage = () => setIsOpenDelAccountPage(true);
    const closeDelAccountPage = () => setIsOpenDelAccountPage(false);

    return (
        <>
            <CambiarPassword isOpen={isOpenPssWdPage} close={closePssWdPage} />
            <CambiarImagenPerfil isOpen={isOpenImgPage} close={closeImgPage} />
            <DeleteAccountModal isOpen={isOpenDelAccountPage} close={closeDelAccountPage} />
            {
                isVisible ? (
                    <div className={`setting-container ${isVisible ? 'slide-down' : ''}`} ref={layoutRef}>
                        <h3>Opciones</h3>
                        <Button onClick={openPssWdPage}>
                            Cambiar contraseña
                        </Button>
                        <Button onClick={openImgPage}>
                            Cambiar imagen de perfil
                        </Button>
                        <Button as={NavLink} to={routes.logout} onClick={() => { clickSettingsButton(); logout() }}>
                            Cerrar sesión
                        </Button>
                        <Button className='danger-account-btn' onClick={openDelAccountPage}>
                            Eliminar cuenta
                        </Button>
                    </div>
                ) : (<></>)
            }
        </>
    )
}

export default Settings;