import { Button, Modal, Alert } from 'react-bootstrap';
import logService from '../../Utils/logService';

function MejorasModal(props) {

    const handleMejora = async () => {

        fetch(`http://localhost:5050/api/Mejoras/${props.mejora._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: props.mejora.name,
                comprada: !props.mejora?.comprada,
                precio: props.mejora.precio,
                imagen: props.mejora.imagen,
                descripcion: props.mejora.descripcion
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then(response => {
                response.json();
                console.log('[Actualizar Mejora] PUT llamada a API...');
                logService.sendLog('info', '[PUT] Llamada a la API: Actualizar Mejora (MejorasModal.js)');
                logService.sendLog('info', JSON.stringify({
                    name: props.mejora.name,
                    comprada: !props.mejora?.comprada
                }));
            })
            .catch(error => {
                console.log('A problem occurred with your fetch operation: ' + error);
                logService.sendLog('error', '[PUT] Llamada a la API (MejorasModal.js): ' + error);
            })
    }

    return (
        <Modal show={props.isOpen} onHide={props.close} animation={false}>
            <Modal.Header>
                <Modal.Title>Comprar mejora de {props.mejora?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !props.mejora?.comprada ? (
                        <Alert className='custom-alert'>
                            ¿Estás seguro de que desea comprar la mejora de {props.mejora?.name}?
                        </Alert>) : (
                        <Alert className='custom-alert'>
                            La mejora de {props.mejora?.name} ya ha sido comprada
                        </Alert>)
                }
            </Modal.Body>
            {
                !props.mejora?.comprada ? (
                    <Modal.Footer>
                        <Button onClick={props.close} style={{ width: '50%', textAlign: 'center !important' }}>
                            Cancelar
                        </Button>
                        <Button onClick={() => { handleMejora(); props.close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                            Comprar mejora
                        </Button>
                    </Modal.Footer>) : (
                    <Modal.Footer>
                        <Button onClick={() => { handleMejora(); props.close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                            Desintalar mejora
                        </Button>
                        <Button onClick={props.close} style={{ width: '50%', textAlign: 'center !important' }}>
                            OK
                        </Button>
                    </Modal.Footer>)
            }
        </Modal>
    )
}

export default MejorasModal;