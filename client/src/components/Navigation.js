import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import routes from '../Utils/routes';
import Home from './Home';

function Navigation(props) {

    return (
        <div className='aside'>
            <Home propietario={props.propietario} ubicacion={props.ubicacion} />
            <div className='aside-menu'>
                <Button className="p-2" as={NavLink} to={routes.home}>
                    Inicio
                </Button>
                <Button className="p-2" as={NavLink} to={routes.gestionClub}>
                    Gestión del club nocturno
                </Button>
                <Button className="p-2" as={NavLink} to={routes.djresidente}>
                    DJ residente
                </Button>
                <Button className="p-2" as={NavLink} to={routes.gestionAlmacen}>
                    Gestión del almacén
                </Button>
                <Button className="p-2" as={NavLink} to={routes.ventaProductos}>
                    Venta de productos
                </Button>
                <Button className="p-2" as={NavLink} to={routes.mejorasNegocio}>
                    Mejoras del negocio
                </Button>
            </div>
        </div>
    )
}

export default Navigation;