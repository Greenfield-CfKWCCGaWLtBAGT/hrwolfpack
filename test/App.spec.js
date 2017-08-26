import React from 'react';
import { expect } from 'chai';
import { spy } from sinon;
import { shallow, mount } from 'enzyme';
import { App } from '../src/components/App.jsx';
import { Header } from '../src/components/Header.jsx';
import { Main } from '../src/components/Main.jsx';

describe('App.jsx', () => {
  it ('should correctly render Header and Main', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsAllMatchingElements([
      <Header />,
      <Main />
    ])).to.equal(true);
  });

  it ('should get the user upon mounting', () => {
    sinon.spy(App.jsx, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
    
  })
})