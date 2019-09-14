import React, { useState, useEffect, useLayoutEffect } from "react";
import "./getbook.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const GetBook = props => {
  const [bookData, setBookData] = useState({});
  const { params } = props.match;
  const bookId = params.id;

  useLayoutEffect(() => {
    if(props.isAuth) {
    } else {
      return props.history.push('/login');
    }
  })

  useEffect(() => {
    
    fetch("https://react-crud-backend.herokuapp.com/books/get-book/" + bookId)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setBookData(res.bookData);
        }
      });
  }, []);

  const { title, description, price, author } = bookData;
  return (
    <div className="book-container">
        <div className="book-body">
          <h3 className="book-title">{title}</h3>
          <p className="book-data">{description}</p>
          <p className="book-data">Price: #{price}</p>
          <p className="book-data">Author: {author}</p>
        </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(
  mapStateToProps,
  null
)(GetBook);
