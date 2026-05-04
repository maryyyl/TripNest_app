import DetailPage from '../components/DetailPage'
import { gastronomyApi } from '../api'
import C from '../colors'

export default function GastronomyDetail() {
  return <DetailPage fetchFn={gastronomyApi.getById} backPath="gastronomy" accentColor={C.greenDark} />
}
