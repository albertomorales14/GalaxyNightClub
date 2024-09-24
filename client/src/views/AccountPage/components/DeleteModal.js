import { Button, Modal, Alert} from 'react-bootstrap'
import useAuth from '../../../auth/useAuth'

export default function DeleteModal({isOpen, close}) {

    const {logout} = useAuth();

    const handleDelete = () => {

        logout();
    }

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant='danger'>¿Estás seguro de que desea eliminar su cuenta?</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={close}>
                    Cancelar
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Eliminar cuenta
                </Button>
            </Modal.Footer>
        </Modal>
    )
}