import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import GastronomyPage from './pages/GastronomyPage'
import GastronomyDetail from './pages/GastronomyDetail'
import AttractionsPage from './pages/AttractionsPage'
import AttractionDetail from './pages/AttractionDetail'
import AccommodationPage from './pages/AccommodationPage'
import AccommodationDetail from './pages/AccommodationDetail'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import useAuthStore from './store/authStore'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gastronomy" element={<GastronomyPage />} />
          <Route path="/gastronomy/:id" element={<GastronomyDetail />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/attractions/:id" element={<AttractionDetail />} />
          <Route path="/accommodations" element={<AccommodationPage />} />
          <Route path="/accommodations/:id" element={<AccommodationDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
  )
}