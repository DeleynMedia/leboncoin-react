import React from "react";
import axios from "axios";
import Item from "./Item";
import Search from "../components/Search";

class Home extends React.Component {
  state = {
    isLoading: false,
    offers: []
  };

  /* FONCTION POUR RECUPERER LES DATAS DES ANNONCES  */
  getInfos = params => {
    if (params) {
      params = "?" + params;
      /* console.log("https://leboncoin-api.herokuapp.com/api/offer" + params); */
    } else {
      params = "";
    }
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer" + params)
      .then(response => {
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
          <div>
            <Search onSearch={this.getInfos} />
          </div>
          <div>
            <div>Liste des annonces</div>
            <ul className="list-offers">{offers}</ul>
          </div>
          <div>
            <button
              onClick={this.props.onSearch}
              value="skip"
              className="button-blue"
            >
              Page suivante{" "}
            </button>
          </div>
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
