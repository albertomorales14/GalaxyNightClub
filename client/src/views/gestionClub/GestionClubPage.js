import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from '../../components/layouts/FameBar'
import ClubSummary from './ClubSummary'
import IngresosChart from './IngresosChart'
import FameModal from './FameModal';
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';

function GestionClubPage({ fama }) {

    const { club, getClub } = useAuth();
    const [actualizarLista, setActualizarLista] = useState(false);

    // Modal
    const [isOpenFameModal, setIsOpenFameModal] = useState(false);
    const openFameModal = () => setIsOpenFameModal(true);
    const closeFameModal = () => {
        setIsOpenFameModal(false);
        setActualizarLista(true);
    };
    const [ingresos, setIngresos] = useState([]);

    useEffect(() => {

        getClub('GestionClubPage.js');
        setActualizarLista(false);

        fetch(`http://localhost:5050/api/Ingresos/Club/${club?._id}`)
            .then(response => response.json())
            .then(data => {
                setIngresos(data);
                logService.sendLog('info', '[GET Request] getIngresos: Lista de Ingresos (GestionClubPage.js)');
            })
            .catch(error => {
                logService.sendLog('error', 'Error [GET Request] getIngresos: Lista de Ingresos (GestionClubPage.js): ' + error);
            });

    }, [actualizarLista]) // dependencia variable de estado lista

    var visitasJugadores = club?.visitas;
    var publico = club?.publico;
    var ingresosDiariosActuales = club?.ingresos_hoy;
    var capacidadCajaFuerte = club?.caja_fuerte;
    var visitascelebridades = club?.celebridades;

    return (
        <div className="main-common-container promo-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <ClubSummary visitasJugadores={visitasJugadores} publico={publico} ingresosDiariosActuales={ingresosDiariosActuales} capacidadCajaFuerte={capacidadCajaFuerte} visitascelebridades={visitascelebridades} />

            <hr style={{ marginBottom: '0.5rem' }} />

            <div className='btn-promo-container'>
                <button className="btn-primary promo-club-btn" onClick={openFameModal}>
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