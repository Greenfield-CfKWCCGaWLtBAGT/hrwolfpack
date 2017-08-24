import React from 'react';
import { ListGroup, Button, Modal, Col, Thumbnail, Grid, Row, Panel,  } from 'react-bootstrap';
import $ from 'jquery';

var divStyle = {
  margin: '100px 50px 50px 50px'
};

export default class ListingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // does this even need to be a class?
      listingId: this.props.match.params.id,
      listing: null
    };
  }

  componentWillMount() {
    this.getListing();
  }

  getListing() {
    let context = this;
    $.get('/listing', {id: this.state.listingId}, results => {
      context.setState({
        listing: results
      });
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col>Chat Goes Here</Col>
          </Row>
        </Grid>
      </div>
    )
  }

}