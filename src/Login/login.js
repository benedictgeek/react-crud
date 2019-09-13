import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import "./login.css";

const Login = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInput = e => {
    setFormData({
        ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
      fetch('http://localhost:3030/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      })
      .then(res => {
          return res.json()
      })
      .then(res => {
        // if(res.user)
        const user = res.user;
        setIsLoggedIn(true);
        props.setAuth({isAuth: true, userId: user.id});
    })
      .catch(err => {
          console.log(err);
      })
  };
  
  return (
    <div className="login">
    {props.isAuth ? <Redirect to="/"/> :
      <div className="form">
        <label>Email</label>
        <input onChange={handleInput} name="email" placeholder="Enter email" />
        <label>Password</label>
        <input
          onChange={handleInput}
          name="password"
          placeholder="Enter password"
        />
        <input onClick={handleSubmit} type="submit" value="Login" />
      </div>
}
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.isAuth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAuth: (payload) => dispatch({type: 'SET_AUTH', payload}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
