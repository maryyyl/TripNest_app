import ListPage from '../components/ListPage'
import useItems from '../hooks/useItems'
import { attractionApi } from '../api'

const C = { greenMid: '#7fa882' }

export default function AttractionsPage() {
  return (
      <ListPage
          title="Атракции"
          emoji={<i className="fa-solid fa-person-hiking"></i>}
          desc="Истражи ги природните и културните убавини"
          accentColor={C.greenMid}
          basePath="attractions"
          showAmenities={false}
          showCena={true}
          hook={() => useItems(attractionApi.getAll)}
      />
  )
}