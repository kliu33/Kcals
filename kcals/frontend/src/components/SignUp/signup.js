import SignupFormPage from "../SignupForm/SignupForm";
import logo from '../../imgs/logo.png'
import { NavLink } from 'react-router-dom';
import './signup.css'

function SignUp() {
    return (
        <div id="block">
          <div id = "top">
            <a href="/">
              <img src={logo} alt="" id="logo" />
            </a>
          </div>
          <h1 class='head'> Sign up for kcals</h1>
          <div class="suggest">
            <span> Start by entering the email address you use for work. </span>
          </div>
          <SignupFormPage id="form" />
          <br></br>
          <div class="already">
            <p> Already using Kcals?  </p>
            <NavLink to="login" id="navlink"> Sign in to an existing workspace</NavLink> 
          </div>
        </div>
    );
  }
  
  export default SignUp;
