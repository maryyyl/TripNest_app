import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { attractionApi } from '../api'
import C from '../colors'

export default function AttractionsPage() {
  return (
    <ListPage
      title="Атракции"
      emoji="🏔️"
      desc="Истражи ги природните и културните убавини"
      accentColor={C.greenMid}
      basePath="attractions"
      hook={() => useItems(attractionApi.getAll)}
    />
  )
}
