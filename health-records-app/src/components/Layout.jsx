import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    toast.info('Uspešno ste se odjavili.');
    navigate('/login');
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">♥</span>
          <div><strong>Zdravstveni</strong><span>Dnevnik</span></div>
        </div>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/records">Evidencije</NavLink>
          <NavLink to="/records/new">+ Nova evidencija</NavLink>
          <NavLink to="/reminders">Podsetnici</NavLink>
          <NavLink to="/statistics">Statistika</NavLink>
        </nav>
        <div className="user-box">
          <div className="avatar">{(user?.displayName || user?.email || 'U')[0].toUpperCase()}</div>
          <div className="user-text"><strong>{user?.displayName || 'Korisnik'}</strong><small>{user?.email}</small></div>
          <button className="ghost-button" onClick={handleLogout}>Odjava</button>
        </div>
      </aside>
      <main className="main-content"><Outlet /></main>
    </div>
  );
}
