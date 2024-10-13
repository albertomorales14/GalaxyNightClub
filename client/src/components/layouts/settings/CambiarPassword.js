import useAuth from '../../../auth/useAuth';
import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon
import { Button, Modal, Alert, Form } from 'react-bootstrap';

export default function CambiarPassword({ isOpen, close }) {

    const { compareAndChangePassword, success, setSuccess, error, setError } = useAuth();

    // Error Alert
    const [closeAlert, setCloseAlert] = useState(true);
    const openErrorAlert = () => setCloseAlert(false);
    const closeErrorAlert = () => {
        setCloseAlert(true);
        setError(null);
    }

    // Carga el error cada vez que lo detecte
    useEffect(() => {
        if (error !== null) {
            openErrorAlert();
            setSuccess(false);
        }
    }, [error]); // dependencia de error

    // Carga el success al cambiar contraseña
    useEffect(() => {
        if (success) {
            cleanForm();
            close();
        }
    }, [success]);

    const [password, setPassword] = useState()
    const [oldPassword, setOldPassword] = useState()

    // Ocultar-Mostrar contraseña (eye icon)
    const [psswdOldVisible, setPsswdOldVisible] = useState(false);
    const toogleOldPasswordIcon = () => {
        var psswd = document.getElementById('old-password');
        if (psswd.type === "password") {
            psswd.type = "text";
            setPsswdOldVisible(true);
        } else {
            psswd.type = "password";
            setPsswdOldVisible(false);
        }
    }

    // Ocultar-Mostrar contraseña Nueva (eye icon)
    const [psswdNewVisible, setPsswdNewVisible] = useState(false);
    const toogleNewPasswordIcon = () => {
        var psswd = document.getElementById('new-password');
        if (psswd.type === "password") {
            psswd.type = "text";
            setPsswdNewVisible(true);
        } else {
            psswd.type = "password";
            setPsswdNewVisible(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPassword || !password) {
            setError('Las contraseñas son obligatorias');
            setSuccess(false);
        } else {
            compareAndChangePassword(e, oldPassword, password);
        }
    }

    const cleanForm = () => {
        setPassword(null);
        setOldPassword(null);
        closeErrorAlert();
        setSuccess(false);
    }

    return (
        <Modal show={isOpen} onHide={() => { close(); cleanForm(); document.getElementById('img-header').click() }} animation={false}>
            <Modal.Header style={{ display: 'flex !important' }}>
                <Modal.Title>
                    Cambiar contraseña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    <div className="change-psswd-body">
                        <div className="change-psswd-container">
                            {error ? (<div className="login-alert" hidden={closeAlert}>
                                ERROR: {error}
                                <button className="login-alert-closebtn" onClick={closeErrorAlert}>&times;</button>
                            </div>) : <></>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <FaLock />
                                    <Form.Control id="old-password"
                                        name="oldPassword"
                                        type="password" placeholder="Contraseña actual" maxLength={30}
                                        onChange={(e) => {setOldPassword(e.target.value) }}
                                    />
                                    <BsFillEyeFill hidden={psswdOldVisible} className="password-eye" onClick={toogleOldPasswordIcon} />
                                    <BsFillEyeSlashFill hidden={!psswdOldVisible} className="password-eye" onClick={toogleOldPasswordIcon} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FaLock />
                                    <Form.Control id="new-password"
                                        name="password"
                                        type="password" placeholder="Nueva contraseña" maxLength={30}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <BsFillEyeFill hidden={psswdNewVisible} className="password-eye" onClick={toogleNewPasswordIcon} />
                                    <BsFillEyeSlashFill hidden={!psswdNewVisible} className="password-eye" onClick={toogleNewPasswordIcon} />
                                </Form.Group>
                                <Button id="submit-password" type="submit" style={{ display: 'none' }} >
                                    Confirmar
                                </Button>
                            </Form>
                        </div></div>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { close(); cleanForm() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Cancelar
                </Button>
                <Button onClick={() => { document.getElementById('submit-password').click() }} style={{ width: '50%', textAlign: 'center !important' }}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}