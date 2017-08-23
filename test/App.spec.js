import React from 'react';
import App from '../client/src/index.jsx';

describe('a passing test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
}); 

describe('<App />', () => {
  it('calls componentDidMount', () => {
    const wrapper = render(App);
    expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});