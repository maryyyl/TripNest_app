import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { accommodationApi } from '../api'
import C from '../colors'

export default function AccommodationPage() {
  return (
    <ListPage
      title="Сместување"
      emoji="🏡"
      desc="Најди го совршеното место за одмор"
      accentColor={C.peach}
      basePath="accommodations"
      hook={() => useItems(accommodationApi.getAll)}
    />
  )
}
