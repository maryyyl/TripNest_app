import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { accommodationApi, reservationApi, reviewApi } from '../api'
import ReservationModal from '../components/ReservationModal'
import ImageCarousel from '../components/ImageCarousel.jsx'
import useAuthStore from '../store/authStore'

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

const AMENITIES = [
    {key: 'wifi', icon: <i className="fa-solid fa-wifi"></i>, label: 'WiFi'},
    {key: 'bazen', icon: <i className="fa-solid fa-person-swimming"></i>, label: 'Базен'},
    {key: 'spa', icon: <i className="fa-solid fa-spa"></i>, label: 'СПА'},
    {key: 'balkon', icon: <i className="fa-solid fa-panorama"></i>, label: 'Балкон'},
    {key: 'parking', icon: <i className="fa-solid fa-square-parking"></i>, label: 'Паркинг'},
    {key: 'kujna', icon: <i className="fa-solid fa-kitchen-set"></i>, label: 'Кујна'},
    {key: 'klima', icon: <i className="fa-solid fa-wind"></i>, label: 'Климатизација'},
    {key: 'ljubimci', icon: <i className="fa-solid fa-paw"></i>, label: 'Миленичиња'},
]

function Stars({value, interactive = false, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
      <div style={{ display: 'flex', gap: '0.2rem' }}>
        {[1, 2, 3, 4, 5].map(s => (
            <span
                key={s}
                onClick={() => interactive && onChange && onChange(s)}
                onMouseEnter={() => interactive && setHovered(s)}
                onMouseLeave={() => interactive && setHovered(0)}
                style={{
                  fontSize: interactive ? '1.75rem' : '1rem',
                  cursor: interactive ? 'pointer' : 'default',
                  color: s <= (hovered || value) ? '#f59e0b' : '#d1d5db',
                  transition: 'color 0.1s',
                }}
            >★</span>
        ))}
      </div>
  )
}

function BookingCalendar({ bookedDates }) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const booked = new Set(bookedDates)
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = viewDate.toLocaleString('mk', { month: 'long', year: 'numeric' })

  const days = []
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  const isBooked = (d) => {
    if (!d) return false
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    return booked.has(dateStr)
  }
  const isPast = (d) => {
    if (!d) return false
    return new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  return (
      <div style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1.25rem', border: `1px solid ${C.beigeDark}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: C.textMuted }}>‹</button>
          <span style={{ fontWeight: '700', color: C.text, fontSize: '0.9rem', textTransform: 'capitalize' }}>{monthName}</span>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: C.textMuted }}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
          {['По','Вт','Ср','Че','Пе','Са','Не'].map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', color: C.textMuted, fontWeight: '700', padding: '0.2rem' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
          {days.map((d, i) => {
            const bk = isBooked(d)
            const past = isPast(d)
            return (
                <div key={i} style={{
                  textAlign: 'center', padding: '0.35rem 0.1rem', borderRadius: '0.4rem',
                  fontSize: '0.8rem', fontWeight: d ? '500' : 'normal',
                  backgroundColor: bk ? '#fdecea' : 'transparent',
                  color: !d ? 'transparent' : past ? '#d1d5db' : bk ? '#c0392b' : C.text,
                  textDecoration: bk ? 'line-through' : 'none',
                }}>{d || ''}</div>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.7rem', color: C.textMuted }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#fdecea', display: 'inline-block' }} /> Зафатено
        </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: C.beige, display: 'inline-block' }} /> Слободно
        </span>
        </div>
      </div>
  )
}

