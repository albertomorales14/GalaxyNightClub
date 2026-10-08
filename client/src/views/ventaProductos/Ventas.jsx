import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ventas from '../../Utils/ventas';
import VenderColeccionModal from './VenderColeccionModal';
import formatCurrency from '../../Utils/formatCurrency';
import {
    capacidadColeccion, coleccionCompleta, existenciasColeccion, generarColecciones, precioColeccion
} from '../../game/colecciones';

function Ventas({ lista, club, actualizarLista }) {

    // Las colecciones se generan una sola vez al montar el componente
    const [colecciones] = useState(() => generarColecciones());
    const [seleccion, setSeleccion] = useState(null); // { grupo, coleccion }

    const closeVentaCollectionModal = () => {
        setSeleccion(null);
        actualizarLista();
    };

    return (
        <Container>
            <Row className='row-ventas'>
                {colecciones.map((grupo, index) => {
                    const completa = coleccionCompleta(lista, grupo);
                    return (
                        <div key={ventas[index]}>
                            <Col xs={12} onClick={() => completa && setSeleccion({ grupo, coleccion: ventas[index] })}>
                                <div className={completa ? 'box-ventas-col-12' : 'box-ventas-col-12-no-collection'} style={{ margin: '0.25% 0 0.25% 0' }}>
                                    <div className="venta-personalizada-flex">
                                        {ventas[index]}
                                        <br />
                                        {completa && (
                                            <div>Vender por:
                                                <span className='venta-all-price'>
                                                    &nbsp;${formatCurrency(precioColeccion(lista, grupo))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='list-products'>
                                        {grupo.map(numero => (
                                            <div key={numero} style={{ display: 'flex' }}>
                                                <div style={{ flex: '2' }}>
                                                    {lista[numero]?.name}
                                                </div>
                                                <div style={{ flex: '1', textAlign: 'right' }}>
                                                    <span>
                                                        {existenciasColeccion(lista, numero)}/{capacidadColeccion(lista, numero)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Col>
                        </div>
                    );
                })}
            </Row>
            <VenderColeccionModal
                isOpen={seleccion !== null}
                close={closeVentaCollectionModal}
                grupo={seleccion?.grupo}
                coleccion={seleccion?.coleccion}
                productos={lista}
                club={club}
            />
        </Container>
    )
}

export default Ventas;
