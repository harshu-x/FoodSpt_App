import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }));
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter correct credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={{
      background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url('/assets/pizza.jpeg') no-repeat center center/cover",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "rgba(0, 0, 0, 0.5)",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        width: "350px",
        color: "white"
      }}>
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <h2 style={{ color: "#ffcc00" }}>Signup</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={onChange} value={credentials.email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={onChange} value={credentials.password} required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' onChange={onChange} value={credentials.geolocation} required />
          </div>
          <button type="submit" className="btn w-100" style={{ borderRadius: "20px", backgroundColor: "#ff6600", color: "white" }}>Submit</button>
          <Link to="/login" className="btn w-100 mt-3" style={{ borderRadius: "20px", backgroundColor: "#cc0000", color: "white" }}>Already a User</Link>
        </form>
      </div>
    </div>
  );
}
