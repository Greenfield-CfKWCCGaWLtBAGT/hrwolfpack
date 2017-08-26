import React from 'react';
import chai from 'chai';

import Form from '../../client/src/components/ListingsForm.jsx';
import { FormGroup, InputGroup, FormControl, Button, DropdownButton, MenuItem, Grid, HelpBlock } from 'react-bootstrap';

import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

// const promise = Promise.resolve()