import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Productos from './Productos';
import Ventas from './Ventas';
import VenderTodosModal from './VenderTodosModal';
import useAuth from '../../auth/useAuth';
import { productosApi } from '../../api';
import useApiData from '../../hooks/useApiData';
import Skeleton from '../../components/skeleton/Skeleton';
import Valor from '../../components/skeleton/Valor';
import formatCurrency from '../../Utils/formatCurrency';
import { valorProducto } from '../../game/reglas';

function VentaProductosPage() {

    const { club, refreshClub } = useAuth();
    const { data: lista, loading, reload } = useApiData(productosApi.list, []);
    const [isOpenVentaTodosModal, setIsOpenVentaTodosModal] = useState(false);

    useEffect(() => {
        refreshClub();
    }, [refreshClub]);

    // Recarga los productos y los datos del club tras una venta
    const cargarDatos = useCallback(() => {
        refreshClub();
        reload();
    }, [refreshClub, reload]);

    const closeVentaTodosModal = () => {
        setIsOpenVentaTodosModal(false);
        cargarDatos();
    };

    const totalValue = lista.reduce((total, producto) => total + valorProducto(producto), 0);
    const hayProductos = totalValue !== 0;

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Productos lista={lista} club={club} actualizarLista={cargarDatos} cargando={loading} />
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
            {loading
                ? <Container>{[0, 1, 2].map(i => <Skeleton key={i} height="5.5rem" style={{ margin: '0.5rem 0' }} />)}</Container>
                : <Ventas lista={lista} club={club} actualizarLista={cargarDatos} />}
            <Container>
                <Row>
                    <button className={`btn-primary ${hayProductos ? 'venta-btn' : 'venta-btn-empty'}`}
                        onClick={hayProductos ? () => setIsOpenVentaTodosModal(true) : undefined}>
                        <div>
                            <Row style={{ width: '100%' }}>
                                <Col xs={6}>
                                    <div>Vender todos los productos</div>
                                </Col>
                                <Col xs={6} style={{ textAlign: 'end' }}>
                                    <div>
                                        <span className='venta-all-price'>
                                            <b><Valor cargando={loading} width="6rem">${formatCurrency(totalValue)}</Valor></b>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </button>
                </Row>
                <VenderTodosModal isOpen={isOpenVentaTodosModal} close={closeVentaTodosModal} productos={lista} club={club} total={totalValue} />
            </Container>
        </div>
    )
}

export default VentaProductosPage;
