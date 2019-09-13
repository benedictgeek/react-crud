import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";

const ListBook = props => {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if(props.isAuth) {
    } else {
      return props.history.push('/login');
    }
    fetch("https://react-crud-backend.herokuapp.com/books/get-user-books/" + props.userId)
      .then(res => {
        return res.json();
      })
      .then(res => {
        setUserBooks(res.books);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteBook = id => {
    console.log(id);
    fetch("https://react-crud-backend.herokuapp.com/books/delete-book/" + id)
      .then(res => {
        if (res.status === 200) {
          const newBooks = userBooks.filter(book => {
            if (book.id !== id) {
              return book;
            }
          });

          setUserBooks(newBooks);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const editUrl = id => {
    return "/edit-book/" + id;
  };
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
                <td>#{item.price}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                  <Link to={editUrl(item.id)}>Edit</Link>
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
                    onClick={() => {
                      deleteBook(item.id);
                    }}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        <p style={{marginTop: '1rem', fontSize: '1rem'}}>{userBooks.length === 0 ? "You have no books yet...": ""}</p>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  // console.log(state);
  return {
    isAuth: state.isAuth,
    userId: state.userId
  };
};

export default connect(
  mapStateToProps,
  null
)(ListBook);
