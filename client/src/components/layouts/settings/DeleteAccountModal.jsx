import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import ALERT from '../../../Utils/alertMessages';

function DeleteAccountModal({ isOpen, close }) {

    const { deleteAccount, setError } = useAuth();
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteAccount();
            setError(ALERT.WARN); // aviso que se muestra en la pantalla de login
        } catch (err) {
            setDeleteError(err.message);
            setDeleting(false);
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header style={{ display: 'flex' }}>
                <Modal.Title>
                    Eliminar cuenta
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    {deleteError || '¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.'}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button onClick={handleDelete} disabled={deleting} className='danger-account-btn' style={{ width: '50%', textAlign: 'center' }}>
                    {deleting ? 'Eliminando...' : 'Eliminar cuenta'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAccountModal;
