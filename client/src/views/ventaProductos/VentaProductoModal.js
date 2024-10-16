import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';

function VentaProductoModal({ isOpen, close, producto, club }) {

    const { user } = useAuth();
    var venta = producto?.existencias / producto?.capacidadMax * producto?.totalValue
    var existencias = producto?.existencias

    const venderProducto = () => {

        fetch(`${process.env.REACT_APP_RENDER_URL}/api/Productos/${producto._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: producto.name,
                capacidadMax: producto.capacidadMax,
                existencias: 0,
                totalValue: producto.totalValue,
                diferencia: producto.capacidadMax
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => {
            response.json();
            logService.sendLog('info', '[PUT Request] Venta de Producto: Actualizar Producto (VentaProductoModal.js)');
            logService.sendLog('info', '\t> Producto vendido: ' + producto.name + ' (VentaProductoModal.js)');
        }).catch(error => {
            logService.sendLog('error', 'Error [PUT Request] Venta de Producto: Actualizar Producto (VentaProductoModal.js): ' + error);
        })


        fetch(`${process.env.REACT_APP_RENDER_URL}/api/Club/${user.club}`, {
            method: 'PUT',
            body: JSON.stringify({
                ganancias_almacen: (club?.ganancias_almacen + Math.floor(venta)),
                ganancias_totales: club?.ganancias_club + (club?.ganancias_almacen + Math.floor(venta)),
                ventas_almacen: club?.ventas_almacen + 1,
                productos_vendidos: club?.productos_vendidos + existencias
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => {
            response.json();
            logService.sendLog('info', '[PUT Request] Actualizar ganancias y ventas del Club (VentaProductoModal.js)');
        }).catch(error => {
            logService.sendLog('error', 'Error: [PUT Request] Actualizar ganancias y ventas del Club (VentaProductoModal.js): ' + error);
        })
    }

    return (
        <Modal show={isOpen && producto?.existencias !== 0} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Vender producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de "{producto?.name}" por
                    <span className='venta-all-price'>
                        &nbsp;${formatCurrency(producto?.existencias / producto?.capacidadMax * producto?.totalValue)}
                    </span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { venderProducto(); close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VentaProductoModal;