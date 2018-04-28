import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Dot from './dot';

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
    props.onDrop(monitor.getItem());
  },
};

@DropTarget(props => props.accepts, dotTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))

export default class Target extends Component {
  constructor() {
    super();
  }

  render () {

    const { canDrop, isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={style}>
        { canDrop && console.log('candrop!') }
        { isOver && console.log('isOver!') }
        { this.props.children }
      </div>
    )
  }
};
