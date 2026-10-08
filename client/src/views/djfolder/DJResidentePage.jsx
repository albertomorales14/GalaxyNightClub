import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from "../../components/layouts/FameBar";
import PlayAudio from "./PlayAudio";
import DJModal from "./DJModal";
import { djsApi } from '../../api';
import useApiData from '../../hooks/useApiData';
import Valor from '../../components/skeleton/Valor';
import { DJS } from "../../Utils/namesDJ";

const textoBoton = (dj) =>
    dj?.residente ? 'Residente'
        : dj?.contratado ? 'Volver a Contratar $100.000'
            : 'Contratar $100.000';

// Agrupa los DJs de dos en dos para pintarlos en filas
const enParejas = (lista) => lista.reduce((filas, item, i) => {
    if (i % 2 === 0) filas.push([item]);
    else filas[filas.length - 1].push(item);
    return filas;
}, []);

function DJResidentePage({ fama }) {

    const { data: lista, loading, reload } = useApiData(djsApi.list, []); // DJs del club
    const [dj, setDJ] = useState(null); // DJ seleccionado en la modal
    const [currentAudio, setCurrentAudio] = useState(null); // índice del audio que suena

    const closeDJModal = () => {
        setDJ(null);
        reload();
    };

    const filas = enParejas(DJS.map((info, index) => ({ ...info, index })));

    return (
        <div className="main-common-container dj-main" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <Container>
                {filas.map(fila => (
                    <div key={fila[0].name}>
                        <Row>
                            {fila.map(({ name, index }) => (
                                <Col key={name} className={`dj-col dj-name ${index % 2 === 0 ? 'dj-left' : 'dj-right'}`}>
                                    <h3 className='dj-h3'>{name}</h3>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {fila.map(({ name, imagen, audio, objectPosition, index }) => (
                                <Col key={name} className={`dj-col ${index % 2 === 0 ? 'dj-left' : 'dj-right'}`}
                                    style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                                    <div className="dj-img-box">
                                        <div className="dj-img-box-content">
                                            <img className={`dj-img dj-${index}`} src={imagen} alt={name} style={{ objectPosition }}
                                                loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                                            <PlayAudio
                                                name={name}
                                                audioSrc={audio}
                                                isPlaying={currentAudio === index}
                                                onPlay={() => setCurrentAudio(index)}
                                                onPause={() => setCurrentAudio(null)}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            {fila.map(({ name, index }) => (
                                <Col key={name} className={`dj-col ${index % 2 === 0 ? 'dj-left' : 'dj-right'}`}>
                                    <button className="btn-primary dj-btn" onClick={() => setDJ(lista[index])} disabled={!lista[index]}>
                                        <span className="dj-btn-size">
                                            <Valor cargando={loading} width="10rem">{textoBoton(lista[index])}</Valor>
                                        </span>
                                    </button>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Container>
            <DJModal isOpen={dj !== null} close={closeDJModal} dj={dj} AllDJs={lista} />
        </div>
    )
}

export default DJResidentePage;
