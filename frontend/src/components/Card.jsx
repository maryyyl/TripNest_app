import { Link } from 'react-router-dom'

export default function Card({ item, basePath }) {
  return (
    <Link
      to={`/${basePath}/${item.id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-stone-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-100">
        {item.slika ? (
          <img
            src={item.slika}
            alt={item.naslov}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Kajak.mk' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300 text-5xl">🏞️</div>
        )}

        {/* Status badge */}
        {item.status && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full
            ${item.status === 'СУПЕР ДОМАЌИН' ? 'bg-amber-400 text-amber-900' :
              item.status === 'НОВО' ? 'bg-emerald-500 text-white' :
              'bg-stone-700 text-white'}`}
          >
            {item.status}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
          {item.naslov}
        </h3>

        {item.lokacija && (
          <p className="text-sm text-stone-500 mt-1 flex items-center gap-1">
            <span>📍</span> {item.lokacija}
          </p>
        )}

        {item.cenaOdDen && (
          <p className="text-sm font-semibold text-emerald-700 mt-2">
            од {item.cenaOdDen.toLocaleString()} ден/ноќ
          </p>
        )}

        {/* Tags */}
        {item.tagovi?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {item.tagovi.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-stone-100 text-stone-600 rounded-full">
                {tag.replace(/_/g, ' ')}
              </span>
            ))}
            {item.tagovi.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-stone-100 text-stone-400 rounded-full">
                +{item.tagovi.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
