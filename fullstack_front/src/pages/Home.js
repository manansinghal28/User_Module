import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
export default function Home() {

const[user,setUsers]=useState({
    name:"",
    phone:"",
    username:"",
    email:"",
    password:""
})

    const{name,phone,username,email,password}=user

    const onInputChange=(e)=>{
        setUsers({ ...user,[e.target.name]:e.target.value})
    };

    const validateName = (name) => {

        return name.length >= 3&& /^[^\d]+$/.test(name);
      };

    const validateEmail = (email) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(email);
      };

      const resetForm = () => {
        setUsers({
          name: '',
          phone: '',
          username: '',
          email: '',
          password: '',
        });
        
      };

    const onSubmit=async (e)=>{

        e.preventDefault()
        
    if (!name || !phone || !username || !email || !password) {
        alert("All fields are required");
        return;
      }

      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      if (!validateName(name)) {
        alert('Please enter a valid name');
        return;
      }
  
      try {
      const res=  await axios.post("http://localhost:8080/user", user);
      window.location.href = `/viewlogin/${res.data.id}`;
      } catch (error) {
        console.log("Error submitting form:", error);
      }
    };

    let navigate=useNavigate()
const isSubmitting = navigate.state === "submitting";
const isFormValid = email.trim() !== "" && password.trim() !== "";

  return ( 
  <div className="containe">
    <div className="row">
        <div className="col-md-4 offset-md-4 border rounded border-dark p-4 mt-4 shadow">
            <h2 className="text-center m-4">Register User</h2>
            <form onSubmit={(e)=>onSubmit(e)} id="myForm">
                <div className="form-outline mb-3">
                <label htmlFor="Name" className="form-label">
                    Name
                </label>
            <input
            type={"text"}
            className="form-control"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={(e)=>onInputChange(e)}/>
            </div>

<div className="mb-3">
    <label htmlFor="Phone" className="form-label">
        Phone No.
    </label>
<input
type={"tel"}
 pattern="[0-9]*"
className="form-control"
placeholder="Enter your number"
name="phone"
value={phone}
onChange={(e)=>onInputChange(e)}/>
   </div>

            <div className="mb-3">
                <label htmlFor="Username" className="form-label">
                    Username
                </label>
            <input
            type={"text"}
            className="form-control"
            placeholder="Enter your username"
            name="username"
            value={username}
            onChange={(e)=>onInputChange(e)}/>

            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                    E-mail
                </label>
            <input
            type={"text"}
            className="form-control"
            placeholder="Enter your e-mail address"
            name="email"
            value={email}
            onChange={(e)=>onInputChange(e)}/>

            </div>

            <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                    Password
                </label>
            <input
            type={"text"}
            className="form-control"
            placeholder="**********"
            name="password"
            value={password}
            onChange={(e)=>onInputChange(e)}/>

            </div>
           
            <button disabled={!isFormValid || isSubmitting} className="btn btn-outline-primary mx-2" to={"/"}>
            Submit 
          </button>
                <Link type="Cancel" className="btn btn-outline-danger mx-2"  onClick={resetForm}>
                Cancel
                </Link>
                <br></br>
                <br></br>
                <p>
                Already a member.
                <Link type="Login" className="text-primary" to={"/SignIn"}>
                     Login!
                </Link>  
                </p>              
                </form>
               </div>
               </div>
   </div>
 );
}