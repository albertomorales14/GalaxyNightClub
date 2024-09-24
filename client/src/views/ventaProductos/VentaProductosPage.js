import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Productos from './Productos';
import Ventas from './Ventas';
import formatCurrency from '../../Utils/formatCurrency';
import VenderTodosModal from './VenderTodosModal';
import useAuth from '../../auth/useAuth';

export default function VentaProductosPage() {

    // Modal
    const [isOpenVentaTodosModal, setIsOpenVentaTodosModal] = useState(false);
    const openVentaTodosModal = () => setIsOpenVentaTodosModal(true);
    const closeVentaTodosModal = () => setIsOpenVentaTodosModal(false);

    const [lista, setLista] = useState([]);
    const { user } = useAuth();
    const [club, setClub] = useState([]);

    // Backend
    useEffect(() => {
        const getProductos = async () => {
            fetch('http://localhost:5050/api/Productos', {
                method: 'GET',
            })
                .then((response) => { return response.json() })
                .then((data) => {
                    // Handle the fetched data here
                    setLista(data)
                })
                .catch((error) => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getProductos(); //llamada
        fetch(`http://localhost:5050/api/Club/${user.club}`)
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setClub(data)
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
    }, [lista]) // dependencia variable de estado lista

    let totalValue = lista.reduce((a, b) => a + (b['existencias'] / b['capacidadMax'] * b['totalValue'] || 0), 0)

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Productos lista={lista} club={club}/>
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
            <Ventas lista={lista} club={club}/>
            <Container>
                <Row>
                    {Number(totalValue) !== 0 ? (
                        <>
                            <button className="btn-primary venta-btn" onClick={openVentaTodosModal}>
                                <div>
                                    <Row style={{ width: '100%' }}>
                                        <Col xs={6}>
                                            <div>
                                                Vender todos los productos
                                            </div>
                                        </Col>
                                        <Col xs={6} style={{ textAlign: 'end' }}>
                                            <div>
                                                <span className='venta-all-price'>
                                                    <b>
                                                        ${formatCurrency(totalValue)}
                                                    </b>
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
                                            <div>
                                                Vender todos los productos
                                            </div>
                                        </Col>
                                        <Col xs={6} style={{ textAlign: 'end' }}>
                                            <div>
                                                <span className='venta-all-price'>
                                                    <b>
                                                        ${formatCurrency(totalValue)}
                                                    </b>
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
        </div>)
}