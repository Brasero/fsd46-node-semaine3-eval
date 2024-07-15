// path: app/src/component/HomeFilter/CategoryFilterItem/index.jsx
import "./style.scss";
import {useDispatch, useSelector} from "react-redux";
import {isSelectedFilter} from "../../../store/selector/realisation.selector.js";
import {toggleFilters} from "../../../store/slice/realisationSlice.jsx";

const CategoryFilterItem = ({name}) => {
  
    const dispatch = useDispatch()
    const isSelected = useSelector(isSelectedFilter({filter: "categories", value: name}))
    
    const handleClick = () => {
        dispatch(toggleFilters({filter: 'categories', value: name}))
    }
    
  return (
    <div onClick={handleClick} className={`CategoryFilterItem filter ${isSelected ? "selected" : ""}`}>
        {name}
    </div>
  )
}

export default CategoryFilterItem