import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import useAuth from '../../auth/useAuth';

export default function VentaProductoModal({ isOpen, close, productos, club, total }) {

    const { user } = useAuth();
    var num_ventas = 0;
    var num_productos = 0;

    const venderProductos = (total) => {
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
                }).then(response => response.json())
                    .catch((error) => console.log(error))
            }
        }

        fetch(`http://localhost:5050/api/Club/${user.club}`, {
            method: 'PUT',
            body: JSON.stringify({
                ganancias_almacen: club?.ganancias_almacen + Math.floor(total),
                ganancias_totales: club?.ganancias_club + (club?.ganancias_almacen + Math.floor(total)),
                ventas_almacen: club?.ventas_almacen + num_ventas,
                productos_vendidos: club?.productos_vendidos + num_productos
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
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