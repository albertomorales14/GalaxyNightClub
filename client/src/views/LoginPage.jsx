import { useState } from 'react';
import useAuth from "../auth/useAuth";
import { Button, Form } from 'react-bootstrap'; // Bootstrap
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock, FaLinkedin } from "react-icons/fa6"; // password & LinkedIn icons
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"; // eye icons
import { IoLogoGithub } from "react-icons/io"; // GitHub icon
import { ring } from 'ldrs'; // loader
import RegisterPage from "./RegisterPage";
import ALERT from '../Utils/alertMessages';

ring.register('login-ldr');

function LoginPage() {

    const { login, error, setError, setSuccess } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [psswdVisible, setPsswdVisible] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        await login(username, password);
        setShowLoader(false);
    }

    const openRegisterModal = () => {
        setIsOpenRegisterModal(true);
        setError(null);
        setSuccess(false);
    }

    // Tras crear la cuenta se rellenan los campos del login
    const onRegistered = (newUsername, newPassword) => {
        setUsername(newUsername);
        setPassword(newPassword);
        setError(ALERT.SUCCESS);
    }

    const alertClass = error === ALERT.SUCCESS ? 'success-login-alert'
        : error === ALERT.WARN ? 'warn-login-alert'
            : 'login-alert';

    return (
        <>
            <div className="login-body">
                <div className="login-container">
                    <h2 className="text-center">Galaxy NightClub</h2>
                    {error && !isOpenRegisterModal && (
                        <div className={alertClass}>
                            {alertClass === 'login-alert' ? 'ERROR: ' : ''}{error}
                            <button className="login-alert-closebtn" onClick={() => setError(null)}>&times;</button>
                        </div>
                    )}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="controlId.User">
                            <FaUser />
                            <Form.Control
                                name="username"
                                type="text" placeholder="Usuario" maxLength={30}
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="login-password">
                            <FaLock />
                            <Form.Control
                                name="password"
                                type={psswdVisible ? 'text' : 'password'} placeholder="Contraseña" maxLength={128}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {psswdVisible
                                ? <BsFillEyeSlashFill className="password-eye" onClick={() => setPsswdVisible(false)} />
                                : <BsFillEyeFill className="password-eye" onClick={() => setPsswdVisible(true)} />}
                        </Form.Group>

                        <div className="text-center">
                            <Button className="login-btn" variant="primary" type="submit" disabled={showLoader}>
                                {showLoader ? (
                                    <div className='login-loader-div'>
                                        <login-ldr color="var(--purple-dark)" size='15' stroke='3'></login-ldr>
                                        &nbsp;Cargando... por favor, espere.
                                    </div>
                                ) : (<div>Iniciar sesión</div>)}
                            </Button>
                            <Button id="register-btn" onClick={openRegisterModal}>
                                Crear cuenta
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            <div className='login-footer'>
                <p style={{ textShadow: '2px 2px 1px black' }}>Desarrollado por Alberto Morales</p>
                <div className='login-icons'>
                    <a target="_blank" rel="noopener noreferrer" href='https://github.com/albertomorales14' aria-label="GitHub"><IoLogoGithub /></a>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/alberto-morales-serrano-284056238/' aria-label="LinkedIn"><FaLinkedin /></a>
                </div>
            </div>
            <RegisterPage isOpen={isOpenRegisterModal} close={() => setIsOpenRegisterModal(false)} onRegistered={onRegistered} />
        </>
    )
}

export default LoginPage;
