import { Link } from "react-router-dom";
import './Navbar.css'
import { logout } from "./auth";

export default function Navbar() {

    const handleLogout = () => {
        logout(); // Call the logout function
    };


    return (
        <>
            <header style={{ backgroundColor: "#343a40" }}>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        {/* <a class="navbar-brand ml-5" href="#">Welcome to Book Management</a> */}
                        <div className="navbar-brand nb">Welcome to Book Management</div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                {/* <li className="nav-item active">
                                    <Link className="nav-link" to="/admin">Admin Book</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/user">User Book</Link>
                                </li> */}
                                <div className="d-flex">
                                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                                </div>
                            </ul>


                        </div>
                    </nav>
                </div>

            </header>
        </>
    )
}