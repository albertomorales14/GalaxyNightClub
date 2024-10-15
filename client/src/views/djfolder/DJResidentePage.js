import { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FameBar from "../../components/layouts/FameBar";
import PlayAudio from "./PlayAudio";
import DJModal from "./DJModal";
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';
import names from "../../Utils/namesDJ";

function DJResidentePage({ fama }) {

    const { user } = useAuth();
    const [lista, setLista] = useState([]); // lista de DJs
    const [actualizarLista, setActualizarLista] = useState(false);

    useEffect(() => {
        const getDJs = async () => {
            await fetch(`http://localhost:5050/api/DJs/Club/${user?.club}`)
                .then(response => response.json())
                .then(data => {
                    setLista(data);
                    setActualizarLista(false);
                    logService.sendLog('info', '[GET Request] getDJs: Lista de DJs (DJResidentePage.js)');
                })
                .catch(error => {
                    logService.sendLog('error', 'Error: [GET Request] getDJs: Lista de DJs (DJResidentePage.js): ' + error);
                });
        }
        getDJs();
    }, [actualizarLista]);

    // Modal
    let [dj, setDJ] = useState(null);
    const [isOpenDJModal, setIsOpenDJModal] = useState(false);
    const openDJModal = () => setIsOpenDJModal(true);
    const closeDJModal = () => {
        setIsOpenDJModal(false);
        setActualizarLista(true);
    };

    // Audios desde servicio Cloudinary
    const solomunAudio = 'https://res.cloudinary.com/djxewugx1/video/upload/v1728890975/solomun_k3l8kg.mp3';
    const taleOfUsAudio = 'https://res.cloudinary.com/djxewugx1/video/upload/v1728889683/tale-of-us_rbwy70.mp3';
    const dixonAudio = 'https://res.cloudinary.com/djxewugx1/video/upload/v1728889555/dixon_epu7va.mp3';
    const madonnaAudio = 'https://res.cloudinary.com/djxewugx1/video/upload/v1728889673/the-black-madonna_e8kwux.mp3';

    const [currentAudio, setCurrentAudio] = useState(null);
    const audioRef = useRef(null); // Referencia para el audio actual

    // Función para manejar cuál audio debe reproducirse
    const handlePlay = (audioIndex) => {
        if (audioRef.current) {
            // Pausar el audio actual si ya hay uno reproduciéndose
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        // Establecer el nuevo audio como el activo
        setCurrentAudio(audioIndex);
    };

    return (
        <div className="main-common-container dj-main" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama} />
            <Container>
                <Row>
                    <Col className="dj-col dj-name dj-left">
                        <h3 className='dj-h3'>{names.SOLOMUN}</h3>
                    </Col>
                    <Col className="dj-col dj-name dj-right">
                        <h3 className='dj-h3'>{names.TALE_OF_US}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left" style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                        <div className="dj-img-box">
                            <div className="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/solomun.jpg" alt="Solomun-picture" />
                                <div>
                                    <PlayAudio
                                        name={names.SOLOMUN}
                                        audioSrc={solomunAudio}
                                        isPlaying={currentAudio === 0}
                                        onPlay={() => handlePlay(0)}
                                        onPause={() => handlePlay(-1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="dj-col dj-right" style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                        <div className="dj-img-box">
                            <div className="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/tale-of-us.jpg" alt="Tale-Of-Us-picture" style={{ objectPosition: '100% 2%' }} />
                                <div>
                                    <PlayAudio
                                        name={names.TALE_OF_US}
                                        audioSrc={taleOfUsAudio}
                                        isPlaying={currentAudio === 1}
                                        onPlay={() => handlePlay(1)}
                                        onPause={() => handlePlay(-1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setActualizarLista(false); setDJ(lista[0]) }}>
                            <span className="dj-btn-size">
                                {
                                    lista[0]?.residente ? 'Residente' : 
                                    lista[0]?.contratado ? 'Volver a Contratar $100.000' : 'Contratar $100.000'
                                }
                            </span>
                        </button>
                    </Col>
                    <Col className="dj-col dj-right">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setActualizarLista(false); setDJ(lista[1]) }}>
                            <span className="dj-btn-size">
                                {
                                    lista[1]?.residente ? 'Residente' : 
                                    lista[1]?.contratado ? 'Volver a Contratar $100.000' : 'Contratar $100.000'
                                }
                            </span>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-name dj-left">
                        <h3 className='dj-h3'>{names.DIXON}</h3>
                    </Col>
                    <Col className="dj-col dj-name dj-right">
                        <h3 className='dj-h3'>{names.THE_BLACK_MADONNA}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left" style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>
                        <div className="dj-img-box">
                            <div className="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/dixon.jpg" alt="Dixon-picture" style={{ objectPosition: '100% 0%' }} />
                                <PlayAudio
                                    name={names.DIXON}
                                    audioSrc={dixonAudio}
                                    isPlaying={currentAudio === 2}
                                    onPlay={() => handlePlay(2)}
                                    onPause={() => handlePlay(-1)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="dj-col dj-right" style={{ border: '1px solid var(--purple-light)',  borderTop: 'none' }}>
                        <div className="dj-img-box">
                            <div className="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/the-black-madonna.jpg" alt="The-Black-Madonna-picture" style={{ objectPosition: '100% 25%' }} />
                                <PlayAudio
                                    name={names.THE_BLACK_MADONNA}
                                    audioSrc={madonnaAudio}
                                    isPlaying={currentAudio === 3}
                                    onPlay={() => handlePlay(3)}
                                    onPause={() => handlePlay(-1)}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setActualizarLista(false); setDJ(lista[2]) }}>
                            <span className="dj-btn-size">
                                {
                                    lista[2]?.residente ? 'Residente' : 
                                    lista[2]?.contratado ? 'Volver a Contratar $100.000' : 'Contratar $100.000'
                                }
                            </span>
                        </button>
                    </Col>
                    <Col className="dj-col dj-right">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setActualizarLista(false); setDJ(lista[3]) }}>
                            <span className="dj-btn-size">
                                {
                                    lista[3]?.residente ? 'Residente' :
                                    lista[3]?.contratado ? 'Volver a Contratar $100.000' : 'Contratar $100.000'
                                }
                            </span>
                        </button>
                    </Col>
                </Row>
            </Container>
            <DJModal isOpen={isOpenDJModal} close={closeDJModal} dj={dj} AllDJs={lista} />
        </div>
    )
}

export default DJResidentePage;