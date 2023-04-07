import React from "react";
import Login from './components/Login/Login.js'
import SignUp from './components/SignUp/signup.js'
import Home from './components/Home/Home.js'
import Splash from './components/Splash/Splash.js'
import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";

function App() {
  return (
    <Switch>
      <AuthRoute exact path="/login" component={Login}/>
      <AuthRoute exact path="/signup" component={SignUp}/>
      <ProtectedRoute path="/channels/:id" component={Home}/>
      <ProtectedRoute path="/dm_channels/:id" component={Home}/>
      <Route exact path="/" component={Splash}/>
    </Switch>
  );
}

export default App;
