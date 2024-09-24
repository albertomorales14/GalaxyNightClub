import { createContext, useState } from 'react';
import roles from '../Utils/roles';
import { useNavigate } from "react-router-dom";
import logService from '../Utils/logService';

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    const history = useNavigate(); // Hook

    const [user, setUser] = useState(null);

    const loginAdminTest = () => {
        setUser({
            username: 'Cutiti007', password: '123', role: roles.admin,
            club: "66e49d559bdb5e631a4fde59"
        });
    }

    const [error, setError] = useState(null);
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
                        setError(null);
                    }
                }
            })
            .catch((error) => {
                // Handle any errors
                logService.sendLog('error', ' [LOGIN] [AuthProvider] A problem occurred with your fetch operation: ', error)
                console.log('A problem occurred with your fetch operation: ', error)
            });
    }

    const logout = () => setUser(null);

    const isLogged = () => !!user; // doble negacion retorna true
    const hasRole = (role) => user?.role === role;

    // se envian las varibles al contextValue para poder consumirlas
    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,
        error,
        setError,
        loginAdminTest
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}