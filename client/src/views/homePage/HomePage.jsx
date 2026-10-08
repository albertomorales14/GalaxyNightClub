import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from '../../components/layouts/FameBar';
import HomeSummary from './HomeSummary';
import HomeChart from './HomeChart';
import useAuth from '../../auth/useAuth';
import { productosApi } from '../../api';
import useApiData from '../../hooks/useApiData';
import formatCurrency from '../../Utils/formatCurrency';
import { valorProducto } from '../../game/reglas';

function HomePage({ fama }) {

    const { club, refreshClub } = useAuth();
    const { data: listaExistencias } = useApiData(productosApi.list, []);

    useEffect(() => {
        refreshClub();
    }, [refreshClub]);

    const gananciasTotales = (club?.ganancias_club ?? 0) + (club?.ganancias_almacen ?? 0);
    const existenciasTotales = listaExistencias.reduce((total, producto) => total + (producto.existencias || 0), 0);
    const capacidadTotal = listaExistencias.reduce((total, producto) => total + (producto.capacidadMax || 0), 0);
    const valorExistencias = listaExistencias.reduce((total, producto) => total + valorProducto(producto), 0);

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <HomeSummary
                trabajosClub={club?.trabajos}
                gananciasClub={club?.ganancias_club}
                ventasAlmacen={club?.ventas_almacen}
                gananciasAlmacen={club?.ganancias_almacen}
                gananciasTotales={gananciasTotales} />
            <Container>
                <Row>
                    <Col xs={9} className='home-chart-col'>
                        <HomeChart lista={listaExistencias} />
                    </Col>
                    <Col xs={3} style={{ textAlign: 'center' }}>
                        <div className="home-row-chart">
                            Existencias totales
                            <h1 className='ganancias-totales-home' style={{ marginBottom: '0' }}>{existenciasTotales}/{capacidadTotal}</h1>
                            <h3 style={{ color: '#461E5C' }}>${formatCurrency(valorExistencias)}</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;
