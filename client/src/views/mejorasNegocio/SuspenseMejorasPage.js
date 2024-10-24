import { Container, Row, Col } from 'react-bootstrap';
import { ring } from 'ldrs'; // loader
import DESC from '../../Utils/mejorasDescription';

function SuspenseMejorasPage() {

    ring.register('mejoras-suspense-ldr');
    
    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Container className='mejoras-grid-container' fluid>
                <Row>
                    <Col xs={3} className='col-3-mejoras'>
                        <div className="mejoras-img-box-content" style={{ textAlign: 'center', top: '20%', padding: '5%' }}>
                            <mejoras-suspense-ldr color="var(--purple-dark)" size='75' stroke='10'></mejoras-suspense-ldr>
                        </div>
                    </Col>
                    <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row><p className='title-mejoras'><b>Equipo</b></p></Row>
                        <Row style={{ height: 'var(--full-height)' }}>
                            <p className='txt-mejoras'>{DESC.EQUIPO}</p>
                        </Row>
                        <Row><p className='title-mejoras'>CARGANDO...</p></Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} className='col-3-mejoras'>
                        <div className="mejoras-img-box-content" style={{ textAlign: 'center', top: '20%', padding: '5%' }}>
                            <mejoras-suspense-ldr color="var(--purple-dark)" size='75' stroke='10'></mejoras-suspense-ldr>
                        </div>
                    </Col>
                    <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row><p className='title-mejoras'><b>Personal</b></p></Row>
                        <Row style={{ height: 'var(--full-height)' }}>
                            <p className='txt-mejoras'>{DESC.PERSONAL}</p>
                        </Row>
                        <Row><p className='title-mejoras'>CARGANDO...</p></Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} className='col-3-mejoras'>
                        <div className="mejoras-img-box-content" style={{ textAlign: 'center', top: '20%', padding: '5%' }}>
                            <mejoras-suspense-ldr color="var(--purple-dark)" size='75' stroke='10'></mejoras-suspense-ldr>
                        </div>
                    </Col>
                    <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                        <Row><p className='title-mejoras'><b>Seguridad</b></p></Row>
                        <Row style={{ height: 'var(--full-height)' }}>
                            <p className='txt-mejoras'>{DESC.SEGURIDAD}</p>
                        </Row>
                        <Row><p className='title-mejoras'>CARGANDO...</p></Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SuspenseMejorasPage;