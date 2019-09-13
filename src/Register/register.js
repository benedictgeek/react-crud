import React, {useState, useEffect} from 'react';
import './register.css';

const Register = (props) => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: ""
      });
    
      const handleInput = e => {
        setFormData({...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = () => {
        console.log(formData);
        fetch("http://localhost:3030/users/add-user", {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res => {
          if(res.status === 200) {
            console.log(res.result);
            props.history.push('/login');
          }
        })
        .catch(err => {
          console.log(err);
        })
      };
    return (
        <div className='register'>
            <div className="form">
                <label>Name</label>
                <input onChange={handleInput} name="name" placeholder="Enter name" />
                <label>Email</label>
                <input onChange={handleInput} name="email" placeholder="Enter email" />
                <label>Password</label>
                <input onChange={handleInput} name="password" placeholder="Enter password" />
                <input onClick={handleSubmit} type="submit" value="Register" />
            </div>
        </div>
    );
}

export default Register;