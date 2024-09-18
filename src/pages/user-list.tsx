import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface IUser {
    id: number
    name: string
    surname: string
    age: number
    salary: number
}

export const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            })
    }

    const deleteUser = (id: number) => {
        axios.delete(`http://localhost:3000/users/${id}`)
            .then(() => {
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => {
                console.error("Error deleting user:", error);
            })
    }

    return (
        <div className="user-list">
            <h3>User List</h3>
            {users.length > 0 ? (
                users.map(user => (
                    <div className="user-item" key={user.id}>
                        <p>{user.name} {user.surname}</p>
                        <div>
                            <Link to={'/user/' + user.id}>Edit</Link>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}
            <Link to="/add" className="add-user-link">Add User</Link>
        </div>
    )
    
}
