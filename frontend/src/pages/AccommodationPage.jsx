import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { accommodationApi } from '../api'

const C = { peach: '#e8866a' }

export default function AccommodationPage() {
  return (
      <ListPage
          title="Сместување"
          emoji={<i className="fa-solid fa-house"></i>}
          desc="Најди го совршеното место за одмор"
          accentColor={C.peach}
          basePath="accommodations"
          showAmenities={true}
          showCena={true}
          hook={() => useItems(accommodationApi.getAll)}
      />
  )
}