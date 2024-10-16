import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TecnicosModal from './TecnicosModal';
import { FaRegCircleCheck } from "react-icons/fa6"; // Check
import { GiPerson } from "react-icons/gi"; // Person
import PRODUCTO from '../../Utils/namesProductos';

function ProductosAlmacen({ tecnicos, focus, actualizarLista }) {

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
    }

    const closeAsignarModal = () => {
        setIsOpenAsignarModal(false);
        actualizarLista();
    }

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
                        style={{ opacity: `${getStyleBox(PRODUCTO.MERCANCIA)}`, cursor: `${getCursor(PRODUCTO.MERCANCIA)}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.MERCANCIA);
                                setProducto(PRODUCTO.MERCANCIA);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.MERCANCIA}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded(PRODUCTO.MERCANCIA) || !hasPersonIcon(PRODUCTO.MERCANCIA)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.MERCANCIA)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row1-middle-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.CAZA)}`, cursor: `${getCursor(PRODUCTO.CAZA)}` }}>                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.CAZA);
                                setProducto(PRODUCTO.CAZA);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.CAZA}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded(PRODUCTO.CAZA) || !hasPersonIcon(PRODUCTO.CAZA)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.CAZA)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row1-last-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.LATAM)}`, cursor: `${getCursor(PRODUCTO.LATAM)}` }}>                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.LATAM);
                                setProducto(PRODUCTO.LATAM);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.LATAM}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!isIncluded(PRODUCTO.LATAM) || !hasPersonIcon(PRODUCTO.LATAM)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.LATAM)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-first-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.FARMACEUTICA)}`, cursor: `${getCursor(PRODUCTO.FARMACEUTICA)}` }}>                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.FARMACEUTICA);
                                setProducto(PRODUCTO.FARMACEUTICA);
                                setTecnico(tecnicos[focus.at(-1) - 1])
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.FARMACEUTICA}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded(PRODUCTO.FARMACEUTICA)) || !hasPersonIcon(PRODUCTO.FARMACEUTICA)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.FARMACEUTICA)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-middle-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.ORGANIC)}`, cursor: `${getCursor(PRODUCTO.ORGANIC)}` }}>
                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.ORGANIC);
                                setProducto(PRODUCTO.ORGANIC);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.ORGANIC}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded(PRODUCTO.ORGANIC)) || !hasPersonIcon(PRODUCTO.ORGANIC)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.ORGANIC)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row2-last-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.FOTOCOPIAS)}`, cursor: `${getCursor(PRODUCTO.FOTOCOPIAS)}` }}>                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.FOTOCOPIAS);
                                setProducto(PRODUCTO.FOTOCOPIAS);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.FOTOCOPIAS}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded(PRODUCTO.FOTOCOPIAS)) || !hasPersonIcon(PRODUCTO.FOTOCOPIAS)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.FOTOCOPIAS)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={4}>
                    <div className='box-ventas-col-4 row3-first-box-ventas-col-4'
                        style={{ opacity: `${getStyleBox(PRODUCTO.BILLETES)}`, cursor: `${getCursor(PRODUCTO.BILLETES)}` }}>                        <div style={{ display: 'flex', position: 'relative' }}>
                            <div onClick={() => {
                                openAsignarModal(PRODUCTO.BILLETES);
                                setProducto(PRODUCTO.BILLETES);
                                setTecnico(tecnicos[focus.at(-1) - 1]);
                            }} style={{ width: '90%' }} className='product-cell'>
                                {PRODUCTO.BILLETES}<br /><br />
                            </div>
                            <div className="producto-check-icon-content" hidden={!(isIncluded(PRODUCTO.BILLETES)) || !hasPersonIcon(PRODUCTO.BILLETES)}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="producto-person-icon-content" hidden={hasPersonIcon(PRODUCTO.BILLETES)}>
                                <GiPerson />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <TecnicosModal isOpen={isOpenAsignarModal} close={closeAsignarModal} tecnico={tecnico} producto={producto} />
        </Container>
    )
}

export default ProductosAlmacen;