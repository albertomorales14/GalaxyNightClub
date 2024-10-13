import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tecnicos from './Tecnicos';
import TecnicosLoaders from './TecnicosLoaders';
import ProductosAlmacen from './ProductosAlmacen';
import AlmacenSummary from './AlmacenSummary';
import useAuth from '../../auth/useAuth';
import logService from '../../Utils/logService';

function GestionAlmacenPage() {

    const { club, getClub } = useAuth();
    const [tecnicos, setTecnicos] = useState([]);
    const [actualizarLista, setActualizarLista] = useState(false);
    const [loading, setLoading] = useState(true);

    const [focus, setFocus] = useState('tecnico1');

    const handleClick = (list) => {
        if (list?.estado !== 'BLOQUEADO' && list?.estado !== 'NO CONTRATADO') {
            setFocus(list?.name)
        }
    };

    useEffect(() => {
        getClub();
        fetch(`http://localhost:5050/api/Tecnicos/Club/${club?._id}`)
            .then(response => response.json())
            .then(data => {
                setTecnicos(data);
                setLoading(false);
                setActualizarLista(false);
                logService.sendLog('info', '[GET Request] getTecnicos: Lista de Tecnicos (GestionAlmacenPage.js)');
            })
            .catch(error => {
                logService.sendLog('error', 'Error: [GET Request] getTecnicos: Lista de Tecnicos (GestionAlmacenPage.js): ' + error);
            });
    }, [actualizarLista]) // dependencia variable de estado lista

    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }}>
            <Container>
                <Row style={{ marginBottom: '8px' }}>
                    <div className="tecnicos-title">
                        <h1 style={{ fontSize: 'var(--bs-nav-link-font-size)', fontWeight: 'var(--bs-nav-link-font-weight)', margin: '1% 0' }}>
                            Técnicos del almacén
                        </h1>
                    </div>
                </Row>
                {loading ? (<TecnicosLoaders />) : (<Tecnicos tecnicos={tecnicos} focus={focus} handleClick={handleClick} actualizar={setActualizarLista} />)}
                <Row style={{ marginTop: '0.5rem' }}>
                    <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                        Selecciona a técnicos del almacén y asígnalos a un tipo de producto disponible
                        para su gestión. Para poder asignarles un tipo de producto, el negocio asociado
                        debe estar en activo. Los técnicos asignados acumularán productos en el
                        almacén del club nocturno automáticamente con el tiempo.
                    </p>
                </Row>
                <Row>
                    <ProductosAlmacen tecnicos={tecnicos} focus={focus} />
                </Row>
            </Container>
            <hr />
            <Container>
                <Row>
                    <AlmacenSummary tecnicos={tecnicos} club={club} />
                </Row>
            </Container>
        </div>
    )
}

export default GestionAlmacenPage;