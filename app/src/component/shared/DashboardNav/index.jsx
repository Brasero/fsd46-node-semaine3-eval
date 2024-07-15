// path: app/src/component/shared/DashboardNav/index.jsx
import "./style.scss";
import routeConfig from "../../../config/routeConfig.jsx";
import routesConfig from "../../../config/routeConfig.jsx";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setConnected} from "../../../store/slice/userSlice.jsx";
const DashboardNav = () => {
  const dispatch = useDispatch()
  const dashboardRoute = routesConfig.dashboard.children
  
  const disconnect = () => {
    dispatch(setConnected(false))
  }
  
  return (
    <nav id={"dashboardNav"}>
      {
        Object.keys(dashboardRoute).map(key =>
          <NavLink
            end
            key={key}
            className={'navLink'}
            to={dashboardRoute[key].path !== "" ? `/dashboard/${dashboardRoute[key].path}` : "/dashboard"}
          >
            {dashboardRoute[key].label}
          </NavLink>
        )
      }
      <button onClick={disconnect} className={"disconnect"}>Déconnexion</button>
    </nav>
  )
}

export default DashboardNav