import { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import roles from '../Utils/roles';
import logService from '../Utils/logService';

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const history = useNavigate(); // Hook
    const [user, setUser] = useState(null);

    const loginAdminTest = () => {
        setUser({
            username: 'Cutiti007', password: '123', role: roles.admin,
            club: "66e49d559bdb5e631a4fde59"
        });
    }

    // Errores de credenciales
    const [error, setError] = useState(null);

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
            .then((response) => { return response.json() })
            .then((data) => {
                if (data.errors) {
                    data.errors.forEach(error => {
                        logService.sendLog('warn', JSON.stringify(error))
                        console.log(error.msg);
                        setError(error.msg)
                    });
                } else {
                    if (data === "Contraseña incorrecta") {
                        logService.sendLog('warn', data)
                        console.log(data)
                        setError('La contraseña es incorrecta')
                    } else if (data === "No existe este usuario") {
                        logService.sendLog('warn', data)
                        console.log(data)
                        setError('El usuario ' + user + ' no existe')
                    } else {
                        // SUCCESS
                        logService.sendLog('info', 'SUCCESS [LOGIN] [AuthProvider.js]')
                        logService.sendLog('info', JSON.stringify(data))
                        setUser(data);
                        setError(null); // Sin errores en login
                    }
                }
            })
            .catch((error) => {
                // Handle any errors
                logService.sendLog('error', ' [LOGIN] [AuthProvider] A problem occurred with your fetch operation: ', error)
                console.log('A problem occurred with your fetch operation: ', error)
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
            logService.sendLog('info', 'SUCCESS [LOGOUT] [AuthProvider.js]')
        } catch (error) {
            logService.sendLog('error', ' [LOGOUT] [AuthProvider] A problem occurred with your fetch operation: ', error)
            console.error('Error en el logout:', error);
        }
    };

    const isLogged = () => !!user; // doble negacion retorna true
    const hasRole = (role) => user?.role === role;

    const changePassword = (e, password) => {
        

        alert('metodo changePasssword id: ' + user._id)
        e.preventDefault()
        fetch(`http://localhost:5050/api/Usuarios/${user._id}`, {
            method: 'PUT',
                body: JSON.stringify({
                    password: password,
                }),
                headers: { "Content-type": "application/json; charset=UTF-8", },
        }).then(response => response.json())
            .catch((error) => console.log(error))
    }

    const updateUser = (data) => {
        if (user) {
            fetch(`http://localhost:5050/api/Usuarios/${user._id}`, {
                method: 'PUT',
                    body: JSON.stringify({
                        ...data
                    }),
                    headers: { "Content-type": "application/json; charset=UTF-8", },
            }).then(response => response.json())
                .catch((error) => console.log(error))
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
        setError,
        loginAdminTest,
        changePassword,
        updateUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;