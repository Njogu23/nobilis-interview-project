import React, { useState, useContext } from 'react';
import "./login.css";
import { MyContext } from '../../MyContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { login } = useContext(MyContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: { email, password }
      }),
    })
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data)
          login(data.status.data.user, data.status.data.token);
          console.log(data.status.data.user)
          console.log(data.status.data.token)
        });
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    })
    .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="login">
      <form className="forms" onSubmit={handleSubmit}>
        <h2 id="user">User Login</h2>
        <label>Email</label>
        <input
          type="email"
          className="inputs"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="inputs"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button className="btn" type="submit">Login</button>
      </form>
      <h2 className='error'>{errors}</h2>
    </div>
  );
}

export default Login;