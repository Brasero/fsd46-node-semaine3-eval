// path : app/src/page/Dashboard/AddRealisation/index.page.jsx
import "./style.scss";
import AddRealisationForm from "../../../component/AddRealisationForm/index.jsx";

const AddRealisationPage = () => {
  
  return <div className={"page"} id={"addRealisation"}>
    <h1>Ajouter une réalisation</h1>
    <AddRealisationForm />
  </div>
}

export default AddRealisationPage