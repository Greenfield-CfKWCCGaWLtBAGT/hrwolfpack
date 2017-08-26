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
    $.ajax({
      type: 'GET',
      data: {
        id: this.state.listingId
      },
      url: '/listing',
      success: (listing) => {
        this.setState({
          listing
        })
      }
    });
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
            <Col md={8}>
            <Listing
              listingInfo={this.state.listing}
              userId={this.props.userId}
              socket={this.props.socket}
              history={this.props.history}
            />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Chatroom userId={this.props.userId} username={this.props.username} listingInfo={this.state.listing} listingId={this.state.listingId} socket={this.props.socket}/>
            </Col>
          </Row>
        </Grid>
      )
    }

  }

}
