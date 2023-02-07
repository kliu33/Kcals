import logo from '../../imgs/logo.jpg'
import LoginFormPage from '../LoginForm/LoginForm';
import './Login.css'

function Login() {
    return (
      <div id="block">
        <img src={logo} alt="" id="logo" />
        <h1 class='head'> Sign in to Kcals</h1>
        <h3> We suggest using the email address you use at work.</h3>
        <LoginFormPage id="form" />
      </div>
    );
  }
  
  export default Login;

  