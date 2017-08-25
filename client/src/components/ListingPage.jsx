import React from 'react';
import { ListGroup, Button, Modal, Col, Thumbnail, Grid, Row, Panel } from 'react-bootstrap';
import $ from 'jquery';
import Listing from './Listing.jsx';
import Chatroom from './Chatroom.jsx';

var divStyle = {
  margin: '100px 50px 50px 50px'
};

export default class ListingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listingId: this.props.match.params.id
    };
  }

  componentDidMount() {
    let context = this;
    $.ajax({
      type: 'GET',
      data: {
        id: context.state.listingId
      },
      url: '/listing',
      success: (result) => {
        context.setState({
          listing: result[0]
        })
      }
    });
    console.log('USERID:', this.props.userId, this.props.socket, this.props.history)
  }

  render() {
    if (!this.state.listing) {
      return (
        <div> Loading... </div>
      )
    } else {
      return (
        <Grid>
          <Row>
            <Listing
              listingInfo={this.state.listing}
              userId={this.props.userId}
              socket={this.props.socket}
              history={this.props.history}
            />
          </Row>
          <Row>
            <Chatroom />
          </Row>
        </Grid>
      )
    }

  }

}
