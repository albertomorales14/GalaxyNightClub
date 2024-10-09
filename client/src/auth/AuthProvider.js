import { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import roles from '../Utils/roles';
import logService from '../Utils/logService';

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const history = useNavigate(); // Hook
    const [user, setUser] = useState(null);
    const [club, setClub] = useState([]);

    const loginAdminTest = () => {
        setUser({
            username: 'Cutiti007', password: '123', role: roles.admin,
            club: "66e49d559bdb5e631a4fde59"
        });
    }

    // Errores de credenciales
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Iniciar sesión
    const login = (e, user, psswd, fromLocation) => {
        e.preventDefault()

        if (fromLocation) {
            history.push(fromLocation);
        }

        fetch('http://localhost:5050/login', {
            method: 'POST',
            credentials: "include", // Incluir cookies en la solicitud
            headers: {
                Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user,
                password: psswd
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    data.errors.forEach(error => {
                        logService.sendLog('warn', 'Validation Error: Login (AuthProvider.js): ' + error.msg);
                        setError(error.msg);
                    });
                } else {
                    if (data === "Contraseña incorrecta") {
                        logService.sendLog('warn', '[POST Request] Login: ' + data + ' (AuthProvider.js)');
                        setError('La contraseña es incorrecta');
                    } else if (data === "No existe este usuario") {
                        logService.sendLog('warn', '[POST Request] Login: ' + data + ' (AuthProvider.js)');
                        setError('El usuario ' + user + ' no existe');
                    } else {
                        // SUCCESS
                        logService.sendLog('info', '[POST Request] Login: SUCCESS (AuthProvider.js)');
                        setUser(data);
                        setError(null); // Sin errores en login
                    }
                }
            })
            .catch(error => {
                logService.sendLog('error', 'Error [POST Request] Login (AuthProvider.js) : ', error);
            });
    }

    // Cerrar sesión
    const logout = async () => {
        try {
            fetch('http://localhost:5050/logout', {
                method: 'POST',
                credentials: "include", // Incluir cookies en la solicitud
                headers: {
                    Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
                }
            })
            setUser(null); // Limpiar el estado del usuario
            logService.sendLog('info', '[POST Request] Logout (AuthProvider.js)');
        } catch (error) {
            logService.sendLog('error', 'Error: [POST Request] Logout (AuthProvider.js): ', error);
        }
    };

    const isLogged = () => !!user; // doble negacion retorna true
    const hasRole = (role) => user?.role === role;

    // getUserClub
    const getClub = (page) => {
        fetch(`http://localhost:5050/api/Club/${user?.club}`)
            .then(response => response.json())
            .then(data => {
                setClub(data);
                logService.sendLog('info', '[GET Request] getClub: Lista de Club (' + page + ')');
            })
            .catch(error => {
                logService.sendLog('error', 'Error: [GET Request] getClub: Lista de Club (' + page + '): ' + error);
            });
    }

    const changePassword = (e, password) => {
        e.preventDefault()
        fetch(`http://localhost:5050/api/Usuarios/${user._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                password: password,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    data.errors.forEach(error => {
                        logService.sendLog('warn', 'changePassword (AuthProvider.js) Error validation: ' + error.msg);
                        setError(error.msg);
                    });
                } else {
                    logService.sendLog('info', 'changePassword (AuthProvider.js) ' + data.message);
                    setError(null); // Sin errores
                    setSuccess(true);
                }
            })
            .catch(error => console.log(error))
    }

    const comprobarPassword = (e, password, newPassword) => {
        e.preventDefault();
        try {
            fetch('http://localhost:5050/comparePassword', {
                method: 'POST',
                credentials: "include", // Incluir cookies en la solicitud
                headers: {
                    Accept: "application/json, text/plain, */*", "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user?.username,
                    password: password
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data === "ERROR") {
                        logService.sendLog('warn', 'comprobarPassword (AuthProvider.js) La contraseña no coincide con tu contraseña');
                        setError('La contraseña no coincide con tu contraseña');
                    } else {
                        // SUCCESS
                        logService.sendLog('info', 'comprobarPassword (AuthProvider.js) Las contraseñas coinciden');
                        changePassword(e, newPassword);
                    }
                })
        } catch (error) {
            logService.sendLog('error', 'comprobarPassword (AuthProvider.js) A problem occurred with your fetch operation: ', error);
        }
    }

    const getUser = (user) => {
        if (user) {
            fetch(`http://localhost:5050/api/Usuarios/${user._id}`, {
                method: 'GET',
                headers: { "Content-type": "application/json; charset=UTF-8", },
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    //console.log('[Club fama] GET llamada a API...');
                    //logService.sendLog('info', '[GET] Llamada a la API: Lista de Club (Header.js)');
                })
                .catch(error => {
                    //console.log('A problem occurred with your fetch operation: ', error);
                    //logService.sendLog('error', '[GET] Llamada a la API: Actualizar Club (Header.js): ' + error);
                });
        }
    }

    const updateUser = (data) => {
        if (user) {
            fetch(`http://localhost:5050/api/Usuarios/upload/${user._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...data
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => {
                response.json();
                logService.sendLog('info', 'updateUser (AuthProvider.js) Usuario actualizado');
            }).catch(error => {
                logService.sendLog('error', 'updateUser (AuthProvider.js) Error al actualizar usuario: ' + error);
            })
            getUser(user);
        }
    }

    // se envian las varibles al contextValue para poder consumirlas
    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,
        error,
        success,
        setError,
        setSuccess,
        loginAdminTest,
        changePassword,
        comprobarPassword,
        updateUser,
        getUser,
        getClub,
        club
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;