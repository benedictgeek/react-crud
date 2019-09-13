import React from "react";
import "./header.css";
import BookCounter from "./bookCounter.js";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link} from "react-router-dom";

const header = props => {
  return (
    <div className="main-header">
      <div className="main-header__logo"><Link to="/">ReACt</Link></div>
      <nav className="main-header__nav">
        {props.isAuth ? (
          ""
        ) : (
          <ul className="main-header__nav--lists">
            <li className="main-header__nav--list">
              <Link to="/login">Login</Link>
            </li>
            <li className="main-header__nav--list">
            <Link to="/register">Register</Link>
            </li>
          </ul>
        )}
        {props.isAuth ? (
          <ul className="main-header__nav--lists">
            <li className="main-header__nav--list">
            <Link to="/add-book">Add</Link>
            </li>
            <li className="main-header__nav--list">
            <Link to="/user-books">My books</Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.isAuth
  };
};

export default connect(mapStateToProps)(header);
