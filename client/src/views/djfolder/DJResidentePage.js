import FameBar from "../../components/layouts/FameBar";
import { Container, Row, Col } from 'react-bootstrap';
import { IoMdPause } from "react-icons/io"; // Icono Pausa
import { IoMdPlay } from "react-icons/io"; // Icono Play
import { useEffect, useState } from 'react';
import names from "./DJNames";
import PlayAudio from "./PlayAudio";
import DJModal from "./DJModal";
// Audios DJ
import solomun from "../../audio/solomun.mp3";
import taleOfUs from "../../audio/tale-of-us.mp3";
import dixon from "../../audio/dixon.mp3";
import madonna from "../../audio/the-black-madonna.mp3";

export default function DJResidentePage({fama}) {

    const [lista, setLista] = useState([]);

    // Backend
    useEffect(() => {
        const getClub = async () => {
            fetch('http://localhost:5050/api/DJs')
                .then(response => response.json())
                .then(data => {
                    // Handle the fetched data here
                    setLista(data)
                })
                .catch(error => {
                    // Handle any errors
                    console.log('A problem occurred with your fetch operation: ', error)
                });
        }
        getClub(); //llamada
    }, [lista]) // dependencia variable de estado lista

    /* DJ Modal ******************/
    let [dj, setDJ] = useState(null);
    const [isOpenDJModal, setIsOpenDJModal] = useState(false);
    const openDJModal = () => setIsOpenDJModal(true);
    const closeDJModal = () => setIsOpenDJModal(false);
    /*****************************/

    const [play, setPlay] = useState(false);

    const [activeIndex, setActiveIndex] = useState(-1);

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);


    
    
    return (
        <div className="main-common-container dj-main" style={{ margin: '8px', marginLeft: '0' }}>
            <FameBar fama={fama}/>
            <Container>
                <Row>
                    <Col className="dj-col dj-name dj-left"><h3 className='dj-h3'>{names.SOLOMUN}</h3></Col>
                    <Col className="dj-col dj-name dj-right"><h3 className='dj-h3'>{names.TALE_OF_US}</h3></Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left" style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>

                        <div class="dj-img-box">
                            <div class="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/solomun.jpg" alt="Solomun-picture" />
                                <div>
                                <PlayAudio dj={names.SOLOMUN} 
                                activeIndex={activeIndex} 
                                isActive={activeIndex === 0}
                                onPlay={() => setActiveIndex(0)} 
                                onPause={() => setActiveIndex(0)}/>
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col className="dj-col dj-right" style={{ border: '1px solid var(--purple-light)', borderTop: 'none' }}>

                        <div class="dj-img-box">
                            <div class="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/tale-of-us.jpg" alt="Tale-Of-Us-picture"
                                    style={{ objectPosition: '100% 2%' }} />
                                    <div>
                                <PlayAudio dj={names.TALE_OF_US} 
                                activeIndex={activeIndex} 
                                isActive={activeIndex === 1}
                                onPlay={() => setActiveIndex(1)} 
                                onPause={() => setActiveIndex(-1)}/>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setDJ(lista[0]) }}>
                            <span className="dj-btn-size">
                                {lista[0]?.residente ? 'Residente' 
                                : lista[0]?.contratado ? 'Volver a Contratar $100.000'
                                : 'Contratar $100.000'}
                            </span>
                        </button>
                    </Col>
                    <Col className="dj-col dj-right">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setDJ(lista[1]) }}>
                            <span className="dj-btn-size">
                            {lista[1]?.residente ? 'Residente' 
                                : lista[1]?.contratado ? 'Volver a Contratar $100.000'
                                : 'Contratar $100.000'}
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
                    <Col className="dj-col dj-left" style={{
                        border: '1px solid var(--purple-light)',
                        borderTop: 'none'
                    }}>

                        <div class="dj-img-box">
                            <div class="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/dixon.jpg" alt="Dixon-picture"
                                    style={{ objectPosition: '100% 0%' }} />
                                <PlayAudio dj={names.DIXON} 
                                activeIndex={activeIndex} 
                                isActive={activeIndex === 2}
                                onPlay={() => setActiveIndex(2)} 
                                onPause={() => setActiveIndex(-1)}/>
                            </div>
                        </div>


                    </Col>
                    <Col className="dj-col dj-right" style={{
                        border: '1px solid var(--purple-light)',
                        borderTop: 'none'
                    }}>

                        <div class="dj-img-box">
                            <div class="dj-img-box-content">
                                <img className='dj-img' src="/img/dj/the-black-madonna.jpg" alt="The-Black-Madonna-picture"
                                    style={{ objectPosition: '100% 25%' }} />
                                <PlayAudio dj={names.THE_BLACK_MADONNA} 
                                activeIndex={activeIndex} 
                                isActive={activeIndex === 3}
                                onPlay={() => {setActiveIndex(3);alert("reproduciendo: index = " + activeIndex)}} 
                                onPause={() => {setActiveIndex(-1); alert("pausando: index = " + activeIndex)}}/>
                            </div>
                        </div>


                    </Col>
                </Row>
                <Row>
                    <Col className="dj-col dj-left">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setDJ(lista[2]) }}>
                            <span className="dj-btn-size">
                            {lista[2]?.residente ? 'Residente' 
                                : lista[2]?.contratado ? 'Volver a Contratar $100.000'
                                : 'Contratar $100.000'}
                            </span>
                        </button>
                    </Col>
                    <Col className="dj-col dj-right">
                        <button className="btn-primary dj-btn" onClick={() => { openDJModal(); setDJ(lista[3]) }}>
                            <span className="dj-btn-size">
                            {lista[3]?.residente ? 'Residente' 
                                : lista[3]?.contratado ? 'Volver a Contratar $100.000'
                                : 'Contratar $100.000'}
                            </span>
                        </button>
                    </Col>
                </Row>
            </Container>
            <DJModal isOpen={isOpenDJModal} close={closeDJModal} dj={dj} AllDJs={lista}/>
        </div>
    )
}

/*
function PlayAudio ({dj, activeIndex, isActive, onPlay, onPause}) {

    const [audioStatus, changeAudioStatus] = useState(false);
    let audio = new Audio(
        dj == names.SOLOMUN ? solomun :
            dj == names.TALE_OF_US ? taleOfUs :
                dj == names.DIXON ? dixon : madonna);

    

    function playPause() {
        let isPlaying = isActive//audioStatus; // Get state of song
        
        

            if (isPlaying) { // Pause the song if it is playing
                audio.pause();
                
                //changeAudioStatus(false);
            } else { // Play the song if it is paused
                audio.play();
                //changeAudioStatus(true);
            }
            //this.setState({ isPlaying: !isPlaying }); // Change the state of song
        changeAudioStatus(!isPlaying);

    };

    return (
        <>
            <button className="dj-audio-btn" onClick={() => { isActive ? onPause() : onPlay(); playPause(); }}>
                <div style={{ display: 'flex' }}>
                    <div>
                        <span>
                            {isActive ? "Pausar audio" : "Reproducir audio"}
                        </span>
                    </div>
                    <div>
                        <button id="play-btn" className="play-audio-btn">
                            {isActive ? <IoMdPause /> : <IoMdPlay />}
                        </button>
                    </div>
                </div>
            </button>
        </>
    );
}*/