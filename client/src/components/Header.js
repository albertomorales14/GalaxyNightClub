import { useState, useEffect } from 'react';
import useAuth from "../auth/useAuth";

function Header({ showSettings, layoutRef }) {

    const { user } = useAuth();
    const [src, setSrc] = useState(user ? `${process.env.REACT_APP_RENDER_URL}/uploads/img/${user.imagen}` : '/img/user/profile-default.png');

    useEffect(() => {
        setSrc(`${process.env.REACT_APP_RENDER_URL}/uploads/img/${user.imagen}`);
    }, [user]);

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
            <img id="img-header" ref={layoutRef} className="header-img" src={src} alt="user-photo" onClick={showSettings} />
        </div>
    )
}

export default Header;