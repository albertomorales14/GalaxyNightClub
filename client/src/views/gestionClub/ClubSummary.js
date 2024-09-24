import { Container, Row, Col } from 'react-bootstrap';

export default function ClubSummary({visitasJugadores, publico, ingresosDiariosActuales, capacidadCajaFuerte, visitascelebridades}) {

    return (<>
    <Container>
            <Row className='club-sumary-row'>
                <Col xs={9}>Visitas de clientes
                </Col>
                <Col xs={3}> {visitasJugadores}
                </Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Público actual
                </Col>
                <Col xs={3}>{publico}
                </Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Ingresos diarios actuales
                </Col>
                <Col xs={3}>
                    ${ new Intl.NumberFormat('de-DE', {
                        currency: 'EUR'
                        }).format(ingresosDiariosActuales)
                        .replaceAll('.', ',')
                    }
                </Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Capacidad de la caja fuerte
                </Col>
                <Col xs={3}>
                ${ new Intl.NumberFormat('de-DE', {
                        currency: 'EUR'
                        }).format(capacidadCajaFuerte)
                        .replaceAll('.', ',')
                    } / $250,000
                </Col>
            </Row>
            <Row className='club-sumary-row'>
                <Col xs={9}>Apariciones de celebridades
                </Col>
                <Col xs={3}> {visitascelebridades}
                </Col>
            </Row>
        </Container>
    </>

    )
}