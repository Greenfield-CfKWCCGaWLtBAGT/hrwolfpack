import React from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import Listings from './Listings.jsx';

var divStyle = {
  margin: '100px 50px 50px 50px'
};

export default class UserListings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      allListings: []
    };
  }

  componentWillMount() {
    this.getAllListings();
  }

  getAllListings() {
    let context = this;
    $.get('/listings', (data) => {
      context.setState({
        allListings: data
      });
    });
  }

  render() {
    return (
      <div style={divStyle}>
        <Listings
          currentListings={this.state.allListings}
          userId={this.props.userId}
          socket={this.props.socket}
        />
      </div>
    )
  }
}
