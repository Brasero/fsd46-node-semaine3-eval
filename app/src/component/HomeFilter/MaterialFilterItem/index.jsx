// path: app/src/component/HomeFilter/MaterialFilterItem/index.jsx
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {isSelectedFilter} from "../../../store/selector/realisation.selector.js";
import {toggleFilters} from "../../../store/slice/realisationSlice.jsx";

const MaterialFilterItem = ({material}) => {
  
    const dispatch = useDispatch()
    const isSelected = useSelector(isSelectedFilter({filter: 'materials',value: material.name}))
    
    const handleClick = () => {
        dispatch(toggleFilters({filter: 'materials', value: material.name}))
    }
    
  return (
    <div onClick={handleClick} className={`MaterialFilterItem filter ${isSelected ? "selected" : ""}`}>
        {material.name}
    </div>
  )
}

export default MaterialFilterItem