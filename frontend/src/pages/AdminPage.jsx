import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { reservationApi, accommodationRequestApi } from '../api'
import useAuthStore from '../store/authStore'

const C = {
  greenDark: '#4a7c59',
  greenMid: '#7fa882',
  peach: '#e8866a',
  beige: '#f5ede4',
  beigeDark: '#e8d5c4',
  brown: '#8b6245',
  text: '#3a3a2a',
  textMuted: '#7a7a6a',
  white: '#ffffff',
}

const statusColor = {
  PENDING: { bg: '#fff8e1', color: '#b45309', label: 'Чека' },
  APPROVED: { bg: '#e8f5e9', color: '#2e7d32', label: 'Одобрено' },
  REJECTED: { bg: '#fdecea', color: '#c0392b', label: 'Одбиено' },
}

function StatusBadge({ status }) {
  const s = statusColor[status] || statusColor.PENDING
  return (
    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', backgroundColor: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

export default function AdminPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [tab, setTab] = useState('reservations')
  const [reservations, setReservations] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      navigate('/')
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [res, req] = await Promise.all([
        reservationApi.getAll(),
        accommodationRequestApi.getAll(),
      ])
      setReservations(res.data)
      setRequests(req.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleReservationStatus = async (id, status) => {
    await reservationApi.updateStatus(id, status)
    loadData()
  }

  const handleApprove = async (id) => {
    await accommodationRequestApi.approve(id)
    loadData()
  }

  const handleReject = async (id) => {
    await accommodationRequestApi.reject(id)
    loadData()
  }

  const filteredReservations = filterStatus === 'ALL'
    ? reservations
    : reservations.filter(r => r.status === filterStatus)

  const filteredRequests = filterStatus === 'ALL'
    ? requests
    : requests.filter(r => r.status === filterStatus)

  const pendingCount = reservations.filter(r => r.status === 'PENDING').length
    + requests.filter(r => r.status === 'PENDING').length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

      {/* Header */}
      <div style={{ backgroundColor: C.greenDark, color: C.white, padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>⚙️ Admin панел</h1>
          <p style={{ opacity: 0.8 }}>Управувај со резервации и предлози</p>
          {pendingCount > 0 && (
            <div style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: C.peach, padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600' }}>
              🔔 {pendingCount} нови барања чекаат одобрување
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `2px solid ${C.beigeDark}`, paddingBottom: '0' }}>
          {[
            { key: 'reservations', label: `🗓️ Резервации (${reservations.length})` },
            { key: 'requests', label: `💡 Предлози (${requests.length})` },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setFilterStatus('ALL') }}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderBottom: tab === key ? `3px solid ${C.greenDark}` : '3px solid transparent',
                backgroundColor: 'transparent',
                color: tab === key ? C.greenDark : C.textMuted,
                fontWeight: tab === key ? '700' : '500',
                fontSize: '0.95rem',
                cursor: 'pointer',
                marginBottom: '-2px',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '0.375rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                backgroundColor: filterStatus === s ? C.greenDark : C.beigeDark,
                color: filterStatus === s ? C.white : C.text,
              }}
            >
              {s === 'ALL' ? 'Сите' : statusColor[s].label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: C.textMuted }}>Се вчитува...</div>
        ) : tab === 'reservations' ? (

          /* ── RESERVATIONS ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredReservations.length === 0 ? (
              <p style={{ textAlign: 'center', color: C.textMuted, padding: '4rem' }}>Нема резервации</p>
            ) : filteredReservations.map((r) => (
              <div key={r.id} style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${C.beigeDark}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <StatusBadge status={r.status} />
                      <span style={{ fontSize: '0.8rem', color: C.textMuted }}>#{r.id}</span>
                    </div>
                    <h3 style={{ fontWeight: '700', color: C.text, marginBottom: '0.25rem' }}>
                      {r.accommodation?.naslov || 'Непознато сместување'}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.25rem' }}>
                      👤 {r.user?.username} · 📍 {r.accommodation?.lokacija}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: C.brown }}>
                      🗓️ {r.datumOd} → {r.datumDo} · 👥 {r.brojLica} лица
                    </p>
                    {r.napomena && (
                      <p style={{ fontSize: '0.85rem', color: C.textMuted, marginTop: '0.5rem', fontStyle: 'italic' }}>
                        „{r.napomena}"
                      </p>
                    )}
                  </div>

                  {r.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleReservationStatus(r.id, 'APPROVED')}
                        style={{ padding: '0.5rem 1.25rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        ✓ Одобри
                      </button>
                      <button
                        onClick={() => handleReservationStatus(r.id, 'REJECTED')}
                        style={{ padding: '0.5rem 1.25rem', backgroundColor: '#fdecea', color: '#c0392b', border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        ✕ Одбиј
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        ) : (

          /* ── ACCOMMODATION REQUESTS ── */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredRequests.length === 0 ? (
              <p style={{ textAlign: 'center', color: C.textMuted, padding: '4rem' }}>Нема предлози</p>
            ) : filteredRequests.map((r) => (
              <div key={r.id} style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${C.beigeDark}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <StatusBadge status={r.status} />
                      <span style={{ fontSize: '0.8rem', color: C.textMuted }}>#{r.id}</span>
                    </div>
                    <h3 style={{ fontWeight: '700', color: C.text, marginBottom: '0.25rem' }}>{r.naslov}</h3>
                    <p style={{ fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.25rem' }}>
                      👤 {r.user?.username} · 📍 {r.lokacija}
                    </p>
                    {r.cenaOdDen && (
                      <p style={{ fontSize: '0.875rem', color: C.greenDark, fontWeight: '600', marginBottom: '0.25rem' }}>
                        {Number(r.cenaOdDen).toLocaleString()} ден/ноќ
                      </p>
                    )}
                    {r.opis && (
                      <p style={{ fontSize: '0.875rem', color: C.textMuted, marginTop: '0.25rem', lineHeight: 1.6 }}>{r.opis}</p>
                    )}
                    {r.napomena && (
                      <p style={{ fontSize: '0.85rem', color: C.brown, marginTop: '0.5rem', fontStyle: 'italic' }}>
                        💬 „{r.napomena}"
                      </p>
                    )}
                    {r.link && (
                      <a href={r.link} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.8rem', color: C.greenDark, display: 'inline-block', marginTop: '0.5rem' }}>
                        🔗 {r.link}
                      </a>
                    )}
                  </div>

                  {r.slika && (
                    <img src={r.slika} alt={r.naslov}
                      style={{ width: '7rem', height: '5rem', objectFit: 'cover', borderRadius: '0.75rem', flexShrink: 0 }}
                      onError={e => e.target.style.display = 'none'}
                    />
                  )}
                </div>

                {r.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${C.beigeDark}` }}>
                    <button
                      onClick={() => handleApprove(r.id)}
                      style={{ padding: '0.5rem 1.25rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      ✓ Одобри и додај на платформата
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      style={{ padding: '0.5rem 1.25rem', backgroundColor: '#fdecea', color: '#c0392b', border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}
                    >
                      ✕ Одбиј
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
