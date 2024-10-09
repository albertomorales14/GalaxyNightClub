import { Container, Row, Col } from 'react-bootstrap';

export default function AlmacenSummary({ tecnicos, club }) {

    return (<>
        <Container>
            <Row className='store-row'>
                <Col xs={9}>Técnicos asignados
                </Col>
                <Col xs={3}>{tecnicos.filter(t => t?.estado === 'ASIGNADO').length}/5
                </Col>
            </Row>
            <Row className='store-row'>
                <Col xs={9}>Productos disponibles
                </Col>
                <Col xs={3}>7/7
                </Col>
            </Row>
            <Row className='store-row'>
                <Col xs={9}>Productos acumulados
                </Col>
                <Col xs={3}> ????
                </Col>
            </Row>
            <Row className='store-row'>
                <Col xs={9}>Productos vendidos
                </Col>
                <Col xs={3}>{club?.productos_vendidos}
                </Col>
            </Row>
        </Container>
    </>

    )
}