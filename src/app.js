import React from 'react';
import ReactDOM from 'react-dom';
import Container from './container';
import { observe } from './actions';

observe((dotPositions) => {
  ReactDOM.render(<Container dotPositions={ dotPositions } />, document.getElementById('app'));
});
