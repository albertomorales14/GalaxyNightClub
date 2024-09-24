import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaRegCircleCheck } from "react-icons/fa6";  // Check Icon
import MejorasModal from './MejorasModal';
import formatCurrency from '../../Utils/formatCurrency';

export default function MejorasNegocioPage() {

    const [lista, setLista] = useState([]);

    // Modal
    const [isOpenMejorasModal, setIsOpenMejorasModal] = useState(false);
    const openMejorasModal = () => setIsOpenMejorasModal(true);
    const closeMejorasModal = () => setIsOpenMejorasModal(false);
    const [mejora, setMejora] = useState(null);

    // Backend
    useEffect(() => {
        const getMejoras = async () => {
            fetch('http://localhost:5050/api/Mejoras')
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data)
                    console.log('[Lista de Mejoras] GET llamada a API...')
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getMejoras(); //llamada
    }, [lista]) // dependencia variable de estado lista

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Container className='mejoras-grid-container' fluid>
                {
                    lista.map((list) => (
                        <Row key={list.id} onClick={() => { openMejorasModal(); setMejora(list); }}>
                            <Col xs={3} className='col-3-mejoras'>
                                <div className="mejoras-img-box-content">
                                    <img className="mejoras-img" style={{ width: '100%' }} src={list.imagen} alt={list.name} />
                                    <div className="mejoras-icon-content" hidden={!list.comprada}>
                                        <FaRegCircleCheck />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={9} className='mejoras-col-9' style={{ display: 'flex', flexDirection: 'column' }}>
                                <Row>
                                    <p className='title-mejoras'><b>{list.name}</b></p>
                                </Row>
                                <Row style={{ height: 'var(--full-height)' }}>
                                    <p className='txt-mejoras'>
                                        {list.descripcion}
                                    </p>
                                </Row>
                                <Row>
                                    <p className='title-mejoras'>
                                        {list.comprada ? ('COMPRADA')
                                            : '$' + formatCurrency(list.precio)}
                                    </p>
                                </Row>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
            <MejorasModal isOpen={isOpenMejorasModal} close={closeMejorasModal} mejora={mejora} />
        </div>
    )
}