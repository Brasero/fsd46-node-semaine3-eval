// path: app/src/component/AddRealisationForm/index.jsx
import "./style.scss";
import AddRealisationInput from "./AddRealisationInput/index.jsx";
import useValidator from "react-form-validator-hook";
import formConfig from "./formConfig.js";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectMaterials} from "../../store/selector/material.selector.js";
import {getMaterialsList} from "../../store/slice/materialSlice.js";
import useApi from "../../hook/useApi.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const toastOption = {
  autoClose: 3000,
  closeOnClick: true
}

const AddRealisationForm = () => {
  
  const [materiauInputQty, setMateriauInputQty] = useState(1)
  const [isValid, setIsValid] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const materials = useSelector(selectMaterials)
  const materialsList = materials.reduce((acc, curr) => {
    acc.push({name: curr.name, id: curr._id})
    return acc
  }, [])
  const {api} = useApi()
  
  useEffect(() => {
    if (!materials.length) {
      dispatch(getMaterialsList(api))
    }
    console.log(materialsList)
  }, []);
  
  const initialValues = {
    name: "",
    materiaux: {
      materiaux0: {
        material: "",
        qty: ""
      }
    },
    category: ""
  }
  
  const {
    values,
    errors,
    handleValueChange,
    validateOnSubmit,
    ErrorComponent,
    handleBlur
  } = useValidator(initialValues, formConfig)
  
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
    setDisabled(!isValid || values.name === "" || values.materiaux.materiaux0.name === "")
  }, [isValid, values])
  
  const updateMaterialInputQty = (val) => {
    setMateriauInputQty((prevState) => prevState + val)
    if (val === -1) {
      removeLastFromMaterialsArray()
    } else {
      addItemMaterialsArray()
    }
  }
  
  const removeLastFromMaterialsArray = () => {
    const newArray = {...values.materiaux}
    const index = `materiaux${materiauInputQty - 1}`
    delete newArray[index]
    handleValueChange("materiaux", newArray)
  }
  
  const addItemMaterialsArray = () => {
    const newArray = {...values.materiaux}
    const index = `materiaux${materiauInputQty}`
    newArray[index] = {material: "", qty: ""}
    handleValueChange("materiaux", newArray)
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target
    if (name.includes('materiaux')) {
      const newArray = {...values.materiaux}
      if(name.includes("qty")) {
        newArray[name.replace("qty", "")].qty = parseInt(value) || ""
      }
      else {
        newArray[name].material = value
      }
      handleValueChange("materiaux", newArray)
      return
    }
    handleValueChange(name, value)
  }
  
  const onBlur = (e) => {
    handleBlur(e.target.name)
  }
  
  const handleSubmit = (e) => {
    validateOnSubmit(e)
    let valid = true
    Object.keys(values.materiaux).map(key => {
      if (values.materiaux[key].name === "" || values.materiaux[key].qty === "") {
        toast.error("Merci de remplir tout les champs.", toastOption)
        valid = false
      }
    })
    if (valid) {
      api.post("/secure/addRealisation", {values}).then(res => {
        if (res) {
          if (res.data.success) {
            toast.success(res.data.message, toastOption)
            navigate("/dashboard", {replace: true})
          } else {
            toast.error(res.data.message, toastOption)
          }
        } else {
          console.log(res)
        }
      })
        .catch(err => {
          console.log(err)
          toast.error("Une erreur est survenue, merci de réessayer plus tard.", toastOption)
        })
    } else {
      toast.error("Le formulaire présente des erreurs", toastOption)
    }
  }
  
  
  return (
    <form id="AddRealisationForm" onSubmit={handleSubmit}>
      <AddRealisationInput blur={onBlur} name={'name'} label={'Dénomination'} value={values.name}
                           changeMethod={handleChange}>
        <ErrorComponent name={"name"}/>
      </AddRealisationInput>
      
      <h5 className={"subtitle"}>Catégorie</h5>
      <AddRealisationInput type={'select'} selectItems={["Armoire", "Etagère"]} value={values.category} name={"category"} blur={onBlur} changeMethod={handleChange} label={'Catégorie'}>
        <ErrorComponent name={"category"} />
      </AddRealisationInput>
      
      
      <h5 className={"subtitle"}>Matériaux</h5>
      {
        Array(materiauInputQty).fill('').map((_, index) => {
          return <AddRealisationInput type={"selectMat"} selectItems={materialsList} key={index} blur={onBlur} name={`materiaux${index}`}
                                      label={`Materiel ${index + 1}`} changeMethod={handleChange}
                                      value={values.materiaux[`materiaux${index}`]}/>
        })
      }
      
      <div className={"button_add_input"}>
        <button role={"button"} type={"button"} disabled={materiauInputQty === 1}
                onClick={() => updateMaterialInputQty(-1)}>-
        </button>
        <button role={"button"} type={"button"} onClick={() => updateMaterialInputQty(1)}>+</button>
      </div>
      <input disabled={disabled} className={"cta submit"} type={"submit"} value={"Ajouter"}/>
    </form>
  )
}

export default AddRealisationForm