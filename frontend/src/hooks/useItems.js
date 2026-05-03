import { useState, useEffect, useMemo } from 'react'

export default function useItems(fetchFn) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedLokacija, setSelectedLokacija] = useState('')

    useEffect(() => {
        fetchFn()
            .then((res) => setItems(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const allTags = useMemo(() => {
        const tags = new Set()
        items.forEach((item) => item.tagovi?.forEach((t) => tags.add(t)))
        return [...tags].sort()
    }, [items])

    const allLokacii = useMemo(() => {
        return [...new Set(items.map((i) => i.lokacija).filter(Boolean))].sort()
    }, [items])

    const filtered = useMemo(() => {
        return items.filter((item) => {
            const matchSearch = search === '' ||
                item.naslov?.toLowerCase().includes(search.toLowerCase()) ||
                item.opis?.toLowerCase().includes(search.toLowerCase()) ||
                item.lokacija?.toLowerCase().includes(search.toLowerCase())

            const matchTags = selectedTags.length === 0 ||
                selectedTags.every((tag) => item.tagovi?.includes(tag))

            const matchLokacija = selectedLokacija === '' ||
                item.lokacija === selectedLokacija

            return matchSearch && matchTags && matchLokacija
        })
    }, [items, search, selectedTags, selectedLokacija])

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    return {
        items: filtered,
        loading,
        error,
        search, setSearch,
        selectedTags, toggleTag,
        selectedLokacija, setSelectedLokacija,
        allTags,
        allLokacii,
    }
}