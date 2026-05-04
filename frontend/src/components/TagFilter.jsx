import C from '../colors'

export default function TagFilter({ tags, selected, onToggle }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {tags.map((tag) => {
        const active = selected.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            style={{
              padding: '0.375rem 0.875rem',
              fontSize: '0.875rem',
              borderRadius: '9999px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
              backgroundColor: active ? C.greenDark : C.beigeDark,
              color: active ? C.white : C.text,
            }}
          >
            {tag.replace(/_/g, ' ')}
          </button>
        )
      })}
    </div>
  )
}
