import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const  ListBook  = props => {
    const [userBooks, setUserBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/books/get-user-books/' + props.userId)
        .then(res => {
            return res.json()
        })
        .then(res => {
            setUserBooks(res.books);
        })
        .catch(err => {
            console.log(err);
        })
    },[])

    const deleteBook = (id) => {
        console.log(id);
        fetch('http://localhost:3030/books/delete-book/' + id)
        .then(res => {
            if(res.status === 200) {
                const newBooks = userBooks.filter(book => {
                    if(book.id !== id) {
                        return book;
                    }
                })

                setUserBooks(newBooks);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const editUrl = (id) => {
        return "/edit-book/" + id;
    }
  return (
    <div className="table-container">
      <h3>My Books</h3>
      <table border="1">
        <tbody>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Description</td>
            <td>Author</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
          {userBooks.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                    <Link to={editUrl(item.id)}  >Edit</Link>
                  {/* <a
                    href="#"
                    onClick={() => {props.setEditBook(item); props.editBook({type: "EDITHANDLER", payload: item})}}
                  >
                    Edit
                  </a> */}
                </td>
                <td>
                  <a
                    href="#"
                    onClick={() => {deleteBook(item.id)}}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

  const mapStateToProps = (state, props) => {
    // console.log(state);
    return {
        userId: state.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editBook: (payload) => dispatch(payload)
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(ListBook);