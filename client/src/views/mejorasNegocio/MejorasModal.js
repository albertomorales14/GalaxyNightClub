import { Button, Modal, Alert } from 'react-bootstrap';

export default function MejorasModal({ isOpen, close, mejora }) {

    const ComprarMejora = async () => {

        fetch(`http://localhost:5050/api/Mejoras/${mejora._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: mejora.name,
                comprada: true,
                precio: mejora.precio,
                imagen: mejora.imagen,
                descripcion: mejora.descripcion
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
    }

    return (
        <Modal show={isOpen} onHide={close} animation={false}>
            <Modal.Header>
                <Modal.Title>Comprar mejora de {mejora?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    !mejora?.comprada ? (
                        <Alert className='custom-alert'>
                            ¿Estás seguro de que desea comprar la mejora de {mejora?.name}?
                        </Alert>) : (
                        <Alert className='custom-alert'>
                            La mejora de {mejora?.name} ya ha sido comprada
                        </Alert>)
                }
            </Modal.Body>
            {
                !mejora?.comprada ? (
                    <Modal.Footer>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                            Cancelar
                        </Button>
                        <Button onClick={() => { ComprarMejora(); close() }} style={{ width: '50%', textAlign: 'center !important' }}>
                            Comprar mejora
                        </Button>
                    </Modal.Footer>) : (
                    <Modal.Footer>
                        <Button onClick={close} style={{ width: '50%', textAlign: 'center !important' }}>
                            OK
                        </Button>
                    </Modal.Footer>)
            }
        </Modal>
    )
}