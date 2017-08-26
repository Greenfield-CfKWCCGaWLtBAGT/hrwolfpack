import React from 'react';
import Listings from '../../client/src/components/Listings.jsx';
import Listing from '../../client/src/components/Listing.jsx';
import { ListGroup, Button, Modal, Thumbnail, Grid, Row,  } from 'react-bootstrap';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow, render } from 'enzyme';
import dummyData from '../Server_Database/mock-db.js';

chai.use(chaiEnzyme());

describe('<Listings /> component', () => {
	it('accepts current listings props', () => {
		const wrapper = shallow(<Listings currentListings={dummyData.listings}/>);
		expect(wrapper).to.have.descendants(Listing);
	})

})
