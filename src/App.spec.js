import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { doIncrement, doDecrement } from './App';
describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);
    expect(newState.counter).to.equal(1);
  });
  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);
    expect(newState.counter).to.equal(-1);
  });
