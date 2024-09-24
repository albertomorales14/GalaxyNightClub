import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import FameBar from '../../components/layouts/FameBar'
import ClubSummary from './ClubSummary'
import IngresosChart from './IngresosChart'
import FameModal from './FameModal';
import useAuth from '../../auth/useAuth';

export default function GestionClubPage({fama}) {

    const { user } = useAuth();

    // Modal
    const [isOpenFameModal, setIsOpenFameModal] = useState(false);
    const openFameModal = () => setIsOpenFameModal(true);
    const closeFameModal = () => setIsOpenFameModal(false);

    const [club, setClub] = useState([]);
    const [ingresos, setIngresos] = useState([]);

    // Backend
    useEffect(() => {
        const getClub = async () => {
            await fetch(`http://localhost:5050/api/Club/${user.club}`)
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setClub(data)
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getClub(); //llamada
        fetch('http://localhost:5050/api/Ingresos', {
            method: 'GET',
        }).then((response) => { return response.json() })
        .then(data => setIngresos(data))
    }, [club]) // dependencia variable de estado lista

    var visitasJugadores = club?.visitas;
    var publico = club?.publico;
    var ingresosDiariosActuales = club?.ingresos_hoy;
    var capacidadCajaFuerte = club?.caja_fuerte;
    var visitascelebridades = club?.celebridades;

    return (
        <div className="main-common-container promo-container" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama}/>
            <ClubSummary visitasJugadores={visitasJugadores} publico={publico} ingresosDiariosActuales={ingresosDiariosActuales} 
            capacidadCajaFuerte={capacidadCajaFuerte} visitascelebridades={visitascelebridades}/>
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
            <IngresosChart />
            <FameModal isOpen={isOpenFameModal} close={closeFameModal} club={club} />
        </div>
    );
};