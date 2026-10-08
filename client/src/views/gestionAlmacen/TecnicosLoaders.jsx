import { Row, Col } from 'react-bootstrap';
import Skeleton from '../../components/skeleton/Skeleton';

const NUM_TECNICOS = 5;

// Skeleton de las fotos de los técnicos mientras se cargan
function TecnicosLoaders() {
    return (
        <Row className='tecnico-img-row' aria-busy="true">
            {Array.from({ length: NUM_TECNICOS }, (_, i) => (
                <Col key={i} className="tecnico-img-col">
                    <Skeleton height={null} style={{ aspectRatio: '1 / 1' }} />
                </Col>
            ))}
        </Row>
    )
}

export default TecnicosLoaders;
