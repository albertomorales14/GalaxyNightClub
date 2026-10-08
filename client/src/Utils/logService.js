import { logsApi } from '../api';

// Los mensajes informativos solo se muestran en la consola durante el desarrollo;
// los avisos y errores también se envían al servidor. Nunca lanza excepciones.
const logService = {
    sendLog: (level, message) => {
        const text = String(message).slice(0, 2000);

        if (level === 'info') {
            if (import.meta.env.DEV) console.info(text);
            return;
        }

        (level === 'error' ? console.error : console.warn)(text);
        logsApi.send(level === 'error' ? 'error' : 'warn', text).catch(() => {});
    }
};

export default logService;
