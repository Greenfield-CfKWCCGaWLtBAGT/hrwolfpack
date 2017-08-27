import React from 'react';
import chai from 'chai';

import Map from '../../client/src/components/Map.jsx';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { ListGroup, Button, Modal, Col, Thumbnail, Grid, Row, Panel,  } from 'react-bootstrap';
import Listing from '../../client/src/components/Listing.jsx';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

// describe('Map', () => {
//   it ('should render a GoogleMap object', () => {
    
//   })
// })