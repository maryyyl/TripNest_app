import DetailPage from '../components/DetailPage'
import { attractionApi } from '../api'
import C from '../colors'

export default function AttractionDetail() {
  return <DetailPage fetchFn={attractionApi.getById} backPath="attractions" accentColor={C.greenMid} />
}
