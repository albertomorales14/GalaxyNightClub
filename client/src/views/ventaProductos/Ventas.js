import { Container, Row, Col } from 'react-bootstrap';
import ventas from '../../Utils/ventas';
import React, { useMemo, useState } from 'react';
import formatCurrency from '../../Utils/formatCurrency';
import VenderColeccionModal from './VenderColeccionModal';

export default function Ventas({ lista, club }) {

    // Modal
    const [isOpenVentaCollectionModal, setIsOpenVentaCollectionModal] = useState(false);
    const openVentaCollectionModal = () => setIsOpenVentaCollectionModal(true);
    const closeVentaCollectionModal = () => setIsOpenVentaCollectionModal(false);
    const [grupo, setGrupo] = useState(null);
    const [coleccion, setColeccion] = useState(null);
    const [precioColeccion, setPrecioColeccion] = useState(null);

    const generarNumerosUnicos = (cantidad, max) => {
        const numeros = new Set();
        while (numeros.size < cantidad) {
            numeros.add(Math.floor(Math.random() * (max + 1))); // Genera números entre 0 y 'max'
        }
        return [...numeros]; // Convierte el Set en un Array
    };

    const randomNumbers = useMemo(() => {
        // Generamos 3 grupos, cada uno con 3 números únicos entre 0 y 6
        return Array.from({ length: 3 }, () => generarNumerosUnicos(3, 6));
    }, []); // [] asegura que se ejecute una vez al montar el componente

    const comprobarClass = (grupo) => {
        let no_venta = [];
        grupo.map((numero) => (
            (lista[numero]?.existencias > Math.round(lista[numero]?.existencias - (lista[numero]?.existencias * numero / 100)) ? Math.round(lista[numero]?.existencias - (lista[numero]?.existencias * numero / 100)) : lista[numero]?.existencias) < (Math.round(lista[numero]?.capacidadMax - (lista[numero]?.capacidadMax * numero / 100)))
                ? no_venta.push(true) : no_venta.push(false)
        ))
        if (no_venta.includes(true)) {
            return 'box-ventas-col-12-no-collection'
        } else {
            return 'box-ventas-col-12'
        }
    }

    const comprobarPrecio = (grupo) => {
        return grupo.reduce((a, b) => (
            a + (getExistencias(b) / getCapMax(b) * getTotalValue(b))
            || 0), 0)
    }

    const getExistencias = (numero) => {
        return lista[numero]?.existencias > Math.round(lista[numero]?.existencias - (lista[numero]?.existencias * numero / 100)) ? Math.round(lista[numero]?.existencias - (lista[numero]?.existencias * numero / 100)) : lista[numero]?.existencias
    }

    const getCapMax = (numero) => {
        return Math.round(lista[numero]?.capacidadMax - (lista[numero]?.capacidadMax * numero / 100))
    }

    const getTotalValue = (numero) => {
        return lista[numero]?.totalValue * getCapMax(numero) / lista[numero]?.capacidadMax
    }

    return (
        <Container>
            <Row className='row-ventas'>
                {randomNumbers.map((grupo, index) => (
                    <div key={index}>
                        <Col xs={12} onClick={() => { openVentaCollectionModal(); setGrupo(grupo); setColeccion(ventas[index]); setPrecioColeccion(comprobarPrecio(grupo)) }}>
                            <div className={comprobarClass(grupo)} style={{ margin: '0.25% 0 0.25% 0' }}>
                                <div className="venta-personalizada-flex">
                                    {ventas[index]} <br />
                                    {comprobarClass(grupo) === 'box-ventas-col-12'
                                        ? <div>Vender por:
                                            <span className='venta-all-price'>
                                                &nbsp;${formatCurrency(comprobarPrecio(grupo))}
                                            </span>
                                        </div>
                                        : <></>}
                                </div>
                                <div className='list-products'>
                                    {grupo.map((numero, idx) => (
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ flex: '2' }}>
                                                {lista[numero]?.name}
                                            </div>
                                            <div style={{ flex: '1', textAlign: 'right' }}>
                                                <span key={idx}>
                                                    {getExistencias(numero)}
                                                    /
                                                    {getCapMax(numero)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </div>
                ))}
            </Row>
            <VenderColeccionModal isOpen={isOpenVentaCollectionModal} 
                                  close={closeVentaCollectionModal} 
                                  grupo={grupo}
                                  coleccion={coleccion}
                                  precioColeccion={precioColeccion}
                                  productos={lista}
                                  club={club} />
        </Container>)
}