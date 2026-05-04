import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { reservationApi } from '../api'
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

export default function ReservationModal({ accommodation, onClose }) {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ datumOd: '', datumDo: '', brojLica: 1, napomena: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!isAuthenticated) {
    return (
      <>
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
        <div style={modalStyle}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</p>
            <h2 style={{ color: C.greenDark, fontWeight: 'bold', marginBottom: '0.5rem' }}>Потребна е најава</h2>
            <p style={{ color: C.textMuted, marginBottom: '1.5rem' }}>За да резервираш, мора да си најавен.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onClose} style={btnSecondary}>Откажи</button>
              <button onClick={() => navigate('/login')} style={btnPrimary}>Најави се</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.datumOd >= form.datumDo) { setError('Датумот на одење мора да е пред датумот на враќање'); return }
    setError('')
    setLoading(true)
    try {
      await reservationApi.create({ accommodationId: accommodation.id, ...form, brojLica: Number(form.brojLica) })
      setSuccess(true)
    } catch {
      setError('Грешка при резервација. Обиди се повторно.')
    } finally {
      setLoading(false)
    }
  }

  const nights = form.datumOd && form.datumDo
    ? Math.max(0, Math.ceil((new Date(form.datumDo) - new Date(form.datumOd)) / (1000 * 60 * 60 * 24)))
    : 0

  const total = nights && accommodation.cenaOdDen ? nights * accommodation.cenaOdDen : null

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
      <div style={modalStyle}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: C.greenDark }}>🗓️ Резервирај</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: C.textMuted }}>×</button>
        </div>

        {/* Accommodation info */}
        <div style={{ backgroundColor: C.beige, borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: '600', color: C.text }}>{accommodation.naslov}</p>
          {accommodation.lokacija && <p style={{ fontSize: '0.85rem', color: C.textMuted }}>📍 {accommodation.lokacija}</p>}
          {accommodation.cenaOdDen && <p style={{ fontSize: '0.85rem', color: C.greenDark, fontWeight: '600', marginTop: '0.25rem' }}>од {accommodation.cenaOdDen.toLocaleString()} ден/ноќ</p>}
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</p>
            <h3 style={{ color: C.greenDark, fontWeight: 'bold', marginBottom: '0.5rem' }}>Резервацијата е испратена!</h3>
            <p style={{ color: C.textMuted, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Администраторот ќе ја прегледа и потврди наскоро.</p>
            <button onClick={onClose} style={btnPrimary}>Затвори</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>Датум од *</label>
                <input type="date" value={form.datumOd} min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, datumOd: e.target.value })} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Датум до *</label>
                <input type="date" value={form.datumDo} min={form.datumOd || new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, datumDo: e.target.value })} required style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Број на лица *</label>
              <input type="number" min="1" max="20" value={form.brojLica}
                onChange={e => setForm({ ...form, brojLica: e.target.value })} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Напомена</label>
              <textarea value={form.napomena} onChange={e => setForm({ ...form, napomena: e.target.value })}
                rows={2} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Дополнителни барања..." />
            </div>

            {/* Price summary */}
            {nights > 0 && (
              <div style={{ backgroundColor: C.beige, borderRadius: '0.75rem', padding: '0.875rem 1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: C.textMuted }}>
                  <span>{nights} ноќ/и × {accommodation.cenaOdDen?.toLocaleString()} ден</span>
                  {total && <span style={{ fontWeight: '700', color: C.greenDark }}>{total.toLocaleString()} ден</span>}
                </div>
              </div>
            )}

            {error && <p style={{ color: '#c0392b', fontSize: '0.875rem', backgroundColor: '#fdecea', padding: '0.5rem 0.875rem', borderRadius: '0.5rem' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button type="button" onClick={onClose} style={btnSecondary}>Откажи</button>
              <button type="submit" disabled={loading} style={{ ...btnPrimary, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Се испраќа...' : 'Испрати барање'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

const modalStyle = {
  position: 'fixed', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 101, width: '100%', maxWidth: '32rem',
  maxHeight: '90vh', overflowY: 'auto',
  backgroundColor: '#ffffff',
  borderRadius: '1.25rem',
  boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  padding: '2rem',
}

const inputStyle = {
  width: '100%', padding: '0.625rem 0.875rem',
  borderRadius: '0.625rem', border: `1px solid ${C.beigeDark}`,
  fontSize: '0.9rem', color: C.text, backgroundColor: C.beige,
  outline: 'none', boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block', fontSize: '0.8rem', fontWeight: '600',
  color: C.textMuted, marginBottom: '0.3rem',
  textTransform: 'uppercase', letterSpacing: '0.04em',
}

const btnPrimary = {
  flex: 1, padding: '0.75rem', backgroundColor: C.greenDark,
  color: '#fff', border: 'none', borderRadius: '0.75rem',
  fontWeight: '600', cursor: 'pointer',
}

const btnSecondary = {
  flex: 1, padding: '0.75rem', backgroundColor: C.beigeDark,
  color: C.text, border: 'none', borderRadius: '0.75rem',
  fontWeight: '600', cursor: 'pointer',
}
