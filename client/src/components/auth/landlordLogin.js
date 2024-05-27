import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginLandlord } from '../api/authApi';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await loginLandlord(userData);
      // const json = await response.json();
      console.log(response);
      if (response.success) {
          localStorage.setItem('token', response.token);
          const userId = response.id;
          localStorage.setItem('userId', userId);

          alert(response.message);
          navigate("/propertyDetails");
       
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginBox">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
            value={credentials.email}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={onChange}
            value={credentials.password}
            required
          />
          
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="register-link">
          <NavLink to="/Landlordsignup">Not yet registered? Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
}
