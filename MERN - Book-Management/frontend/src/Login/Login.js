import { useRef, useState } from 'react'
import './Login.css'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Login() {

    const i1 = useRef()
    const i2 = useRef()

    const [error, setError] = useState(null)

    const [userType, setUserType] = useState("admin")

    const userDetails = useRef({})  

    const navigate = useNavigate()

    const myClickHandler = async (e) => {
        e.preventDefault()

        if (validator.isEmpty(i1.current.value)) {
            return setError("Email is Required");

        } else if (!validator.isEmail(i1.current.value)) {
            return setError("Invalid Email");
        } else {
            setError("")
        }


        if (validator.isEmpty(i2.current.value)) {
            return setError("password is Required");

        } 
        else if (!validator.isStrongPassword(i2.current.value)) {
            return setError("Invalid Password");

        } 
        else {
            setError("")
        }


        userDetails.current = {...userDetails.current, email:i1.current.value, password:i2.current.value}

        try {
            let url = '';
            if (userType === 'admin') {
                url = 'http://localhost:8000/admin/login'; // Replace with admin login endpoint
            } else {
                url = 'http://localhost:8000/user/login'; // Replace with user login endpoint
            }

            const response = await axios.post(url, userDetails.current);

            // Handle successful login response
            console.log(response.data); // Log response data

            // Redirect based on userType
            if (userType === 'admin') {
                navigate("/admin"); // Navigate to /admin
            } else {
                navigate("/user"); // Navigate to /user
            }

            // Reset form fields
            i1.current.value = '';
            i2.current.value = '';

        } catch (error) {
            // Handle error responses from server
            console.error('Login failed:', error);
            // setError("Login failed. Please try again."); // Set appropriate error message
        }


    }

    const handleRadioChange = (e) => {
        setUserType(e.target.value); // Update userType state based on radio selection
    };

    return (
        <div>
            <div className="container" style={{padding: "50px 0px"}}>
                {/* <h1 className="text-center">Welcome to Book Management</h1> */}
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-9 col-sm-12">
                        <div className='main-div'>
                            <div className="text-center">
                                <h1 style={{ paddingBottom: "30px" }}>Login</h1>
                                <form action="">
                                    <div className='row'>
                                        <div className='col-lg-12'>
                                            <div className='radio-main'>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioAdmin" value="admin"  checked={userType === 'admin'} onChange={handleRadioChange} />
                                                    <label className="form-check-label" htmlFor="inlineRadioAdmin">Admin</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadioUser" value="user" checked={userType === 'user'} onChange={handleRadioChange}/>
                                                    <label className="form-check-label" htmlFor="inlineRadioUser">User</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingBottom: "20px" }}>
                                        <div className="col-lg-12">
                                            <input ref={i1} type="email" className="form-control" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingBottom: "20px" }}>
                                        <div className="col">
                                            <input ref={i2} type="password" className="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="row text-center">
                                        <div className='col-lg-12'>
                                            <div>
                                                {error !== null && <p style={{ color: "red" }}>{error}</p>}
                                                <button onClick={myClickHandler} className="btn-main">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>

        // admin login - email - ajay@gmail.com, password - Ajay@123
        // user login - email - vijay@gmail.com, password - Vijay@123

    )
}