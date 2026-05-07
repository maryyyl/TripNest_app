import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import AddAccommodationModal from '../components/AddAccommodationModal'
import ProposeAccommodationModal from '../components/ProposeAccommodationModal'
import HomeReviews from '../components/HomeReviews.jsx'

const C = {
  greenDark: '#4a7c59',
  greenMid: '#7fa882',
  peach: '#e8866a',
  peachLight: '#f2b49e',
  beige: '#f5ede4',
  beigedark: '#e8d5c4',
  brown: '#8b6245',
  text: '#3a3a2a',
  white: '#ffffff',
}

const categories = [
  {
    to: '/gastronomy',
    iconClass: 'fa-solid fa-utensils',
    title: 'Гастрономија',
    desc: 'Ресторани, кафулиња и традиционална македонска кујна',
    bg: C.greenDark,
  },
  {
    to: '/attractions',
    iconClass: 'fa-solid fa-person-hiking',
    title: 'Атракции',
    desc: 'Природни убавини, споменици и авантуристички дестинации',
    bg: C.greenMid,
  },
  {
    to: '/accommodations',
    iconClass: 'fa-solid fa-house',
    title: 'Сместување',
    desc: 'Хотели, вили и автентични места за одмор',
    bg: C.peach,
  },
]

export default function Home() {
  const { user } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [showPropose, setShowPropose] = useState(false)

  return (
      <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>
        {showModal && <AddAccommodationModal onClose={() => setShowModal(false)} />}
        {showPropose && <ProposeAccommodationModal onClose={() => setShowPropose(false)} />}

        {/* Hero */}
        <div style={{ backgroundColor: C.greenDark, color: C.white, padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <span  style={{ fontSize: '5rem', marginBottom: '1.5rem', display: 'block', color: C.peachLight }} >🧭</span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' }}>
              Откриј ја <br />
              <span style={{ color: C.peachLight }}>Македонија</span>
            </h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2.5rem' }}>
              Гастрономија, атракции и сместување — сè на едно место за незаборавно патување.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/gastronomy" style={{ padding: '0.75rem 2rem', backgroundColor: C.beige, color: C.greenDark, fontWeight: '600', borderRadius: '9999px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                Истражи сега
              </Link>
              {!user && (
                  <Link
                      to="/register"
                      style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: 'transparent',
                        color: C.white,
                        fontWeight: '600',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        border: '2px solid rgba(255,255,255,0.5)'
                      }}
                  >
                    Регистрирај се
                  </Link>
              )}
              {/*<Link to="/register" style={{ padding: '0.75rem 2rem', backgroundColor: 'transparent', color: C.white, fontWeight: '600', borderRadius: '9999px', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>*/}
              {/*  Регистрирај се*/}
              {/*</Link>*/}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: C.greenDark, marginBottom: '0.75rem' }}>
            Истражи по категорија
          </h2>
          <p style={{ textAlign: 'center', color: C.brown, marginBottom: '3rem' }}>
            Избери го своето следно искуство
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {categories.map(({ to, iconClass, title, desc, bg }) => (
                <Link
                    key={to}
                    to={to}
                    style={{ backgroundColor: bg, color: C.white, borderRadius: '1rem', padding: '2rem', textDecoration: 'none', display: 'block', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)' }}
                >
                  <i className={iconClass} style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem', opacity: 0.95 }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ opacity: 0.85, fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</p>
                  <span style={{ marginTop: '1.5rem', display: 'inline-block', fontWeight: '600', opacity: 0.9 }}>
                Погледни →
              </span>
                </Link>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
          {user?.role === 'ADMIN' && (
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <button onClick={() => setShowModal(true)} style={{ padding: '0.75rem 2rem', backgroundColor: C.peach, color: C.white, border: 'none', borderRadius: '9999px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(232,134,106,0.4)' }}>
                  + Додај сместување
                </button>
              </div>
          )}

          {/* Propose card */}
          <div style={{ backgroundColor: C.white, border: `1px solid ${C.beigedark}`, borderRadius: '1.5rem', padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <i className="fa-solid fa-house" style={{ fontSize: '2.5rem', color: C.greenDark, marginBottom: '0.75rem', display: 'block' }} />
              <h3 style={{ color: C.greenDark, fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Знаеш одлично место?
              </h3>
              <p style={{ color: C.brown, fontSize: '0.9rem', lineHeight: 1.7 }}>
                Предложи сместување и помогни им на другите патници да го откријат.
                Ако си сопственик или издаваш сместување, сподели го со заедницата.
                Нашиот тим ќе го прегледа твојот предлог.
              </p>
            </div>
            <button
                onClick={() => setShowPropose(true)}
                style={{ padding: '0.875rem 1.75rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '9999px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(74,124,89,0.3)', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <i className="fa-solid fa-lightbulb" style={{ marginRight: '0.5rem' }} />
              Предложи сместување
            </button>
          </div>
        </div>

        {/* Reviews */}
        <HomeReviews />

        {/* Footer */}
        <footer style={{ borderTop: `1px solid ${C.beigedark}`, padding: '2.5rem 1.5rem', color: C.brown, fontSize: '0.9rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>

            {/* Brand */}
            <div style={{ flex: '1 1 250px' }}>
              <h3 style={{ marginBottom: '0.5rem',fontWeight:800, }}>TripNest.mk</h3>
              <p style={{ opacity: 0.8 }}>
                TripNest.mk е твоето патувачко гнездо — место каде ги собираш
                најдобрите дестинации, вкусови и искуства низ Македонија.
              </p>
            </div>

            {/* Quick Links */}
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="/gastronomy" style={{ textDecoration: 'none', color: C.brown, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="fa-solid fa-utensils" style={{ color: C.greenDark, width: '16px' }} />
                  Гастрономија
                </a>
                <a href="/attractions" style={{ textDecoration: 'none', color: C.brown, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="fa-solid fa-person-hiking" style={{ color: C.greenMid, width: '16px' }} />
                  Атракции
                </a>
                <a href="/accommodations" style={{ textDecoration: 'none', color: C.brown, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <i className="fa-solid fa-house" style={{ color: C.peach, width: '16px' }} />
                  Сместување
                </a>
              </div>
            </div>

            {/* Contact */}
            <div style={{ flex: '1 1 250px' }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Контакт</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {/*<i className="fa-solid fa-envelope" style={{ color: C.peach, width: '16px' }} />*/}
                  <a
                      href="mailto:nesttrip4@gmail.com"
                      style={{
                        textDecoration: 'none',
                        color: C.brown,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}
                  >
                    <i className="fa-solid fa-envelope" style={{color: C.peach, width: '16px'}}/>
                    nesttrip4@gmail.com
                  </a>
                </p>
                <p style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                  <a
                      href="tel:+38970123456"
                      style={{
                        textDecoration: 'none',
                        color: C.brown,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}
                  >
                    <i className="fa-solid fa-phone" style={{color: C.greenDark, width: '16px'}}/>
                    +389 70 123 456
                  </a>
                </p>
                <p style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem'}}>
                  <i className="fa-solid fa-location-dot" style={{color: '#c0392b', width: '16px'}}/>
                  Скопје, Македонија
                </p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: `1px solid ${C.beigedark}`, paddingTop: '1rem', opacity: 0.8 }}>
            © 2026 TripNest.mk — Сите права задржани
          </div>
        </footer>
      </div>
  )
}