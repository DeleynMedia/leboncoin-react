import React from "react";
import axios from "axios";
import Item from "./Item";
import Search from "../components/Search";
const queryString = require("query-string");

class Home extends React.Component {
  state = {
    isLoading: false,
    offers: [],
    offersLimit: [],
    query: {
      title: "",
      priceMin: 0,
      priceMax: null,
      sort: "",
      skip: 0,
      limit: 25
    }
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const newState = { ...this.state };
    newState.query[name] = value;
    /* console.log(newState); */
    this.setState(newState);
  };

  /* FONCTION POUR RECUPERER LES DATAS DES ANNONCES  */
  getInfos = () => {
    let params = queryString.stringify(this.state.query);

    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer?" + params)
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

  onChangePagePlus = event => {
    let skip = this.state.query.skip;
    skip = skip + this.state.query.limit;

    this.setState(
      {
        query: {
          ...this.state.query,
          skip: skip
        }
      },
      () => {
        this.getInfos();
      }
    );
  };

  onChangePageLess = event => {
    let skip = this.state.query.skip;
    skip = skip - this.state.query.limit;

    this.setState(
      {
        query: {
          ...this.state.query,
          skip: skip
        }
      },
      () => {
        this.getInfos();
      }
    );
  };

  render() {
    /*   const offers = []; */
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
            <Search
              {...this.state.query}
              handleChange={this.handleChange}
              onSearch={this.getInfos}
            />
          </div>
          <div>
            <div>Liste des annonces</div>
            <ul className="list-offers">{offers}</ul>
          </div>
          <br />
          <div>
            <button onClick={this.onChangePageLess} className="button-blue">
              Page précédente{" "}
            </button>
            <button onClick={this.onChangePagePlus} className="button-blue">
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
