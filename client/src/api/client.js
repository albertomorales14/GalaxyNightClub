// Cliente HTTP único para toda la aplicación: añade la cookie de sesión,
// serializa JSON y convierte las respuestas de error en excepciones ApiError.

const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export class ApiError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.errors = errors;
    }
}

// Se llama cuando el servidor responde 401 (sesión caducada) en una ruta protegida
let unauthorizedHandler = null;
export const setUnauthorizedHandler = (handler) => {
    unauthorizedHandler = handler;
};

async function request(path, { method = 'GET', body } = {}) {
    const isFormData = body instanceof FormData;

    let response;
    try {
        response = await fetch(`${API_URL}/api${path}`, {
            method,
            credentials: 'include',
            headers: body !== undefined && !isFormData ? { 'Content-Type': 'application/json' } : undefined,
            body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body)
        });
    } catch {
        throw new ApiError(0, 'No se ha podido conectar con el servidor');
    }

    const data = response.status === 204 ? null : await response.json().catch(() => null);

    if (!response.ok) {
        if (response.status === 401 && !path.startsWith('/auth/')) {
            unauthorizedHandler?.();
        }
        throw new ApiError(response.status, data?.message || 'Error inesperado del servidor', data?.errors);
    }
    return data;
}

export const http = {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body }),
    put: (path, body) => request(path, { method: 'PUT', body }),
    patch: (path, body) => request(path, { method: 'PATCH', body }),
    delete: (path) => request(path, { method: 'DELETE' })
};
