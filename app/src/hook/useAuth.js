import useApi from "./useApi.js";
import {useDispatch, useSelector} from "react-redux";
import {setConnected} from "../store/slice/userSlice.jsx";
import {getIsConnected} from "../store/selector/user.selector.js";

const {VITE_LOCAL_STORAGE_TOKEN_KEY, VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY} = import.meta.env

const useAuth = () => {
  const {api, setToken} = useApi()
  const dispatch = useDispatch()
  const connected = useSelector(getIsConnected)
  
  const login = (email,password) => {
    return api.post("/secure/login", {email,password}).then(
      res => {
        if(res.data.success) {
          const {tokens} = res.data
          setToken(tokens.jwt)
          dispatch(setConnected(true))
          localStorage.setItem(VITE_LOCAL_STORAGE_TOKEN_KEY, tokens.jwt)
          localStorage.setItem(VITE_LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refresh)
        }
        return res.data
      },
      () => {
        dispatch(setConnected(false))
        return false
      }
    )
  }
  
  const isConnected = () => {
    return connected
  }
  
  return {
    login,
    isConnected
  }
}

export default useAuth