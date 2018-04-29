import React, { Component } from 'react';
import Container from './container';


export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render = () => (
    <div>
      
      <Container dotPositions={ this.props.dotPositions }/>
    </div>
  )
}
