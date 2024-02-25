import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate, Link } from "react-router-dom";
import { baseURL } from "../../lib/index";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirect
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form
          className='w-50 m-auto mt-5 border bg-dark border-success rounded'
          onSubmit={handleSubmit}
        >
          <div className='m-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              autoFocus='on'
              type='email'
              className='form-control'
              name='email'
              value={credentials.email}
              onChange={onChange}
              aria-describedby='emailHelp'
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone.
            </div>
          </div>
          <div className='m-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              autoComplete='on'
              type='password'
              className='form-control'
              value={credentials.password}
              onChange={onChange}
              name='password'
            />
          </div>
          <button type='submit' className='m-3 btn btn-success'>
            Submit
          </button>
          <Link to='/signup' className='m-3 mx-1 btn btn-danger'>
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}