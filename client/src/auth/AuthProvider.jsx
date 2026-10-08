import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { authApi, clubApi, setUnauthorizedHandler } from '../api';
import logService from '../Utils/logService';

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true); // comprobando si hay una sesión abierta

    // Errores y avisos que muestran los formularios
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const clearSession = useCallback(() => {
        setUser(null);
        setClub({});
    }, []);

    // Al cargar la aplicación se recupera la sesión si la cookie sigue siendo válida
    useEffect(() => {
        setUnauthorizedHandler(clearSession);
        authApi.me()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, [clearSession]);

    // Datos del club del usuario
    const refreshClub = useCallback(async () => {
        try {
            const data = await clubApi.get();
            setClub(data);
            return data;
        } catch (err) {
            logService.sendLog('error', 'refreshClub (AuthProvider): ' + err.message);
            return null;
        }
    }, []);

    // Al iniciar sesión se cargan los datos del club
    const userId = user?._id;
    useEffect(() => {
        if (!userId) return;
        clubApi.get()
            .then(setClub)
            .catch(err => logService.sendLog('error', 'Error al cargar el club (AuthProvider): ' + err.message));
    }, [userId]);

    // Iniciar sesión
    const login = useCallback(async (username, password) => {
        try {
            const data = await authApi.login(username, password);
            setError(null);
            setUser(data);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Cerrar sesión
    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch (err) {
            logService.sendLog('warn', 'logout (AuthProvider): ' + err.message);
        }
        clearSession();
    }, [clearSession]);

    // Crear cuenta: devuelve true si se ha creado
    const createUser = useCallback(async (username, password) => {
        try {
            await authApi.register(username, password);
            setError(null);
            setSuccess(true);
            return true;
        } catch (err) {
            setError(err.message);
            setSuccess(false);
            return false;
        }
    }, []);

    // Eliminar la cuenta y todos los datos del club
    const deleteAccount = useCallback(async () => {
        await authApi.deleteAccount();
        clearSession();
    }, [clearSession]);

    // Cambiar contraseña comprobando la actual en el servidor: devuelve true si se ha cambiado
    const changePassword = useCallback(async (currentPassword, newPassword) => {
        try {
            await authApi.changePassword(currentPassword, newPassword);
            setError(null);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, []);

    // Cambiar la imagen de perfil
    const updateAvatar = useCallback(async (file) => {
        const data = await authApi.updateAvatar(file);
        setUser(data);
    }, []);

    const contextValue = useMemo(() => ({
        user, loading, isLogged: Boolean(user),
        login, logout, createUser, deleteAccount, changePassword, updateAvatar,
        club, refreshClub,
        error, setError,
        success, setSuccess
    }), [user, loading, login, logout, createUser, deleteAccount, changePassword, updateAvatar, club, refreshClub, error, success]);

    return (
        <AuthContext value={contextValue}>
            {children}
        </AuthContext>
    );
}

export default AuthProvider;