function ReviewsSection({ accommodationId }) {
  const { user, isAuthenticated } = useAuthStore()
  const [reviews, setReviews] = useState([])
  const [avg, setAvg] = useState({ avg: 0, count: 0 })
  const [form, setForm] = useState({ ocenka: 0, komentar: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    reviewApi.getAll(accommodationId).then(r => setReviews(r.data))
    reviewApi.getAvg(accommodationId).then(r => setAvg(r.data))
  }, [accommodationId, submitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.ocenka) return
    setSubmitting(true)
    try {
      await reviewApi.create(accommodationId, form)
      setForm({ ocenka: 0, komentar: '' })
      setSubmitted(p => !p)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (reviewId) => {
    await reviewApi.delete(accommodationId, reviewId)
    setSubmitted(p => !p)
  }

  return (
      <div style={{ marginTop: '3rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: `2px solid ${C.beigeDark}` }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: C.text, marginBottom: '0.25rem' }}>Коментари</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Stars value={Math.round(avg.avg)} />
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: C.text }}>{avg.avg}</span>
              <span style={{ color: C.textMuted, fontSize: '0.875rem' }}>({avg.count} оценки)</span>
            </div>
          </div>
        </div>

        {/* Add review form */}
        {isAuthenticated ? (
            <div style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1.5rem', border: `1px solid ${C.beigeDark}`, marginBottom: '2rem' }}>
              <h3 style={{ fontWeight: '700', color: C.text, marginBottom: '1rem' }}>Остави коментар</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.5rem' }}>Оценка *</label>
                  <Stars value={form.ocenka} interactive onChange={(v) => setForm(f => ({ ...f, ocenka: v }))} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.5rem' }}>Коментар</label>
                  <textarea
                      value={form.komentar}
                      onChange={e => setForm(f => ({ ...f, komentar: e.target.value }))}
                      rows={3}
                      placeholder="Сподели го твоето искуство..."
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', border: `1px solid ${C.beigeDark}`, fontSize: '0.9rem', color: C.text, backgroundColor: C.beige, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <button
                    type="submit"
                    disabled={submitting || !form.ocenka}
                    style={{ padding: '0.625rem 1.5rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '600', cursor: 'pointer', opacity: (!form.ocenka || submitting) ? 0.6 : 1 }}
                >
                  {submitting ? 'Се испраќа...' : 'Испрати'}
                </button>
              </form>
            </div>
        ) : (
            <div style={{ backgroundColor: C.beige, borderRadius: '1rem', padding: '1.25rem', marginBottom: '2rem', textAlign: 'center', border: `1px solid ${C.beigeDark}` }}>
              <p style={{ color: C.textMuted, fontSize: '0.9rem' }}>
                <a href="/login" style={{ color: C.greenDark, fontWeight: '600' }}>Најави се</a> за да оставиш коментар
              </p>
            </div>
        )}

        {/* Reviews list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reviews.length === 0 ? (
              <p style={{ color: C.textMuted, textAlign: 'center', padding: '2rem' }}>Сè уште нема коментари. Биди првиот корисник кој ќе остави коментар!</p>
          ) : reviews.map((r) => (
              <div key={r.id} style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1.25rem', border: `1px solid ${C.beigeDark}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: '700', color: C.text, marginRight: '0.75rem' }}>{r.user?.username}</span>
                    <Stars value={r.ocenka} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: C.textMuted }}>
                  {new Date(r.createdAt).toLocaleDateString('mk')}
                </span>
                    {user?.username === r.user?.username && (
                        <button
                            onClick={() => handleDelete(r.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c0392b', fontSize: '0.8rem' }}
                        >
                          Избриши
                        </button>
                    )}
                  </div>
                </div>
                {r.komentar && <p style={{ color: C.text, fontSize: '0.9rem', lineHeight: 1.6 }}>{r.komentar}</p>}
              </div>
          ))}
        </div>
      </div>
  )
}

export default function AccommodationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [sliki, setSliki] = useState([])
  const [loading, setLoading] = useState(true)
  const [showReservation, setShowReservation] = useState(false)

  useEffect(() => {
    Promise.all([
      accommodationApi.getById(id),
      reservationApi.getBookedDates(id),
      accommodationApi.getSliki(id),
    ])
        .then(([res, dates, imgs]) => {
          setItem(res.data)
            console.log(res.data)
          setBookedDates(dates.data)
          setSliki(imgs.data)
        })
        .catch(() => navigate('/accommodations'))
        .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: C.beige, paddingTop: '64px' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', border: `4px solid ${C.peach}`, borderTopColor: 'transparent', borderRadius: '50%' }} />
      </div>
  )

  if (!item) return null

    const formatTime= function (time) {
        if (!time) return '';

        return time.slice(0, 5);
    }
  const budget = item.budgetLevel ? budgetLabel[item.budgetLevel] : null
  const activeAmenities = AMENITIES.filter(a => item[a.key])
  const mapsQuery = encodeURIComponent(item.adresa || item.lokacija || item.naslov)

  return (
      <div style={{minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px'}}>
          {showReservation && <ReservationModal accommodation={item} bookedDates={bookedDates}
                                                onClose={() => setShowReservation(false)}/>}

          {/* Carousel */}
          <div style={{maxWidth: '1100px', margin: '0 auto'}}>
              <button onClick={() => navigate(-1)} style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: C.textMuted,
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginTop: '1rem',
              }}>
                  <i className="fa-solid fa-circle-arrow-left"></i> Назад
              </button>
              <ImageCarousel images={sliki} mainImage={item.slika} alt={item.naslov}/>
          </div>

          <div style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '1.5rem 1.5rem 0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.5rem'
          }}>

              {/* LEFT SIDE */}
              <div style={{flex: 1, minWidth: 0}}>
                  {item.status && (
                      <span style={{
                          display: 'inline-block',
                          padding: '0.25rem 0.75rem',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          borderRadius: '9999px',
                          backgroundColor: C.peach,
                          color: C.white,
                          marginBottom: '0.5rem'
                      }}>
        {item.status}
      </span>
                  )}

                  <h1 style={{
                      fontSize: '2rem',
                      fontWeight: '900',
                      color: C.text,
                      marginBottom: '0.5rem',
                      lineHeight: 1.2
                  }}>
                      {item.naslov}
                  </h1>

                  <div style={{
                      display: 'flex',
                      gap: '1.25rem',
                      flexWrap: 'wrap',
                      color: C.textMuted,
                      fontSize: '0.95rem'
                  }}>
                      {item.lokacija && (
                          <span>
          <i style={{color: 'darkred'}} className="fa-solid fa-location-dot"></i> {item.lokacija}
        </span>
                      )}

                      {item.kapacitet && (
                          <span>
          <i className="fa-solid fa-user-group"></i> до {item.kapacitet} лица
        </span>
                      )}

                      {budget && (
                          <span style={{
                              padding: '0.2rem 0.75rem',
                              borderRadius: '9999px',
                              backgroundColor: budget.color,
                              color: budget.textColor,
                              fontSize: '0.8rem',
                              fontWeight: '600'
                          }}>
          <i className="fa-solid fa-sack-dollar"></i> {budget.label}
        </span>
                      )}
                  </div>
              </div>

              {/* RIGHT SIDE - PRICE (fixed column) */}
              {item.cenaOdDen && (
                  <div style={{
                      width: '180px',
                      flexShrink: 0,
                      textAlign: 'right'
                  }}>
                      <div style={{
                          fontSize: '1.75rem',
                          fontWeight: '900',
                          color: C.greenDark,
                          whiteSpace: 'nowrap'
                      }}>
                          {Number(item.cenaOdDen).toLocaleString()}
                      </div>
                      <div style={{
                          fontSize: '0.85rem',
                          color: C.textMuted
                      }}>
                          денари / ноќ
                      </div>
                  </div>
              )}
          </div>

          {/* Main content */}
          <div style={{maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2.5rem', alignItems: 'start'}}>

                  {/* Left */}
                  <div>


                      {item.opis && (
                          <p style={{
                              color: C.text,
                              fontSize: '1.05rem',
                              lineHeight: 1.85,
                              marginBottom: '2rem'
                          }}>{item.opis}</p>
                      )}

                      {/* Amenities */}
                      {activeAmenities.length > 0 && (
                          <div style={{marginBottom: '2rem'}}>
                              <h3 style={{
                                  fontSize: '1rem',
                                  fontWeight: '700',
                                  color: C.text,
                                  marginBottom: '1rem'
                              }}>Погодности</h3>
                              <div style={{
                                  display: 'grid',
                                  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                  gap: '0.625rem'
                              }}>
                                  {activeAmenities.map(({icon, label}) => (
                                      <div key={label} style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '0.5rem',
                                          padding: '0.625rem 0.875rem',
                                          backgroundColor: C.white,
                                          borderRadius: '0.75rem',
                                          border: `1px solid ${C.beigeDark}`,
                                          fontSize: '0.875rem',
                                          color: C.text
                                      }}>
                                          <span style={{fontSize: '1.1rem'}}>{icon}</span>
                                          <span style={{fontWeight: '700'}}>{label}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}

                    {/*  /!* Tags *!/*/}
                    {/*  {item.tagovi?.length > 0 && (*/}
                    {/*      <div style={{marginBottom: '2rem'}}>*/}
                    {/*          <h3 style={{*/}
                    {/*              fontSize: '1rem',*/}
                    {/*              fontWeight: '700',*/}
                    {/*              color: C.text,*/}
                    {/*              marginBottom: '0.75rem'*/}
                    {/*          }}>Тагови</h3>*/}
                    {/*          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>*/}
                    {/*              {item.tagovi.map((tag) => (*/}
                    {/*                  <span key={tag} style={{*/}
                    {/*                      padding: '0.375rem 0.875rem',*/}
                    {/*                      fontSize: '0.8rem',*/}
                    {/*                      borderRadius: '9999px',*/}
                    {/*                      backgroundColor: C.beigeDark,*/}
                    {/*                      color: C.brown*/}
                    {/*                  }}>*/}
                    {/*  {tag.replace(/_/g, ' ')}*/}
                    {/*</span>*/}
                    {/*              ))}*/}
                    {/*          </div>*/}
                    {/*      </div>*/}
                    {/*  )}*/}

                      {/* Google Maps */}
                      <div style={{marginBottom: '2rem'}}>
                          <h3 style={{fontSize: '1rem', fontWeight: '700', color: C.text, marginBottom: '0.75rem'}}><i
                              style={{color: 'darkred',}} className="fa-solid fa-location-dot"></i> Локација</h3>
                          {item.adresa && <p style={{
                              fontSize: '0.875rem',
                              color: C.textMuted,
                              marginBottom: '0.75rem'
                          }}>{item.adresa}</p>}
                          <div style={{borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${C.beigeDark}`}}>
                              <iframe title="Локација" width="100%" height="260" style={{border: 0, display: 'block'}}
                                      loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                      src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}/>
                          </div>
                      </div>

                      {/* Reviews */}
                      <ReviewsSection accommodationId={id}/>
                  </div>

                  {/* Right — sticky sidebar */}
                  <div style={{position: 'sticky', top: '80px'}}>

                      {/* Price + Reserve CTA */}
                      <div style={{
                          backgroundColor: C.white,
                          borderRadius: '1.25rem',
                          padding: '1.5rem',
                          border: `1px solid ${C.beigeDark}`,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          marginBottom: '1rem'
                      }}>
                          {item.cenaOdDen && (
                              <div style={{
                                  marginBottom: '1rem',
                                  paddingBottom: '1rem',
                                  borderBottom: `1px solid ${C.beigeDark}`
                              }}>
                                  <span style={{
                                      fontSize: '1.5rem',
                                      fontWeight: '900',
                                      color: C.greenDark
                                  }}>{Number(item.cenaOdDen).toLocaleString()}</span>
                                  <span style={{fontSize: '0.875rem', color: C.textMuted}}> денари / ноќ</span>
                              </div>
                          )}
                          <button
                              onClick={() => setShowReservation(true)}
                              style={{
                                  width: '100%', padding: '1rem',
                                  backgroundColor: C.greenDark, color: C.white,
                                  border: 'none', borderRadius: '0.875rem',
                                  fontWeight: '800', fontSize: '1.05rem',
                                  cursor: 'pointer', letterSpacing: '0.02em',
                                  boxShadow: '0 4px 16px rgba(74,124,89,0.4)',
                                  transition: 'all 0.2s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                              <i className="fa-solid fa-calendar-check"></i> Резервирај сега
                          </button>

                      </div>

                      {/* Calendar */}
                      <div>

                          {/* Check-in / Check-out */}
                          <div style={{
                              backgroundColor: C.white,
                              borderRadius: '1rem',
                              padding: '1rem',
                              border: `1px solid ${C.beigeDark}`,
                              marginBottom: '1rem'
                          }}>
                              <h3 style={{
                                  fontSize: '0.9rem',
                                  fontWeight: '700',
                                  color: C.text,
                                  marginBottom: '0.75rem'
                              }}>
                                  <i className="fa-solid fa-alarm-clock"></i> Пријавување
                              </h3>

                              <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  fontSize: '0.85rem',
                                  color: C.textMuted
                              }}>
        <span>
            <strong style={{color: C.text}}>Check-in:</strong> <span style={{fontWeight:800,fontSize:'1.2rem'}}>{formatTime(item.checkIn)}</span>
        </span>
                                  <span>
            <strong style={{color: C.text}}>Check-out:</strong> <span style={{fontWeight:800,fontSize:'1.2rem'}}>{formatTime(item.checkOut)}</span>
        </span>
                              </div>
                          </div>
                          <h3 style={{fontSize: '0.9rem', fontWeight: '700', color: C.text, marginBottom: '0.6rem'}}><i
                              className="fa-regular fa-calendar-days"></i> Достапност
                          </h3>
                          <BookingCalendar bookedDates={bookedDates}/>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}