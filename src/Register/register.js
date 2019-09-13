import React, {useState, useEffect} from 'react';
import './register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: ""
      });
    
      const handleInput = e => {
        setFormData({
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = () => {
        //fetch
      };
    return (
        <div className='register'>
            <form>
                <label>Name</label>
                <input onChange={handleInput} name="name" placeholder="Enter name" />
                <label>Email</label>
                <input onChange={handleInput} name="email" placeholder="Enter email" />
                <label>Password</label>
                <input onChange={handleInput} name="password" placeholder="Enter password" />
                <input onClick={handleSubmit} type="submit" value="Register" />
            </form>
        </div>
    );
}

export default Register;