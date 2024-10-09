import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Productos from './Productos';
import Ventas from './Ventas';
import VenderTodosModal from './VenderTodosModal';
import useAuth from '../../auth/useAuth';
import formatCurrency from '../../Utils/formatCurrency';
import logService from '../../Utils/logService';

function VentaProductosPage() {

    // Modal
    const [isOpenVentaTodosModal, setIsOpenVentaTodosModal] = useState(false);
    const openVentaTodosModal = () => setIsOpenVentaTodosModal(true);
    const closeVentaTodosModal = () => {
        setIsOpenVentaTodosModal(false);
        setActualizarLista(true);
    };

    const [lista, setLista] = useState([]);
    const [actualizarLista, setActualizarLista] = useState(false);
    const reloadLista = () => setActualizarLista(true);
    const { user } = useAuth();
    const [club, setClub] = useState([]);

    useEffect(() => {
        // Obtener todos los productos
        const getProductos = async () => {
            fetch('http://localhost:5050/api/Productos', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data);
                    setActualizarLista(false);
                    console.log('[Lista de Productos] GET llamada a API...');
                    logService.sendLog('info', '[GET] Llamada a la API: Lista de Productos \t(VentaProductosPage.js)');
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error);
                    logService.sendLog('error', '[GET] Llamada a la API (Productos) \t(VentaProductosPage.js): ' + error);
                });
        }
        getProductos(); // llamada lista de productos
        // Datos del club
        fetch(`http://localhost:5050/api/Club/${user.club}`)
            .then(response => response.json())
            .then(data => {
                // Handle the fetched data here
                setClub(data);
                console.log('[Lista de Club] GET llamada a API...');
                logService.sendLog('info', '[GET] Llamada a la API: Lista de Club \t(VentaProductosPage.js)');
            })
            .catch(error => {
                // Handle any errors
                console.log('A problem occurred with your fetch operation: ', error);
                logService.sendLog('error', '[GET] Llamada a la API (Club) \t(VentaProductosPage.js): ' + error);
            });
    }, [actualizarLista]) // dependencia variable de estado lista

    let totalValue = lista.reduce((a, b) => a + (b['existencias'] / b['capacidadMax'] * b['totalValue'] || 0), 0)

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Productos lista={lista} club={club} actualizarLista={reloadLista} />
            <Container>
                <Row>
                    <div className="ventas-title">
                        <h1 style={{
                            fontSize: 'var(--bs-nav-link-font-size)',
                            fontWeight: 'var(--bs-nav-link-font-weight)',
                            margin: '1% 0'
                        }}>
                            Venta de productos
                        </h1>
                    </div>
                </Row>
            </Container>
            <Ventas lista={lista} club={club} actualizarLista={reloadLista} />
            <Container>
                <Row>
                    {Number(totalValue) !== 0 ? (
                        <>
                            <button className="btn-primary venta-btn" onClick={() => { openVentaTodosModal(); setActualizarLista(false) }}>
                                <div>
                                    <Row style={{ width: '100%' }}>
                                        <Col xs={6}>
                                            <div>Vender todos los productos</div>
                                        </Col>
                                        <Col xs={6} style={{ textAlign: 'end' }}>
                                            <div>
                                                <span className='venta-all-price'>
                                                    <b>${formatCurrency(totalValue)}</b>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </button>
                        </>) : (
                        <>
                            <button className="btn-primary venta-btn-empty">
                                <div>
                                    <Row style={{ width: '100%' }}>
                                        <Col xs={6}>
                                            <div>Vender todos los productos</div>
                                        </Col>
                                        <Col xs={6} style={{ textAlign: 'end' }}>
                                            <div>
                                                <span className='venta-all-price'>
                                                    <b>${formatCurrency(totalValue)}</b>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </button>
                        </>
                    )}
                </Row>
                <VenderTodosModal isOpen={isOpenVentaTodosModal} close={closeVentaTodosModal} productos={lista} club={club} total={totalValue} />
            </Container>
        </div>
    )
}

export default VentaProductosPage;