import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dot from './dot';
import Target from './target';

const style = {
  width: '500px',
  height: '500px',
  border: '1px solid black',
}

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render = () => (
    <div style={ style }>
      Main Container
      <Dot />
      <Target />
    </div>
  );
};
