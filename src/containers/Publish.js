import React from "react";
import axios from "axios";

class Publish extends React.Component {
  state = {
    title: "",
    description: "",
    price: ""
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
      .post(
        "https://leboncoin-api.herokuapp.com/api/offer/publish",
        {
          title: this.state.title,
          description: this.state.description,
          price: this.state.price
        },
        { headers: { Authorization: "bearer " + this.props.user.token } }
      )
      .then(response => {
        if (response.data) {
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
      <React.Fragment>
        <h2>Votre annonce</h2>
        <ul>
          <form onSubmit={this.onSubmit} className="form form-publish">
            <label htmlFor="title">Titre de l'annonce</label>
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <label htmlFor="description">Texte de l'annonce</label>
            <textarea
              id="description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <label htmlFor="price">Prix</label>
            <input
              id="price"
              name="price"
              type="text"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <input className="button-blue" type="submit" value="Valider" />
          </form>
        </ul>
      </React.Fragment>
    );
  }
}

export default Publish;
