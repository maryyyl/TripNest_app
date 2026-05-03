import { Link } from 'react-router-dom'

const categories = [
  {
    to: '/gastronomy',
    emoji: '🍽️',
    title: 'Гастрономија',
    desc: 'Ресторани, кафулиња и традиционална македонска кујна',
    color: 'from-emerald-500 to-emerald-700',
    hover: 'hover:shadow-emerald-200',
  },
  {
    to: '/attractions',
    emoji: '🏔️',
    title: 'Атракции',
    desc: 'Природни убавини, споменици и авантуристички дестинации',
    color: 'from-sky-500 to-sky-700',
    hover: 'hover:shadow-sky-200',
  },
  {
    to: '/accommodations',
    emoji: '🏡',
    title: 'Сместување',
    desc: 'Хотели, вили и автентични места за одмор',
    color: 'from-amber-500 to-amber-700',
    hover: 'hover:shadow-amber-200',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 pt-16">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600 text-white py-28 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🧭</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Откриј ја<br />
            <span className="text-amber-300">Македонија</span>
          </h1>
          <p className="text-emerald-100 text-xl max-w-2xl mx-auto mb-10">
            Гастрономија, атракции и сместување — сè на едно место за незаборавно патување.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/gastronomy"
              className="px-8 py-3 bg-white text-emerald-800 font-semibold rounded-full hover:bg-amber-300 transition-colors shadow-lg"
            >
              Истражи сега
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-colors border border-white/30"
            >
              Регистрирај се
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-3">Истражи по категорија</h2>
        <p className="text-stone-500 text-center mb-12">Избери го своето следно искуство</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(({ to, emoji, title, desc, color, hover }) => (
            <Link
              key={to}
              to={to}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} text-white p-8 shadow-lg hover:shadow-2xl ${hover} transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-500" />
              <span className="text-5xl block mb-4">{emoji}</span>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:gap-3 transition-all">
                Погледни → 
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 px-6 text-center text-stone-400 text-sm">
        © 2026 TripNest.mk — Сите права задржани
      </footer>
    </div>
  )
}
