import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from '../../components/layouts/FameBar';
import HomeSummary from './HomeSummary';
import HomeChart from './HomeChart';
import useAuth from '../../auth/useAuth';
import formatCurrency from '../../Utils/formatCurrency';
import logService from '../../Utils/logService';

function HomePage({ fama }) {

    const { user, club, getClub } = useAuth();
    const [listaExistencias, setListaExistencias] = useState([]);

    // Backend
    useEffect(() => {

        getClub('HomePage.js'); //llamada a los datos del club

        const getProductos = async () => {
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Productos/Club/${user?.club}`)
                .then(response => response.json())
                .then(data => {
                    setListaExistencias(data);
                    logService.sendLog('info', '[GET Request] getProductos: Lista de Productos (HomePage.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error [GET Request] getProductos: Lista de Productos (HomePage.js): ' + error);
                });
        }
        getProductos();

    }, []) // [] solo se recarga cada vez que accede a la vista en pantalla

    var trabajosClub = club?.trabajos;
    var gananciasClub = club?.ganancias_club;
    var ventasAlmacen = club?.ventas_almacen;
    var gananciasAlmacen = club?.ganancias_almacen;
    var gananciasTotales = gananciasClub + gananciasAlmacen;
    var existenciasTotales = listaExistencias?.reduce((a, b) => a + (b['existencias'] || 0), 0);
    var existenciasMax = listaExistencias?.reduce((a, b) => a + (b['existencias'] / b['capacidadMax'] * b['totalValue'] || 0), 0);

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <HomeSummary trabajosClub={trabajosClub} gananciasClub={gananciasClub} ventasAlmacen={ventasAlmacen} gananciasAlmacen={gananciasAlmacen} gananciasTotales={gananciasTotales} />
            <Container>
                <Row>
                    <Col xs={9} className='home-chart-col'>
                        <HomeChart lista={listaExistencias} />
                    </Col>
                    <Col xs={3} style={{ textAlign: 'center' }}>
                        <div className="home-row-chart">
                            Existencias totales
                            <h1 className='ganancias-totales-home' style={{ marginBottom: '0' }}>{existenciasTotales}/360</h1>
                            <h3 style={{ color: '#461E5C' }}>${formatCurrency(existenciasMax)}</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage;