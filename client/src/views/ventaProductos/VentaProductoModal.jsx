import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import { clubApi, productosApi } from '../../api';
import logService from '../../Utils/logService';
import { valorProducto } from '../../game/reglas';

// Vender todas las existencias de un producto
function VentaProductoModal({ isOpen, close, producto, club }) {

    const [saving, setSaving] = useState(false);
    const venta = Math.floor(valorProducto(producto));

    const venderProducto = async () => {
        setSaving(true);
        try {
            await productosApi.update(producto._id, { existencias: 0, diferencia: producto.capacidadMax });
            const gananciasAlmacen = club.ganancias_almacen + venta;
            await clubApi.update({
                ganancias_almacen: gananciasAlmacen,
                ganancias_totales: club.ganancias_club + gananciasAlmacen,
                ventas_almacen: club.ventas_almacen + 1,
                productos_vendidos: club.productos_vendidos + producto.existencias
            });
            logService.sendLog('info', `Producto vendido: ${producto.name} (VentaProductoModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al vender el producto (VentaProductoModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Vender producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de &quot;{producto?.name}&quot; por
                    <span className='venta-all-price'>&nbsp;${formatCurrency(venta)}</span>?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button onClick={venderProducto} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                    Vender todo
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default VentaProductoModal;
