import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const links = [
  { to: '/gastronomy', label: 'Гастрономија', emoji: '🍽️' },
  { to: '/attractions', label: 'Атракции', emoji: '🏔️' },
  { to: '/accommodations', label: 'Сместување', emoji: '🏡' },
]

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

         {/*Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700 tracking-tight">
          <span className="text-2xl">🧭</span>
          <span>TripNest<span className="text-amber-500">.mk</span></span>
        </Link>
  {/*      Logo part 2*/}
  {/*      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700 tracking-tight">*/}
  {/*        <img*/}
  {/*            src="tripnest_logo.png"*/}
  {/*            alt="TripNest Logo"*/}
  {/*            className="w-8 h-8 object-contain"*/}
  {/*        />*/}

  {/*        <span>*/}
  {/*  TripNest<span className="text-amber-500">.mk</span>*/}
  {/*</span>*/}
  {/*      </Link>*/}

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, emoji }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                ${location.pathname.startsWith(to)
                  ? 'bg-emerald-600 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
                }`}
            >
              <span>{emoji}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-stone-500 hidden md:block">
                👋 {user?.username}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-red-600 transition-colors"
              >
                Одјави се
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors"
              >
                Најава
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              >
                Регистрација
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
