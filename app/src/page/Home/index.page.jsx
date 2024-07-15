// path : app/src/page/Home/index.page.jsx
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getRealisationsFromApi} from "../../store/slice/realisationSlice.jsx";
import useApi from "../../hook/useApi.js";
import {selectFilteredRealisation, selectRealisations} from "../../store/selector/realisation.selector.js";
import RealisationItem from "../../component/shared/RealisationItem/index.jsx";
import {selectMaterials} from "../../store/selector/material.selector.js";
import {getMaterialsList} from "../../store/slice/materialSlice.js";
import HomeFilter from "../../component/HomeFilter/index.jsx";

const HomePage = () => {
  
  const dispatch = useDispatch()
  const {api} = useApi()
  const realisations = useSelector(selectFilteredRealisation)
  
  useEffect(() => {
    dispatch(getRealisationsFromApi(api))
    dispatch(getMaterialsList(api))
  }, []);
  
  return <div id={"home"} className={"page"}>
    <h1>Toutes nos créations</h1>
    <HomeFilter />
    <div className="container">
      {
        realisations?.map(realisation => {
          return <RealisationItem realisation={realisation} key={realisation._id}/>
        })
      }
    </div>
  </div>
}

export default HomePage