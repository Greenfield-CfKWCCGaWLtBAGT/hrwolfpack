import React from 'react';
import MapContainer from '../../client/src/components/MapContainer.jsx';
import Map from '../../client/src/components/Map.jsx';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import {Grid, Row, Col} from 'react-bootstrap';
import { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

//chai.use(chaiEnzyme());

describe('<MapContainer /> component', () => {
	it('has style for height position and style', () => {
		//not rendering here... what do I need as a dependency?
		const wrapper = shallow(<MapContainer />);
		expect(wrapper).to.have.style('position', 'absolute');
		expect(wrapper).to.have.style('height', '100%');
		expect(wrapper).to.have.style('width', '100%');
	});
});