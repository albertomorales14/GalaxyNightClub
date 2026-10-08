import { Container, Row, Col } from 'react-bootstrap';

function HomeSummary(props) {
    return (
        <>
            <Container>
                <Row className='sumary-row'>
                    <Col xs={9}>Trabajos del club nocturno completados</Col>
                    <Col xs={3}> {props.trabajosClub}</Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ganancias del club nocturno</Col>
                    <Col xs={3}>
                        ${isNaN(props.gananciasClub) ? <></>
                            : new Intl.NumberFormat('de-DE', {
                                currency: 'EUR'
                            }).format(props.gananciasClub).replaceAll('.', ',')}
                    </Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ventas del almacén completadas</Col>
                    <Col xs={3}> {props.ventasAlmacen}</Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ganancias del almacén</Col>
                    <Col xs={3}>
                        ${isNaN(props.gananciasAlmacen) ? <></>
                            : new Intl.NumberFormat('de-DE', {
                                currency: 'EUR'
                            }).format(props.gananciasAlmacen).replaceAll('.', ',')}
                    </Col>
                </Row>
            </Container>
            <hr />
            <h1 className='ganancias-totales-home'>
                Ganancias totales:
                ${isNaN(props.gananciasTotales) ? <></>
                    : new Intl.NumberFormat('de-DE', {
                        currency: 'EUR'
                    }).format(props.gananciasTotales).replaceAll('.', ',')}
            </h1>
            <hr />
        </>
    )
}

export default HomeSummary;