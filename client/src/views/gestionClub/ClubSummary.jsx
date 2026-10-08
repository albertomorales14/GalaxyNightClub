import { Container, Row, Col } from 'react-bootstrap';

function ClubSummary(props) {
    return (
        <>
            <Container>
                <Row className='club-sumary-row'>
                    <Col xs={9}>Visitas de clientes</Col>
                    <Col xs={3}> {props.visitasJugadores}</Col>
                </Row>
                <Row className='club-sumary-row'>
                    <Col xs={9}>Público actual</Col>
                    <Col xs={3}>{props.publico}</Col>
                </Row>
                <Row className='club-sumary-row'>
                    <Col xs={9}>Ingresos diarios actuales</Col>
                    <Col xs={3}>
                        ${new Intl.NumberFormat('de-DE', {
                            currency: 'EUR'
                        }).format(props.ingresosDiariosActuales).replaceAll('.', ',')}
                    </Col>
                </Row>
                <Row className='club-sumary-row'>
                    <Col xs={9}>Capacidad de la caja fuerte</Col>
                    <Col xs={3}>
                        ${new Intl.NumberFormat('de-DE', {
                            currency: 'EUR'
                        }).format(props.capacidadCajaFuerte).replaceAll('.', ',')} / $250,000
                    </Col>
                </Row>
                <Row className='club-sumary-row'>
                    <Col xs={9}>Apariciones de celebridades</Col>
                    <Col xs={3}> {props.visitascelebridades}</Col>
                </Row>
            </Container>
        </>
    )
}

export default ClubSummary;