import { useState } from 'react';
import { Button, Modal, Alert, Form } from 'react-bootstrap';
import useAuth from '../../../auth/useAuth';
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"; // eye icons
import { ring } from 'ldrs'; // loader

ring.register('login-ldr');

function CambiarPassword({ isOpen, close }) {

    const { changePassword, error, setError } = useAuth();

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [psswdOldVisible, setPsswdOldVisible] = useState(false);
    const [psswdNewVisible, setPsswdNewVisible] = useState(false);

    const cleanForm = () => {
        setPassword('');
        setOldPassword('');
        setError(null);
        setShowLoader(false);
        setPsswdOldVisible(false);
        setPsswdNewVisible(false);
    }

    const handleClose = () => {
        cleanForm();
        close();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!oldPassword || !password) {
            setError('Las contraseñas son obligatorias');
            return;
        }
        setShowLoader(true);
        const changed = await changePassword(oldPassword, password);
        setShowLoader(false);
        if (changed) handleClose(); // al cambiarla con éxito se cierra la modal
    }

    return (
        <Modal show={isOpen} onHide={handleClose} animation={false}>
            <Modal.Header style={{ display: 'flex' }} className='change-psswd-header'>
                <Modal.Title>
                    Cambiar contraseña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert className='custom-alert'>
                    <div className="change-psswd-body">
                        <div className="change-psswd-container">
                            {error && (
                                <div className="login-alert">
                                    ERROR: {error}
                                    <button className="login-alert-closebtn" onClick={() => setError(null)}>&times;</button>
                                </div>
                            )}
                            <Form id="change-password-form" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <FaLock />
                                    <Form.Control
                                        name="currentPassword" autoComplete="current-password"
                                        type={psswdOldVisible ? 'text' : 'password'} placeholder="Contraseña actual" maxLength={128}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    {psswdOldVisible
                                        ? <BsFillEyeSlashFill className="password-eye" onClick={() => setPsswdOldVisible(false)} />
                                        : <BsFillEyeFill className="password-eye" onClick={() => setPsswdOldVisible(true)} />}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FaLock />
                                    <Form.Control
                                        name="newPassword" autoComplete="new-password"
                                        type={psswdNewVisible ? 'text' : 'password'} placeholder="Nueva contraseña (mínimo 8 caracteres)" maxLength={128}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {psswdNewVisible
                                        ? <BsFillEyeSlashFill className="password-eye" onClick={() => setPsswdNewVisible(false)} />
                                        : <BsFillEyeFill className="password-eye" onClick={() => setPsswdNewVisible(true)} />}
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </Alert>
            </Modal.Body>
            <Modal.Footer className='change-psswd-footer'>
                <Button onClick={handleClose} style={{ width: '50%', textAlign: 'center' }}>
                    Cancelar
                </Button>
                <Button type="submit" form="change-password-form" disabled={showLoader} style={{ width: '50%', textAlign: 'center' }}>
                    {showLoader ? (
                        <div className='login-loader-div'>
                            <login-ldr color="var(--purple-dark)" size='15' stroke='3'></login-ldr>
                            &nbsp;Cargando...
                        </div>
                    ) : (<div>Confirmar</div>)}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CambiarPassword;
