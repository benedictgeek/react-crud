import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./addbook.css";

const AddBook = props => {
  let initialState = {
    title: "",
    price: "",
    description: "",
    author: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3030/books/add-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...formData, userId: props.userId })
    }).then(res => {
      if (res.status === 200) {
        setFormData({
          title: "",
          price: "",
          description: "",
          author: ""
        });
      }
    });
  };

  if(props.isAuth) {
  } else {
    props.history.push('/login');
  }
  const { author, price, description, title } = formData;

  return (
    <div className="container">
      {props.isAuth ? (
        <div className="add-book">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={title}
          />
          <label htmlFor="price">Price</label>
          <input
            onChange={handleChange}
            type="text"
            name="price"
            value={price}
          />
          <label htmlFor="desc">Description</label>
          <input
            onChange={handleChange}
            type="text"
            name="description"
            value={description}
          />
          <label htmlFor="author">Author</label>
          <input
            onChange={handleChange}
            type="text"
            name="author"
            value={author}
          />
          <input type="submit" onClick={handleSubmit} value="Add" />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth,
    userId: state.userId
  };
};

export default connect(
  mapStateToProps,
  null
)(AddBook);
