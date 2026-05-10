import { useState } from 'react'
import { Link } from 'react-router-dom'
import { accommodationApi, aiSearchApi } from '../api'

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

const EXAMPLES = [
    'Сместување за 5 лица со базен во Охрид',
    'Романтична вила со СПА до 5000 ден',
    'Сместување со миленичиња во природа',
    'Буџет апартман во Скопје со паркинг',
]

function AccommodationCard({ item }) {
    return (
        <Link
            to={`/accommodations/${item.id}`}
            style={{ textDecoration: 'none', display: 'block', backgroundColor: C.white, borderRadius: '1rem', overflow: 'hidden', border: `1px solid ${C.beigeDark}`, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
        >
            {item.slika && (
                <div style={{ height: '160px', overflow: 'hidden', backgroundColor: C.beigeDark }}>
                    <img src={item.slika} alt={item.naslov} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                </div>
            )}
            <div style={{ padding: '1rem' }}>
                <h4 style={{ fontWeight: '700', color: C.text, marginBottom: '0.375rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{item.naslov}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: C.textMuted }}>
            <i className="fa-solid fa-location-dot" style={{ color: '#c0392b', marginRight: '0.3rem' }} />
              {item.lokacija}
          </span>
                    {item.cenaOdDen && (
                        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: C.greenDark }}>{Number(item.cenaOdDen).toLocaleString()} ден</span>
                    )}
                </div>
                {item.kapacitet && (
                    <p style={{ fontSize: '0.78rem', color: C.textMuted, marginTop: '0.3rem' }}>
                        <i className="fa-solid fa-user-group" style={{ marginRight: '0.3rem' }} />
                        до {item.kapacitet} лица
                    </p>
                )}
            </div>
        </Link>
    )
}

export default function AISearch() {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [error, setError] = useState('')

    const handleSearch = async (q = query) => {
        if (!q.trim()) return
        setLoading(true)
        setError('')
        setResults(null)

        try {
            const allRes = await accommodationApi.getAll()
            const all = allRes.data
            const aiResult = await aiSearchApi.search(q, all)
            const matched = aiResult.ids
                .map(id => all.find(a => a.id === id))
                .filter(Boolean)

            setResults({ items: matched, obrazlozenie: aiResult.obrazlozenie })
        } catch (e) {
            setError('Грешка при AI пребарување. Обиди се повторно.')
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ backgroundColor: C.beigeDark, padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: '52rem', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: C.greenDark, color: C.white, padding: '0.375rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '700', marginBottom: '1rem' }}>
                        <i className="fa-solid fa-wand-magic-sparkles" />
                        AI Пребарување
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: C.text, marginBottom: '0.5rem' }}>
                        Опиши го своето совршено сместување
                    </h2>
                    <p style={{ color: C.textMuted, fontSize: '0.95rem' }}>
                        Пишувај на природен јазик — AI ќе ти најде најсоодветните опции
                    </p>
                </div>

                {/* Search box */}
                <div style={{ backgroundColor: C.white, borderRadius: '1.25rem', padding: '1.25rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
          <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch() } }}
              placeholder="пр. Сместување за 6 лица со базен и миленичиња, до 4000 ден по ноќ, некаде во природа..."
              rows={3}
              style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: '1rem', color: C.text, fontFamily: 'Lato, sans-serif', lineHeight: 1.6, boxSizing: 'border-box' }}
          />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                        <button
                            onClick={() => handleSearch()}
                            disabled={loading || !query.trim()}
                            style={{ padding: '0.75rem 1.75rem', backgroundColor: C.greenDark, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.95rem', cursor: loading || !query.trim() ? 'not-allowed' : 'pointer', opacity: loading || !query.trim() ? 0.65 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                        >
                            {loading
                                ? <><i className="fa-solid fa-circle-notch fa-spin" /> Пребарувам...</>
                                : <><i className="fa-solid fa-wand-magic-sparkles" /> Пребарај</>
                            }
                        </button>
                    </div>
                </div>

                {/* Example queries */}
                {!results && !loading && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                        {EXAMPLES.map(ex => (
                            <button
                                key={ex}
                                onClick={() => { setQuery(ex); handleSearch(ex) }}
                                style={{ padding: '0.4rem 0.875rem', borderRadius: '9999px', border: `1px solid ${C.brown}`, backgroundColor: 'transparent', color: C.brown, fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s' }}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.brown; e.currentTarget.style.color = C.white }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.brown }}
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p style={{ color: '#c0392b', textAlign: 'center', backgroundColor: '#fdecea', padding: '0.75rem', borderRadius: '0.75rem', marginTop: '1rem' }}>{error}</p>
                )}

                {/* Loading skeleton */}
                {loading && (
                    <div style={{ marginTop: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ backgroundColor: C.white, borderRadius: '1rem', height: '220px', opacity: 0.6, animation: 'pulse 1.5s infinite' }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Results */}
                {results && (
                    <div style={{ marginTop: '2rem' }}>
                        {/* AI explanation */}
                        <div style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: `1px solid ${C.beigeDark}`, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <i className="fa-solid fa-robot" style={{ color: C.greenDark, fontSize: '1.1rem', marginTop: '0.1rem', flexShrink: 0 }} />
                            <p style={{ color: C.text, fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{results.obrazlozenie}</p>
                        </div>

                        {/* Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            {results.items.map(item => <AccommodationCard key={item.id} item={item} />)}
                        </div>

                        {/* New search */}
                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button
                                onClick={() => { setResults(null); setQuery('') }}
                                style={{ padding: '0.5rem 1.25rem', backgroundColor: 'transparent', color: C.textMuted, border: `1px solid ${C.beigeDark}`, borderRadius: '9999px', fontSize: '0.85rem', cursor: 'pointer' }}
                            >
                                ← Ново пребарување
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}