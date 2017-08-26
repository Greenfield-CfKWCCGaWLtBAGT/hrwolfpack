import React from 'react';
import chai from 'chai';

import InitiatedListings from '../../client/src/components/InitiatedListings.jsx';
import Form from '../../client/src/components/ListingsForm.jsx';
import Listings from '../../client/src/components/Listings.jsx';
import { Button, Modal, FormGroup, Grid, Row } from 'react-bootstrap';

import chaiHttp from 'chai-http';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('InitiatedListings', () => {
  it ('renders Bootstrap components Button, Modal, FormGroup, Grid, and Row correctly', () => {
    const wrapper = shallow(<InitiatedListings />);
    expect(wrapper.containsAllMatchingElements([
      <Button />,
      <Modal />,
      <FormGroup />,
      <Grid />,
      <Row />
    ]));
  });
})