import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const style = {
  border: '1px solid black',
  borderRadius: '50%',
  height: '35px',
  width: '35px',
  marginTop: '50px',
};

const dotTarget = {
  drop(props, monitor) {
    console.log('dot dropped!: ', props);
  },
};

@DropTarget('dot', dotTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))

export default class Target extends Component {
  constructor() {
    super();
  }

  render = () => (
    <div style={style}>
    </div>
  );
};
