import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow, render } from 'enzyme';
import Header from '../../client/src/components/Header.jsx';

chai.use(chaiEnzyme());

xdescribe('<Header /> component', () => {
	it('says hello to current user', () => {
		const wrapper = shallow(<Header currentUser="Kanye West"/>);
		console.log(wrapper);
		expect(wrapper.find('#user-name')).to.have.html(<a id='user-name' href="#">Hello, Kanye West</a>);
	})
})