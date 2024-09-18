import { Link, Outlet } from "react-router-dom";
import '../App.css'

export const Layout = () => {
    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/add" className="nav-link">Add User</Link>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}
