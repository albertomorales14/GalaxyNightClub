import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6"; // Check
import { RiLock2Fill } from "react-icons/ri"; // Lock
import { GiPerson } from "react-icons/gi"; // Person
import TecnicosModal from './TecnicosModal';
import { imagenLocal } from '../../Utils/imagenes';

function Tecnicos({ tecnicos, focus, handleClick, actualizarLista }) {

    // Técnico que se va a contratar y el siguiente, que se desbloquea al contratarlo
    const [contratacion, setContratacion] = useState(null);

    const closeTecnicosModal = () => {
        setContratacion(null);
        actualizarLista();
    };

    const onClickTecnico = (tecnico, index) => {
        handleClick(tecnico);
        if (tecnico.estado === 'NO CONTRATADO') {
            setContratacion({ tecnico, siguiente: tecnicos[index + 1] });
        }
    };

    const colClass = (index) => index === 0 ? 'tecnico-img-col-first'
        : index === tecnicos.length - 1 ? 'tecnico-img-col-last'
            : 'tecnico-img-col';

    return (
        <Row className='tecnico-img-row'>
            {tecnicos.map((tecnico, index) => (
                <Col key={tecnico._id} onClick={() => onClickTecnico(tecnico, index)} className={colClass(index)}>
                    <div className="tecnico-img-box-content">
                        <img className='tecnico-img' src={imagenLocal(tecnico.imagen)} alt={tecnico.name} decoding="async"
                            style={{ filter: `brightness(${tecnico.estado === 'BLOQUEADO' || tecnico.estado === 'NO CONTRATADO' ? 0.5 : 1})` }} />
                        <div className="tecnico-check-icon-content" hidden={tecnico.estado !== 'ASIGNADO' || focus === tecnico.name}>
                            <FaRegCircleCheck />
                        </div>
                        <div className="tecnico-lock-icon-content" hidden={tecnico.estado !== 'BLOQUEADO' || focus === tecnico.name}>
                            <RiLock2Fill />
                        </div>
                        <div className="tecnico-person-icon-content" hidden={focus !== tecnico.name}>
                            <GiPerson />
                        </div>
                        <div className="tecnico-txt-content" hidden={tecnico.estado !== 'NO CONTRATADO' || focus === tecnico.name}>
                            <h1>CONTRATAR</h1>
                        </div>
                    </div>
                </Col>
            ))}
            <TecnicosModal isOpen={contratacion !== null} close={closeTecnicosModal}
                tecnico={contratacion?.tecnico} siguiente={contratacion?.siguiente} />
        </Row>
    )
}

export default Tecnicos;
