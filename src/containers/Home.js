import React from "react";
import axios from "axios";
import Item from "./Item";

class Home extends React.Component {
  state = {
    isLoading: true,
    offers: []
  };

  /* FONCTION POUR RECUPERER LES DATAS DES ANNONCES  */
  getInfos = () => {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer")
      .then(response => {
        /*         console.log(response); */
        this.setState({
          isLoading: false,
          offers: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const offers = [];
    if (!this.state.isLoading) {
      for (let i = 0; i < this.state.offers.length; i++) {
        let data = {
          title: this.state.offers[i].title,
          description: this.state.offers[i].description,
          price: this.state.offers[i].price,
          _id: this.state.offers[i]._id
        };
        /* console.log(data); */
        offers.push(<Item key={this.state.offers[i]._id} {...data} />);
      }

      return (
        <React.Fragment>
          <h2>Liste des annonces</h2>
          <ul className="list-offers">{offers}</ul>
        </React.Fragment>
      );
    }
    return <div />;
  }

  componentDidMount() {
    this.getInfos();
  }
}

export default Home;
