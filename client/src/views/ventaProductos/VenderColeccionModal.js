import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';

function VenderColeccionModal(props) {

    const { user } = useAuth();

    const getExistencias = (numero) => {
        return props.productos[numero]?.existencias > Math.round(props.productos[numero]?.existencias - (props.productos[numero]?.existencias * numero / 100)) ? Math.round(props.productos[numero]?.existencias - (props.productos[numero]?.existencias * numero / 100)) : props.productos[numero]?.existencias
    }

    // Sumar productos vendidos al club
    var existenciasTotales = props.grupo?.reduce((acc, curr) => acc + getExistencias(curr), 0);

    // Comprobar si la colección está completa para vender
    const isCompleta = (grupo) => {
        let no_completa = [];
        grupo.map((numero) => (
            (props.productos[numero]?.existencias > Math.round(props.productos[numero]?.existencias - (props.productos[numero]?.existencias * numero / 100)) ? Math.round(props.productos[numero]?.existencias - (props.productos[numero]?.existencias * numero / 100)) : props.productos[numero]?.existencias) < (Math.round(props.productos[numero]?.capacidadMax - (props.productos[numero]?.capacidadMax * numero / 100)))
                ? no_completa.push(true) : no_completa.push(false)
        ))
        if (no_completa.includes(true)) {
            return false; // No se abre la Modal
        } else {
            return true; // Se abre la Modal
        }
    }

    const venderProductos = () => {
        props.grupo.map((numero) => (
            fetch(`${process.env.REACT_APP_RENDER_URL}/api/Productos/${props.productos[numero]._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    existencias: props.productos[numero].existencias - getExistencias(numero),
                    diferencia: props.productos[numero].capacidadMax - (props.productos[numero].existencias - getExistencias(numero))
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            })
                .then(response => {
                    response.json();
                    logService.sendLog('info', '[PUT Request] Venta de Producto: Actualizar Producto (VenderColeccionModal.js)');
                    logService.sendLog('info', '\t> Se han vendido ' + getExistencias(numero) + ' existencias de ' + props.productos[numero].name + ' (VenderColeccionModal.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error: [PUT Request] Venta de Producto: Actualizar Producto (VenderColeccionModal.js): ' + error);
                })
        ))

        fetch(`${process.env.REACT_APP_RENDER_URL}/api/Club/${user.club}`, {
            method: 'PUT',
            body: JSON.stringify({
                ganancias_almacen: (props.club?.ganancias_almacen + props.precioColeccion),
                ganancias_totales: props.club?.ganancias_club + (props.club?.ganancias_almacen + props.precioColeccion),
                ventas_almacen: props.club?.ventas_almacen + 1,
                productos_vendidos: props.club?.productos_vendidos + existenciasTotales
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then(response => {
                response.json();
                logService.sendLog('info', '[PUT Request] Actualizar ganancias y ventas del Club (VenderColeccionModal.js)');
                logService.sendLog('info', '\t> Se ha vendido una colección de productos (VenderColeccionModal.js)');
            })
            .catch(error => {
                logService.sendLog('error', 'Error: [PUT Request] Actualizar ganancias y ventas del Club (VenderColeccionModal.js): ' + error);
            })
    }

    return (
        <Modal show={props.isOpen && isCompleta(props.grupo)} onHide={props.close} animation={false}>
            <Modal.Header>
                <Modal.Title>Venta para {props.coleccion}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de esta colección a <span className='venta-all-price'>{props.coleccion}</span> por
                    <span className='venta-all-price'>
                        &nbsp;${formatCurrency(props.precioColeccion)}
                    </span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { venderProductos(); props.close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VenderColeccionModal;