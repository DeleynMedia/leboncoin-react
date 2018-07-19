import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import Logo from "./Logo.js";

class Header extends React.Component {
  onLogOut = event => {
    this.props.logOut();
    this.props.history.push("/");
    event.preventDefault();
  };

  renderNav() {
    if (this.props.user._id) {
      return (
        <React.Fragment>
          <li>
            <NavLink to={"/profile/" + this.props.user._id}>
              {this.props.user.username}
            </NavLink>
          </li>
          <li>
            <button onClick={this.onLogOut}>Déconnexion</button>
          </li>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <li>
          <NavLink to="/sign_up">Créer un compte</NavLink>
        </li>
        <li>
          <NavLink to="/log_in">Se connecter</NavLink>
        </li>
      </React.Fragment>
    );
  }

  render() {
    return (
      <header>
        <ul className="nav-list">
          <li>
            {" "}
            <Logo url="/Logo_leboncoin.png" />
          </li>
          <li>
            <NavLink to="/publish">DEPOSER UNE ANNONCE</NavLink>
          </li>
          <li>
            <NavLink to="/">OFFRES</NavLink>
          </li>
          {this.renderNav()}
        </ul>
        <hr />
      </header>
    );
  }
}

export default withRouter(Header);
