import React, { Component, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    console.log(email, password);
    fetch(`http://localhost:8080/email/${email}/${password}`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");

      if(email=="admin@gmail.com" && password=='12345') {
       window.localStorage.setItem("loggedIn", true);
          window.location.href = "/Dashboard";
      }
        else if (data.status === 200) {
   console.log("success",data.status)
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("user", data.data);
          window.location.href = `/viewlogin/${data.data.id}`;
        }
        else{
          alert(setError("Invalid email or password"));
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="col-md-4 offset-md-4 border rounded border-dark p-4 mt-3 shadow">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center m-4">Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input     
              type="email"
              className="form-control mt-2"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
            Not with us? 
            <a href="/"> Join here.</a>
          </p>
          {error && <div className="alert alert-danger">{error}</div>}        </form>
      </div>
    </div>
  );
}