import Card from './Card'
import C from '../colors'

export default function ListPage({ title, emoji, desc, accentColor, basePath, hook }) {
    const {
        items, loading, error,
        search, setSearch,
        selectedLokacija, setSelectedLokacija,
        allLokacii,
    } = hook()

    const color = accentColor || C.greenDark

    return (
        <div style={{ minHeight: '100vh', backgroundColor: C.beige, paddingTop: '64px' }}>

            {/* Header */}
            <div style={{ backgroundColor: color, color: C.white, padding: '3.5rem 1.5rem' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{emoji} {title}</h1>
                    <p style={{ opacity: 0.85, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{desc}</p>
                    <input
                        type="text"
                        placeholder="Пребарај..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%', maxWidth: '32rem',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            fontSize: '1rem',
                            color: C.text,
                            backgroundColor: C.white,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            outline: 'none',
                        }}
                    />
                </div>
            </div>

            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

                {/* Filters */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <select
                        value={selectedLokacija}
                        onChange={(e) => setSelectedLokacija(e.target.value)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.75rem',
                            border: `1px solid ${C.beigeDark}`,
                            backgroundColor: C.white,
                            color: C.text,
                            fontSize: '0.875rem',
                            outline: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="">Сите локации</option>
                        {allLokacii.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>

                    {selectedLokacija && (
                        <button
                            onClick={() => setSelectedLokacija('')}
                            style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: 'none', backgroundColor: C.beigeDark, color: C.text, fontSize: '0.875rem', cursor: 'pointer' }}
                        >
                            ✕ Исчисти
                        </button>
                    )}

                    <p style={{ fontSize: '0.875rem', color: C.textMuted, marginLeft: 'auto' }}>
                        {items.length} резултати
                    </p>
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {[...Array(8)].map((_, i) => (
                            <div key={i} style={{ backgroundColor: C.beigeDark, borderRadius: '1rem', height: '18rem', opacity: 0.6 }} />
                        ))}
                    </div>
                ) : error ? (
                    <p style={{ color: 'red', textAlign: 'center', padding: '5rem 0' }}>{error}</p>
                ) : items.length === 0 ? (
                    <p style={{ color: C.textMuted, textAlign: 'center', padding: '5rem 0', fontSize: '1.1rem' }}>Нема резултати</p>
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