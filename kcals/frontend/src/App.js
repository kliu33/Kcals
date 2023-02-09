import React from "react";
import Login from './components/Login/Login.js'
import SignUp from './components/SignUp/signup.js'
import Home from './components/Home/Home.js'
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/home" component={Home}/>
    </Switch>
  );
}

export default App;
