// path : app/src/page/Dashboard/DashHome/index.page.jsx
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import useApi from "../../../hook/useApi.js";
import {selectRealisations} from "../../../store/selector/realisation.selector.js";
import {getRealisationsFromApi} from "../../../store/slice/realisationSlice.jsx";
import RealisationItem from "../../../component/shared/RealisationItem/index.jsx";

const DashHomePage = () => {
  const {api} = useApi()
  const dispatch = useDispatch()
  const realisations = useSelector(selectRealisations)
  
  useEffect(() => {
    dispatch(getRealisationsFromApi(api))
  }, []);
  
  return <div id={"dashHome"} className={"page"}>
    <h1>Vos réalisations</h1>
    <div className="container">
      {
        realisations.map(realisation => <RealisationItem key={realisation._id} realisation={realisation} isAdmin={true} /> )
      }
    </div>
  </div>
}

export default DashHomePage