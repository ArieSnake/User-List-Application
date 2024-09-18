import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface IUserForm {
    name: string
    surname: string
    age: number
    salary: number
}

export const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUserForm>();
    const navigate = useNavigate();

    const onSubmit = (data: IUserForm) => {
        axios.post('http://localhost:3000/users', data)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            })
    }

    return (
        <div>
            <h3>Add User</h3>
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

                <button type="submit">Add User</button>
            </form>

            <Link to="/">Home</Link>
        </div>
    )
}
