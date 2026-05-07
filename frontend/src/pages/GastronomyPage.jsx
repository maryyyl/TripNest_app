import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { gastronomyApi } from '../api'

const C = { greenDark: '#4a7c59' }

export default function GastronomyPage() {
  return (
      <ListPage
          title="Гастрономија"
          emoji={<i className="fa-solid fa-utensils"></i>}
          desc="Открај ги најдобрите ресторани и кафулиња"
          accentColor={C.greenDark}
          basePath="gastronomy"
          showAmenities={false}
          showCena={false}
          hook={() => useItems(gastronomyApi.getAll)}
      />
  )
}