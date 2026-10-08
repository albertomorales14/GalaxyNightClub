import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tecnicos from './Tecnicos';
import TecnicosLoaders from './TecnicosLoaders';
import ProductosAlmacen from './ProductosAlmacen';
import AlmacenSummary from './AlmacenSummary';
import useAuth from '../../auth/useAuth';
import { tecnicosApi } from '../../api';
import useApiData from '../../hooks/useApiData';

function GestionAlmacenPage() {

    const { club, refreshClub } = useAuth();
    const { data: tecnicos, loading, reload: cargarTecnicos } = useApiData(tecnicosApi.list, []);
    const [focus, setFocus] = useState('tecnico1'); // técnico seleccionado

    useEffect(() => {
        refreshClub();
    }, [refreshClub]);

    const handleClick = (tecnico) => {
        if (tecnico?.estado !== 'BLOQUEADO' && tecnico?.estado !== 'NO CONTRATADO') {
            setFocus(tecnico?.name);
        }
    };

    const tecnicoSeleccionado = tecnicos.find(tecnico => tecnico.name === focus);

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
                {loading ? (<TecnicosLoaders />) : (<Tecnicos tecnicos={tecnicos} focus={focus} handleClick={handleClick} actualizarLista={cargarTecnicos} />)}
                <Row style={{ marginTop: '0.5rem' }}>
                    <p style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>
                        <abbr title='Icono de la persona'>Selecciona</abbr> a técnicos del almacén
                        y <abbr title='Icono del check'>asígnalos</abbr> a un tipo de producto disponible
                        para su gestión. Para poder asignarles un tipo de producto, el negocio asociado
                        debe estar en activo. Los técnicos asignados acumularán productos en el
                        almacén del club nocturno automáticamente con el tiempo.
                    </p>
                </Row>
                <Row>
                    <ProductosAlmacen tecnicos={tecnicos} tecnicoSeleccionado={tecnicoSeleccionado} actualizarLista={cargarTecnicos} />
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
