import React from "react";
import { connect } from "react-redux";
import { clearAuth } from "../actions/auth";
import { clearAuthToken } from "../local-storage";
import "./css/header-bar.css";

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="topnav-right" onClick={() => this.logOut()}>
          Log out
        </button>
      );
    }
    return (
      <React.Fragment>
        <header>
          <div className="topnav">
            <span href="#home">Esperanto</span>
            {logOutButton}
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
