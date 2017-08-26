import React from 'react';
import App from '../../client/src/components/App.jsx';
import Header from '../../client/src/components/Header.jsx';
import Main from '../../client/src/components/Main.jsx';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('<App />', () => {
	const wrapper = shallow(<App />);

	it('should contain <Header/> and <Main/> components', () => {
		expect(wrapper.containsAllMatchingElements([
			<Header />,
			<Main />
		])).to.equal(true);
	});
})