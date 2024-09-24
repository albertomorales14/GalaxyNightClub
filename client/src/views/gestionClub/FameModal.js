import { Button, Modal, Alert } from 'react-bootstrap';

export default function FameModal({ isOpen, close, club }) {

    const aumentarFama = async () => {

        let fame = club.fama + 25

        fetch(`http://localhost:5050/api/Club/${club._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                fama: fame >= 100 ? 100 : fame,
                trabajos: club.trabajos + 1,
                publico: club?.fama >= 95 ? 'Hasta los topes' 
                        : club?.fama >= 80 ? 'Abarrotado' 
                        : club?.fama >= 70 ? 'Lleno' 
                        : club?.fama >= 30 ? 'Poca gente' : 'Vacío',
                ingresos_hoy: club?.fama >= 95 ? 30000 
                        : club?.fama >= 80 ? 25000 
                        : club?.fama >= 70 ? 15000 
                        : club?.fama >= 30 ? 10000 : 0
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
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
                <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => {aumentarFama(); close()}} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}