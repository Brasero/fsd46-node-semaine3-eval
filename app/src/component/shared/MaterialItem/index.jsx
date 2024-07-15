// path: app/src/component/shared/MaterialItem/index.jsx
import "./style.scss";
import {Link, useParams} from "react-router-dom";
import {formatWeight} from "../../../utils/utils.js";
import {generatePath} from "../../../config/routeConfig.jsx";
import {useSelector} from "react-redux";
import {selectMaterialByName} from "../../../store/selector/material.selector.js";

const MaterialItem = ({material}) => {
  
  return (
    <div className={`materialList_item`}>
      <Link to={generatePath("materialDetail", [{name: material.name.replace(" ", "-")}])}>{material.name}</Link>
      <span>
        {formatWeight(material.qty)}
      </span>
    </div>
  )
}

export default MaterialItem