import React from "react";
import axios from "axios";

class Offer extends React.Component {
  state = {
    offer: {},
    isLoading: true
  };

  render() {
    console.log(this.props);
    if (!this.state.isLoading) {
      return (
        <React.Fragment>
          <div>
            {/*           <span>offer : {this.props.match.params.id}</span> */}
            <span className="detail-title">{this.state.offer.title}</span>
            <p className="detail-description">{this.state.offer.description}</p>
            <span className="detail-price">{this.state.offer.price}</span>
            <span className="detail-userbname">
              {this.state.offer.creator.account.username}
            </span>
            <span className="detail-phone">
              {this.state.offer.creator.account.number || "pas de numéro"}
            </span>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>is loading </div>;
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(response);
        this.setState({
          isLoading: false,
          offer: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Offer;
