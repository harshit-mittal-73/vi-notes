import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';
import './Navbar.css';

export default function Navbar() {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const isLoggedIn = user !== null || document.cookie.includes('token=');

    const onLogout = async () => {
        try {
            await handleLogout();
            navigate('/login');
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Vi-Notes</Link>
            </div>
            {isLoggedIn && (
                <div className="navbar-links">
                    <button 
                        onClick={onLogout} 
                        className="nav-link" 
                        style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent', color: 'yellow', fontSize: '1rem', fontWeight: 500 }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
