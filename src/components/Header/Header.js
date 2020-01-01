import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";
import Logo from '../../susu.png';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span className='user-name'>{this.context.user.name}</span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to="/login"
            className="logout-link"
          >
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to="/login" className="login-link">
          Login
        </Link>{" "}
        <Link to="/register" className="register-link">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <h1>
          <Link to="/" className="header-link">
            <img src={Logo} alt='Semper Ubi Sub Ubi' />
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
