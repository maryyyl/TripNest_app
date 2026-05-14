import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const C = {
    greenDark: '#4a7c59',
    peach: '#e8866a',
    beige: '#f5ede4',
    beigeDark: '#e8d5c4',
    brown: '#8b6245',
    text: '#3a3a2a',
    textMuted: '#7a7a6a',
    white: '#ffffff',
}

const links = [
    { to: '/gastronomy', label: 'Гастрономија', icon: 'fa-solid fa-utensils',activeColor:'#4a7c59' },
    { to: '/attractions', label: 'Атракции', icon: 'fa-solid fa-person-hiking',activeColor: '#7fa882', },
    { to: '/accommodations', label: 'Сместување', icon: 'fa-solid fa-house',activeColor: '#e8866a', },
    { to: '/contact', label: 'Контакт', icon: 'fa-solid fa-paper-plane',activeColor: '#4a7c59' },
]

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuthStore()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            backgroundColor: 'rgba(245, 237, 228, 0.97)',
            borderBottom: `1px solid ${C.beigeDark}`,
            boxShadow: '0 1px 8px rgba(0,0,0,0.07)',
            backdropFilter: 'blur(8px)',
        }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

                {/* Logo */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <span style={{ fontSize: '1.75rem' }}>🧭</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: C.greenDark }}>
            Trip<span style={{ color: C.peach }}>Nest</span><span style={{ color: C.brown }}>.mk</span>
          </span>
                </Link>

                {/* Nav links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {links.map(({ to, label, icon,activeColor }) => {
                        const active = location.pathname.startsWith(to)
                        return (
                            <Link
                                key={to}
                                to={to}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: active ? activeColor : 'transparent',
                                    color: active ? C.white : C.text,
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = C.beigeDark }}
                                onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
                            >
                                <i className={icon} style={{ fontSize: '0.85rem' }} />
                                {label}
                            </Link>
                        )
                    })}

                    {/* Admin link */}
                    {user?.role === 'ADMIN' && (
                        <Link
                            to="/admin"
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                backgroundColor: location.pathname === '/admin' ? C.brown : 'transparent',
                                color: location.pathname === '/admin' ? C.white : C.brown,
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { if (location.pathname !== '/admin') e.currentTarget.style.backgroundColor = C.beigeDark }}
                            onMouseLeave={e => { if (location.pathname !== '/admin') e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                            <i className="fa-solid fa-gear" style={{ fontSize: '0.85rem' }} />
                            Admin
                        </Link>
                    )}
                </div>

                {/* Auth */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {isAuthenticated ? (
                        <>
              <span style={{ fontSize: '0.875rem', color: C.greenDark, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <i className="fa-solid fa-circle-user" style={{ fontSize: '1rem',color:C.greenDark}} />
                  {user?.username}
              </span>
                            <button
                                onClick={() => { logout();}}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: C.textMuted, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                            >
                                <i className="fa-solid fa-right-from-bracket" style={{ fontSize: '0.85rem' }} />
                                Одјави се
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', color: C.greenDark, textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <i className="fa-solid fa-right-to-bracket" style={{ fontSize: '0.85rem' }} />
                                Најава
                            </Link>
                            <Link to="/register" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: C.greenDark, color: C.white, borderRadius: '9999px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <i className="fa-solid fa-user-plus" style={{ fontSize: '0.85rem' }} />
                                Регистрација
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}