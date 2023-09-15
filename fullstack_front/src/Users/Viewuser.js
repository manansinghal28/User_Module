import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'bootstrap';
export default function Viewuser() {

    const [user,setUsers]=useState({
        name:"",
        phone:"",
        username:"",
        email:""
    })

    const {id}=useParams();
    useEffect(()=>{
        loadUser();
    },[])

    const loadUser=async()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUsers(result.data)
    }

  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4"> User Details</h2>

            <div className="card">
                <div className="card-header p-2">
                    Deatils of user id: 
                    <ul className="List-group list-group-flush">
                       <li className="List-group-item"> 
                       <b>Name: </b>
                       {user.name}
                       </li>

                       <li className="List-group-item"> 
                       <b>Phone: </b>
                       {user.phone}
                       </li>
                      
                       <li className="List-group-item"> 
                       <b>Username: </b>
                       {
                        user.username
                       }
                       </li>
                       
                        <li className="List-group-item"> 
                       <b>Email: </b>
                       {user.email}
                       </li>
                    </ul>
                </div>
  </div>
  <Link className="btn btn-primary my-2" to ={"/Dashboard"}> Back to home</Link> 
  </div>
  </div>
  </div>
  );
}
