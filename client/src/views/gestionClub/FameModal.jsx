import { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { clubApi } from '../../api';
import logService from '../../Utils/logService';
import { FAMA_POR_PROMOCION, ingresosSegunFama, limitarFama, publicoSegunFama } from '../../game/reglas';

function FameModal({ isOpen, close, club }) {

    const [saving, setSaving] = useState(false);

    // Promocionar el club aumenta su fama
    const aumentarFama = async () => {
        const fama = limitarFama(club.fama + FAMA_POR_PROMOCION);
        setSaving(true);
        try {
            await clubApi.update({
                fama,
                trabajos: club.trabajos + 1,
                publico: publicoSegunFama(fama),
                ingresos_hoy: ingresosSegunFama(fama)
            });
            logService.sendLog('info', `Club promocionado: fama al ${fama}% (FameModal)`);
        } catch (error) {
            logService.sendLog('error', 'Error al promocionar el club (FameModal): ' + error.message);
        } finally {
            setSaving(false);
            close();
        }
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Gestión del club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    ¿Seguro que quieres promocionar el club? <br />
                    Aumentará la fama del club
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button onClick={aumentarFama} disabled={saving} style={{ width: '50%', textAlign: 'center' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default FameModal;
