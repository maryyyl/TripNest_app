import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {reservationApi, accommodationRequestApi, contactAdminApi} from '../api'
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
    PENDING: {bg: '#fff8e1', color: '#b45309', label: 'Чека'},
    APPROVED: {bg: '#e8f5e9', color: '#2e7d32', label: 'Одобрено'},
    REJECTED: {bg: '#fdecea', color: '#c0392b', label: 'Одбиено'},
}

function StatusBadge({status}) {
    const s = statusColor[status] || statusColor.PENDING
    return (
        <span style={{padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', backgroundColor: s.bg, color: s.color}}>
            {s.label}
        </span>
    )
}

export default function AdminPage() {
    const {user} = useAuthStore()
    const navigate = useNavigate()
    const [tab, setTab] = useState('reservations')
    const [reservations, setReservations] = useState([])
    const [requests, setRequests] = useState([])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState('ALL')

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') { navigate('/'); return }
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        try {
            const [res, req, mes] = await Promise.all([
                reservationApi.getAll(),
                accommodationRequestApi.getAll(),
                contactAdminApi.getAll(),
            ])
            setReservations(res.data)
            setRequests(req.data)
            setMessages(mes.data)
        } catch (e) { console.error(e) }
        finally { setLoading(false) }
    }

    const handleReservationStatus = async (id, status) => { await reservationApi.updateStatus(id, status); loadData() }
    const handleApprove = async (id) => { await accommodationRequestApi.approve(id); loadData() }
    const handleReject = async (id) => { await accommodationRequestApi.reject(id); loadData() }
    const handleMarkAsRead = async (id) => { await contactAdminApi.markAsRead(id); loadData() }
    const handleDeleteMessage = async (id) => { await contactAdminApi.delete(id); loadData() }

    const unreadCount = messages.filter(m => !m.procitana).length
    const pendingCount = reservations.filter(r => r.status === 'PENDING').length + requests.filter(r => r.status === 'PENDING').length

    const filteredReservations = filterStatus === 'ALL' ? reservations : reservations.filter(r => r.status === filterStatus)
    const filteredRequests = filterStatus === 'ALL' ? requests : requests.filter(r => r.status === filterStatus)

    const tabs = [
        { key: 'reservations', icon: 'fa-regular fa-calendar-check', label: `Резервации (${reservations.length})` },
        { key: 'requests', icon: 'fa-regular fa-lightbulb', label: `Предлози (${requests.length})` },
        { key: 'messages', icon: 'fa-regular fa-message', label: `Пораки (${messages.length})${unreadCount > 0 ? ` • ${unreadCount} нови` : ''}` },
    ]

    return (
        <div style={{minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px'}}>

            {/* Header */}
            <div style={{backgroundColor: C.greenDark, color: C.white, padding: '2.5rem 1.5rem'}}>
                <div style={{maxWidth: '72rem', margin: '0 auto'}}>
                    <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem'}}>
                        <i className="fa-solid fa-gears" style={{marginRight: '0.75rem'}}></i>Admin панел
                    </h1>
                    <p style={{opacity: 0.8}}>Управувај со резервации, предлози и пораки</p>
                    {(pendingCount > 0 || unreadCount > 0) && (
                        <div style={{marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: C.peach, padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600'}}>
                            <i className="fa-regular fa-bell"></i>
                            {pendingCount > 0 && `${pendingCount} барања`}
                            {pendingCount > 0 && unreadCount > 0 && ' · '}
                            {unreadCount > 0 && `${unreadCount} непрочитани пораки`}
                        </div>
                    )}
                </div>
            </div>

            <div style={{maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem'}}>

                {/* Tabs */}
                <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: `2px solid ${C.beigeDark}`}}>
                    {tabs.map(({key, icon, label}) => (
                        <button
                            key={key}
                            onClick={() => { setTab(key); setFilterStatus('ALL') }}
                            style={{
                                padding: '0.75rem 1.5rem', border: 'none',
                                borderBottom: tab === key ? `3px solid ${C.greenDark}` : '3px solid transparent',
                                backgroundColor: 'transparent',
                                color: tab === key ? C.greenDark : C.textMuted,
                                fontWeight: tab === key ? '700' : '500',
                                fontSize: '0.95rem', cursor: 'pointer', marginBottom: '-2px',
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                            }}
                        >
                            <i className={icon}></i> {label}
                        </button>
                    ))}
                </div>

                {/* Status filter — само за reservations и requests */}
                {tab !== 'messages' && (
                    <div style={{display: 'flex', gap: '0.5rem', marginBottom: '1.5rem'}}>
                        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
                            <button key={s} onClick={() => setFilterStatus(s)} style={{
                                padding: '0.375rem 1rem', borderRadius: '9999px', border: 'none',
                                fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer',
                                backgroundColor: filterStatus === s ? C.greenDark : C.beigeDark,
                                color: filterStatus === s ? C.white : C.text,
                            }}>
                                {s === 'ALL' ? 'Сите' : statusColor[s].label}
                            </button>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div style={{textAlign: 'center', padding: '4rem', color: C.textMuted}}>Се вчитува...</div>
                ) : (
                    <>
                        {/* ── RESERVATIONS ── */}
                        {tab === 'reservations' && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                {filteredReservations.length === 0 ? (
                                    <p style={{textAlign: 'center', color: C.textMuted, padding: '4rem'}}>Нема резервации</p>
                                ) : filteredReservations.map((r) => (
                                    <div key={r.id} style={{backgroundColor: C.white, borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${C.beigeDark}`}}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                                            <div>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
                                                    <StatusBadge status={r.status}/>
                                                    <span style={{fontSize: '0.8rem', color: C.textMuted}}>#{r.id}</span>
                                                </div>
                                                <h3 style={{fontWeight: '700', color: C.text, marginBottom: '0.25rem'}}>
                                                    {r.accommodation?.naslov || 'Непознато сместување'}
                                                </h3>
                                                <p style={{fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.25rem'}}>
                                                    <i className="fa-solid fa-user"></i> {r.user?.username} · <i className="fa-solid fa-location-dot" style={{color: 'darkred'}}></i> {r.accommodation?.lokacija}
                                                </p>
                                                <p style={{fontSize: '0.875rem', color: C.brown}}>
                                                    <i className="fa-regular fa-calendar-days"></i> {r.datumOd} → {r.datumDo} · <i className="fa-solid fa-user-group"></i> {r.brojLica} лица
                                                </p>
                                                {r.napomena && <p style={{fontSize: '0.85rem', color: C.textMuted, marginTop: '0.5rem', fontStyle: 'italic'}}>„{r.napomena}"</p>}
                                            </div>
                                            {r.status === 'PENDING' && (
                                                <div style={{display: 'flex', gap: '0.5rem'}}>
                                                    <button onClick={() => handleReservationStatus(r.id, 'APPROVED')} style={{padding: '0.5rem 1.25rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer'}}>
                                                        ✓ Одобри
                                                    </button>
                                                    <button onClick={() => handleReservationStatus(r.id, 'REJECTED')} style={{padding: '0.5rem 1.25rem', backgroundColor: '#fdecea', color: '#c0392b', border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer'}}>
                                                        ✕ Одбиј
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── REQUESTS ── */}
                        {tab === 'requests' && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                {filteredRequests.length === 0 ? (
                                    <p style={{textAlign: 'center', color: C.textMuted, padding: '4rem'}}>Нема предлози</p>
                                ) : filteredRequests.map((r) => (
                                    <div key={r.id} style={{backgroundColor: C.white, borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${C.beigeDark}`}}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                                            <div style={{flex: 1}}>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
                                                    <StatusBadge status={r.status}/>
                                                    <span style={{fontSize: '0.8rem', color: C.textMuted}}>#{r.id}</span>
                                                </div>
                                                <h3 style={{fontWeight: '700', color: C.text, marginBottom: '0.25rem'}}>{r.naslov}</h3>
                                                <p style={{fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.25rem'}}>
                                                    <i className="fa-solid fa-user"></i> {r.user?.username} · <i className="fa-solid fa-location-dot" style={{color: 'darkred'}}></i> {r.lokacija}
                                                </p>
                                                {r.cenaOdDen && <p style={{fontSize: '0.875rem', color: C.greenDark, fontWeight: '600', marginBottom: '0.25rem'}}>{Number(r.cenaOdDen).toLocaleString()} ден/ноќ</p>}
                                                {r.opis && <p style={{fontSize: '0.875rem', color: C.textMuted, marginTop: '0.25rem', lineHeight: 1.6}}>{r.opis}</p>}
                                                {r.napomena && <p style={{fontSize: '0.85rem', color: C.brown, marginTop: '0.5rem', fontStyle: 'italic'}}><i className="fa-regular fa-comment-dots"></i> „{r.napomena}"</p>}
                                                {r.link && <a href={r.link} target="_blank" rel="noopener noreferrer" style={{fontSize: '0.8rem', color: C.greenDark, display: 'inline-block', marginTop: '0.5rem'}}>{r.link}</a>}
                                            </div>
                                            {r.slika && <img src={r.slika} alt={r.naslov} style={{width: '7rem', height: '5rem', objectFit: 'cover', borderRadius: '0.75rem', flexShrink: 0}} onError={e => e.target.style.display = 'none'}/>}
                                        </div>
                                        {r.status === 'PENDING' && (
                                            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${C.beigeDark}`}}>
                                                <button onClick={() => handleApprove(r.id)} style={{padding: '0.5rem 1.25rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer'}}>
                                                    ✓ Одобри и додај на платформата
                                                </button>
                                                <button onClick={() => handleReject(r.id)} style={{padding: '0.5rem 1.25rem', backgroundColor: '#fdecea', color: '#c0392b', border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer'}}>
                                                    ✕ Одбиј
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── MESSAGES ── */}
                        {tab === 'messages' && (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                                {messages.length === 0 ? (
                                    <p style={{textAlign: 'center', color: C.textMuted, padding: '4rem'}}>Нема пораки</p>
                                ) : messages.map((m) => (
                                    <div key={m.id} style={{
                                        backgroundColor: m.procitana ? C.white : '#f0f7f3',
                                        borderRadius: '1rem', padding: '1.5rem',
                                        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                        border: m.procitana ? `1px solid ${C.beigeDark}` : `2px solid ${C.greenDark}`,
                                    }}>
                                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem'}}>
                                            <div style={{flex: 1}}>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem'}}>
                                                    {!m.procitana && (
                                                        <span style={{padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: '700', backgroundColor: C.greenDark, color: C.white}}>
                                                            НОВО
                                                        </span>
                                                    )}
                                                    <span style={{fontWeight: '700', color: C.text}}>{m.subject}</span>
                                                    <span style={{fontSize: '0.75rem', color: C.textMuted}}>#{m.id}</span>
                                                </div>
                                                <p style={{fontSize: '0.875rem', color: C.textMuted, marginBottom: '0.5rem'}}>
                                                    <i className="fa-solid fa-user"></i> {m.ime} · <i className="fa-solid fa-envelope" style={{color: C.peach}}></i> {m.email}
                                                </p>
                                                <p style={{fontSize: '0.9rem', color: C.text, lineHeight: 1.6, marginBottom: '0.5rem'}}>{m.poraka}</p>
                                                <p style={{fontSize: '0.75rem', color: C.textMuted}}>{new Date(m.createdAt).toLocaleString('mk')}</p>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                                {!m.procitana && (
                                                    <button onClick={() => handleMarkAsRead(m.id)} style={{padding: '0.5rem 1rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer'}}>
                                                        ✓ Означи прочитана
                                                    </button>
                                                )}
                                                <a href={`mailto:${m.email}?subject=Re: ${m.subject}`} style={{padding: '0.5rem 1rem', backgroundColor: C.beigeDark, color: C.text, borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none', textAlign: 'center'}}>
                                                    ↩ Одговори
                                                </a>
                                                <button onClick={() => handleDeleteMessage(m.id)} style={{padding: '0.5rem 1rem', backgroundColor: '#fdecea', color: '#c0392b', border: 'none', borderRadius: '0.625rem', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer'}}>
                                                    ✕ Избриши
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}