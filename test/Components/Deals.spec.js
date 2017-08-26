import React from 'React';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import Deals from '../../client/src/components/Deals.jsx';
import Deal from '../../client/src/components/Deal.jsx';
import dummyData from '../Server_Database/mock-db.js';

chai.use(chaiEnzyme());

describe('<Deals /> component', () => {
	it('accepts dealInfos props', () => {
		const wrapper = shallow(<Deals dealInfos={dummyData.deals}/>);
		expect(wrapper).to.have.descendants(Deal);
	})

})