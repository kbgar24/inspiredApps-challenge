import React, { Component } from 'react';
import Container from './container';
import { observe, getStartPositions } from './actions';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <div>
      <Container dotPosition={ this.props.dotPosition }/>
    </div>
  )
}
