import { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import useAuth from "../auth/useAuth";
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"; // eye icons
import { ring } from 'ldrs'; // loader

ring.register('register-ldr');

function RegisterPage({ isOpen, close, onRegistered }) {

    const { createUser, error, setError } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [psswdVisible, setPsswdVisible] = useState(false);

    const closeModal = () => {
        setUsername('');
        setPassword('');
        setError(null);
        setShowLoader(false);
        setPsswdVisible(false);
        close();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username) {
            setError('El usuario es obligatorio');
        } else if (!password) {
            setError('La contraseña es obligatoria');
        } else {
            setShowLoader(true);
            const created = await createUser(username, password);
            setShowLoader(false);
            if (created) {
                const credentials = [username, password];
                closeModal();
                onRegistered(...credentials);
            }
        }
    }

    return (
        <Modal show={isOpen} onHide={closeModal} animation={false} className='register-modal'>
            <Modal.Header className='register-header'>
                <Modal.Title>Crear nueva cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert register-alert'>
                    <div className="register-body">
                        <div className="register-container">
                            {error && (
                                <div className="login-alert">
                                    ERROR: {error}
                                    <button className="login-alert-closebtn" onClick={() => setError(null)}>&times;</button>
                                </div>
                            )}
                            <div hidden={!showLoader} className='register-loader-div'>
                                <register-ldr color="var(--purple-dark)" size='100' stroke='10'></register-ldr>
                            </div>
                            <Form id="register-form" onSubmit={handleSubmit}>

                                <Form.Group className="mb-3" controlId="controlId.newUser">
                                    <FaUser />
                                    <Form.Control
                                        name="username"
                                        type="text" placeholder="Usuario" maxLength={30}
                                        autoComplete="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="register-password">
                                    <FaLock />
                                    <Form.Control
                                        name="password"
                                        type={psswdVisible ? 'text' : 'password'} placeholder="Contraseña (mínimo 8 caracteres)" maxLength={128}
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {psswdVisible
                                        ? <BsFillEyeSlashFill className="password-eye" onClick={() => setPsswdVisible(false)} />
                                        : <BsFillEyeFill className="password-eye" onClick={() => setPsswdVisible(true)} />}
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Alert>
            </Modal.Body>
            <Modal.Footer className='register-footer'>
                <Button onClick={closeModal} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button type="submit" form="register-form" disabled={showLoader} style={{ width: '50%', textAlign: 'center' }}>
                    {showLoader ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterPage;
