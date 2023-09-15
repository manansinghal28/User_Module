import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ViewLogin() { 
    const [user, setUser] = useState({
        name: "",
        phone: "",
        username: "",
        email: ""
    })

    const { id } = useParams();
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }

    return (
        <div className="container">
            <div className="row mb-3" >
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4"> User Details</h2>

                    <div className="card mb-3">
                        <div className="card-header p-2">
                            Details of user id:
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
                    
                    <Link className="btn btn-outline-primary mx-1"
                to={`/editlogin/${user.id}`}
                >
                Edit
                </Link>
                <Link className='btn btn-outline-dark mx-1' to={`/SignIn`}>
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}