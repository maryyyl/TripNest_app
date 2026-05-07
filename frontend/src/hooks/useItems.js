import { useState, useEffect, useMemo } from 'react'

export default function useItems(fetchFn) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [selectedLokacija, setSelectedLokacija] = useState('')
    const [sortCena, setSortCena] = useState('') // 'asc' | 'desc' | ''
    const [cenaMin, setCenaMin] = useState('')
    const [cenaMax, setCenaMax] = useState('')
    const [amenities, setAmenities] = useState({
        wifi: false, bazen: false, spa: false,
        balkon: false, parking: false, kujna: false,
        klima: false, ljubimci: false,
    })

    useEffect(() => {
        fetchFn()
            .then((res) => setItems(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    const allLokacii = useMemo(() => {
        return [...new Set(items.map((i) => i.lokacija).filter(Boolean))].sort()
    }, [items])

    const hasAmenityFilters = Object.values(amenities).some(Boolean)

    const filtered = useMemo(() => {
        let result = items.filter((item) => {
            const matchSearch = search === '' ||
                item.naslov?.toLowerCase().includes(search.toLowerCase()) ||
                item.opis?.toLowerCase().includes(search.toLowerCase()) ||
                item.lokacija?.toLowerCase().includes(search.toLowerCase())

            const matchLokacija = selectedLokacija === '' || item.lokacija === selectedLokacija

            const matchCenaMin = cenaMin === '' || (item.cenaOdDen != null && Number(item.cenaOdDen) >= Number(cenaMin))
            const matchCenaMax = cenaMax === '' || (item.cenaOdDen != null && Number(item.cenaOdDen) <= Number(cenaMax))

            const matchAmenities = !hasAmenityFilters || Object.entries(amenities).every(([key, val]) => !val || item[key] === true)

            return matchSearch && matchLokacija && matchCenaMin && matchCenaMax && matchAmenities
        })

        if (sortCena === 'asc') result = [...result].sort((a, b) => (a.cenaOdDen || 0) - (b.cenaOdDen || 0))
        if (sortCena === 'desc') result = [...result].sort((a, b) => (b.cenaOdDen || 0) - (a.cenaOdDen || 0))

        return result
    }, [items, search, selectedLokacija, cenaMin, cenaMax, amenities, sortCena])

    const toggleAmenity = (key) => {
        setAmenities(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const resetFilters = () => {
        setSearch('')
        setSelectedLokacija('')
        setSortCena('')
        setCenaMin('')
        setCenaMax('')
        setAmenities({ wifi: false, bazen: false, spa: false, balkon: false, parking: false, kujna: false, klima: false, ljubimci: false })
    }

    const activeFilterCount = [
        selectedLokacija, sortCena, cenaMin, cenaMax,
        ...Object.values(amenities)
    ].filter(Boolean).length

    return {
        items: filtered,
        loading, error,
        search, setSearch,
        selectedLokacija, setSelectedLokacija,
        sortCena, setSortCena,
        cenaMin, setCenaMin,
        cenaMax, setCenaMax,
        amenities, toggleAmenity,
        allLokacii,
        resetFilters,
        activeFilterCount,
    }
}