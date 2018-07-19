import React from "react";

/* import { NavLink, withRouter } from "react-router-dom"; */

const queryString = require("query-string");

class Search extends React.Component {
  state = {
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

  onSearch = event => {
    const queryUrl = queryString.stringify(this.state.query);
    this.props.onSearch(queryUrl);
    event.preventDefault();
    /* axios
      .get("https://leboncoin-api.herokuapp.com/api/offer?" + queryUrl)
      .then(response => {
        
        this.setState({
          isLoading: false,
          title: response.data.title,
          priceMax: response.data.priceMax,
          priceMin: response.data.priceMin,
          sort: response.data.sort
        });
      })
      .catch(error => {
        console.log(error);
      }); */
  };

  render() {
    if (!this.state.isLoading) {
      return (
        <React.Fragment>
          <h2>Recherche</h2>
          <div>
            <ul className="search-title">
              <form onSubmit={this.onSearch} className="form form-publish">
                <label htmlFor="search">Que recherchez-vous? </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <input
                  className="button-blue"
                  type="submit"
                  value="Rechercher"
                />
                <br />
                <h3>prix entre </h3>

                <label htmlFor="price-min">Prix min</label>
                <textarea
                  id="priceMin"
                  name="priceMin"
                  type="number"
                  value={this.state.priceMin}
                  onChange={this.handleChange}
                />
                <label htmlFor="price-max">Prix max</label>
                <input
                  id="priceMax"
                  name="priceMax"
                  type="number"
                  value={this.state.priceMax}
                  onChange={this.handleChange}
                />

                <select
                  id="sort"
                  name="sort"
                  type="text"
                  value={this.state.sort}
                  onChange={this.handleChange}
                >
                  <option value="price-desc">Tri : prix décroissant</option>
                  <option value="price-asc">Tri : prix croissant</option>
                  <option value="date-desc">Tri : plus récentes</option>
                  <option value="date-asc">Tri : plus anciennes</option>
                </select>
              </form>
            </ul>
            <hr />
          </div>
        </React.Fragment>
      );
    } else {
      return <div />;
    }
  }
}

export default Search;
