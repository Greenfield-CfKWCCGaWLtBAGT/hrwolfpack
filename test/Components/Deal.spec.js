import React from 'react';
import chai from 'chai';

import Deal from '../../client/src/components/Deal.jsx';
import { Panel, Button } from 'react-bootstrap';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('<Deal /> component', () => {
  const wrapper = mount(<Deal dealInfo={{description: 'lol'}} handleSelect={() => {}}/>);
  it ('can receive props', () => {
    expect(wrapper.props().dealInfo.description).to.equal('lol');
  });
})