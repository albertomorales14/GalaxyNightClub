export default function Home({propietario, ubicacion}) {
    return (
        <div className="homeLayout">
            
            <div id="slider">
                
                <figure>
                    <img className="homeImg"
                        src="/img/galaxy-logo.png" 
                        alt="logo-galaxy"/>
                    <img className="homeImg"
                        src="/img/del-perro-club.jpg" 
                        alt="del-perro-club"/>
                </figure>
            </div>
            
            <div className="homeInfo">
                <p className="homeInfo-color-primary">PROPIETARIO</p>
                <p className="homeInfo-color-secondary">{propietario}</p>
                <br />
                <p className="homeInfo-color-primary">UBICACIÓN</p>
                <p className="homeInfo-color-secondary">{ubicacion}</p>
            </div>
        </div>
    )
}
