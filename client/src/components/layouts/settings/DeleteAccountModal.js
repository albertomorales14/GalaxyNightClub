import { Button, Modal, Alert } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import ALERT from '../../../Utils/alertMessages';

function DeleteAccountModal({ isOpen, close }) {

    const { user, logout, deleteUserAndClub, setError } = useAuth();

    const deleteAccount = () => {
        deleteUserAndClub(user);
        setError(ALERT.WARN);
        logout();
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header style={{ display: 'flex !important' }}>
                <Modal.Title>
                    Eliminar cuenta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Está seguro de que desea eliminar su cuenta?
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={deleteAccount} className='danger-account-btn' style={{ width: '50%', textAlign: 'center !important' }}>
                    Eliminar cuenta
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAccountModal;