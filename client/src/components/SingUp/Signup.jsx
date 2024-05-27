import React, { useState, useContext } from 'react';
import "./Signup.css";
import { MyContext } from '../../MyContext';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { login } = useContext(MyContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: { username, email, password }
      }),
    }).then((res) => {
      if (res.ok) {
        
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            user: { email, password }
          }),
        }).then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              login(data.status.data.user);
            });
          } else {
            response.json().then((err) => setErrors(err.error));
          }
        }).catch((error) => console.error('Error:', error));
      } else {
        res.json().then((err) => setErrors(err.error));
      }
    }).catch((error) => console.error('Error:', error));
  }

  return (
    <div className="signup">
      <form className="forms" onSubmit={handleSubmit}>
        <h3 id="user">User Registration</h3>
        <label>Username</label>
        <input
          type="text"
          className="inputs"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="inputs"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="inputs"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <h2 className="error">{errors}</h2>
    </div>
  );
}

export default Signup;
