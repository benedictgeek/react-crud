import React, { useEffect, useState } from "react";
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import './allbooks.css';



const AllBooks = props => {
  const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3030/books/get-books')
        .then(res => {
            return res.json()
        })
        .then(data => {
            setData(data);
        })
    },[])

  return (
    <div className="table-container">
      <h3>All Books...</h3>
      {props.isAuth ? 
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
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                  <a href="#">View</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      : <Redirect to="/login"/>}
    </div>
  );
};

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth
    }
};

export default connect(mapStateToProps)(AllBooks);
