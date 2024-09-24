import { Container, Row, Col } from 'react-bootstrap';
import VentaProductoModal from './VentaProductoModal';
import formatCurrency from '../../Utils/formatCurrency';
import { useEffect, useState } from 'react';

export default function Productos({ lista, club }) {

    // Modal
    const [isOpenVentaProductoModal, setIsOpenVentaProductoModal] = useState(false);
    const openVentaProductoModal = () => setIsOpenVentaProductoModal(true);
    const closeVentaProductoModal = () => setIsOpenVentaProductoModal(false);
    const [producto, setProducto] = useState(null);

    return (
        <Container>
            <Row className='row-productos'>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[0]); }}>
                    {lista[0]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 first-left-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Mercancía y cargamentos<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[0]?.existencias / lista[0]?.capacidadMax * lista[0]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[0]?.existencias}/{lista[0]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products first-left-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Mercancía y cargamentos<br /><br />
                            </div>
                            <div>
                                {lista[0]?.existencias}/{lista[0]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[1]); }}>
                    {lista[1]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 first-right-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Equipo de caza<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[1]?.existencias / lista[1]?.capacidadMax * lista[1]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[1]?.existencias}/{lista[1]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products first-right-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Equipo de caza<br /><br />
                            </div>
                            <div>
                                {lista[1]?.existencias}/{lista[1]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[2]); }}>
                    {lista[2]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 middle-box-ventas-col-6 middle-left'>
                            <div style={{ flex: '1' }}>
                                Importaciones sudamericanas<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[2]?.existencias / lista[2]?.capacidadMax * lista[2]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[2]?.existencias}/{lista[2]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products middle-box-ventas-col-6 middle-left'>
                            <div style={{ flex: '1' }}>
                                Importaciones sudamericanas<br /><br />
                            </div>
                            <div>
                                {lista[2]?.existencias}/{lista[2]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[3]); }}>
                    {lista[3]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 middle-box-ventas-col-6 middle-right'>
                            <div style={{ flex: '1' }}>
                                Investigaciones farmacéuticas<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[3]?.existencias / lista[3]?.capacidadMax * lista[3]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[3]?.existencias}/{lista[3]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products middle-box-ventas-col-6 middle-right'>
                            <div style={{ flex: '1' }}>
                                Investigaciones farmacéuticas<br /><br />
                            </div>
                            <div>
                                {lista[3]?.existencias}/{lista[3]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[4]); }}>
                    {lista[4]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 middle-box-ventas-col-6 middle-left'>
                            <div style={{ flex: '1' }}>
                                Productos orgánicos<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[4]?.existencias / lista[4]?.capacidadMax * lista[4]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[4]?.existencias}/{lista[4]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products middle-box-ventas-col-6 middle-left'>
                            <div style={{ flex: '1' }}>
                                Productos orgánicos<br /><br />
                            </div>
                            <div>
                                {lista[4]?.existencias}/{lista[4]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[5]); }}>
                    {lista[5]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 middle-box-ventas-col-6 middle-right'>
                            <div style={{ flex: '1' }}>
                                Fotocopias e impresiones<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[5]?.existencias / lista[5]?.capacidadMax * lista[5]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[5]?.existencias}/{lista[5]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products middle-box-ventas-col-6 middle-right'>
                            <div style={{ flex: '1' }}>
                                Fotocopias e impresiones<br /><br />
                            </div>
                            <div>
                                {lista[5]?.existencias}/{lista[5]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
            </Row>
            <Row className='row-productos'>
                <Col xs={6} onClick={() => { openVentaProductoModal(); setProducto(lista[6]); }}>
                    {lista[6]?.existencias !== 0 ?
                        (<div className='box-ventas-col-6 last-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Imprenta de billetes<br />Vender por:
                                <span className='venta-all-price'>
                                    &nbsp;${formatCurrency(lista[6]?.existencias / lista[6]?.capacidadMax * lista[6]?.totalValue)}
                                </span>
                            </div>
                            <div>
                                {lista[6]?.existencias}/{lista[6]?.capacidadMax}
                            </div>
                        </div>) :
                        (<div className='box-ventas-col-6-no-products last-box-ventas-col-6'>
                            <div style={{ flex: '1' }}>
                                Imprenta de billetes<br /><br />
                            </div>
                            <div>
                                {lista[6]?.existencias}/{lista[6]?.capacidadMax}
                            </div>
                        </div>)
                    }
                </Col>
            </Row>
            <VentaProductoModal isOpen={isOpenVentaProductoModal} close={closeVentaProductoModal} producto={producto} club={club} />
        </Container>)
}