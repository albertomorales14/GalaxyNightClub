import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6"; // Check
import { RiLock2Fill } from "react-icons/ri"; // Lock
import { GiPerson } from "react-icons/gi"; // Person
import TecnicosModal from './TecnicosModal';

function Tecnicos({ tecnicos, focus, handleClick, actualizarLista }) {

    const [tec, setTecnico] = useState(null);
    const [sigTec, setSigTecnico] = useState(null);

    // Modal
    const [isOpenTecnicosModal, setIsOpenTecnicosModal] = useState(false);
    const openTecnicosModal = (lst) => {
        setIsOpenTecnicosModal(!(lst?.estado !== 'NO CONTRATADO'));
    };
    const closeTecnicosModal = () => {
        setIsOpenTecnicosModal(false);
        actualizarLista();
    };

    return (
        <Row className='tecnico-img-row'>
            {
                tecnicos.map((list, index) => (
                    <Col key={index} onClick={() => {handleClick(list); setTecnico(list); setSigTecnico(tecnicos[index < 4 ? index + 1 : index]); openTecnicosModal(list)}} className={index === 0 ? 'tecnico-img-col-first' : index === 4 ? 'tecnico-img-col-last' : 'tecnico-img-col'} >
                        <div class="tecnico-img-box-content">
                            <img className='tecnico-img' src={list.imagen} alt={list.name}
                                style={{ filter: `brightness(${list.estado === 'BLOQUEADO' || list.estado === 'NO CONTRATADO' ? 0.5 : 1})` }} />
                            <div className="tecnico-check-icon-content" hidden={list.estado !== 'ASIGNADO' || focus === list.name}>
                                <FaRegCircleCheck />
                            </div>
                            <div className="tecnico-lock-icon-content" hidden={list.estado !== 'BLOQUEADO' || focus === list.name}>
                                <RiLock2Fill />
                            </div>
                            <div className="tecnico-person-icon-content" id={list.name} hidden={focus !== list.name}>
                                <GiPerson />
                            </div>
                            <div className="tecnico-txt-content" hidden={list.estado !== 'NO CONTRATADO' || focus === list.name}>
                                <h1>CONTRATAR</h1>
                            </div>
                        </div>
                    </Col>
                ))
            }
            <TecnicosModal isOpen={isOpenTecnicosModal} close={closeTecnicosModal} tecnico={tec} siguiente={sigTec}/>
        </Row>
    )
}

export default Tecnicos;
