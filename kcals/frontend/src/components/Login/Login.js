import logo from '../../imgs/logo.jpg'
import LoginFormPage from '../LoginForm/LoginForm';
import './Login.css'
import { NavLink } from 'react-router-dom';

function Login() {
    return (
      <div id='log'>
        <div id="block">
          <div id = "top">
            <img src={logo} alt="" id="logo" />
          </div>
          <h1 class='head'> Sign in to kcals</h1>
          <h3> We suggest using the email address you use at work.</h3>
          <LoginFormPage id="form" />
        </div>
        <div id = "new"> New to Kcals? 
            <br></br>
            <NavLink to="signup" id="navlink"> create an account</NavLink> 
          </div>
      </div>
    );
  }
  
  export default Login;

  