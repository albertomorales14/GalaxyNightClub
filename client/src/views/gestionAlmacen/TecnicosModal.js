import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';

export default function TecnicosModal({ isOpen, close, tecnico, producto }) {

    const accion = () => {
        if (tecnico?.estado === 'NO CONTRATADO') {
            // Contratar tecnico
            fetch(`http://localhost:5050/api/Tecnicos/${tecnico._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    estado: 'CONTRATADO',
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))
        } else {
            // Asignar tecnico
            fetch(`http://localhost:5050/api/Tecnicos/${tecnico._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    estado: 'ASIGNADO',
                    producto: producto
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))
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