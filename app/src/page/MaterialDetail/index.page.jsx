// path : app/src/page/MaterialDetail/index.page.jsx
import "./style.scss";
import {Link, Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectMaterialByName} from "../../store/selector/material.selector.js";

const MaterialDetailPage = () => {
  
  const {name} = useParams()
  const material = useSelector(selectMaterialByName(name.replace("-", " ")))
  
  if (!material) {
    return <Navigate to={"/"} replace={true} />
  }
  
  return <div className="page" id="MaterialDetail">
      <h1>{material.name[0].toUpperCase() + material.name.substring(1)}</h1>
      <div className="container">
        <p>
          {material.description}
        </p>
        <small>
          Vendu par : {material.company.name}
        </small>
        <br/>
        <Link to={"/"}>Retour à l'accueil</Link>
      </div>
  </div>
}

export default MaterialDetailPage