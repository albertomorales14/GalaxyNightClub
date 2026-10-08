// Bloque animado que ocupa el sitio del contenido mientras se carga
function Skeleton({ width = '100%', height = '1rem', className = '', style }) {
    return (
        <span
            className={`skeleton ${className}`}
            style={{ width, height, ...style }}
            aria-hidden="true"
        />
    );
}

export default Skeleton;
