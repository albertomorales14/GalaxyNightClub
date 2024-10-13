import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import useAuth from "../auth/useAuth";
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon

function RegisterPage(props) {

    const { createUser, error, setError, setSuccess } = useAuth();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // Carga el error de auth cada vez que lo detecte
    useEffect(() => {
        if (error !== null) {
            open();
        }
    }, [error]) // dependencia de error

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
        var psswd = document.getElementById("login-password");
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
        } else {
            createUser(e, username, password);
        }
    }

    return (
        <>

            <Modal show={props.isOpen} onHide={props.close} animation={false} className='register-modal'>
                <Modal.Header>
                    <Modal.Title>Crear nueva cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert className='custom-alert'>
                        <div className="register-body">
                            <div className="register-container">
                                <div className="login-alert" hidden={closeAlert}>
                                    ERROR: {error}
                                    <button className="login-alert-closebtn" onClick={close}>&times;</button>
                                </div>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group className="mb-3" controlId="controlId.newUser">
                                        <FaUser />
                                        <Form.Control
                                            name="user"
                                            type="text" placeholder="Usuario" maxLength={30}
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
                                        <Button id="submit-new-password" style={{ display: 'none' }} className="login-btn" variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.close} style={{ width: '50%', textAlign: 'center !important' }}>
                        Cancelar
                    </Button>
                    <Button onClick={() => { document.getElementById('submit-new-password').click() }} style={{ width: '50%', textAlign: 'center !important' }}>
                        Crear cuenta
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegisterPage;