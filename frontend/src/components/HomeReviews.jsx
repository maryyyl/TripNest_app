import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { latestReviewsApi } from '../api'

const C = {
    greenDark: '#4a7c59',
    beige: '#f5ede4',
    beigeDark: '#e8d5c4',
    brown: '#8b6245',
    text: '#3a3a2a',
    textMuted: '#7a7a6a',
    white: '#ffffff',
}

function Stars({ value }) {
    return (
        <span>
      {[1, 2, 3, 4, 5].map(s => (
          <span key={s} style={{ color: s <= value ? '#f59e0b' : '#d1d5db', fontSize: '0.9rem' }}>★</span>
      ))}
    </span>
    )
}

export default function HomeReviews() {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        latestReviewsApi.get(6).then(r => setReviews(r.data)).catch(() => {})
    }, [])

    if (reviews.length === 0) return null

    return (
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: C.greenDark, marginBottom: '0.5rem' }}>
                Што велат нашите гости
            </h2>
            <p style={{ textAlign: 'center', color: C.brown, marginBottom: '3rem' }}>
                Вистински искуства од вистински патници
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
                {reviews.map((r) => (
                    <Link
                        key={r.id}
                        to={`/accommodations/${r.accommodation?.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div
                            style={{
                                backgroundColor: C.white,
                                borderRadius: '1rem',
                                padding: '1.5rem',
                                border: `1px solid ${C.beigeDark}`,
                                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                                height: '100%',
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
                                e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            {/* Quote */}
                            <p style={{ fontSize: '1.5rem', color: C.beigeDark, fontWeight: '900', lineHeight: 1, marginBottom: '0.5rem' }}>"</p>
                            <p style={{ color: C.text, fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem', fontStyle: 'italic' }}>
                                {r.komentar?.length > 120 ? r.komentar.slice(0, 120) + '...' : r.komentar}
                            </p>

                            {/* Stars + rating */}
                            <div style={{ marginBottom: '1rem' }}>
                                <Stars value={r.ocenka} />
                            </div>

                            {/* User + accommodation */}
                            <div style={{ borderTop: `1px solid ${C.beigeDark}`, paddingTop: '0.875rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ fontWeight: '700', color: C.text, fontSize: '0.875rem' }}>{r.user?.username}</p>
                                    <p style={{ color: C.textMuted, fontSize: '0.75rem' }}>{new Date(r.createdAt).toLocaleDateString('mk')}</p>
                                </div>
                                {r.accommodation?.slika && (
                                    <img
                                        src={r.accommodation.slika}
                                        alt={r.accommodation.naslov}
                                        style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover' }}
                                        onError={e => e.target.style.display = 'none'}
                                    />
                                )}
                            </div>
                            <p style={{ color: C.greenDark, fontSize: '0.78rem', fontWeight: '600', marginTop: '0.5rem' }}>
                                📍 {r.accommodation?.naslov}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}