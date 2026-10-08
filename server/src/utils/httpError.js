// Error con código HTTP, lo traduce a respuesta el middleware errorHandler
class HttpError extends Error {
    constructor(status, message, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}

module.exports = HttpError;
