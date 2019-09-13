import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header/header";
import AddBook from "./AddBook/addBook";
import EditBook from "./EditBook/editBook";
import AllBooks from "./AllBooks/allbooks";
import Register from "./Register/register";
import UserBooks from "./UserBooks/userbooks";
import Login from "./Login/login";

const initialState = {
  data: [],
  editItem: null,
  counter: 0,
  isAuth: false,
  userId: "",
  userBooksNo: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case "SET_AUTH":
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;
      return { ...state };

    case "ADDBOOK":
      let newData = { data: [...state.data, action.payload] };
      state.data = newData.data;
      state.counter = state.data.length;
      return { ...state };

    case "EDITHANDLER":
      return {
        ...state,
        editBook: action.payload
      };

    case "EDITBOOK":
      let newItem = state.data.map(item => {
        if (item.title === action.payload.title) {
          item.price = action.payload.price;
          item.description = action.payload.description;
          item.author = action.payload.author;
        }
        return item;
      });

      state.data = newItem;
      return { ...state };

    case "DELETEBOOK":
      let title = action.payload.title;
      let newBook = state.data.filter(item => {
        if (item.title !== title) {
          return item;
        }
      });
      state.counter = newBook.length;
      return { data: newBook, counter: state.counter };
    default:
      return state;
  }
};

const store = createStore(reducer);

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={AllBooks} />
            <Route path="/add-book" component={AddBook} />
            <Route path="/edit-book/:id" component={EditBook} />
            <Route path="/user-books" component={UserBooks} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
