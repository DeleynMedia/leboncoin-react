import React from "react";

/* import { NavLink, withRouter } from "react-router-dom"; */

class Search extends React.Component {
  onSearch = event => {
    this.props.onSearch();
    event.preventDefault();

    /*     this.setState({
      queryUrl : queryUrl 
    });
 */
  };

  render() {
    if (!this.props.isLoading) {
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
                  value={this.props.title}
                  onChange={this.props.handleChange}
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
                  value={this.props.priceMin}
                  onChange={this.props.handleChange}
                />
                <label htmlFor="price-max">Prix max</label>
                <input
                  id="priceMax"
                  name="priceMax"
                  type="number"
                  value={this.props.priceMax}
                  onChange={this.props.handleChange}
                />

                <select
                  id="sort"
                  name="sort"
                  type="text"
                  value={this.props.sort}
                  onChange={this.props.handleChange}
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
