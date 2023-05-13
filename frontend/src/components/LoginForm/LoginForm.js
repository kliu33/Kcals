import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./loginform.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password })).catch(
      async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    );
  };

  const demoLogin = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({ email: "demo@user.io", password: "password" })
    );
  };

  if (sessionUser) return <Redirect to="/channels/1" />;

  return (
    <div className="form-div">
      <button onClick={demoLogin} className="demo">
        Demo Login
      </button>
      <form onSubmit={handleSubmit} id="form">
        <div className="break">
          <hr className="hor_line" />
          <div className="hor_content"> OR </div>
          <hr className="hor_line" />
        </div>
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <input
          className="input"
          type="text"
          value={email}
          placeholder="name@work-email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="submit">
          Sign In With Email
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
