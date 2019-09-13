import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./editbook.css";

const EditBook = props => {
  const { params } = props.match;

  const id = params.id;

  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    description: "",
    author: ""
  });
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (props.isAuth) {
    } else {
      return props.history.push("/login");
    }
    fetch("http://localhost:3030/books/get-book/" + id)
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === 200) {
          const book = res.bookData;
          setBookData({
            title: book.title,
            price: book.price,
            description: book.description,
            author: book.author
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch("http://localhost:3030/books/edit-book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...bookData, bookId: id })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.status === 200) {
          const book = res.bookData;
          setBookData({
            title: book.title,
            price: book.price,
            description: book.description,
            author: book.author
          });

          setEdited(true);
        }
      });
  };

  if (edited && props.isAuth === true) {
    props.history.push("/user-books");
  }

  let { title, price, description, author } = bookData;

  return (
    <div className="container">
      <div className="add-book">
        <label htmlFor="title">Title</label>
        <input onChange={handleChange} type="text" name="title" value={title} />
        <label htmlFor="price">Price</label>
        <input onChange={handleChange} type="text" name="price" value={price} />
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
        <input type="submit" onClick={handleSubmit} value="Edit" />
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
)(EditBook);
