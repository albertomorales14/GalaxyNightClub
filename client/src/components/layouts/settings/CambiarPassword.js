import useAuth from '../../../auth/useAuth';
import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon
import { Button, Modal, Alert, Form } from 'react-bootstrap';

export default function CambiarPassword({ isOpen, close }) {

    const { user, changePassword } = useAuth();


    const [password, setPassword] = useState()
    const [newPassword, setNewPassword] = useState()



    return (
        <Modal show={isOpen} onHide={() => { close(); }} animation={false}>
        <Modal.Header style={{ display: 'flex !important' }}>
            <Modal.Title>
                Cambiar contraseña
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert className='custom-alert'>
                <Form >
                    <Form.Group controlId="changeImgFormFile" className="mb-3" variant='dark'>
                        <Form.Control type="file"
                            data-browse='Subir'
                            accept='.png, .jpg, .jpeg' />
                    </Form.Group>
                    <Button id="subir-imagen" type="submit" style={{ display: 'none' }} >
                        Subir
                    </Button>
                </Form>
            </Alert>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => { /*close(); setFileName('Subir una imagen'); setSelectedFile(null)*/ }} style={{ width: '50%', textAlign: 'center !important' }}>
                Cancelar
            </Button>
            <Button onClick={() => {  }} style={{ width: '50%', textAlign: 'center !important' }}>
                Confirmar
            </Button>
        </Modal.Footer>
    </Modal>
    )
}