import axios from "axios"
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Users () {
    const [users, SetUsers]=useState([])
    
    useEffect(()=>{
        axios.get("http://localhost:3001")
        .then(result => SetUsers(result.data))
        .catch(err =>console.log(err))
    },[])

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => {
            window.location.reload()
            console.log(res)})
        .catch(errr =>console.log(errr))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to ='/create' className="btn btn-success">Add</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>{
                                return <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Link to = {`/update/${user._id}`} className="btn btn-success">Edit</Link>
                                        <button className="btn btn-danger" onClick={()=> handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users