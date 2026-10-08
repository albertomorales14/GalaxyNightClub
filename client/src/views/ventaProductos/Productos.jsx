import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VentaProductoModal from './VentaProductoModal';
import formatCurrency from '../../Utils/formatCurrency';
import PRODUCTO from '../../Utils/namesProductos';
import { valorProducto } from '../../game/reglas';

// Clase CSS de cada casilla según su posición en la cuadrícula de 2 columnas
const CLASES_CASILLA = [
    'first-left', 'first-right',
    'middle middle-left', 'middle middle-right',
    'middle middle-left', 'middle middle-right',
    'last'
];

const claseCasilla = (index) => {
    const [posicion, extra] = CLASES_CASILLA[index].split(' ');
    return `${posicion}-box-ventas-col-6${extra ? ' ' + extra : ''}`;
};

// Agrupa los elementos en filas de 2
const enFilas = (lista) => lista.reduce((filas, item, i) => {
    if (i % 2 === 0) filas.push([item]);
    else filas[filas.length - 1].push(item);
    return filas;
}, []);

function Productos({ lista, club, actualizarLista }) {

    const [producto, setProducto] = useState(null); // producto que se va a vender

    const closeVentaProductoModal = () => {
        setProducto(null);
        actualizarLista();
    };

    const filas = enFilas(Object.values(PRODUCTO).map((nombre, index) => ({ nombre, index })));

    return (
        <Container>
            {filas.map((fila, numFila) => (
                <Row key={numFila} className='row-productos'>
                    {fila.map(({ nombre, index }) => {
                        const item = lista[index];
                        const conExistencias = item?.existencias !== 0;
                        return (
                            <Col key={nombre} xs={6} onClick={() => conExistencias && item && setProducto(item)}>
                                <div className={`${conExistencias ? 'box-ventas-col-6' : 'box-ventas-col-6-no-products'} ${claseCasilla(index)}`}>
                                    <div style={{ flex: '1' }}>
                                        {nombre}<br />
                                        {conExistencias ? (
                                            <>
                                                Vender por:
                                                <span className='venta-all-price'>&nbsp;${formatCurrency(valorProducto(item))}</span>
                                            </>
                                        ) : <br />}
                                    </div>
                                    <div>
                                        {item?.existencias}/{item?.capacidadMax}
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            ))}
            <VentaProductoModal isOpen={producto !== null} close={closeVentaProductoModal} producto={producto} club={club} />
        </Container>
    )
}

export default Productos;
