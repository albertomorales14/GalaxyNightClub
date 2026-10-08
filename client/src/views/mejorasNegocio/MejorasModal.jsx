import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { mejorasApi } from '../../api';
import logService from '../../Utils/logService';

function MejorasModal({ isOpen, close, mejora }) {

    const [saving, setSaving] = useState(false);

    // Compra o desinstala la mejora
    const toggleMejora = async () => {
        setSaving(true);
        try {
            await mejorasApi.update(mejora._id, { comprada: !mejora.comprada });
            logService.sendLog('info', `Mejora ${mejora.name}: comprada = ${!mejora.comprada} (MejorasModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al actualizar la mejora (MejorasModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Comprar mejora de {mejora?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    {mejora?.comprada
                        ? `La mejora de ${mejora?.name} ya ha sido comprada`
                        : `¿Estás seguro de que desea comprar la mejora de ${mejora?.name}?`}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                {!mejora?.comprada ? (
                    <>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                            Cancelar
                        </Button>
                        <Button onClick={toggleMejora} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                            Comprar mejora
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={toggleMejora} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                            Desinstalar mejora
                        </Button>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                            OK
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default MejorasModal;
