import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import ListBook from "../ListBook/ListBook";
import './editbook.css';

const EditBook = props => {
    const {params} = props.match;
    
    const id = params.id;

    const [bookData, setBookData] = useState({});
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3030/books/get-book/' + id)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log(res);
            setBookData({
                title: res.title,
                price: res.price,
                description: res.description,
                author: res.author
              })
        })
        .catch(err => {
            console.log(err);
        })
    },[])

  const handleChange = e => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3030/books/edit-book', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...bookData, bookId: id})
    })
    .then(res => {
        console.log(res);
        setBookData({
            title: res.title,
            price: res.price,
            description: res.description,
            author: res.author
          })

          setEdited(true);
    })
  };


  let { title, price, description, author } = bookData;

  return (
    <div className="container">
        {edited ? <Redirect to="/user-books"/> :
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
        <input type="submit" onClick={handleSubmit} value="Edit"/>
      </div>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    
  };
};


export default connect(
  mapStateToProps,
  null
)(EditBook);
