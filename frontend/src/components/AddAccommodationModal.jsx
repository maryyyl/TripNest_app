import { useState } from 'react'
import { accommodationApi } from '../api'
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

const TAGOVI = [
  'planina', 'ezero', 'priroda', 'grad', 'selo', 'semejno', 'romantichno',
  'luksuzno', 'budzet', 'bazen', 'spa', 'parking', 'wifi', 'domashno',
  'moderno', 'tradicija', 'mirno', 'unikatno',
]

const emptyForm = {
  naslov: '',
  lokacija: '',
  cenaOdDen: '',
  status: '',
  link: '',
  slika: '',
  opis: '',
  tagovi: [],
}

export default function AddAccommodationModal({ onClose, onAdded }) {
  const { user } = useAuthStore()
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user?.role !== 'ADMIN') return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tagovi: prev.tagovi.includes(tag)
        ? prev.tagovi.filter((t) => t !== tag)
        : [...prev.tagovi, tag],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await accommodationApi.create({
        ...form,
        cenaOdDen: form.cenaOdDen ? parseFloat(form.cenaOdDen) : null,
      })
      onAdded?.()
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || 'Грешка при зачувување')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    borderRadius: '0.625rem',
    border: `1px solid ${C.beigeDark}`,
    fontSize: '0.9rem',
    color: C.text,
    backgroundColor: C.beige,
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: C.textMuted,
    marginBottom: '0.3rem',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 100,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 101,
        width: '100%', maxWidth: '36rem',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: C.white,
        borderRadius: '1.25rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        padding: '2rem',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: C.greenDark }}>
            🏡 Додај сместување
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: C.textMuted, lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Насlov */}
          <div>
            <label style={labelStyle}>Наслов *</label>
            <input name="naslov" value={form.naslov} onChange={handleChange} required style={inputStyle} placeholder="Вила Охридско Езеро" />
          </div>

          {/* Lokacija + Cena */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Локација *</label>
              <input name="lokacija" value={form.lokacija} onChange={handleChange} required style={inputStyle} placeholder="Охрид" />
            </div>
            <div>
              <label style={labelStyle}>Цена (денари/ноќ)</label>
              <input name="cenaOdDen" type="number" value={form.cenaOdDen} onChange={handleChange} style={inputStyle} placeholder="2500" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label style={labelStyle}>Статус</label>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="">— без статус —</option>
              <option value="СУПЕР ДОМАЌИН">СУПЕР ДОМАЌИН</option>
              <option value="НОВО">НОВО</option>
              <option value="ПРЕПОРАЧАНО">ПРЕПОРАЧАНО</option>
            </select>
          </div>

          {/* Link + Slika */}
          <div>
            <label style={labelStyle}>Линк</label>
            <input name="link" value={form.link} onChange={handleChange} style={inputStyle} placeholder="https://..." />
          </div>
          <div>
            <label style={labelStyle}>Слика (URL)</label>
            <input name="slika" value={form.slika} onChange={handleChange} style={inputStyle} placeholder="https://cdn.../slika.jpg" />
          </div>

          {/* Opis */}
          <div>
            <label style={labelStyle}>Опис</label>
            <textarea
              name="opis"
              value={form.opis}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Опишете го сместувањето..."
            />
          </div>

          {/* Tagovi */}
          <div>
            <label style={labelStyle}>Тагови</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
              {TAGOVI.map((tag) => {
                const active = form.tagovi.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      fontSize: '0.8rem',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      backgroundColor: active ? C.greenDark : C.beigeDark,
                      color: active ? C.white : C.text,
                      transition: 'all 0.15s',
                    }}
                  >
                    {tag.replace(/_/g, ' ')}
                  </button>
                )
              })}
            </div>
          </div>

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.875rem', backgroundColor: '#fdecea', padding: '0.5rem 0.875rem', borderRadius: '0.5rem' }}>
              {error}
            </p>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '0.75rem', backgroundColor: C.beigeDark, color: C.text, border: 'none', borderRadius: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
            >
              Откажи
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, padding: '0.75rem', backgroundColor: C.peach, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Зачувување...' : 'Зачувај'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
