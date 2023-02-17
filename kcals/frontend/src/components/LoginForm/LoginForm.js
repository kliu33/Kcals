import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './loginform.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/channels/1" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const demoLogin = (e) => {
    e.preventDefault()
    dispatch(sessionActions.login({email: "demo@user.io", password: "password"}))
  }

  return (
    <div class='form-div'>
    <button onClick={demoLogin} class='demo'>Demo Login</button>
    <form onSubmit={handleSubmit} id = "form">
        <div class="break">
          <hr class="hor_line" />
            <div class="hor_content"> OR </div>
          <hr class="hor_line" />
        </div>
        <ul className='errors'>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <input
          class="input"
          type="text"
          value={email}
          placeholder="name@work-email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          class="input"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit" id="submit">Sign In With Email</button>
    </form>
    </div>
  );
}

export default LoginFormPage;