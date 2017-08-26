import React from 'react';
import MapContainer from '../../client/src/components/MapContainer.jsx';
import {Grid, Row, Col} from 'react-bootstrap';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

describe('<MapContainer /> component', () => {
	it('has style for height position and style', () => {
		const wrapper = shallow(<MapContainer />);
		expect(wrapper).to.have.style('position', 'absolute');
		expect(wrapper).to.have.style('height', '100%');
		expect(wrapper).to.have.style('width', '100%');
	});
});