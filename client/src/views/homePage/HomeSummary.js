import { Container, Row, Col} from 'react-bootstrap';

export default function HomeSummary({trabajosClub, gananciasClub, ventasAlmacen, gananciasAlmacen, gananciasTotales}) {

    return (<>
    <Container>
            <Row className='sumary-row'>
                <Col xs={9}>Trabajos del club nocturno completados
                </Col>
                <Col xs={3}> {trabajosClub}
                </Col>
            </Row>
            <Row className='sumary-row'>
                <Col xs={9}>Ganancias del club nocturno
                </Col>
                <Col xs={3}>
                ${ isNaN(gananciasClub) ? <></>
                    : new Intl.NumberFormat('de-DE', {
                        currency: 'EUR'
                    }).format(gananciasClub).replaceAll('.', ',') }
                </Col>
            </Row>
            <Row className='sumary-row'>
                <Col xs={9}>Ventas del almacén completadas
                </Col>
                <Col xs={3}> {ventasAlmacen}
                </Col>
            </Row>
            <Row className='sumary-row'>
                <Col xs={9}>Ganancias del almacén
                </Col>
                <Col xs={3}>
                    ${ isNaN(gananciasAlmacen) ? <></>
                    : new Intl.NumberFormat('de-DE', {
                        currency: 'EUR'
                    }).format(gananciasAlmacen).replaceAll('.', ',') }
                </Col>
            </Row>
        </Container>
        <hr />
        <h1 className='ganancias-totales-home'>
            Ganancias totales: 
            ${ isNaN(gananciasTotales) ? <></> 
            : new Intl.NumberFormat('de-DE', {
                currency: 'EUR'
            }).format(gananciasTotales).replaceAll('.', ',') }
        </h1>
        <hr />
    </>

    )
}