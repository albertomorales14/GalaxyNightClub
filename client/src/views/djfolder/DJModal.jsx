import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { djsApi } from '../../api';
import logService from '../../Utils/logService';

function DJModal({ isOpen, close, dj, AllDJs }) {

    const [saving, setSaving] = useState(false);

    // Contrata al DJ seleccionado como residente y quita al residente actual
    const contratarDJ = async () => {
        setSaving(true);
        try {
            const actualResidente = AllDJs.find(item => item.residente);
            if (actualResidente) {
                await djsApi.update(actualResidente._id, { residente: false });
            }
            await djsApi.update(dj._id, { residente: true, contratado: true });
            logService.sendLog('info', `${dj.name} es ahora el DJ residente del club (DJModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al contratar DJ (DJModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    const mensaje = dj?.residente ? `${dj.name} ya es residente del club nocturno`
        : dj?.contratado ? `¿Seguro que quieres volver a contratar a ${dj?.name} por $100,000?`
            : `¿Seguro que quieres contratar a ${dj?.name} por $100,000?`;

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>DJ residente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>{mensaje}</Alert>
            </Modal.Body>
            <Modal.Footer>
                {!dj?.residente ? (
                    <>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                            Cancelar
                        </Button>
                        <Button onClick={contratarDJ} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                            Confirmar
                        </Button>
                    </>
                ) : (
                    <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                        OK
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default DJModal;
