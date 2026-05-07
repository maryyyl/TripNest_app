import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gastronomyApi } from '../api'
import ImageCarousel from '../components/ImageCarousel.jsx'

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

export default function GastronomyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [sliki, setSliki] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      gastronomyApi.getById(id),
      gastronomyApi.getSliki(id),
    ])
        .then(([res, imgs]) => {
          setItem(res.data)
          setSliki(imgs.data)
        })
        .catch(() => navigate('/gastronomija'))
        .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, paddingTop: '64px' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', border: `4px solid ${C.greenDark}`, borderTopColor: 'transparent', borderRadius: '50%' }} />
      </div>
  )

  if (!item) return null

  return (
      <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

        {/* Carousel */}
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ImageCarousel images={sliki} mainImage={item.slika} alt={item.naslov} />
        </div>

        {/* Title block */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              {item.status && (
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '9999px', backgroundColor: C.peach, color: C.white, marginBottom: '0.5rem' }}>
                {item.status}
              </span>
              )}
              <h1 style={{ fontSize: '2rem', fontWeight: '900', color: C.text, marginBottom: '0.5rem', lineHeight: 1.2 }}>{item.naslov}</h1>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', color: C.textMuted, fontSize: '0.95rem' }}>
                {item.lokacija && <span>📍 {item.lokacija}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted, fontSize: '0.875rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ← Назад
          </button>

          <div style={{ maxWidth: '720px' }}>
            {item.opis && (
                <p style={{ color: C.text, fontSize: '1.05rem', lineHeight: 1.85, marginBottom: '2rem' }}>{item.opis}</p>
            )}

            {/* Tags */}
            {item.tagovi?.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: C.text, marginBottom: '0.75rem' }}>Тагови</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {item.tagovi.map((tag) => (
                        <span key={tag} style={{ padding: '0.375rem 0.875rem', fontSize: '0.8rem', borderRadius: '9999px', backgroundColor: C.beigeDark, color: C.brown }}>
                    {tag.replace(/_/g, ' ')}
                  </span>
                    ))}
                  </div>
                </div>
            )}

            {/* CTA */}
            {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer"
                   style={{ display: 'inline-block', padding: '0.875rem 2rem', backgroundColor: C.greenDark, color: C.white, borderRadius: '0.875rem', fontWeight: '700', textDecoration: 'none', fontSize: '1rem', boxShadow: '0 4px 16px rgba(74,124,89,0.4)' }}>
                  🍽️ Посети страница
                </a>
            )}
          </div>
        </div>
      </div>
  )
}