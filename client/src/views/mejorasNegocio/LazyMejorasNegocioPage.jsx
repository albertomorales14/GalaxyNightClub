import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegCircleCheck } from "react-icons/fa6";  // Check Icon
import MejorasModal from './MejorasModal';
import formatCurrency from '../../Utils/formatCurrency';
import { mejorasApi } from '../../api';
import useApiData from '../../hooks/useApiData';

function LazyMejorasNegocioPage() {

    const { data: lista, reload } = useApiData(mejorasApi.list, []);
    const [mejora, setMejora] = useState(null); // mejora seleccionada en la modal

    const closeMejorasModal = () => {
        setMejora(null);
        reload();
    }

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Container className='mejoras-grid-container' fluid>
                {lista.map(item => (
                    <Row key={item._id} onClick={() => setMejora(item)}>
                        <Col xs={3} className='col-3-mejoras'>
                            <div className="mejoras-img-box-content">
                                <img className="mejoras-img" style={{ width: '100%' }} src={item.imagen} alt={item.name} />
                                <div className="mejoras-icon-content" hidden={!item.comprada}>
                                    <FaRegCircleCheck />
                                </div>
                            </div>
                        </Col>
                        <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                            <Row>
                                <p className='title-mejoras'><b>{item.name}</b></p>
                            </Row>
                            <Row style={{ height: 'var(--full-height)' }}>
                                <p className='txt-mejoras'>{item.descripcion}</p>
                            </Row>
                            <Row>
                                <p className='title-mejoras'>
                                    {item.comprada ? 'COMPRADA' : '$' + formatCurrency(item.precio)}
                                </p>
                            </Row>
                        </Col>
                    </Row>
                ))}
            </Container>
            <MejorasModal isOpen={mejora !== null} close={closeMejorasModal} mejora={mejora} />
        </div>
    )
}

export default LazyMejorasNegocioPage;
