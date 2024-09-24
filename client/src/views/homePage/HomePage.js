import { Container, Row, Col } from 'react-bootstrap'
import FameBar from '../../components/layouts/FameBar'
import HomeSummary from './HomeSummary'
import HomeChart from './HomeChart'
import { useEffect, useState } from 'react';
import formatCurrency from '../../Utils/formatCurrency';

export default function HomePage({ fama }) {

    const [lista, setLista] = useState([]);
    const [listaExistencias, setListaExistencias] = useState([]);

    // Backend
    useEffect(() => {
        const getClub = async () => {
            await fetch('http://localhost:5050/api/Club')
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data)
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getClub(); //llamada

        const getProductos = async () => {
            await fetch('http://localhost:5050/api/Productos', {
                method: 'GET',
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    // Handle the fetched data here
                    setListaExistencias(data)
                })
                .catch((error) => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getProductos(); //llamada
    }, [lista]) // dependencia variable de estado lista

    var trabajosClub = lista[0]?.trabajos;
    var gananciasClub = lista[0]?.ganancias_club;
    var ventasAlmacen = lista[0]?.ventas_almacen;
    var gananciasAlmacen = lista[0]?.ganancias_almacen;
    var gananciasTotales = gananciasClub + gananciasAlmacen;
    var existenciasTotales = listaExistencias.reduce((a, b) => a + (b['existencias'] || 0), 0);
    var existenciasMax = listaExistencias.reduce((a, b) => a + (b['existencias'] / b['capacidadMax'] * b['totalValue'] || 0), 0);

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <HomeSummary trabajosClub={trabajosClub} gananciasClub={gananciasClub} ventasAlmacen={ventasAlmacen}
                gananciasAlmacen={gananciasAlmacen} gananciasTotales={gananciasTotales} />
            <Container>
                <Row>
                    <Col xs={9} className='home-chart-col'>
                        <HomeChart />
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