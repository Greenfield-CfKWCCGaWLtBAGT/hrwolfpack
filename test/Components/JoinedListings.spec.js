import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import { Carousel, Col, Grid, Row } from 'react-bootstrap';
import JoinedListings from '../../client/src/components/JoinedListings.jsx';

chai.use(chaiEnzyme());

describe('<JoinedListings /> component', () => {
	

	it('should have style margin', () => {
		const wrapper = mount(<JoinedListings />);
		expect(wrapper).to.have.style('margin', '100px 50px 50px 50px');
	});

	it('should have currentListings state', () => {
		const wrapper = mount(<JoinedListings />);
		expect(wrapper).to.have.state('currentListings');
	});

	it('should call componentDidMount', () => {
		sinon.spy(JoinedListings.prototype, 'componentDidMount');
		const wrapper = mount(<JoinedListings />);
		expect(JoinedListings.prototype.componentDidMount).to.have.property('callCount', 1);
		JoinedListings.prototype.componentDidMount.restore();
	});

});