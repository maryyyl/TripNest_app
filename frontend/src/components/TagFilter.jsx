export default function TagFilter({ tags, selected, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onToggle(tag)}
          className={`px-3 py-1.5 text-sm rounded-full font-medium transition-all duration-200
            ${selected.includes(tag)
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
        >
          {tag.replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  )
}
