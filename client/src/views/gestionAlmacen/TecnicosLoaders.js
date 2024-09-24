import { Row, Col } from 'react-bootstrap';
import { ring } from 'ldrs';

export default function TecnicosLoaders() {

    ring.register('tecnic-img-ldr')

    return (
        <Row className='tecnico-img-row'>
            <Col className="tecnico-img-col">
                <div style={{ textAlign: 'center', padding: '20%' }} class="tecnico-img-box-content">
                    <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                </div>
            </Col>
            <Col className="tecnico-img-col">
                <div style={{ textAlign: 'center', padding: '20%' }} class="tecnico-img-box-content">
                    <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                </div>
            </Col>
            <Col className="tecnico-img-col">
                <div style={{ textAlign: 'center', padding: '20%' }} class="tecnico-img-box-content">
                    <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                </div>
            </Col>
            <Col className="tecnico-img-col">
                <div style={{ textAlign: 'center', padding: '20%' }} class="tecnico-img-box-content">
                    <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                </div>
            </Col>
            <Col className="tecnico-img-col">
                <div style={{ textAlign: 'center', padding: '20%' }} class="tecnico-img-box-content">
                    <tecnic-img-ldr color="var(--purple-dark)" size='50'></tecnic-img-ldr>
                </div>
            </Col>
        </Row>
    )
}
