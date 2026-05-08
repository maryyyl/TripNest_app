import { useState } from 'react'

const C = {
    white: '#ffffff',
    text: '#3a3a2a',
    textMuted: '#7a7a6a',
}

export default function ImageCarousel({ images = [], mainImage, alt = '' }) {
    const allImages = mainImage
        ? [mainImage, ...images.map(i => i?.url).filter(Boolean).filter(u => u !== mainImage)]
        : images.map(i => i?.url).filter(Boolean)

    const [current, setCurrent] = useState(0)

    if (allImages.length === 0) return null

    const prev = () => setCurrent((c) => (c - 1 + allImages.length) % allImages.length)
    const next = () => setCurrent((c) => (c + 1) % allImages.length)

    return (
        <div style={{
            position: 'relative',
            height: '36rem',
            backgroundColor: '#e8d5c4',
            overflow: 'hidden',
            maxWidth: '1000px',
            margin: '0 auto',
            borderRadius: '1rem',
        }}>

            {/* Images */}
            {allImages.map((url, i) => (
                <img
                    key={i}
                    src={url}
                    alt={`${alt} ${i + 1}`}
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/800x400?text=TripNest'
                    }}
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        opacity: i === current ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                    }}
                />
            ))}

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)'
            }}/>

            {/* Arrows */}
            {allImages.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        style={{
                            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                            width: '2.5rem', height: '2.5rem', fontSize: '1.1rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                    >‹
                    </button>
                    <button
                        onClick={next}
                        style={{
                            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                            backgroundColor: 'rgba(255,255,255,0.85)', border: 'none', borderRadius: '50%',
                            width: '2.5rem', height: '2.5rem', fontSize: '1.1rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                    >›
                    </button>
                </>
            )}

            {/* Dots */}
            {allImages.length > 1 && (
                <div style={{
                    position: 'absolute', bottom: '5.5rem', left: '50%', transform: 'translateX(-50%)',
                    display: 'flex', gap: '0.4rem', zIndex: 10,
                }}>
                    {allImages.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            style={{
                                width: i === current ? '1.5rem' : '0.5rem',
                                height: '0.5rem',
                                borderRadius: '9999px',
                                border: 'none',
                                backgroundColor: i === current ? C.white : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            {allImages.length > 1 && (
                <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    backgroundColor: 'rgba(0,0,0,0.4)', color: C.white,
                    padding: '0.25rem 0.625rem', borderRadius: '9999px',
                    fontSize: '0.75rem', fontWeight: '600', zIndex: 10,
                }}>
                    {current + 1} / {allImages.length}
                </div>
            )}
        </div>
    )
}