import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { accommodationApi } from '../api'
import ReservationModal from '../components/ReservationModal'

const C = {
  greenDark: '#4a7c59',
  peach: '#e8866a',
  peachLight: '#f2b49e',
  beige: '#f5ede4',
  beigeDark: '#e8d5c4',
  brown: '#8b6245',
  text: '#3a3a2a',
  textMuted: '#7a7a6a',
  white: '#ffffff',
}

const budgetLabel = {
  LOW: { label: 'Буџет', color: '#d4edda', textColor: '#2d6a3f' },
  MEDIUM: { label: 'Средна класа', color: '#fff3cd', textColor: '#856404' },
  HIGH: { label: 'Луксуз', color: '#e8d5f5', textColor: '#6f3d8a' },
}

export default function AccommodationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showReservation, setShowReservation] = useState(false)

  useEffect(() => {
    accommodationApi.getById(id)
      .then((res) => setItem(res.data))
      .catch(() => navigate('/smestuvanja'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, paddingTop: '64px' }}>
      <div style={{ width: '2.5rem', height: '2.5rem', border: `4px solid ${C.peach}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  )

  if (!item) return null

  const budget = item.budgetLevel ? budgetLabel[item.budgetLevel] : null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

      {showReservation && (
        <ReservationModal accommodation={item} onClose={() => setShowReservation(false)} />
      )}

      {/* Hero */}
      <div style={{ position: 'relative', height: '20rem', backgroundColor: C.beigeDark, overflow: 'hidden' }}>
        {item.slika && (
          <img src={item.slika} alt={item.naslov}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://placehold.co/1200x400?text=TripNest' }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }} />
        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
          {item.status && (
            <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px', backgroundColor: C.peach, color: C.white, marginBottom: '0.5rem' }}>
              {item.status}
            </span>
          )}
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: C.white, marginBottom: '0.25rem' }}>{item.naslov}</h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {item.lokacija && <span style={{ color: 'rgba(255,255,255,0.85)' }}>📍 {item.lokacija}</span>}
            {item.cenaOdDen && <span style={{ color: C.peachLight, fontWeight: '600' }}>од {Number(item.cenaOdDen).toLocaleString()} ден/ноќ</span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <button onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          ← Назад
        </button>

        {budget && (
          <span style={{ display: 'inline-block', padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: budget.color, color: budget.textColor, marginBottom: '1.5rem' }}>
            💰 {budget.label}
          </span>
        )}

        {item.opis && (
          <p style={{ color: C.text, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>{item.opis}</p>
        )}

        {item.tagovi?.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '600', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Тагови</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {item.tagovi.map((tag) => (
                <span key={tag} style={{ padding: '0.375rem 0.875rem', fontSize: '0.875rem', fontWeight: '500', borderRadius: '9999px', backgroundColor: C.beigeDark, color: C.brown }}>
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowReservation(true)}
            style={{ padding: '0.875rem 2rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}
          >
            🗓️ Резервирај
          </button>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.875rem 2rem', backgroundColor: C.beigeDark, color: C.text, borderRadius: '0.75rem', fontWeight: '600', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              Посети страница →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
