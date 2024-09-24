export default function FameBar({fama}) {
    return (
    <div className="fameBar-Container">
        <h1 style={{
            fontSize: 'var(--bs-nav-link-font-size)', 
            fontWeight: 'var(--bs-nav-link-font-weight)',
            margin: '1% 0'
        }}>
            Fama del club nocturno
        </h1>
        <progress className="progress is-link" value={fama} max="100"></progress>
    </div>
    )
}