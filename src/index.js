import React, { Component } from 'react';
import Container from './container';
import { resetDots } from './actions';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <div>
      <button onClick={ resetDots }>Reset</button>
      <Container dotPositions={ this.props.dotPositions }/>
    </div>
  )
}
