import { useCallback, useEffect, useState } from 'react';
import logService from '../Utils/logService';

// Carga datos de la API al montar el componente y permite recargarlos.
// `fetcher` debe ser una función estable (p. ej. productosApi.list).
export default function useApiData(fetcher, initialData) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [version, setVersion] = useState(0);

    useEffect(() => {
        let active = true; // evita actualizar el estado si el componente se desmonta antes de responder
        fetcher()
            .then(result => {
                if (active) setData(result);
            })
            .catch(error => {
                logService.sendLog('error', 'Error al cargar datos: ' + error.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, [fetcher, version]);

    const reload = useCallback(() => setVersion(v => v + 1), []);

    return { data, loading, reload };
}
