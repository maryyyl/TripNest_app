import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gastronomyApi } from '../api'

export default function GastronomyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gastronomyApi.getById(id)
      .then((res) => setItem(res.data))
      .catch(() => navigate('/gastronomija'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!item) return null

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      {/* Hero */}
      <div className="relative h-80 bg-stone-200 overflow-hidden">
        {item.slika && (
          <img
            src={item.slika}
            alt={item.naslov}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/1200x400?text=Kajak.mk' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          {item.status && (
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2
              ${item.status === 'СУПЕР ДОМАЌИН' ? 'bg-amber-400 text-amber-900' :
                item.status === 'НОВО' ? 'bg-emerald-500 text-white' : 'bg-stone-700 text-white'}`}>
              {item.status}
            </span>
          )}
          <h1 className="text-3xl font-bold text-white">{item.naslov}</h1>
          {item.lokacija && (
            <p className="text-stone-200 mt-1 flex items-center gap-1">
              <span>📍</span> {item.lokacija}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-stone-500 hover:text-emerald-700 mb-6 flex items-center gap-1 transition-colors"
        >
          ← Назад
        </button>

        {/* Description */}
        {item.opis && (
          <p className="text-stone-600 text-lg leading-relaxed mb-8">{item.opis}</p>
        )}

        {/* Tags */}
        {item.tagovi?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-3">Тагови</h3>
            <div className="flex flex-wrap gap-2">
              {item.tagovi.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                  {tag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Link */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            Посети страница →
          </a>
        )}
      </div>
    </div>
  )
}
