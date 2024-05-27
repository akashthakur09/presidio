import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { registerLandlord } from '../api/authApi';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", phone: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData = {
        name: credentials.name,
        email: credentials.email,
        phone: credentials.phone,
        password: credentials.password,
        cpassword: credentials.cpassword
      };
      const response = await registerLandlord(userData);
      console.log(response)
      if (response.success) {
        navigate("/landlordLogin");
      } else {
        console.log(response.msg)
        alert(response.msg);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h1>Create your account</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            onChange={onChange}
            value={credentials.name}
            required
          />
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
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            onChange={onChange}
            value={credentials.phone}
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
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            value={credentials.cpassword}
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="login-link">
          <NavLink to="/LandlordLogin">Already registered? Sign in</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
