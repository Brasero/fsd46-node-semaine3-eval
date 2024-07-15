import HomePage from "../page/Home/index.page.jsx";
import LoginPage from "../page/Login/index.page.jsx";
import DashboardPage from "../page/Dashboard/index.page.jsx";
import Private from "../component/Private/index.jsx";
import DashHomePage from "../page/Dashboard/DashHome/index.page.jsx";
import AddRealisationPage from "../page/Dashboard/AddRealisation/index.page.jsx";
import MaterialDetailPage from "../page/MaterialDetail/index.page.jsx";
import RealisationDetailPage from "../page/RealisationDetail/index.page.jsx";
import StatsPage from "../page/Dashboard/Stats/index.page.jsx";


const routesConfig = {
  home: {
    element: <HomePage/>,
    label: "Accueil",
    path: "/",
    showInNav: () => true,
    children: false
  },
  login: {
    element: <LoginPage />,
    label: "Se connecter",
    path: "/login",
    showInNav: (isConnected) => !isConnected,
    children: false
  },
  materialDetail: {
    label: "Voir plus >",
    path: "/material/:name",
    element: <MaterialDetailPage />,
    showInNav: () => false,
    children: false
  },
  realisationDetail: {
    path: "/realisation/:slug",
    element: <RealisationDetailPage />,
    showInNav: () => false,
    children: false
  },
  dashboard: {
    element: <Private><DashboardPage /></Private>,
    label: "Dashboard",
    path: "/dashboard",
    showInNav: (isConnected) => isConnected,
    isPrivate: true,
    children: {
      dash: {
        label: "Vos réalisations",
        path: "",
        element: <DashHomePage />
      },
      add: {
        label: "Ajouter une réalisation",
        path: "add",
        element: <AddRealisationPage />
      },
      stats: {
        label: "Statistiques",
        path: "stats",
        element: <StatsPage />
      }
    }
  }
}

export const routeKeys = Object.keys(routesConfig)

export const generatePath = (name, params = null) => {
  if (params === null) {
    return routesConfig[name].path
  }
  let path = routesConfig[name].path
  params.forEach((param) => {
    const key = Object.keys(param)
    path = path.replace(`:${key}`, param[key])
  })
  return path;
}

export default routesConfig;