import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./css/landing-page.css";


export function Logout(props) {

  return (
    <div className="home">
      <h2>You have been logged out</h2>
      <Link to="/">home</Link>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Logout);
