import useAuth from '../auth/useAuth';

function Home() {

    const { club } = useAuth();

    return (
        <div className="homeLayout">
            <div id="slider">
                <figure>
                    <img className="homeImg" src="/img/home/galaxy-logo.webp" alt="logo-galaxy" />
                    <img className="homeImg" src="/img/home/del-perro-club.webp" alt="del-perro-club" />
                </figure>
            </div>
            <div className="homeInfo">
                <p className="homeInfo-color-primary">PROPIETARIO</p>
                <p className="homeInfo-color-secondary">{club.propietario}</p>
                <br />
                <p className="homeInfo-color-primary">UBICACIÓN</p>
                <p className="homeInfo-color-secondary">{club.ubicacion}</p>
            </div>
        </div>
    )
}

export default Home;
