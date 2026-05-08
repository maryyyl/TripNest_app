import { useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { authApi } from '../api'
import useAuthStore from '../store/authStore'
import C from '../colors'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const action = location.state?.action
  const accommodation = location.state?.accommodation
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.login(form)
      login(res.data.token, res.data.user)
      if (action === 'OPEN_RESERVATION_MODAL') {
        navigate(`/accommodation/${accommodation.id}`, {
          replace: true,
          state: {
            openReservationModal: true,
          },
        })
      } else {
        navigate('/', { replace: true })
      }

    } catch {
      setError('Погрешно корисничко име или лозинка')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    border: `1px solid ${C.beigeDark}`,
    fontSize: '1rem', color: C.text,
    backgroundColor: C.beige,
    outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: C.text, marginBottom: '0.375rem' }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '28rem', backgroundColor: C.white, borderRadius: '1.25rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.5rem' }}>

        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>🧭</div>

          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: C.greenDark}}>
            Добредојде назад
          </h1>

          <p style={{color: C.textMuted, fontSize: '0.875rem', marginTop: '0.25rem'}}>
            Најави се во TripNest.mk
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={labelStyle}>Корисничко име</label>
            <input name="username" value={form.username} onChange={e => setForm({...form, username: e.target.value})}
                   required style={inputStyle} placeholder="username"/>
          </div>
          <div>
            <label style={labelStyle}>Лозинка</label>
            <input name="password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={inputStyle} placeholder="••••••••" />
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.875rem', backgroundColor: '#fdecea', padding: '0.5rem 0.875rem', borderRadius: '0.5rem' }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{ padding: '0.875rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Се најавува...' : 'Најави се'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: C.textMuted, marginTop: '1.5rem' }}>
          Немаш профил?{' '}
          <Link to="/register" style={{ color: C.peach, fontWeight: '600', textDecoration: 'none' }}>Регистрирај се</Link>
        </p>
      </div>
    </div>
  )
}
