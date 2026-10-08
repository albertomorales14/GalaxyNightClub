import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import { clubApi, productosApi } from '../../api';
import logService from '../../Utils/logService';

// Vender las existencias de todos los productos
function VenderTodosModal({ isOpen, close, productos, club, total }) {

    const [saving, setSaving] = useState(false);

    const venderProductos = async () => {
        const conExistencias = productos.filter(producto => producto.existencias !== 0);
        const numProductos = conExistencias.reduce((suma, producto) => suma + producto.existencias, 0);
        const gananciasAlmacen = club.ganancias_almacen + Math.floor(total);

        setSaving(true);
        try {
            await Promise.all(conExistencias.map(producto =>
                productosApi.update(producto._id, { existencias: 0, diferencia: producto.capacidadMax })
            ));
            await clubApi.update({
                ganancias_almacen: gananciasAlmacen,
                ganancias_totales: club.ganancias_club + gananciasAlmacen,
                ventas_almacen: club.ventas_almacen + conExistencias.length,
                productos_vendidos: club.productos_vendidos + numProductos
            });
            logService.sendLog('info', `Venta de todos los productos: ${numProductos} unidades (VenderTodosModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al vender todos los productos (VenderTodosModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Vender todos los productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de todos los productos por
                    <span className='venta-all-price'>&nbsp;${formatCurrency(total)}</span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button onClick={venderProductos} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VenderTodosModal;
