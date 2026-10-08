import useAuth from "../auth/useAuth";
import { DEFAULT_PROFILE_IMAGE } from '../Utils/profileImage';

function Header({ showSettings, layoutRef }) {

    const { user } = useAuth();

    return (
        <div className="header">
            <h3 style={{
                fontSize: 'var(--bs-nav-link-font-size)',
                fontWeight: 'var(--bs-nav-link-font-weight)',
                flex: '1',
                padding: '0 10px',
                alignContent: 'center',
                textShadow: '2px 2px 1px black',
                marginBottom: '0'
            }}>
                Sesión iniciada como: <span style={{ color: 'var(--purple-light)' }}>{user.username}</span>
            </h3>
            <img id="img-header" ref={layoutRef} className="header-img"
                src={user.imagenUrl || DEFAULT_PROFILE_IMAGE} alt="Imagen de perfil" onClick={showSettings} />
        </div>
    )
}

export default Header;
