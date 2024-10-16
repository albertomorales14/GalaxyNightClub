import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import logService from '../../Utils/logService';

function TecnicosModal({ isOpen, close, tecnico, producto, siguiente }) {

    const accion = async () => {
        if (tecnico?.estado === 'NO CONTRATADO') {
            // Contratar tecnico
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Tecnicos/${tecnico._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    estado: 'CONTRATADO',
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            })
                .then(response => {
                    response.json();
                    logService.sendLog('info', '[PUT] Contratar técnico (TecnicosModal.js): ' + tecnico?.name);
                })
                .catch(error => {
                    console.log('A problem occurred with your fetch operation: ', error);
                    logService.sendLog('error', '[PUT] Error al contratar técnico (TecnicosModal.js): ' + error);
                });

            // Desbloquear el siguiente
            if (tecnico !== siguiente) {
                await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Tecnicos/${siguiente._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        estado: 'NO CONTRATADO',
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8", },
                })
                    .then(response => {
                        response.json();
                        logService.sendLog('info', '[PUT] Desbloquear siguiente técnico (TecnicosModal.js): ' + siguiente?.name);
                    })
                    .catch(error => {
                        console.log('A problem occurred with your fetch operation: ', error);
                        logService.sendLog('error', '[PUT] Error al desbloquear siguiente técnico (TecnicosModal.js): ' + error);
                    });
            }
        } else {
            // Asignar tecnico
            await fetch(`${process.env.REACT_APP_LOCALHOST}/api/Tecnicos/${tecnico._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    estado: 'ASIGNADO',
                    producto: producto
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            })
                .then(response => {
                    response.json();
                    logService.sendLog('info', '[PUT] Asignar técnico (TecnicosModal.js): ' + siguiente?.name);
                })
                .catch(error => {
                    console.log('A problem occurred with your fetch operation: ', error);
                    logService.sendLog('error', '[PUT] Error al asignar técnico (TecnicosModal.js): ' + error);
                });
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>{tecnico?.estado === 'NO CONTRATADO' ? 'Contratar técnico' : 'Asignar técnico'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    {tecnico?.estado === 'NO CONTRATADO' ? (<>
                        ¿Quieres contratar a un técnico por ${formatCurrency(tecnico?.salario)}?
                    </>) : (<>¿Seguro que quieres asignar este técnico a este producto?</>)}

                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { accion(); close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TecnicosModal;