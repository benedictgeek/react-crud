import React from 'react';
import {connect} from 'react-redux';

const  ListBook  = props => {
  return (
    <div className="table-container">
      <h3>Available Books</h3>
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
          {props.data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.author}</td>
                <td>
                  <a
                    href="#"
                    onClick={() => {props.setEditBook(item); props.editBook({type: "EDITHANDLER", payload: item})}}
                  >
                    Edit
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={() => {props.deleteBook({ title: item.title})}}
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
        data: state.data,
        editItem: state.editItem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editBook: (payload) => dispatch(payload)
    }
}
  export default connect(mapStateToProps, mapDispatchToProps)(ListBook);