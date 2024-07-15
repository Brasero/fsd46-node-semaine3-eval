// path: app/src/component/LoginForm/index.jsx
import "./style.scss";
import useValidator from "react-form-validator-hook";
import formConfig from "./form.config.js";
import useAuth from "../../hook/useAuth.js";
import {useEffect, useState} from "react";
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom";


const LoginForm = () => {
  
  const [disabled, setDisabled] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();
  
  const initialValues = {
    email: "",
    password: ""
  }
  
  const {
    values,
    errors,
    handleValueChange,
    validateOnSubmit,
    ErrorComponent,
    handleBlur
  } = useValidator(initialValues, formConfig);
  
  useEffect(() => {
    const errorKeys = Object.keys(errors)
    let valid = true
    errorKeys.forEach(key => {
      if (errors[key].length) {
        setIsValid(false)
        valid = false
      }
    })
    valid && setIsValid(true)
  }, [errors]);
  
  useEffect(() => {
    setDisabled(!isValid || values.email === "" || values.password === "")
  }, [isValid, values])
  
  const handleChange = (e) => {
    const {name, value} = e.target
    handleValueChange(name, value)
  }
  
  const handleSubmit = (e) => {
    validateOnSubmit(e)
    if (isValid) {
      login(values.email, values.password).then(res => {
        if (res) {
          if (res.success) {
            console.log(res.message)
            toast.success(res.message, {
              autoClose: 3000,
              closeOnClick: true
            })
            navigate("/dashboard", {replace: true})
          } else {
            toast.error(res.message, {
              autoClose: 3000,
              closeOnClick: true
            })
          }
        }
      }
      )
    } else {
      console.error("erreur", errors)
    }
  }
  
  const onBlur = (e) => {
    handleBlur(e.target.name)
  }
  
  return (
    <form id={"login__form"} onSubmit={handleSubmit}>
      
      <div className="inputGroup">
        <input
          type={"email"}
          name={"email"}
          onBlur={onBlur}
          value={values.email}
          onChange={handleChange}
          placeholder={"E-mail"}
        />
        <ErrorComponent name={"email"}/>
      </div>
      <div className="inputGroup">
        <input
          type={"password"}
          name={"password"}
          onBlur={onBlur}
          value={values.password}
          onChange={handleChange}
          placeholder={"Mot de passe"}
        />
        <ErrorComponent name={"password"}/>
      </div>
      
      <input disabled={disabled} type={"submit"} className={"cta"} value={"Se connecter"}/>
    </form>
  )
}

export default LoginForm