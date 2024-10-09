import { Container, Row, Col } from 'react-bootstrap';
import { FaRegCircleCheck } from "react-icons/fa6"; // Check
import { RiLock2Fill } from "react-icons/ri"; // Lock
import { GiPerson } from "react-icons/gi"; // Person
import { useEffect, useState } from 'react';
import TecnicosModal from './TecnicosModal';

export default function ProductosAlmacen({ tecnicos, focus }) {

    // Modal
    const [isOpenAsignarModal, setIsOpenAsignarModal] = useState(false);
    const openAsignarModal = (mercancia) => {
        if (!(isIncluded(mercancia) && ((tecnicos[focus.at(-1) - 1]?.producto !== mercancia) || (tecnicos[focus.at(-1) - 1]?.producto === '')))) {
            // puede abrir la modal
            if (tecnicos[focus.at(-1) - 1]?.producto !== mercancia) {
                setIsOpenAsignarModal(true)
            } else {
                setIsOpenAsignarModal(false)
            }
        } else {
            // No puede abrir la modal

        }


    };
    const closeAsignarModal = () => setIsOpenAsignarModal(false);

    const [tecnico, setTecnico] = useState(null);
    const [producto, setProducto] = useState(null);

    const isIncluded = (mercancia) => {
        return tecnicos.some(item => item.producto.includes(mercancia))
    }

    const getStyleBox = (mercancia) => {
        return isIncluded(mercancia) && ((tecnicos[focus.at(-1) - 1]?.producto !== mercancia) || (tecnicos[focus.at(-1) - 1]?.producto === '')) ? 0.4 : 1
    }

    const getCursor = (mercancia) => {
        return isIncluded(mercancia) && ((tecnicos[focus.at(-1) - 1]?.producto !== mercancia) || (tecnicos[focus.at(-1) - 1]?.producto === '')) ? 'default' : 'var(--gtav-cursor), auto'
    }

    const hasPersonIcon = (mercancia) => {
        return (tecnicos[focus.at(-1) - 1]?.producto !== mercancia) || (tecnicos[focus.at(-1) - 1]?.producto === '')
    }

    return (
        <Container>
            <Row className='row-productos'>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row1-first-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox('Mercancía y cargamentos')}`, cursor: `${getCursor('Mercancía y cargamentos')}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal('Mercancía y cargamentos');
                                setProducto('Mercancía y cargamentos');
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }}
                                style={{ width: '90%' }} className='product-cell'>
                                Mercancía y cargamentos<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded('Mercancía y cargamentos') || !hasPersonIcon('Mercancía y cargamentos')}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon('Mercancía y cargamentos')}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row1-middle-box-ventas-col-4'
                        style={{ opacity: `${isIncluded('Equipo de caza') && ((tecnicos[focus.at(-1) - 1]?.producto !== 'Equipo de caza') || (tecnicos[focus.at(-1) - 1]?.producto === '')) ? 0.4 : 1}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div style={{ width: '90%' }} className='product-cell'>
                                Equipo de caza<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded('Equipo de caza')}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row1-last-box-ventas-col-4'
                        style={{ opacity: `${isIncluded('Importaciones sudamericanas') && ((tecnicos[focus.at(-1) - 1]?.producto !== 'Importaciones sudamericanas') || (tecnicos[focus.at(-1) - 1]?.producto === '')) ? 0.4 : 1}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal('Importaciones sudamericanas');
                                setProducto('Importaciones sudamericanas');
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                Importaciones sudamericanas<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded('Importaciones sudamericanas')}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-first-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox('Investigaciones farmacéuticas')}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal('Investigaciones farmacéuticas');
                                setProducto('Investigaciones farmacéuticas');
                                setTecnico(tecnicos[focus.at(-1) - 1])
                            }} style={{ width: '90%' }} className='product-cell'>
                                Investigaciones farmacéuticas<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded("Investigaciones farmacéuticas")) || !hasPersonIcon('Investigaciones farmacéuticas')}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon('Investigaciones farmacéuticas')}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-middle-box-ventas-col-4'>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div style={{ width: '90%' }} className='product-cell'>
                                Productos orgánicos<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded("Productos orgánicos"))}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-last-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox('Fotocopias e impresiones')}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div style={{ width: '90%' }} className='product-cell'>
                                Fotocopias e impresiones<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded("Fotocopias e impresiones"))}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-lock-icon-content" hidden={true}>
                                <RiLock2Fill />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row3-first-box-ventas-col-4'
                    style={{ opacity: `${getStyleBox('Imprenta de billetes')}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div style={{ width: '90%' }} className='product-cell'>
                                Imprenta de billetes<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded("Imprenta de billetes"))}>
                                <FaRegCircleCheck />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <TecnicosModal isOpen={isOpenAsignarModal} close={closeAsignarModal} tecnico={tecnico} producto={producto} />
        </Container>)
}