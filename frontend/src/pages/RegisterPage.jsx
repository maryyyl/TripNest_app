import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import useAuthStore from '../store/authStore'
import C from '../colors'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Лозинките не се совпаѓаат'); return }
    setLoading(true)
    try {
      const res = await authApi.register({ username: form.username, email: form.email, password: form.password })
      login(res.data.token, res.data.user)
      navigate('/')
    } catch {
      setError('Грешка при регистрација. Обиди се повторно.')
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
    <div style={{ minHeight: '100vh', backgroundColor: C.beige, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 1rem 2rem' }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: C.white,
        borderRadius: '1.25rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '2.5rem'
      }}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>🧭</div>

          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: C.greenDark}}>
            Креирај профил
          </h1>

          <p style={{color: C.textMuted, fontSize: '0.875rem', marginTop: '0.25rem'}}>
            Придружи се на TripNest.mk
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={labelStyle}>Корисничко име</label>
            <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} required
                   style={inputStyle} placeholder="username"/>
          </div>
          <div>
            <label style={labelStyle}>Е-маил</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
                   style={inputStyle} placeholder="you@example.com"/>
          </div>
          <div>
            <label style={labelStyle}>Лозинка</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                   required style={inputStyle} placeholder="••••••••"/>
          </div>
          <div>
            <label style={labelStyle}>Потврди лозинка</label>
            <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})}
                   required style={inputStyle} placeholder="••••••••"/>
          </div>

          {error && (
              <p style={{
                color: '#c0392b',
                fontSize: '0.875rem',
                backgroundColor: '#fdecea',
                padding: '0.5rem 0.875rem',
                borderRadius: '0.5rem'
              }}>{error}</p>
          )}

          <button type="submit" disabled={loading} style={{
            padding: '0.875rem',
            backgroundColor: C.peach,
            color: C.white,
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Се регистрира...' : 'Регистрирај се'}
          </button>
        </form>

        <p style={{textAlign: 'center', fontSize: '0.875rem', color: C.textMuted, marginTop: '1.5rem'}}>
          Веќе имаш профил?{' '}
          <Link to="/login" style={{color: C.greenDark, fontWeight: '600', textDecoration: 'none'}}>Најави се</Link>
        </p>
      </div>
    </div>
  )
}
