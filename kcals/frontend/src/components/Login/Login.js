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
          <div class="suggest">
            <span> We suggest using the </span> <span id ="sec"> email address you use at work.</span>
          </div>
          <LoginFormPage id="form" />
        </div>
        <div id="new"> New to Kcals? 
          <br></br>
          <NavLink to="signup" id="navlink"> Create an account</NavLink> 
        </div>
      </div>
    );
  }
  
  export default Login;

  