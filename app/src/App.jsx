import {Routes, Route} from "react-router-dom";
import Nav from "./component/shared/Nav/index.jsx";
import './App.scss'
import routeConfig, {routeKeys} from "./config/routeConfig.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function App() {

  return (
    <>
      <Nav />
      <Routes>
        {
          routeKeys.map(name => {
            const route = routeConfig[name]
            const children = route.children
            return route.isPrivate ?
              children ?
                <Route key={name} path={route.path} element={route.element}>
                  {
                    Object.keys(children).map(key => <Route key={key} path={children[key].path} element={children[key].element} />)
                  }
                </Route>
                :
                <Route key={name} path={route.path} element={route.element}/>
              :
              children ?
                <Route key={name}>
                  {
                    Object.keys(children).map(key => <Route key={key} path={children[key].path} element={children[key].element} />)
                  }
                </Route>
                :
                <Route key={name} path={route.path} element={route.element}/>
          })
        }
        <Route path={"*"} element={<div>404 not found</div>} />
      </Routes>
      <ToastContainer position={'bottom-right'} style={{
        background: "transparent"
      }} />
    </>
  )
}

export default App