import { Container, Row, Col } from 'react-bootstrap';
import Valor from '../../components/skeleton/Valor';
import formatCurrency from '../../Utils/formatCurrency';
import { CAJA_FUERTE_MAX } from '../../game/reglas';

function ClubSummary({ cargando, visitasJugadores, publico, ingresosDiariosActuales, capacidadCajaFuerte, visitascelebridades }) {
    return (
        <Container>
            <Row className='club-sumary-row'>
                <Col xs={9}>Visitas de clientes</Col>
                <Col xs={3}><Valor cargando={cargando} width="2rem">{visitasJugadores}</Valor></Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Público actual</Col>
                <Col xs={3}><Valor cargando={cargando}>{publico}</Valor></Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Ingresos diarios actuales</Col>
                <Col xs={3}><Valor cargando={cargando}>${formatCurrency(ingresosDiariosActuales)}</Valor></Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Capacidad de la caja fuerte</Col>
                <Col xs={3}>
                    <Valor cargando={cargando} width="7rem">
                        ${formatCurrency(capacidadCajaFuerte)} / ${formatCurrency(CAJA_FUERTE_MAX)}
                    </Valor>
                </Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Apariciones de celebridades</Col>
                <Col xs={3}><Valor cargando={cargando} width="2rem">{visitascelebridades}</Valor></Col>
            </Row>
        </Container>
    )
}

export default ClubSummary;
