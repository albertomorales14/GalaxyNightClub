import Skeleton from './Skeleton';

// Esqueleto genérico de una página mientras se descarga su código
function PageSkeleton() {
    return (
        <div className="main-common-container" style={{ margin: '8px', marginLeft: '0' }} aria-busy="true" aria-label="Cargando">
            <Skeleton height="2.5rem" style={{ marginBottom: '1rem' }} />
            {Array.from({ length: 4 }, (_, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <Skeleton width="70%" />
                    <Skeleton width="30%" />
                </div>
            ))}
            <Skeleton height="40vh" style={{ marginTop: '1rem' }} />
        </div>
    );
}

export default PageSkeleton;
