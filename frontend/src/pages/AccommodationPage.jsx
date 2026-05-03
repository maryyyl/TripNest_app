import { accommodationApi } from '../api'
import useItems from '../hooks/useItems'
import Card from '../components/Card'
import TagFilter from '../components/TagFilter'

export default function AccommodationPage() {
  const {
    items, loading, error,
    search, setSearch,
    selectedTags, toggleTag,
    selectedLokacija, setSelectedLokacija,
    allTags, allLokacii,
  } = useItems(accommodationApi.getAll)

  return (
    <div className="min-h-screen bg-stone-50 pt-20">
      <div className="bg-gradient-to-br from-amber-700 to-amber-500 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">🏡 Сместување</h1>
          <p className="text-amber-100 text-lg">Најди го совршеното место за одмор</p>

          <div className="mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Пребарај сместување..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-xl text-stone-800 bg-white shadow-lg outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select
            value={selectedLokacija}
            onChange={(e) => setSelectedLokacija(e.target.value)}
            className="px-4 py-2 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm outline-none"
          >
            <option value="">Сите локации</option>
            {allLokacii.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>

          <div className="flex-1">
            <TagFilter tags={allTags} selected={selectedTags} onToggle={toggleTag} />
          </div>
        </div>

        <p className="text-sm text-stone-500 mb-4">{items.length} резултати</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-20">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-stone-400 text-center py-20 text-lg">Нема резултати</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
              <Card key={item.id} item={item} basePath="accommodations" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
