import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import routes from '../../../Utils/routes';

export default function Settings({ isVisible, layoutRef }) {

    return (
        <>{
            isVisible ? (
                <div className={`setting-container ${isVisible ? 'slide-down' : ''}`} ref={layoutRef}>
                    <h1>Settings</h1>
                    <Button className="p-2" as={NavLink} to={routes.cambiarPassword}>
                        Cambiar contraseña
                    </Button>
                    <Button className="p-2" as={NavLink} to={routes.cambiarImgProfile}>
                        Cambiar imagen de perfil
                    </Button>
                    <Button className="p-2" as={NavLink} to={routes.logout}>
                        Cerrar sesión
                    </Button>
                </div>
            ) : (<></>)
        }</>

    )
}