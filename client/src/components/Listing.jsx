import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { ListGroup, ListGroupItem, Button, Modal, Col, Thumbnail, Grid, Row, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chatroom from './Chatroom.jsx';
import MapContainer from './MapContainer.jsx';
import Map from './Map.jsx';

var boxStyle = {
  boxShadow: '3px 3px 5px 6px grey',
};

class Listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            arrived: false,
            packed: false,
            userJoined: false,
            received: false,
            lgShow: false,
            btShow: true,
            listingParticipants: [],
            receivedParticipants: [],
            initializer: false
        };
        this.handleJoin = this.handleJoin.bind(this);
        this.handleArrive = this.handleArrive.bind(this);
        this.handleReceive = this.handleReceive.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    componentDidMount() {
        this.setState({
            packed: this.props.listingInfo.packed,
            arrived: this.props.listingInfo.arrived,
            completed: this.props.listingInfo.completed
        });

        this.checkListingStatus();
        this.isUserInitializer();

        this.props.socket.on('join', (data) => {
            if (this.props.listingInfo.id === data.rows[0].listing_id) {
                this.setState({listingParticipants: data.rows});
                this.hasUserJoined();
                if (data.count === this.props.listingInfo.num_of_participants) {
                    this.setState({packed: true});
                }
            }
        });

        this.props.socket.on('arrived', (data) => {
            if (this.props.listingInfo.id === data.id) {
                this.setState({arrived: data.arrived});
            }
        });

        this.props.socket.on('received', (data) => {
            if (this.props.listingInfo.id === data.rows[0].listing_id) {
                this.setState({receivedParticipants: data.rows});
                this.hasUserReceived();
                if (data.count === this.props.listingInfo.num_of_participants) {
                    this.setState({completed: true});
                }
            }
        });
    }

    checkListingStatus() {
        $.post('/listingStatus',
            {listingId: this.props.listingInfo.id},
            (data) => {
                this.setState({listingParticipants: data.rows});
                var receivedEntries = data.rows.filter(entry => {
                    return entry.received;
                });
                this.setState({receivedParticipants: receivedEntries});
                this.hasUserJoined();
                this.hasUserReceived();
            });
    }

    hasUserJoined() {
        var involved = this.state.listingParticipants.some(listing => {
            return listing.user_id === this.props.userId ? true : false;
        });
        if (involved) {
            this.setState({userJoined: true});
            this.setState({btShow: false});
        }
    }

    hasUserReceived() {
        var received = this.state.receivedParticipants.some(listing => {
            return listing.user_id === this.props.userId ? true : false;
        });
        if (received) {
            this.setState({received: true});
        }
    }

    isUserInitializer() {
        if (this.props.listingInfo.initializer === this.props.userId) {
            this.setState({
                btShow: false,
                initializer: true
            });
        }
    }

    handleJoin() {
        this.props.socket.emit('join', {
            listingId: this.props.listingInfo.id,
            userId: this.props.userId,
            packSize: this.props.listingInfo.num_of_participants
        });
        this.hideModal();
        this.props.history.push('/joined');
    }

    handleArrive() {
        this.props.socket.emit('arrived', {
            listingId: this.props.listingInfo.id
        });
    }

    handleReceive() {
        this.props.socket.emit('received', {
            listingId: this.props.listingInfo.id,
            userId: this.props.userId,
            packSize: this.props.listingInfo.num_of_participants
        });
    }

    showModal(e){
      e.preventDefault();
      this.setState({
        lgShow: true
      });
    }

    hideModal(e){
      this.setState({
        lgShow: false
      });
    }

    handleKeyDown (e) {
      if (e.keyCode === 27) {
        this.hideModal();
      }
    }
    render() {
      var footer;
      if (this.state.initializer) { //if current user is the initializer for this listing
        if (!this.state.completed) { //if not all parties have received the goods
            if (!this.state.arrived) { //if initializer has not yet notified the arrival of goods
                if (!this.state.packed) { //if wolfpack is not yet filled
                    footer = (<div>Waiting on more buyers...</div>);
                } else { //if wolfpack is filled
                    footer = (
                        <div>
                            Product is ready to be picked up!
                            <Button onClick={this.handleArrive}>Pick up product</Button>
                        </div>);
                }
            } else { //if initializer has notified the arrival of goods
                footer = (<div>Fellow buyers have been notified and will be picking up the product soon!</div>);
            }
        } else { //if all parties have received the goods
            footer = (<div>Successful purchase</div>);
        }
      } else { //if current user is not the initializer for this listing
        var involved = this.state.listingParticipants.some(listing => {
            return listing.user_id === this.props.userId ? true : false;
        });
        if (this.state.userJoined) { //if current user has joined the listing already
          // this.hideJoinButton();
            if (!this.state.arrived) { //if initializer has not yet notified the arrivial of goods
                if (!this.state.packed) { //if the pack is not filled
                    footer = (<div>Waiting on more buyers...</div>);
                } else { //if the pack is filled
                    footer = (<div>Product is ready to be picked up!</div>);
                }
            } else { //if initializer has notified the arrivial of goods
                if (this.state.received) { //if current user has confirmed the receipt of goods
                    footer = (<div>You've picked up the product. Enjoy!</div>);
                } else { //if current user has not confirmed the receipt of goods
                    footer = (
                        <div>
                            Product is ready to be picked up!
                            <Button onClick={this.handleReceive}>Received</Button>
                        </div>);
                }
            }
        } else { //if current user has not joined this listing yet
            if (!this.state.completed) { //if listing is already complete
                if (!this.state.packed) { //if this pack is not yet filled
                    // footer = (<Button onClick={this.handleJoin}>Join the Pack</Button>);
                } else { //if this pack is already filled
                    footer = (<div>Sorry, this product has enough buyers.</div>);
                }
            } else {
                footer = (<div>Listing Closed</div>);
            }
        }
      }

      return (
        <div className="karunsucks" style={{height: '100%'}}>

          <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm" onKeyDown={this.handleKeyDown}>
            <Modal.Header >
              <Modal.Title id="contained-modal-title-sm"><div>{this.props.listingInfo.name}</div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Row>
                        <Col md={6}>
                        <ListGroup>
                            <ListGroupItem><strong>Listing ID</strong>: {this.props.listingInfo.id}</ListGroupItem>
                            <ListGroupItem><strong>Description</strong>: {this.props.listingInfo.description}</ListGroupItem>
                            <ListGroupItem><strong>Purchaser</strong>: {this.props.listingInfo.initializer}</ListGroupItem>
                            <ListGroupItem><strong>Price</strong>: {this.props.listingInfo.price}</ListGroupItem>
                            <ListGroupItem><strong>Pickup Location</strong>: {this.props.listingInfo.location}</ListGroupItem>
                            <ListGroupItem><strong>Required Number of Buyers</strong>: {this.props.listingInfo.num_of_participants}</ListGroupItem>
                            <ListGroupItem><strong>Number of Buyers Joined</strong>: {this.state.listingParticipants.length}</ListGroupItem>
                            <ListGroupItem><strong>Number of Buyers Who Have Picked Up Product</strong>: {this.state.receivedParticipants.length}</ListGroupItem>
                            <ListGroupItem><strong>Buy Here</strong>: <a href={this.props.listingInfo.url} target="_blank">{this.props.listingInfo.name}</a></ListGroupItem>
                        </ListGroup>
                        </Col>
                        <Col md={6}>
                            <Chatroom userId={this.props.userId} username={this.props.username} listingInfo={this.props.listingInfo} listingId={this.props.listingInfo.id} socket={this.props.socket}/>
                        </Col>
                    </Row>
                    <Row>
                        <MapContainer
                            currentListings={[this.props.listingInfo]}
                            userId={this.props.userId}
                            socket={this.props.socket}
                            history={this.props.history}
                        />
                    </Row>
                </div>


            </Modal.Body>
            <Modal.Footer>
              <Button bsStyle="danger" onClick={this.hideModal}>Exit</Button>
              {this.state.btShow ? <Button onClick={this.handleJoin} >Join the Pack</Button>: null}
            </Modal.Footer>
          </Modal>
            <Col xs={6} md={4} >
                <Thumbnail src={this.props.listingInfo.image_url}alt="220x150">
                  <h3>{this.props.listingInfo.name}</h3>
                  <p>Original Bulk Price: <span style={{fontSize: '1.1em', fontWeight: 'bold', color: '#B12704'}}>${this.props.listingInfo.price}</span></p>
                  <p><strong style={{fontSize: '1.4em', fontWeight: 'bold'}}>You pay</strong> <span style={{fontSize: '1.4em', fontWeight: 'bold', color: 'green'}}>${((this.props.listingInfo.price / (Number(this.props.listingInfo.num_of_participants) + 1) )).toFixed(2)}
                  </span></p>
                  <div>
                    <Button bsStyle="primary" onClick={this.showModal}>More Info</Button>
                    <Link to={`/userlistings/${this.props.listingInfo.id}`}>
                        <Button bsStyle="primary">Listing Page</Button>
                    </Link>
                    <p style={{fontStyle: 'italic', color: 'grey'}}>{footer}</p>
                  </div>
                </Thumbnail>
              </Col>
        </div>
      );
    }
}

export default Listing;
