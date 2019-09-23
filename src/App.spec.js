import React from 'react';

import global from 'global';

import App, { Counter, doIncrement, doDecrement } from './ForTestApp';

describe('Local State', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Counter)).to.have.length(1);
  });
  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(0);
    wrapper.setState({ counter: -1 });
    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });
  it('increments the counter', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.state().counter).to.equal(1);
  });
  it('decrements the counter', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ counter: 0 });
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.state().counter).to.equal(-1);
  });
})
