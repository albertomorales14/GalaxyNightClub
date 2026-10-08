import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import formatCurrency from '../../Utils/formatCurrency';
import { tecnicosApi } from '../../api';
import logService from '../../Utils/logService';

// Modal para contratar un técnico (desbloquea el siguiente) o asignarle un producto
function TecnicosModal({ isOpen, close, tecnico, producto, siguiente }) {

    const [saving, setSaving] = useState(false);
    const contratar = tecnico?.estado === 'NO CONTRATADO';

    const accion = async () => {
        setSaving(true);
        try {
            if (contratar) {
                await tecnicosApi.update(tecnico._id, { estado: 'CONTRATADO' });
                if (siguiente && siguiente.estado === 'BLOQUEADO') {
                    await tecnicosApi.update(siguiente._id, { estado: 'NO CONTRATADO' });
                }
                logService.sendLog('info', `Técnico contratado: ${tecnico.name} (TecnicosModal)`);
            } else {
                await tecnicosApi.update(tecnico._id, { estado: 'ASIGNADO', producto });
                logService.sendLog('info', `Técnico ${tecnico.name} asignado a ${producto} (TecnicosModal)`);
            }
        } catch (error) {
            logService.sendLog('error', 'Error al actualizar el técnico (TecnicosModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>{contratar ? 'Contratar técnico' : 'Asignar técnico'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    {contratar
                        ? <>¿Quieres contratar a un técnico por ${formatCurrency(tecnico?.salario)}?</>
                        : <>¿Seguro que quieres asignar este técnico a {producto}?</>}
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button onClick={accion} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default TecnicosModal;
