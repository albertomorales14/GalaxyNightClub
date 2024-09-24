import { Button, Modal, Alert } from 'react-bootstrap';

export default function CambiarPassword({ isOpen, close }) {



    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Comprar mejora de </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                            ¿Estás seguro de que desea comprar la mejora de ?
                        </Alert>
            </Modal.Body>
            <Modal.Footer>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                            Cancelar
                        </Button>
                        <Button onClick={() => {  close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                            Comprar mejora
                        </Button>
                    </Modal.Footer>
                    
        </Modal>
    )
}