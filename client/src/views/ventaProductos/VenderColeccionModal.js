import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import useAuth from '../../auth/useAuth';

export default function VenderColeccionModal({ isOpen, close, grupo, coleccion, precioColeccion, productos, club }) {

    const { user } = useAuth();

    const getExistencias = (numero) => {
        return productos[numero]?.existencias > Math.round(productos[numero]?.existencias - (productos[numero]?.existencias * numero / 100)) ? Math.round(productos[numero]?.existencias - (productos[numero]?.existencias * numero / 100)) : productos[numero]?.existencias
    }

    var existenciasTotales = grupo?.reduce((acc, curr) => acc + getExistencias(curr), 0);

    const venderProductos = () => {
        grupo.map((numero, idx) => (
            fetch(`http://localhost:5050/api/Productos/${productos[numero]._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    existencias: productos[numero].existencias - getExistencias(numero),
                    diferencia: productos[numero].capacidadMax - (productos[numero].existencias - getExistencias(numero))
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))
        ))

        fetch(`http://localhost:5050/api/Club/${user.club}`, {
            method: 'PUT',
            body: JSON.stringify({
                ganancias_almacen: (club?.ganancias_almacen + precioColeccion),
                ganancias_totales: club?.ganancias_club + (club?.ganancias_almacen + precioColeccion),
                ventas_almacen: club?.ventas_almacen + 1,
                productos_vendidos: club?.productos_vendidos + existenciasTotales
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Venta para {coleccion}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de esta colección a <span className='venta-all-price'>{coleccion}</span> por
                    <span className='venta-all-price'>
                    &nbsp;${formatCurrency(precioColeccion)}
                    </span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { venderProductos(); close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}