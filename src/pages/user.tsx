import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

interface IUserForm {
    name: string
    surname: string
    age: number
    salary: number
}

export const User = () => {
    const { id } = useParams()
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IUserForm>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    
    const onSubmit = (data: IUserForm) => {
        axios.put(`http://localhost:3000/users/${id}`, data)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                console.error("Error updating user:", error)
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(response => {
                const user = response.data
                setValue("name", user.name)
                setValue("surname", user.surname)
                setValue("age", user.age)
                setValue("salary", user.salary)
                setLoading(false)
            })
            .catch(error => {
                console.error("Error fetching user:", error)
                setLoading(false)
            });
    }, [id, setValue])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name:</label>
                    <input
                        className={errors.name ? "error" : ""}
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>

                <div>
                    <label>Surname:</label>
                    <input
                        className={errors.surname ? "error" : ""}
                        {...register("surname", { required: "Surname is required" })}
                    />
                    {errors.surname && <span>{errors.surname.message}</span>}
                </div>

                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        className={errors.age ? "error" : ""}
                        {...register("age", { 
                            required: "Age is required", 
                            min: { value: 18, message: "Age must be at least 18" }
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div>
                    <label>Salary:</label>
                    <input
                        type="number"
                        className={errors.salary ? "error" : ""}
                        {...register("salary", { 
                            required: "Salary is required", 
                            min: { value: 10000, message: "Salary must be at least 10,000" } 
                        })}
                    />
                    {errors.salary && <span>{errors.salary.message}</span>}
                </div>

                <button type="submit">Save Changes</button>
            </form>

            <Link to="/">Home</Link>
        </div>
    )
}
