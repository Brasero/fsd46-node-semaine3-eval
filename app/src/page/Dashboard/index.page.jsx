// path : app/src/page/Dashboard/index.page.jsx
import "./style.scss";
import {Outlet} from "react-router-dom";
import DashboardNav from "../../component/shared/DashboardNav/index.jsx";

const DashboardPage = () => {
  
  return <div id={"dashboard"} className={"page"}>
    <DashboardNav />
    <Outlet />
  </div>
}

export default DashboardPage