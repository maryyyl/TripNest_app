import { useState } from 'react'
import { contactAdminApi } from '../api/index.js'

const C = {
    greenDark: '#4a7c59',
    greenMid: '#7fa882',
    peach: '#e8866a',
    peachLight: '#f2b49e',
    beige: '#f5ede4',
    beigeDark: '#e8d5c4',
    brown: '#8b6245',
    text: '#3a3a2a',
    textMuted: '#7a7a6a',
    white: '#ffffff',
}

const emptyForm = { ime: '', email: '', subject: '', poraka: '' }

const SUBJECTS = [
    'Општо прашање',
    'Проблем со резервација',
    'Предлог за подобрување',
    'Партнерство',
    'Друго',
]

export default function ContactPage() {
    const [form, setForm] = useState(emptyForm)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            console.log(form)
            await contactAdminApi.send(form)
            setSuccess(true)
            setForm(emptyForm)
        } catch {
            setError('Грешка при испраќање. Обиди се повторно.')
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '0.875rem 1.125rem',
        borderRadius: '0.875rem',
        border: `1.5px solid ${C.beigeDark}`,
        fontSize: '0.95rem',
        color: C.text,
        backgroundColor: C.white,
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
        fontFamily: 'Lato, sans-serif',
    }

    const labelStyle = {
        display: 'block',
        fontSize: '0.8rem',
        fontWeight: '700',
        color: C.textMuted,
        marginBottom: '0.4rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

            {/* Hero */}
            <div style={{ backgroundColor: C.greenDark, padding: '5rem 1.5rem', textAlign: 'center', color: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: '250px', height: '250px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <i className="fa-solid fa-paper-plane" style={{ fontSize: '3rem', color: C.white, marginBottom: '1rem', display: 'block' }} />
                    <h1 style={{ fontSize: '2.75rem', fontWeight: '900', marginBottom: '0.75rem' }}>Контактирај не</h1>
                    <p style={{ opacity: 0.85, fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto' }}>
                        Имаш прашање, предлог или сакаш да соработуваме? Со задоволство ќе ти одговориме!
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Left — Info */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: C.text, marginBottom: '0.5rem' }}>
                            Остани во контакт
                        </h2>
                        <p style={{ color: C.textMuted, lineHeight: 1.7, marginBottom: '2.5rem' }}>
                            Тимот на TripNest.mk е достапен секој работен ден. Одговараме во рок од 24 часа.
                        </p>

                        {/* Contact cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { icon: 'fa-solid fa-envelope', label: 'Email', value: 'nesttrip4@gmail.com', color: C.peach, href: 'mailto:nesttrip4@gmail.com' },
                                { icon: 'fa-solid fa-phone', label: 'Телефон', value: '070 123 456', color: C.greenDark, href: 'tel:+38970123456' },
                                { icon: 'fa-solid fa-location-dot', label: 'Локација', value: 'Скопје, Македонија', color: '#c0392b', href: null },
                            ].map(({ icon, label, value, color, href }) => (
                                <div
                                    key={label}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: C.white, borderRadius: '1rem', padding: '1.25rem 1.5rem', border: `1px solid ${C.beigeDark}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                                >
                                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className={icon} style={{ color, fontSize: '1.1rem' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{label}</p>
                                        {href ? (
                                            <a href={href} style={{ fontWeight: '600', color: C.text, textDecoration: 'none', fontSize: '0.95rem' }}>{value}</a>
                                        ) : (
                                            <p style={{ fontWeight: '600', color: C.text, margin: 0, fontSize: '0.95rem' }}>{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Working hours */}
                        <div style={{ marginTop: '2rem', backgroundColor: C.greenDark, borderRadius: '1rem', padding: '1.5rem', color: C.white }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <i className="fa-solid fa-clock" style={{ color: C.white }} />
                                <span style={{ fontWeight: '700' }}>Работно време</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem', opacity: 0.9 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Понеделник — Петок</span>
                                    <span style={{ fontWeight: '600' }}>09:00 : 17:00</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Сабота</span>
                                    <span style={{ fontWeight: '600' }}>10:00 : 15:00</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Недела</span>
                                    <span style={{ fontWeight: '600', color: C.greenMid }}>Затворено</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div style={{ backgroundColor: C.white, borderRadius: '1.5rem', padding: '2.5rem', border: `1px solid ${C.beigeDark}`, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>

                        {success ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                <i className="fa-solid fa-circle-check" style={{ fontSize: '4rem', color: C.greenDark, marginBottom: '1.25rem', display: 'block' }} />
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: C.text, marginBottom: '0.75rem' }}>Пораката е испратена!</h3>
                                <p style={{ color: C.textMuted, lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Ти благодариме за пораката.
                                    Нашиот тим работи на вашите барања. Очекувајте го нашиот одговор во рок од 24 часа.
                                </p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    style={{ padding: '0.75rem 2rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '9999px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' }}
                                >
                                    Испрати нова порака
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: C.text, marginBottom: '0.25rem' }}>Испрати порака</h2>
                                <p style={{ color: C.textMuted, fontSize: '0.875rem', marginBottom: '2rem' }}>Пополни ги полињата и ние ќе ве контактираме наскоро.</p>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={labelStyle}>Име и презиме *</label>
                                            <input
                                                name="ime"
                                                value={form.ime}
                                                onChange={handleChange}
                                                required
                                                placeholder="Марко Марковски"
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = C.greenDark}
                                                onBlur={e => e.target.style.borderColor = C.beigeDark}
                                            />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>Email *</label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="marko@email.com"
                                                style={inputStyle}
                                                onFocus={e => e.target.style.borderColor = C.greenDark}
                                                onBlur={e => e.target.style.borderColor = C.beigeDark}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Тема *</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            required
                                            style={{ ...inputStyle, cursor: 'pointer' }}
                                            onFocus={e => e.target.style.borderColor = C.greenDark}
                                            onBlur={e => e.target.style.borderColor = C.beigeDark}
                                        >
                                            <option value="">— Избери тема —</option>
                                            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label style={labelStyle}>Порака *</label>
                                        <textarea
                                            name="poraka"
                                            value={form.poraka}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            placeholder="Напиши ја твојата порака овде..."
                                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                                            onFocus={e => e.target.style.borderColor = C.greenDark}
                                            onBlur={e => e.target.style.borderColor = C.beigeDark}
                                        />
                                    </div>

                                    {error && (
                                        <p style={{ color: '#c0392b', fontSize: '0.875rem', backgroundColor: '#fdecea', padding: '0.75rem 1rem', borderRadius: '0.625rem', margin: 0 }}>
                                            <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '0.5rem' }} />
                                            {error}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            padding: '1rem',
                                            backgroundColor: C.greenDark,
                                            color: C.white,
                                            border: 'none',
                                            borderRadius: '0.875rem',
                                            fontWeight: '800',
                                            fontSize: '1rem',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: loading ? 0.7 : 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.625rem',
                                            boxShadow: '0 4px 16px rgba(74,124,89,0.35)',
                                            transition: 'all 0.2s',
                                            fontFamily: 'Lato, sans-serif',
                                        }}
                                        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)' }}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <i className="fa-solid fa-paper-plane" />
                                        {loading ? 'Се испраќа...' : 'Испрати порака'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}