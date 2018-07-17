import React from "react";
import axios from "axios";

class LogIn extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="form form-log-in">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />

        <input type="submit" value="Valider" />
      </form>
    );
  }
}

export default LogIn;
