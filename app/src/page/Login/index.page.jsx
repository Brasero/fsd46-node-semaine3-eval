// path : app/src/page/Login/index.page.jsx
import "./style.scss";
import LoginForm from "../../component/LoginForm/index.jsx";

const LoginPage = () => {
  
  return <div id={"login"} className={'page'}>
    <h1>Connectez vous afin de gérer vos créations</h1>
    <LoginForm />
  </div>
}

export default LoginPage