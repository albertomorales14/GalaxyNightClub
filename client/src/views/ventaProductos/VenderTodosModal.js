import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';

function VenderTodosModal({ isOpen, close, productos, club, total }) {

    const { user } = useAuth();
    var num_ventas = 0;
    var num_productos = 0;

    const venderProductos = (total) => {
        // Actualizar cada producto
        for (let item of productos) {
            if (item.existencias !== 0) {
                num_ventas++;
                num_productos += item.existencias;
                fetch(`http://localhost:5050/api/Productos/${item._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: item.name,
                        capacidadMax: item.capacidadMax,
                        existencias: 0,
                        totalValue: item.totalValue,
                        diferencia: item.capacidadMax
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8", },
                }).then(response => {
                    response.json();
                    console.log('[Actualizar Producto] PUT llamada a API...');
                    logService.sendLog('info', '[PUT] Llamada a la API: Actualizar Producto \t(VenderTodosModal.js)');
                    logService.sendLog('info', 'Producto vendido: ' + item.name + ' \t(VenderTodosModal.js)');
                }).catch(error => {
                    console.log('A problem occurred with your fetch operation: ' + error);
                    logService.sendLog('error', '[PUT] Llamada a la API (Productos) \t(VenderTodosModal.js): ' + error);
                })
            }
        }

        // Actualizar el Club despues de la venta
        fetch(`http://localhost:5050/api/Club/${user.club}`, {
            method: 'PUT',
            body: JSON.stringify({
                ganancias_almacen: club?.ganancias_almacen + Math.floor(total),
                ganancias_totales: club?.ganancias_club + (club?.ganancias_almacen + Math.floor(total)),
                ventas_almacen: club?.ventas_almacen + num_ventas,
                productos_vendidos: club?.productos_vendidos + num_productos
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => {
            response.json();
            console.log('[Actualizar Club] PUT llamada a API...');
            logService.sendLog('info', '[PUT] Llamada a la API: Actualizar Club \t(VenderTodosModal.js)');
            logService.sendLog('info', 'Ventas realizadas: ' + num_ventas + ' \t(VenderTodosModal.js)');
            logService.sendLog('info', 'Productos vendidos: ' + num_productos + ' \t(VenderTodosModal.js)');
        }).catch(error => {
            console.log('A problem occurred with your fetch operation: ' + error);
            logService.sendLog('error', '[PUT] Llamada a la API (Club) \t(VenderTodosModal.js): ' + error);
        })
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Vender todos los productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de todos los productos por
                    <span className='venta-all-price'>
                        &nbsp;${formatCurrency(total)}
                    </span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { venderProductos(total); close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VenderTodosModal;