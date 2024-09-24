import { Button, Modal, Alert } from 'react-bootstrap';

export default function DJModal({ isOpen, close, dj, AllDJs }) {

    const ContratarDJ = async () => {

        // Quitar al actual Residente
        let actual_residente;
        AllDJs.forEach((item) => {
            if (item?.residente) {
                actual_residente = item;
            }
        })
        
        fetch(`http://localhost:5050/api/DJs/${actual_residente._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: actual_residente.name,
                residente: false,
                contratado: actual_residente.contratado
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))

        // Contratar y poner de Residente al nuevo
        fetch(`http://localhost:5050/api/DJs/${dj._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: dj.name,
                residente: true,
                contratado: true
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
    }

    let msg1 = '¿Seguro que quieres contratar a ' + dj?.name + ' por $100,000?';
    let msg2 = dj?.name + ' ya es residente del club nocturno';
    let msg3 = '¿Seguro que quieres volver a contratar a ' + dj?.name + ' por $100,000?';

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>DJ residente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    {dj?.residente ? msg2 : dj?.contratado ? msg3 : msg1}
                </Alert>
            </Modal.Body>
            {
                !dj?.residente ? (
                    <Modal.Footer>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                            Cancelar
                        </Button>
                        <Button onClick={() => { ContratarDJ(); close()} } style={{ width: '50%', textAlign: 'center !important' }}>
                            Confirmar
                        </Button>
                    </Modal.Footer>
                    ) : (
                    <Modal.Footer>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                            OK
                        </Button>
                    </Modal.Footer>
                    )
            }
        </Modal>
    )
}