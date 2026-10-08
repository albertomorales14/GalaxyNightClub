import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import { clubApi, productosApi } from '../../api';
import logService from '../../Utils/logService';
import { existenciasColeccion, precioColeccion } from '../../game/colecciones';

// Vender una colección de productos a un comprador
function VenderColeccionModal({ isOpen, close, grupo, coleccion, productos, club }) {

    const [saving, setSaving] = useState(false);
    const precio = grupo ? precioColeccion(productos, grupo) : 0;

    const venderProductos = async () => {
        const vendidas = grupo.map(numero => existenciasColeccion(productos, numero));
        const totalVendidas = vendidas.reduce((suma, cantidad) => suma + cantidad, 0);
        const gananciasAlmacen = club.ganancias_almacen + precio;

        setSaving(true);
        try {
            await Promise.all(grupo.map((numero, i) => {
                const producto = productos[numero];
                const existencias = producto.existencias - vendidas[i];
                return productosApi.update(producto._id, {
                    existencias,
                    diferencia: producto.capacidadMax - existencias
                });
            }));
            await clubApi.update({
                ganancias_almacen: gananciasAlmacen,
                ganancias_totales: club.ganancias_club + gananciasAlmacen,
                ventas_almacen: club.ventas_almacen + 1,
                productos_vendidos: club.productos_vendidos + totalVendidas
            });
            logService.sendLog('info', `Colección vendida a ${coleccion}: ${totalVendidas} unidades (VenderColeccionModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al vender la colección (VenderColeccionModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Venta para {coleccion}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Estás seguro de que deseas vender todas las existencias de esta colección a <span className='venta-all-price'>{coleccion}</span> por
                    <span className='venta-all-price'>&nbsp;${formatCurrency(precio)}</span>?
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

export default VenderColeccionModal;
