import React from 'react';
import chai from 'chai';

import UserListings from '../../client/src/components/UserListings.jsx';
import Listings from '../../client/src/components/Listings.jsx';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('<UserListings /> component', () => {
  it ('should call componentWillMount', () => {
    sinon.spy(UserListings.prototype, 'componentWillMount');
    const wrapper = mount(<UserListings />);
    expect(UserListings.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  // it ('correctly updates the state after the AJAX call in componentWillMount', (done) => {
  //   let server = sinon.createFakeServer();
  // })
})
