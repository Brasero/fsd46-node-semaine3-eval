// path: app/src/component/HomeFilter/index.jsx
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {selectMaterials} from "../../store/selector/material.selector.js";
import useApi from "../../hook/useApi.js";
import {useEffect} from "react";
import {getMaterialsList} from "../../store/slice/materialSlice.js";
import MaterialFilterItem from "./MaterialFilterItem/index.jsx";
import CategoryFilterItem from "./CategoryFilterItem/index.jsx";
import {resetFilters} from "../../store/slice/realisationSlice.jsx";

const HomeFilter = () => {
    
    const dispatch = useDispatch()
    const materials = useSelector(selectMaterials)
    const {api} = useApi()
    
    useEffect(() => {
        dispatch(getMaterialsList(api))
    }, []);
    
    const resetFilter = () => {
      dispatch(resetFilters())
    }
 
  
  return (
    <section className="HomeFilter">
      <button className={"cta"} onClick={resetFilter}>Reinitialiser les filtres</button>
      <div className="filterGroup">
        <div className="title">Matériaux</div>
        <div className="filterList">
          {
            materials?.map(material => <MaterialFilterItem material={material} key={material._id}/>)
          }
        </div>
      </div>
      <div className={"filterGroup"}>
        <div className="title">Catégories</div>
        <div className="filterList">
          <CategoryFilterItem name={"Armoire"}/>
          <CategoryFilterItem name={"Etagère"}/>
        </div>
      </div>
    </section>
  )
}

export default HomeFilter