import React, { useEffect, useState } from 'react'
import {Table,Container} from "reactstrap";
import Base from './Base';
import { getAllUser } from '../services/user-service';
import { toast } from 'react-toastify';
import { deleteUser } from '../services/user-service';
import { Button } from 'reactstrap';


const ListAllUser=()=> {


const [users,setUsers]=useState([]);
const init = () =>{
    getAllUser().then((data) => {
        console.log(data)
        setUsers(data)
    }).catch(error => {
        console.log(error)
    })
}

const deleteUsers = (userId) => {
    console.log('id');
    deleteUser(userId).then((response) =>{
       console.log(response);
       init();
       toast.success("user deleted");

    }).catch(error =>{
        console.log(error);
    })
     
 }

useEffect(()=>{
//get all users from server

    init();

console.log("userdeatils");
// console.log(getAllUser());
getAllUser().then((data) => {
    console.log(data)
    setUsers(data)
}).catch(error => {
    console.log(error)
})



},[])

  return (
    <Base>
        <Container>
        <h1>Admin Page</h1>
            <Table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        {/* <th>Password</th> */}
                        <th>Role Id</th>
                    </tr>
                 </thead>
                <tbody>
                    {
                       users&& users.map(
                            user =>
                            {
                                    return <tr key={user.id}>
                                        <td> {user.id} </td>
                                        <td> {user.firstName} </td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        {/* <td>{user.password}</td> */}
                                        <td>{user.userRole.id}</td>
                                        <td>
                                        <button className="btn btn-danger ml-2" onClick={() => {
                                                                 deleteUsers(user.id);
                                                            }}>Delete User</button>
                                    {/* <Button color="blue" onClick = {deleteUsers(user.id)}>Delete</Button> */}
                                    </td>
                                    </tr>;
                                }
                        )
                    }
                </tbody>
            </Table>


    </Container>
    </Base>
    
  )
}
export default ListAllUser;