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
import GetBook from "./GetBook/getbook";

const initialState = {
  isAuth: false,
  userId: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case "SET_AUTH":
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.userId;
      return { ...state };

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
            <Route path="/book/:id" component={GetBook} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};
export default App;
