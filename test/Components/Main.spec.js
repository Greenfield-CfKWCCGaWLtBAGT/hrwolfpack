import React from 'React';
import { Route, Switch } from 'react-router-dom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import { Carousel, Col, Grid, Row } from 'react-bootstrap';
import Main from '../../client/src/components/Main.jsx';
import { MemoryRouter } from 'react-router';

chai.use(chaiEnzyme());

describe('<Main /> component', () => {
	it('asdf', () => {
		const wrapper = mount(<MemoryRouter><Main /></MemoryRouter>);
		expect(wrapper.find('#routes')).to.be.present();
	});
})