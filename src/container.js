import React, { Component } from 'react';
import Dot from './dot';
import Target from './target';

const style = {
  width: '500px',
  height: '500px',
  border: '1px solid black',
}

export default class Container extends Component {
  constructor() {
    super();
  }

  render = () => (
    <div style={ style }>
      Main Container
      <Dot />
      <Target />
    </div>
  );
};
