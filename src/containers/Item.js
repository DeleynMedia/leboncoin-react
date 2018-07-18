import React from "react";
import { Link } from "react-router-dom";

class Item extends React.Component {
  render() {
    /*     console.log(this.props); */
    return (
      <li>
        <Link to={`/offer/${this.props._id}`}>
          <div>{this.props.title} </div>
          <div>{this.props.description} </div>
          <div>{this.props.price} </div>
        </Link>
      </li>
    );
  }
}

export default Item;
