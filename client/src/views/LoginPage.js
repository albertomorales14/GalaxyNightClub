import { useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa"; // user icon
import { FaLock } from "react-icons/fa6"; // password icon
import { BsFillEyeFill } from "react-icons/bs"; // open eye icon
import { BsFillEyeSlashFill } from "react-icons/bs"; // close eye icon

export default function LoginPage() {

    const location = useLocation(); // Hook
    const { login, loginAdminTest, error, setError } = useAuth();

    useEffect(() => {
        if (error !== null) {
            open();
        }
    }, [error])

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [closeAlert, setCloseAlert] = useState(true)
    const open = () => setCloseAlert(false)
    const close = () => {
        setCloseAlert(true);
        setError(null)
    }

    const [psswdVisible, setPsswdVisible] = useState(false)
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

    return (<>
        <div className="login-body">
            <div className="login-container">
                <h2 className="text-center">Galaxy NightClub</h2>
                <div className="login-alert" hidden={closeAlert}>
                    ERROR: {error}
                    <button className="login-alert-closebtn" onClick={close}>&times;</button>
                </div>
                <Form onSubmit={(e) => login(e, username, password, location.state?.from)}>


                    <Form.Group className="mb-3" controlId="controlId.User">

                        <FaUser />
                        <Form.Control
                            name="user"
                            type="text" placeholder="Usuario" maxLength={30}
                            onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <FaLock />
                        <Form.Control id="login-password"
                            name="password"
                            type="password" placeholder="Contraseña" maxLength={30}
                            onChange={(e) => setPassword(e.target.value)} />
                            {}
                        <BsFillEyeFill hidden={psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                        <BsFillEyeSlashFill hidden={!psswdVisible} className="password-eye" onClick={tooglePasswordIcon} />
                    </Form.Group>



                    <div className="text-center">
                        <Button className="login-btn" variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                        <Button id="register-btn" type="submit" onClick={loginAdminTest}>
                            Crear cuenta
                        </Button>
                    </div>

                </Form>


            </div>
        </div>
    </>)
}