// path: app/src/component/AddRealisationForm/AddRealisationInput/index.jsx
import "./style.scss";

const AddRealisationInput = ({label, name, value, changeMethod, blur, children, type = 'text', selectItems = null}) => {
  
  return (
    <div className={"inputGroup"} id="AddRealisationInput">
      {
        type === 'text' ?
          <>
            <label htmlFor={name} className="inputGroup__label">
              <input type={type} placeholder={label} name={name} id={name} onBlur={blur} value={value} onChange={changeMethod}
                     className="inputGroup__input"/>
              <span className={'label'}>{label}</span>
            </label>
            {children}
          </>
          :
          type === "selectMat" && selectItems ? <>
            <div className="inputGroup">
              <select name={name} value={value.material || ""} onChange={changeMethod}>
                <option value={""}>-----</option>
                {
                  selectItems.map((item) => {
                    return <option value={item.id} key={item.id}>{item.name}</option>
                  })
                }
              </select>
              <label htmlFor={name + "qty"} className="inputGroup__label">
                <input type={"number"} placeholder={"Quantité (en g)"} name={name + "qty"} id={name + "qty"} onBlur={blur}
                       value={value.qty} onChange={changeMethod}
                       className="inputGroup__input"/>
                <span className={'label'}>Quantité (en g)</span>
              </label>
            </div>
            {children}
          </>
            :
            type === "select" && selectItems &&
            <div className={"inputGroup"}>
              <select name={name} value={value || ""} onChange={changeMethod}>
                <option value={""}>-----</option>
                {
                  selectItems.map((item) => {
                    return <option value={item} key={item}>{item}</option>
                  })
                }
              </select>
              {children}
            </div>
      }
    </div>
  )
}

export default AddRealisationInput