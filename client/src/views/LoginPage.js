import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { Button, Form } from 'react-bootstrap'; // Bootstrap
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon
import { FaLinkedin } from "react-icons/fa6"; // LinkedIn icon
import { IoLogoGithub } from "react-icons/io"; // GitHub icon
import RegisterPage from "./RegisterPage";

function LoginPage() {

    const location = useLocation(); // Hook location
    const { login, error, setError, setSuccess } = useAuth();

    // Carga el error de auth cada vez que lo detecte
    useEffect(() => {
        if (error !== null) {
            open();
        }
    }, [error]) // dependencia de error

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

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

    // Registro Modal
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
    const openRegisterModal = () => {
        setIsOpenRegisterModal(true);
        setError(null);
        setSuccess(false);
    };
    const closeRegisterModal = () => setIsOpenRegisterModal(false);

    return (
        <>
            <div className="login-body">
                <div className="login-container">
                    <h2 className="text-center">Galaxy NightClub</h2>
                    {error ? (<div className="login-alert" hidden={closeAlert}>
                        ERROR: {error}
                        <button className="login-alert-closebtn" onClick={close}>&times;</button>
                    </div>) : <></>}
                    <Form onSubmit={(e) => login(e, username, password, location.state?.from)}>

                        <Form.Group className="mb-3" controlId="controlId.User">
                            <FaUser />
                            <Form.Control
                                name="user"
                                type="text" placeholder="Usuario" maxLength={30}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <FaLock />
                            <Form.Control id="login-password"
                                name="password"
                                type="password" placeholder="Contraseña" maxLength={30}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <BsFillEyeFill hidden={psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                            <BsFillEyeSlashFill hidden={!psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                        </Form.Group>

                        <div className="text-center">
                            <Button className="login-btn" variant="primary" type="submit">
                                Iniciar sesión
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
                    <a href='https://github.com/albertomorales14' target="_blank"><IoLogoGithub /></a>
                    <a href='https://www.linkedin.com/in/alberto-morales-serrano-284056238/' target="_blank"><FaLinkedin /></a>
                </div>
            </div>
            <RegisterPage isOpen={isOpenRegisterModal} close={closeRegisterModal} />
        </>
    )
}

export default LoginPage;
