import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import useAuth from "../auth/useAuth";
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon
import { ring } from 'ldrs'; // loader
import logService from '../Utils/logService';
import ALERT from '../Utils/alertMessages';

function RegisterPage(props) {

    const { createUser, error, setError, success, setSuccess } = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    ring.register('register-ldr');
    const [showLoader, setShowLoader] = useState(false);

    // Carga el error de auth cada vez que lo detecte
    useEffect(() => {
        if (error !== null) {
            setShowLoader(false);
            open();
        }
    }, [error]) // dependencia de error

    // Carga el success de auth cada vez que lo detecte
    useEffect(() => {
        if (success) {
            closeModal();
            setError(ALERT.SUCCESS);
            
            props.setUser(username);
            document.getElementById("controlId.User").value = username;
            
            props.setPsswd(password);
            document.getElementById("login-password").value = password;
        }
    }, [success]) // dependencia de exito

    // Error Alert
    const [closeAlert, setCloseAlert] = useState(true);
    const open = () => setCloseAlert(false);
    const close = () => {
        setCloseAlert(true);
        setError(null);
    }

    // Ocultar-Mostrar contraseña (eye icon)
    const [psswdVisible, setPsswdVisible] = useState(false);
    const tooglePasswordIcon = () => {
        var psswd = document.getElementById("register-password");
        if (psswd.type === "password") {
            psswd.type = "text";
            setPsswdVisible(true);
        } else {
            psswd.type = "password";
            setPsswdVisible(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            setError('La contraseña es obligatoria');
            setSuccess(false);
            logService.sendLog('warn', 'Validation Error: La contraseña es obligatoria (RegisterPage.js)');
        } else {
            if (!username) {
                setError('El usuario es obligatorio');
                setSuccess(false);
                logService.sendLog('warn', 'Validation Error: El usuario es obligatorio (RegisterPage.js)');
            } else {
                createUser(e, username, password);
                setShowLoader(true);
            }
        }
    }

    const closeModal = () => {
        setUsername(null);
        setPassword(null);
        setError(null);
        setShowLoader(false);
        props.close();
    }

    return (
        <>
            <Modal show={props.isOpen} onHide={closeModal} animation={false} className='register-modal'>
                <Modal.Header className='register-header'>
                    <Modal.Title>Crear nueva cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert className='custom-alert register-alert'>
                        <div className="register-body">
                            <div className="register-container">
                                {error ? (<div className="login-alert" hidden={closeAlert}>
                                    ERROR: {error}
                                    <button className="login-alert-closebtn" onClick={close}>&times;</button>
                                </div>) : <></>}
                                <div hidden={!showLoader} className='register-loader-div'>
                                    <register-ldr color="var(--purple-dark)" size='100' stroke='10'></register-ldr>
                                </div>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3" controlId="controlId.newUser">
                                        <FaUser />
                                        <Form.Control
                                            name="user"
                                            type="text" placeholder="Usuario" maxLength={30}
                                            autocomplete="off"
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <FaLock />
                                        <Form.Control id="register-password"
                                            name="password"
                                            type="password" placeholder="Contraseña" maxLength={30}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <BsFillEyeFill hidden={psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                                        <BsFillEyeSlashFill hidden={!psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button id="submit-registro" style={{ display: 'none' }} className="login-btn" variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Alert>
                </Modal.Body>
                <Modal.Footer className='register-footer'>
                    <Button onClick={closeModal} style={{ width: '50%', textAlign: 'center !important' }}>
                        Cancelar
                    </Button>
                    <Button onClick={() => { document.getElementById('submit-registro').click() }} style={{ width: '50%', textAlign: 'center !important' }}>
                        {showLoader ? (<>Creando cuenta...</>) : (<>Crear cuenta</>)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterPage;