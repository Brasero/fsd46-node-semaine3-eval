// path: app/src/component/shared/RealisationItem/index.jsx
import "./style.scss";
import {Link} from "react-router-dom";
import MaterialItem from "../MaterialItem/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {updateRealisationQuantity} from "../../../store/slice/realisationSlice.jsx";
import useApi from "../../../hook/useApi.js";
import {isLoadingRealisation} from "../../../store/selector/realisation.selector.js";
import {generatePath} from "../../../config/routeConfig.jsx";

const RealisationItem = ({realisation, isAdmin = false}) => {
  
  const dispatch = useDispatch()
  const {api} = useApi()
  const isLoading = useSelector(isLoadingRealisation)
  const updateQuantity = (qty) => {
    console.log(realisation)
    dispatch(updateRealisationQuantity({api, id: realisation._id, qty}))
  }
  
  return (
    <div className="RealisationItem">
      <div className={"header"}>
        <h3 className={"title"}>{realisation.name}</h3>
        <span className="category">{realisation.category}</span>
      </div>
      <div className={"materialsList"}>
        {
          realisation.materiaux.map(material => {
            return <MaterialItem material={material} key={material._id} />
          })
        }
      </div>
      <div className={"footer"}>
        <div className={"amount"}>
          {realisation.quantity} réalisé
        </div>
        {
          isAdmin ?
            <>
              <button onClick={() => updateQuantity(realisation.quantity - 1)} disabled={realisation.quantity === 1 || isLoading} className={"cta"}>-</button>
              <button disabled={isLoading} onClick={() => updateQuantity(parseInt(realisation.quantity) + 1)} className={"cta"}>+</button>
            </>
            :
            <Link className={"cta"} to={generatePath("realisationDetail", [{slug: realisation.slug}])}>Voir plus ></Link>
        }
      </div>
    </div>
  )
}

export default RealisationItem