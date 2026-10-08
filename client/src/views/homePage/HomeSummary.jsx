import { Container, Row, Col } from 'react-bootstrap';
import Valor from '../../components/skeleton/Valor';
import formatCurrency from '../../Utils/formatCurrency';

function HomeSummary({ cargando, trabajosClub, gananciasClub, ventasAlmacen, gananciasAlmacen, gananciasTotales }) {
    return (
        <>
            <Container>
                <Row className='sumary-row'>
                    <Col xs={9}>Trabajos del club nocturno completados</Col>
                    <Col xs={3}><Valor cargando={cargando} width="2rem">{trabajosClub}</Valor></Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ganancias del club nocturno</Col>
                    <Col xs={3}><Valor cargando={cargando}>${formatCurrency(gananciasClub)}</Valor></Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ventas del almacén completadas</Col>
                    <Col xs={3}><Valor cargando={cargando} width="2rem">{ventasAlmacen}</Valor></Col>
                </Row>
                <Row className='sumary-row'>
                    <Col xs={9}>Ganancias del almacén</Col>
                    <Col xs={3}><Valor cargando={cargando}>${formatCurrency(gananciasAlmacen)}</Valor></Col>
                </Row>
            </Container>
            <hr />
            <h1 className='ganancias-totales-home'>
                Ganancias totales: <Valor cargando={cargando} width="8rem">${formatCurrency(gananciasTotales)}</Valor>
            </h1>
            <hr />
        </>
    )
}

export default HomeSummary;
