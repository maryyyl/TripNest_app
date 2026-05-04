import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { gastronomyApi } from '../api'
import C from '../colors'

export default function GastronomyPage() {
  return (
    <ListPage
      title="Гастрономија"
      emoji="🍽️"
      desc="Откриј ги најдобрите ресторани и кафулиња"
      accentColor={C.greenDark}
      basePath="gastronomy"
      hook={() => useItems(gastronomyApi.getAll)}
    />
  )
}
