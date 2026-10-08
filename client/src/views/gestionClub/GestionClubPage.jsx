import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from '../../components/layouts/FameBar'
import ClubSummary from './ClubSummary'
import IngresosChart from './IngresosChart'
import FameModal from './FameModal';
import useAuth from '../../auth/useAuth';
import { ingresosApi } from '../../api';
import useApiData from '../../hooks/useApiData';

function GestionClubPage({ fama }) {

    const { club, refreshClub } = useAuth();
    const { data: ingresos, reload } = useApiData(ingresosApi.list, []);
    const [isOpenFameModal, setIsOpenFameModal] = useState(false);

    useEffect(() => {
        refreshClub();
    }, [refreshClub]);

    const closeFameModal = () => {
        setIsOpenFameModal(false);
        refreshClub();
        reload();
    };

    return (
        <div className="main-common-container promo-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <ClubSummary
                visitasJugadores={club?.visitas}
                publico={club?.publico}
                ingresosDiariosActuales={club?.ingresos_hoy}
                capacidadCajaFuerte={club?.caja_fuerte}
                visitascelebridades={club?.celebridades} />

            <hr style={{ marginBottom: '0.5rem' }} />

            <div className='btn-promo-container'>
                <button className="btn-primary promo-club-btn" onClick={() => setIsOpenFameModal(true)}>
                    Promociona el club
                </button>
            </div>

            <hr style={{ marginTop: '0.5rem' }} />

            <Container>
                <Row className='club-sumary-row'>
                    <Col xs={12} style={{ paddingBottom: '2%' }}>Ingresos diarios</Col>
                </Row>
            </Container>
            <IngresosChart lista={ingresos} />
            <FameModal isOpen={isOpenFameModal} close={closeFameModal} club={club} />
        </div>
    );
}

export default GestionClubPage;
