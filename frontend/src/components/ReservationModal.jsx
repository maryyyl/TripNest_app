import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {reservationApi} from '../api'
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

export default function ReservationModal({accommodation, onClose}) {
    const {isAuthenticated} = useAuthStore()
    const navigate = useNavigate()
    const [form, setForm] = useState({datumOd: null, datumDo: null, vozrasni: 1, deca: 0, napomena: ''})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [bookedDates, setBookedDates] = useState([])
    const [afterLogin, setAfterLogin] = useState(null)

    useEffect(() => {
        if (!accommodation?.id) return
        reservationApi.getBookedDates(accommodation.id)
            .then(res => {
                // API враќа низа на стринг датуми: ["2025-07-01", "2025-07-02", ...]
                const dates = (res.data || res).map(d => {
                    const [y, m, day] = d.split('-')
                    return new Date(Number(y), Number(m) - 1, Number(day))
                })
                setBookedDates(dates)
            })
            .catch(() => {})
    }, [accommodation?.id])

    if (!isAuthenticated) {
        return (
            <>
                <div onClick={onClose} style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.4)',zIndex:100,backdropFilter:'blur(2px)'}}/>
                <div style={modalStyle}>
                    <div style={{textAlign:'center',padding:'2rem'}}>
                        <p style={{fontSize:'3rem',marginBottom:'1rem'}}><i className="fa-solid fa-lock"></i></p>
                        <h2 style={{color:C.greenDark,fontWeight:'bold',marginBottom:'0.5rem'}}>Потребна е најава</h2>
                        <p style={{color:C.textMuted,marginBottom:'1.5rem'}}>За да резервираш, мора да си најавен.</p>
                        <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center'}}>
                            <button onClick={onClose} style={btnSecondary}>Откажи</button>
                            <button
                                onClick={() => {
                                    navigate('/login', {
                                        state: {
                                            action: 'OPEN_RESERVATION_MODAL',
                                            accommodationId: accommodation.id,
                                        },
                                    })
                                }}
                                style={btnPrimary}
                            >
                                Најави се
                            </button>
                            {/*<button onClick={() => navigate('/login')} style={btnPrimary}>Најави се</button>*/}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.datumOd || !form.datumDo) { setError('Изберете датуми'); return }
        if (form.datumOd >= form.datumDo) { setError('Датумот на одење мора да е пред датумот на враќање'); return }
        setError('')
        setLoading(true)
        try {
            await reservationApi.create({
                accommodationId: accommodation.id,
                datumOd: form.datumOd.toISOString().split('T')[0],
                datumDo: form.datumDo.toISOString().split('T')[0],
                brojLica: Number(form.vozrasni) + Number(form.deca),
                napomena: form.napomena,
            })
            setSuccess(true)
        } catch {
            setError('Грешка при резервација. Обиди се повторно.')
        } finally {
            setLoading(false)
        }
    }

    const nights = form.datumOd && form.datumDo
        ? Math.max(0, Math.ceil((form.datumDo - form.datumOd) / (1000 * 60 * 60 * 24)))
        : 0
    const total = nights && accommodation.cenaOdDen ? nights * accommodation.cenaOdDen : null
    const today = new Date(); today.setHours(0,0,0,0)

    return (
        <>
            <div onClick={onClose} style={{position:'fixed',inset:0,backgroundColor:'rgba(0,0,0,0.4)',zIndex:100,backdropFilter:'blur(2px)'}}/>
            <div style={modalStyle}>

                <style>{`
                    .rdp-custom .react-datepicker { font-family: inherit; border: none; box-shadow: 0 4px 20px rgba(0,0,0,0.12); border-radius: 0.75rem; overflow: hidden; }
                    .rdp-custom .react-datepicker__header { background: ${C.beige}; border-bottom: 1px solid ${C.beigeDark}; }
                    .rdp-custom .react-datepicker__day--selected, .rdp-custom .react-datepicker__day--in-range { background: ${C.greenDark} !important; color: white !important; }
                    .rdp-custom .react-datepicker__day--in-selecting-range { background: #a8c5b0 !important; color: white !important; }
                    .rdp-custom .react-datepicker__day--excluded { background: #f5c6c6 !important; color: #c0392b !important; text-decoration: line-through; pointer-events: none; }
                    .rdp-custom .react-datepicker__day:hover { background: ${C.beigeDark}; border-radius: 0.4rem; }
                    .rdp-custom .react-datepicker__input-container input { width: 100%; padding: 0.625rem 0.875rem; border-radius: 0.625rem; border: 1px solid ${C.beigeDark}; font-size: 0.9rem; color: ${C.text}; background: ${C.beige}; outline: none; box-sizing: border-box; cursor: pointer; }
                `}</style>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem'}}>
                    <h2 style={{fontSize:'1.25rem',fontWeight:'bold',color:C.greenDark}}>
                        <i className="fa-solid fa-calendar-check"></i> Резервирај
                    </h2>
                    <button onClick={onClose} style={{background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer',color:C.textMuted}}>×</button>
                </div>

                <div style={{backgroundColor:C.beige,borderRadius:'0.75rem',padding:'0.875rem 1rem',marginBottom:'1.5rem'}}>
                    <p style={{fontWeight:'600',color:C.text}}>{accommodation.naslov}</p>
                    {accommodation.lokacija && <p style={{fontSize:'0.85rem',color:C.textMuted}}><i style={{color:'darkred'}} className="fa-solid fa-location-dot"></i> {accommodation.lokacija}</p>}
                    {accommodation.cenaOdDen && <p style={{fontSize:'0.85rem',color:C.greenDark,fontWeight:'600',marginTop:'0.25rem'}}>од {accommodation.cenaOdDen.toLocaleString()} ден/ноќ</p>}
                </div>

                {success ? (
                    <div style={{textAlign:'center',padding:'1.5rem 0'}}>
                        <p style={{fontSize:'3rem',marginBottom:'0.75rem'}}><i style={{color:'green'}} className="fa-solid fa-square-check"></i></p>
                        <h3 style={{color:C.greenDark,fontWeight:'bold',marginBottom:'0.5rem'}}>Резервацијата е испратена!</h3>
                        <p style={{color:C.textMuted,fontSize:'0.9rem',marginBottom:'1.5rem'}}>Администраторот ќе ја прегледа и потврди наскоро.</p>
                        <button onClick={onClose} style={btnPrimary}>Затвори</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>

                        {/* Датуми */}
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}} className="rdp-custom">
                            <div>
                                <label style={labelStyle}>Датум од *</label>
                                <DatePicker
                                    selected={form.datumOd}
                                    onChange={date => setForm({...form, datumOd: date, datumDo: form.datumDo && date >= form.datumDo ? null : form.datumDo})}
                                    excludeDates={bookedDates}
                                    minDate={today}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Избери датум"
                                    popperPlacement="bottom-start"
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Датум до *</label>
                                <DatePicker
                                    selected={form.datumDo}
                                    onChange={date => setForm({...form, datumDo: date})}
                                    excludeDates={bookedDates}
                                    minDate={form.datumOd ? new Date(form.datumOd.getTime() + 86400000) : today}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Избери датум"
                                    popperPlacement="bottom-start"
                                    required
                                />
                            </div>
                        </div>

                        {/* Возрасни + Деца */}
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.75rem'}}>
                            <div>
                                <label style={labelStyle}>
                                    <i className="fa-solid fa-user" style={{marginRight:'0.3rem'}}/> Возрасни *
                                </label>
                                <input
                                    type="number" min="1" max="20"
                                    value={form.vozrasni}
                                    onChange={e => setForm({...form, vozrasni: e.target.value})}
                                    required style={inputStyle}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>
                                    <i className="fa-solid fa-child" style={{marginRight:'0.3rem'}}/> Деца
                                </label>
                                <input
                                    type="number" min="0" max="20"
                                    value={form.deca}
                                    onChange={e => setForm({...form, deca: e.target.value})}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        {/* Вкупно лица */}
                        {(Number(form.vozrasni) + Number(form.deca)) > 0 && (
                            <p style={{fontSize:'0.8rem',color:C.textMuted,margin:'-0.25rem 0'}}>
                                <i className="fa-solid fa-user-group" style={{marginRight:'0.3rem'}}/>
                                Вкупно: {Number(form.vozrasni) + Number(form.deca)} лица
                                ({form.vozrasni} возрасни + {form.deca} деца)
                            </p>
                        )}

                        {/* Напомена */}
                        <div>
                            <label style={labelStyle}>Напомена</label>
                            <textarea value={form.napomena} onChange={e => setForm({...form, napomena: e.target.value})}
                                      rows={2} style={{...inputStyle, resize:'vertical'}} placeholder="Дополнителни барања..."/>
                        </div>

                        {/* Price summary */}
                        {nights > 0 && (
                            <div style={{backgroundColor:C.beige,borderRadius:'0.75rem',padding:'0.875rem 1rem'}}>
                                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.875rem',color:C.textMuted}}>
                                    <span>
                                        {nights} ноќ/и × {accommodation.cenaOdDen?.toLocaleString()} ден
                                        · {Number(form.vozrasni) + Number(form.deca)} лица
                                    </span>
                                    {total && <span style={{fontWeight:'700',color:C.greenDark}}>{total.toLocaleString()} ден</span>}
                                </div>
                            </div>
                        )}

                        {error && <p style={{color:'#c0392b',fontSize:'0.875rem',backgroundColor:'#fdecea',padding:'0.5rem 0.875rem',borderRadius:'0.5rem'}}>{error}</p>}

                        <div style={{display:'flex',gap:'0.75rem',marginTop:'0.25rem'}}>
                            <button type="button" onClick={onClose} style={btnSecondary}>Откажи</button>
                            <button type="submit" disabled={loading} style={{...btnPrimary,opacity:loading ? 0.7 : 1}}>
                                {loading ? 'Се испраќа...' : 'Испрати барање'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}

const modalStyle = {
    position:'fixed', top:'50%', left:'50%',
    transform:'translate(-50%, -50%)',
    zIndex:101, width:'100%', maxWidth:'32rem',
    maxHeight:'90vh', overflowY:'auto',
    backgroundColor:'#ffffff',
    borderRadius:'1.25rem',
    boxShadow:'0 20px 60px rgba(0,0,0,0.2)',
    padding:'2rem',
}

const inputStyle = {
    width:'100%', padding:'0.625rem 0.875rem',
    borderRadius:'0.625rem', border:`1px solid ${C.beigeDark}`,
    fontSize:'0.9rem', color:C.text, backgroundColor:C.beige,
    outline:'none', boxSizing:'border-box',
}

const labelStyle = {
    display:'block', fontSize:'0.8rem', fontWeight:'600',
    color:C.textMuted, marginBottom:'0.3rem',
    textTransform:'uppercase', letterSpacing:'0.04em',
}

const btnPrimary = {
    flex:1, padding:'0.75rem', backgroundColor:C.greenDark,
    color:'#fff', border:'none', borderRadius:'0.75rem',
    fontWeight:'600', cursor:'pointer',
}

const btnSecondary = {
    flex:1, padding:'0.75rem', backgroundColor:C.beigeDark,
    color:C.text, border:'none', borderRadius:'0.75rem',
    fontWeight:'600', cursor:'pointer',
}