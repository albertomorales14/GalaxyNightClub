import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';
import DESC from '../../Utils/mejorasDescription';

const MEJORAS = [
    { name: 'Equipo', descripcion: DESC.EQUIPO },
    { name: 'Personal', descripcion: DESC.PERSONAL },
    { name: 'Seguridad', descripcion: DESC.SEGURIDAD }
];

// Vista de las mejoras mientras se cargan: los textos son fijos, imagen y precio en skeleton
function SuspenseMejorasPage() {
    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }} aria-busy="true">
            <Container className='mejoras-grid-container' fluid>
                {MEJORAS.map(({ name, descripcion }) => (
                    <Row key={name}>
                        <Col xs={3} className='col-3-mejoras'>
                            <Skeleton height={null} style={{ aspectRatio: '1 / 1' }} />
                        </Col>
                        <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                            <Row><p className='title-mejoras'><b>{name}</b></p></Row>
                            <Row style={{ height: 'var(--full-height)' }}>
                                <p className='txt-mejoras'>{descripcion}</p>
                            </Row>
                            <Row><p className='title-mejoras'><Skeleton width="8rem" height="1em" className="skeleton-inline" /></p></Row>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    )
}

export default SuspenseMejorasPage;
