const logService = {
    sendLog: (level, message) => {
        fetch(`${process.env.REACT_APP_RENDER_URL}/log`, {  // Esto irá al backend, gracias al proxy del package.json
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ level, message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Log enviado al servidor:', data);
            })
            .catch(error => {
                console.error('Error al enviar el log:', error);
            });
    }
};

export default logService;