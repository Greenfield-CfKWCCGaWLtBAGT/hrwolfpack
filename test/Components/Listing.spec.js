import React from 'react';
import Listing from '../../client/src/components/Listing.jsx';
import io from 'socket.io-client';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router';

let env = window.location.hostname + ':' + window.location.port;
let socket = io(env);
let listingInfo = {
  arrived: false,
  completed: true,
  packed:	false,
  description: "20 bottles of Herbal Essences shampoo 32oz",
  id:	1,
  image_url: "https://images-na.ssl-images-amazon.com/images/I/81BZskZAufL._SY355_.jpg",
  initializer: 1,
  lat: "37.78369240",
  lng: "-122.40896659",
  location: "944 Market St, San Francisco, CA 94121",
  name:	"20 pack of shampoo",
  num_of_participants: 3,
  price: "5.00",
  url: null
};

describe('<Listing /> component', () => {
  it('calls componentDidMount', () => {
  	sinon.spy(Listing.prototype, 'componentDidMount');
  	const wrapper = mount(<MemoryRouter><Listing listingInfo={listingInfo} socket={socket}/></MemoryRouter>);
    expect(Listing.prototype.componentDidMount).to.have.property('callCount', 1);
    Listing.prototype.componentDidMount.restore();
  });

  it('can receive listingInfo props', () => {
  	const wrapper = shallow(<Listing listingInfo={listingInfo}/>);
  	const inst = wrapper.instance();
  	expect(inst.props.listingInfo.arrived).to.equal(false);
  });
});