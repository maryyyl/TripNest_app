import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { accommodationRequestApi } from '../api'
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

const emptyForm = {
  naslov: '',
  lokacija: '',
  link: '',
  opis: '',
  slika: '',
  cenaOdDen: '',
  napomena: '',
}

export default function ProposeAccommodationModal({ onClose }) {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
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
            <p style={{ color: C.textMuted, marginBottom: '1.5rem' }}>За да предложиш сместување, мора да си најавен.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onClose} style={btnSecondary}>Откажи</button>
              <button onClick={() => navigate('/login')} style={btnPrimary}>Најави се</button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await accommodationRequestApi.create({
        ...form,
        cenaOdDen: form.cenaOdDen ? parseFloat(form.cenaOdDen) : null,
      })
      setSuccess(true)
    } catch {
      setError('Грешка при испраќање. Обиди се повторно.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
      <div style={modalStyle}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: C.greenDark }}>🏡 Предложи сместување</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: C.textMuted }}>×</button>
        </div>

        <div style={{ backgroundColor: C.beige, borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: C.brown }}>
            💡 Твојот предлог ќе го прегледа администраторот и ако го одобри, ќе се додаде на платформата.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <p style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</p>
            <h3 style={{ color: C.greenDark, fontWeight: 'bold', marginBottom: '0.5rem' }}>Предлогот е испратен!</h3>
            <p style={{ color: C.textMuted, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Администраторот ќе го разгледа и ќе те извести.
            </p>
            <button onClick={onClose} style={btnPrimary}>Затвори</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <div>
              <label style={labelStyle}>Наслов *</label>
              <input name="naslov" value={form.naslov} onChange={handleChange} required style={inputStyle} placeholder="Вила Охридско Езеро" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>Локација *</label>
                <input name="lokacija" value={form.lokacija} onChange={handleChange} required style={inputStyle} placeholder="Охрид" />
              </div>
              <div>
                <label style={labelStyle}>Цена (ден/ноќ)</label>
                <input name="cenaOdDen" type="number" value={form.cenaOdDen} onChange={handleChange} style={inputStyle} placeholder="2500" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Линк</label>
              <input name="link" value={form.link} onChange={handleChange} style={inputStyle} placeholder="https://booking.com/..." />
            </div>

            <div>
              <label style={labelStyle}>Слика (URL)</label>
              <input name="slika" value={form.slika} onChange={handleChange} style={inputStyle} placeholder="https://..." />
            </div>

            <div>
              <label style={labelStyle}>Опис</label>
              <textarea name="opis" value={form.opis} onChange={handleChange} rows={3}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Опишете го сместувањето..." />
            </div>

            <div>
              <label style={labelStyle}>Напомена за администраторот</label>
              <textarea name="napomena" value={form.napomena} onChange={handleChange} rows={2}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder="Зошто го предлагаш ова место?" />
            </div>

            {error && (
              <p style={{ color: '#c0392b', fontSize: '0.875rem', backgroundColor: '#fdecea', padding: '0.5rem 0.875rem', borderRadius: '0.5rem' }}>
                {error}
              </p>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <button type="button" onClick={onClose} style={btnSecondary}>Откажи</button>
              <button type="submit" disabled={loading} style={{ ...btnPrimary, backgroundColor: C.peach, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Се испраќа...' : 'Испрати предлог'}
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
