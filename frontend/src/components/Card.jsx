import { Link } from 'react-router-dom'
import C from '../colors'

export default function Card({ item, basePath }) {
    return (
        <Link
            to={`/${basePath}/${item.id}`}
            style={{
                display: 'block',
                backgroundColor: C.white,
                borderRadius: '1rem',
                overflow: 'hidden',
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                border: `1px solid ${C.beigeDark}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'
            }}
        >
            {/* Image */}
            <div style={{ position: 'relative', height: '13rem', backgroundColor: C.beigeDark, overflow: 'hidden' }}>
                {item.slika ? (
                    <img
                        src={item.slika}
                        alt={item.naslov}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=TripNest' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🏞️</div>
                )}

                {item.status && (
                    <span style={{
                        position: 'absolute', top: '0.75rem', left: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '9999px',
                        backgroundColor: item.status === 'СУПЕР ДОМАЌИН' ? C.peach : item.status === 'НОВО' ? C.greenDark : C.brown,
                        color: C.white,
                    }}>
            {item.status}
          </span>
                )}
            </div>

            {/* Content */}
            <div style={{ padding: '1rem' }}>
                <h3 style={{ fontWeight: '600', color: C.text, lineHeight: 1.4, marginBottom: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.naslov}
                </h3>

                {item.lokacija && (
                    <p style={{fontSize: '0.85rem', color: C.textMuted, marginTop: '0.25rem'}}>
                        <i style={{color: 'darkred',}} className="fa-solid fa-location-dot"></i> {item.lokacija}
                    </p>
                )}

                {item.cenaOdDen && (
                    <p style={{ fontSize: '0.85rem', fontWeight: '600', color: C.greenDark, marginTop: '0.5rem' }}>
                        од {Number(item.cenaOdDen).toLocaleString()} денари
                    </p>
                )}
            </div>
        </Link>
    )
}