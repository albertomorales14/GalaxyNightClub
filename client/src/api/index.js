import { http } from './client';

export { ApiError, setUnauthorizedHandler } from './client';

export const authApi = {
    me: () => http.get('/auth/me'),
    login: (username, password) => http.post('/auth/login', { username, password }),
    register: (username, password) => http.post('/auth/register', { username, password }),
    logout: () => http.post('/auth/logout'),
    changePassword: (currentPassword, newPassword) => http.put('/auth/password', { currentPassword, newPassword }),
    updateAvatar: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return http.put('/auth/avatar', formData);
    },
    deleteAccount: () => http.delete('/auth/account')
};

export const clubApi = {
    get: () => http.get('/club'),
    update: (changes) => http.patch('/club', changes)
};

// Recursos del club de la sesión: GET para listar, PATCH /:id para actualizar
const clubResource = (name) => ({
    list: () => http.get(`/${name}`),
    update: (id, changes) => http.patch(`/${name}/${id}`, changes)
});

export const djsApi = clubResource('djs');
export const ingresosApi = clubResource('ingresos');
export const mejorasApi = clubResource('mejoras');
export const productosApi = clubResource('productos');
export const tecnicosApi = clubResource('tecnicos');

export const logsApi = {
    send: (level, message) => http.post('/logs', { level, message })
};
