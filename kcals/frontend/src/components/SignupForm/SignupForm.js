import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './signupform.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    setErrors([]);
    return dispatch(sessionActions.signup({ email, first_name, last_name, password }))
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

  return (
    <form onSubmit={handleSubmit} id = "form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
        <label id="label">Email address</label>
        <input
          class="input"
          type="text"
          value={email}
          placeholder="name@work-email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label id="label">First Name</label>
        <input
          class="input"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label id="label">Last Name</label>
        <input
          class="input"
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label id="label">Password</label>
        <input
          class="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button type="submit" id="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;