import React from 'react';
import chai from 'chai';

import Deal from '../../client/src/components/Deal.jsx';
import { Panel, Button } from 'react-bootstrap';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('Deal', () => {
  it ('can receive props', () => {
    const wrapper = shallow(<Deal test={'props'}/>);
    expect(wrapper.props().test).to.equal('props');
  })
})