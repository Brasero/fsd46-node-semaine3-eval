// path: app/src/component/shared/Nav/index.jsx
import "./style.scss";
import {Link, NavLink} from "react-router-dom";
import routeConfig, {routeKeys} from "../../../config/routeConfig.jsx";
import useAuth from "../../../hook/useAuth.js";

const Nav = () => {
  
  const {isConnected} = useAuth()
  
  return (
    <nav id={"nav"}>
      <Link to={"/"} className={"brandLink"}>
        <h1 className="brand">
          Fabric'tout
        </h1>
      </Link>
      <ul>
        {
          routeKeys.map(name => {
            const route = routeConfig[name]
            return route.showInNav(isConnected()) && <NavLink key={name} className={"navLink"} to={route.path}>{route.label}</NavLink>
          })
        }
      </ul>
    </nav>
  )
}

export default Nav