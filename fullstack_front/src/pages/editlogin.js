import React, { useEffect,useState } from 'react'
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
 
export default function Editlogin() {

let navigate=useNavigate()

const {id}=useParams()
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


    useEffect(()=>{
        loadUser();
    }, []);
   
    const onSubmit=async (e)=>{

        e.preventDefault()

        await axios.put( `http://localhost:8080/user/${id}`,user)
        console.log(id)
        window.history.back();
    }

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}` )
        setUsers(result.data)
    };
  return ( 
  <div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit User</h2>
            <form onSubmit={(e)=>onSubmit(e)}>
                <div className="mb-3">
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
                    Phone
                </label>
            <input
            type={"tel"}
            pattern="[0-9]*"
            className="form-control"
            placeholder="Enter your Phone Number"
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

            <button type="Submit" className="btn btn-outline-primary">
                Submit
                </button>
                <Link type="Cancel" className="btn btn-outline-danger mx-2" to={`/viewlogin/${id}`}>
                Cancel
                </Link>
                </form>
        </div>
    </div>
  </div>
  );
  
  (
    <div>Adduser</div>
  )
}
