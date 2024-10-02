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
                publico: fame >= 95 ? 'Hasta los topes'
                       : fame >= 80 ? 'Abarrotado'
                       : fame >= 70 ? 'Lleno'
                       : fame >= 25 ? 'Poca gente' : 'Vacío',
                ingresos_hoy: fame >= 95 ? 30000
                            : fame >= 80 ? 25000
                            : fame >= 70 ? 15000
                            : fame >= 25 ? 10000 : 0
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then(response => {
                response.json();
                console.log('[Aumentar Fama del Club] PUT llamada a API...');
                logService.sendLog('info', '[PUT] Actualizar Club: Aumentar Fama (FameModal.js)');
                logService.sendLog('info', 'fama al ' + fame + '%');
            })
            .catch(error => {
                console.log('A problem occurred with your fetch operation: ' + error);
                logService.sendLog('error', '[PUT] Llamada a la API (FameModal.js): ' + error);
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