import React, { useEffect, useState } from "react";
import {Redirect, Link} from 'react-router-dom';
import { connect } from "react-redux";
import './allbooks.css';



const AllBooks = props => {
  const [data, setData] = useState([]);
    useEffect(() => {
      if(props.isAuth) {
      } else {
        return props.history.push('/login');
      }
        fetch('http://localhost:3030/books/get-books')
        .then(res => {
            return res.json()
        })
        .then(data => {
            setData(data);
        })
    },[])

    const getBookUrl = (id) => {
      return "/book/" + id;
    }

  return (
    <div className="table-container">
      <h3>All Books...</h3>
      <table border="1">
        <tbody>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Description</td>
            <td>Author</td>
            <td>View</td>
          </tr>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>#{item.price}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                  <Link to={getBookUrl(item.id)}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{marginTop: '1rem', fontSize: '1rem'}}>{data.length === 0 ? "There are no books available": ""}</p>
    </div>
  );
};

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
};

export default connect(mapStateToProps)(AllBooks);
