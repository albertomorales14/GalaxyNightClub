import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import routes from '../Utils/routes';

function NotFoundPage() {
    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Container>
                <Row>
                    <div className="fameBar-Container">
                        <h1 style={{
                            fontSize: 'var(--bs-nav-link-font-size)',
                            fontWeight: 'var(--bs-nav-link-font-weight)'
                        }}>
                            404: No existe la URL
                        </h1>
                    </div>
                </Row>
                <Row className='mt-5'>
                    <Col md={{ span: 6, offset: 3 }} className='text-center'>
                        <h2>ERROR 404</h2>
                        <h3>Parece que te has perdido...</h3>
                        <Button as={NavLink} to={routes.home}>
                            Volver al inicio
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NotFoundPage;