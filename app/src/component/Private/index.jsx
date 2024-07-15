// path: app/src/component/Private/index.jsx
import "./style.scss";
import useAuth from "../../hook/useAuth.js";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

const Private = ({children}) => {
  const {isConnected} = useAuth()
 
  
  return isConnected() ? children : <Navigate to={"/"} replace={true} />
}

export default Private