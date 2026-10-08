import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TecnicosModal from './TecnicosModal';
import { FaRegCircleCheck } from "react-icons/fa6"; // Check
import { GiPerson } from "react-icons/gi"; // Person
import PRODUCTO from '../../Utils/namesProductos';

// Clase CSS de cada casilla según su posición en la cuadrícula de 3 columnas
const CLASES_CASILLA = [
    'row1-first', 'row1-middle', 'row1-last',
    'row2-first', 'row2-middle', 'row2-last',
    'row3-first'
];

// Agrupa los elementos en filas de 3
const enFilas = (lista) => lista.reduce((filas, item, i) => {
    if (i % 3 === 0) filas.push([item]);
    else filas[filas.length - 1].push(item);
    return filas;
}, []);

function ProductosAlmacen({ tecnicos, tecnicoSeleccionado, actualizarLista }) {

    const [producto, setProducto] = useState(null); // producto que se va a asignar

    const closeAsignarModal = () => {
        setProducto(null);
        actualizarLista();
    }

    // Producto que ya gestiona algún técnico
    const isIncluded = (mercancia) => tecnicos.some(tecnico => tecnico.producto === mercancia);
    // El técnico seleccionado gestiona este producto
    const esDelSeleccionado = (mercancia) => tecnicoSeleccionado?.producto === mercancia;
    // Ocupado por otro técnico: no se puede asignar
    const ocupado = (mercancia) => isIncluded(mercancia) && !esDelSeleccionado(mercancia);

    const seleccionarProducto = (mercancia) => {
        if (tecnicoSeleccionado && !isIncluded(mercancia)) {
            setProducto(mercancia);
        }
    }

    const filas = enFilas(Object.values(PRODUCTO).map((mercancia, index) => ({ mercancia, index })));

    return (
        <Container>
            {filas.map((fila, numFila) => (
                <Row key={numFila} className='row-productos'>
                    {fila.map(({ mercancia, index }) => (
                        <Col key={mercancia} xs={4}>
                            <div className={`box-ventas-col-4 ${CLASES_CASILLA[index]}-box-ventas-col-4`}
                                style={{
                                    opacity: ocupado(mercancia) ? 0.4 : 1,
                                    cursor: ocupado(mercancia) ? 'default' : 'var(--gtav-cursor), auto'
                                }}>
                                <div style={{ display: 'flex', position: 'relative' }}>
                                    <div onClick={() => seleccionarProducto(mercancia)} style={{ width: '90%' }} className='product-cell'>
                                        {mercancia}<br /><br />
                                    </div>
                                    <div className="producto-check-icon-content" hidden={!ocupado(mercancia)}>
                                        <FaRegCircleCheck />
                                    </div>
                                    <div className="producto-person-icon-content" hidden={!esDelSeleccionado(mercancia)}>
                                        <GiPerson />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
            <TecnicosModal isOpen={producto !== null} close={closeAsignarModal} tecnico={tecnicoSeleccionado} producto={producto} />
        </Container>
    )
}

export default ProductosAlmacen;
