// path : app/src/page/RealisationDetail/index.page.jsx
import "./style.scss";
import {Link, Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectRealisationBySlug} from "../../store/selector/realisation.selector.js";
import MaterialItem from "../../component/shared/MaterialItem/index.jsx";

const RealisationDetailPage = () => {
  
  const {slug} = useParams()
  const realisation = useSelector(selectRealisationBySlug(slug))
  
  if (!realisation) {
    return <Navigate to={"/"} replace={true} />
  }
  
  return <div className="page" id="RealisationDetail">
    <div className="container">
      <div className={"header"}>
        <h1>{realisation.name}</h1>
        <span>{realisation.category}</span>
      </div>
      <div className={"materialsList"}>
        {
          realisation.materiaux.map(material => <MaterialItem material={material} key={material._id} />)
        }
      </div>
      <p>{realisation.quantity} réalisé</p>
      <p><Link to={"/"} className={"cta"}>Retour à l'accueil</Link></p>
    </div>
  </div>
}

export default RealisationDetailPage