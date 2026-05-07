import { useState } from 'react'
import Card from './Card'

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

export default function ListPage({ title, emoji, desc, accentColor, basePath, hook, showAmenities = false, showCena = false }) {
    const {
        items, loading, error,
        search, setSearch,
        selectedLokacija, setSelectedLokacija,
        sortCena, setSortCena,
        cenaMin, setCenaMin,
        cenaMax, setCenaMax,
        amenities, toggleAmenity,
        allLokacii,
        resetFilters,
        activeFilterCount,
    } = hook()

    const [showFilters, setShowFilters] = useState(false)
    const color = accentColor || C.greenDark

    return (
        <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

            {/* Header */}
            <div style={{ backgroundColor: color, color: C.white, padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}><span>{emoji}</span> {title}</h1>
                    <p style={{ opacity: 0.85, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{desc}</p>
                    <input
                        type="text"
                        placeholder="Пребарај..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: '100%', maxWidth: '32rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: 'none', fontSize: '1rem', color: C.text, backgroundColor: C.white, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', outline: 'none' }}
                    />
                </div>
            </div>

            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem' }}>

                {/* Filter bar */}
                <div style={{ backgroundColor: C.white, borderRadius: '1rem', padding: '1rem 1.25rem', marginBottom: '1.5rem', border: `1px solid ${C.beigeDark}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>

                        {/* Lokacija */}
                        <select
                            value={selectedLokacija}
                            onChange={(e) => setSelectedLokacija(e.target.value)}
                            style={{ padding: '0.5rem 1rem', borderRadius: '0.625rem', border: `1px solid ${C.beigeDark}`, backgroundColor: C.beige, color: C.text, fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="">📍 Сите локации</option>
                            {allLokacii.map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>

                        {/* Sort cena */}
                        {showCena && (
                            <select
                                value={sortCena}
                                onChange={(e) => setSortCena(e.target.value)}
                                style={{ padding: '0.5rem 1rem', borderRadius: '0.625rem', border: `1px solid ${C.beigeDark}`, backgroundColor: C.beige, color: C.text, fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
                            >
                                <option value="">💰 Сортирај по цена</option>
                                <option value="asc">Цена: ниска → висока</option>
                                <option value="desc">Цена: висока → ниска</option>
                            </select>
                        )}

                        {/* Cena range */}
                        {showCena && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <input
                                    type="number"
                                    placeholder="Мин ден"
                                    value={cenaMin}
                                    onChange={e => setCenaMin(e.target.value)}
                                    style={{ width: '90px', padding: '0.5rem 0.625rem', borderRadius: '0.625rem', border: `1px solid ${C.beigeDark}`, backgroundColor: C.beige, color: C.text, fontSize: '0.85rem', outline: 'none' }}
                                />
                                <span style={{ color: C.textMuted, fontSize: '0.8rem' }}>—</span>
                                <input
                                    type="number"
                                    placeholder="Макс ден"
                                    value={cenaMax}
                                    onChange={e => setCenaMax(e.target.value)}
                                    style={{ width: '90px', padding: '0.5rem 0.625rem', borderRadius: '0.625rem', border: `1px solid ${C.beigeDark}`, backgroundColor: C.beige, color: C.text, fontSize: '0.85rem', outline: 'none' }}
                                />
                            </div>
                        )}

                        {/* Amenities toggle */}
                        {showAmenities && (
                            <button
                                onClick={() => setShowFilters(p => !p)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.625rem',
                                    border: `1px solid ${showFilters ? color : C.beigeDark}`,
                                    backgroundColor: showFilters ? color : C.beige,
                                    color: showFilters ? C.white : C.text,
                                    fontSize: '0.875rem',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem'
                                }}
                            >
                                <i className="fa-solid fa-house"></i> Погодности
                                {activeFilterCount > 0 && (
                                    <span style={{
                                        backgroundColor: C.peach,
                                        color: C.white,
                                        borderRadius: '9999px',
                                        padding: '0.1rem 0.4rem',
                                        fontSize: '0.7rem',
                                        fontWeight: '700'
                                    }}>
                  </span>
                                )}
                            </button>
                        )}
                        {activeFilterCount}

                        {/* Reset */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={resetFilters}
                                style={{ padding: '0.5rem 1rem', borderRadius: '0.625rem', border: 'none', backgroundColor: '#fdecea', color: '#c0392b', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '500' }}
                            >
                                ✕ Исчисти
                            </button>
                        )}

                        <span style={{ marginLeft: 'auto', fontSize: '0.875rem', color: C.textMuted }}>
              {items.length} резултати
            </span>
                    </div>

                    {/* Amenities panel */}
                    {showAmenities && showFilters && (
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${C.beigeDark}`, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {AMENITIES.map(({ key, icon, label }) => (
                                <button
                                    key={key}
                                    onClick={() => toggleAmenity(key)}
                                    style={{
                                        padding: '0.5rem 1rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
                                        fontWeight: '500', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        backgroundColor: amenities[key] ? color : C.beigeDark,
                                        color: amenities[key] ? C.white : C.text,
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} style={{ backgroundColor: C.beigeDark, borderRadius: '1rem', height: '18rem', opacity: 0.5 }} />
                        ))}
                    </div>
                ) : error ? (
                    <p style={{ color: 'red', textAlign: 'center', padding: '5rem 0' }}>{error}</p>
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔍</p>
                        <p style={{ color: C.textMuted, fontSize: '1.05rem' }}>Нема резултати за избраните филтри</p>
                        <button onClick={resetFilters} style={{ marginTop: '1rem', padding: '0.625rem 1.5rem', backgroundColor: color, color: C.white, border: 'none', borderRadius: '0.75rem', fontWeight: '600', cursor: 'pointer' }}>
                            Исчисти филтри
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {items.map((item) => (
                            <Card key={item.id} item={item} basePath={basePath} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}