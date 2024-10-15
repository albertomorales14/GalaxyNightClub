import { Button, Modal, Alert } from 'react-bootstrap';
import logService from '../../Utils/logService';

function FameModal(props) {

    const aumentarFama = async () => {

        let fame = (props.club?.fama + 25) >= 100 ? 100 : props.club?.fama + 25;

        fetch(`http://localhost:5050/api/Club/${props.club._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fama: fame,
                trabajos: props.club.trabajos + 1,
                publico: fame === 100 ? 'Hasta los topes'
                       : fame >= 75 ? 'Abarrotado'
                       : fame >= 50 ? 'Lleno'
                       : fame >= 25 ? 'Poca gente' : 'Vacío',
                ingresos_hoy: fame === 100 ? 30000
                            : fame >= 75 ? 25000
                            : fame >= 50 ? 15000
                            : fame >= 25 ? 10000 : 0
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then(response => {
                response.json();
                logService.sendLog('info', '[PUT Request] Aumentar fama del club: Actualizar Club (FameModal.js)');
                logService.sendLog('info', '\t> Fama del club al ' + fame + '%');
            })
            .catch(error => {
                logService.sendLog('error', 'Error: [PUT Request] Aumentar fama del club: Actualizar Club (FameModal.js): ' + error);
            })
    }

    return (
        <Modal show={props.isOpen} onHide={props.close} animation={false}>
            <Modal.Header>
                <Modal.Title>Gestión del club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Seguro que quieres promocionar el club? <br />
                    Aumentará la fama del club
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { aumentarFama(); props.close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FameModal;