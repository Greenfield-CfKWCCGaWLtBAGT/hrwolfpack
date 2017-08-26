import React from 'react';
import chai from 'chai';

import Form from '../../client/src/components/ListingsForm.jsx';
import { FormGroup, InputGroup, FormControl, Button, DropdownButton, MenuItem, Grid, HelpBlock } from 'react-bootstrap';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('ListingsForm', () => {
  it ('calls componentDidMount', () => {
    sinon.spy(Form.prototype, 'componentDidMount');
    const wrapper = mount(<Form />);
    expect(Form.prototype.componentDidMount.calledOnce).to.equal(true);
  })
})