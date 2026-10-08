import { Row, Col } from 'react-bootstrap';
import { ring } from 'ldrs';

ring.register('tecnic-img-ldr');

const NUM_TECNICOS = 5;

function TecnicosLoaders() {
    return (
        <Row className='tecnico-img-row'>
            {Array.from({ length: NUM_TECNICOS }, (_, i) => (
                <Col key={i} className="tecnico-img-col">
                    <div style={{ textAlign: 'center', padding: '20%' }} className="tecnico-img-box-content">
                        <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default TecnicosLoaders;
